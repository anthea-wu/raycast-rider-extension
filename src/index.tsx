import { ActionPanel, Action, List, showToast, Toast, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { homedir } from "os";
import { readFile, readdir, access } from "fs/promises";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface RecentProject {
  path: string;
  name: string;
  lastOpened: number;
  displayName?: string;
  frameTitle?: string;
}

function getProjectIcon(path: string): Icon {
  if (path.endsWith(".sln")) {
    return Icon.CodeBlock;
  }
  if (path.includes("GitHub")) {
    return Icon.Terminal;
  }
  return Icon.Folder;
}

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<RecentProject[]>([]);

  useEffect(() => {
    loadRecentProjects();
  }, []);

  async function findRiderConfigPath() {
    const home = homedir();
    const jetbrainsPath = join(home, "Library/Application Support/JetBrains");
    
    try {
      const dirs = await readdir(jetbrainsPath);
      const riderDirs = dirs.filter(dir => dir.startsWith("Rider"));
      riderDirs.sort().reverse();
      
      if (riderDirs.length === 0) {
        throw new Error("Rider configuration directory not found");
      }

      // Try each Rider directory
      for (const dir of riderDirs) {
        const configPath = join(jetbrainsPath, dir, "options/recentSolutions.xml");
        try {
          await access(configPath);
          return configPath;
        } catch {
          continue;
        }
      }
    } catch {
      throw new Error("Rider configuration directory not found");
    }

    throw new Error("Rider configuration file not found. Please make sure Rider is installed and you have opened at least one project");
  }

  async function loadRecentProjects() {
    try {
      const configPath = await findRiderConfigPath();
      const content = await readFile(configPath, "utf-8");
      
      // Parse XML content
      const projects: RecentProject[] = [];
      
      // Find all entry tags
      const entries = content.matchAll(/<entry key="([^"]+)">\s*<value>\s*<RecentProjectMetaInfo[^>]*(?:displayName="([^"]*)")?\s*(?:frameTitle="([^"]*)")?[^>]*>\s*<option name="activationTimestamp"\s+value="(\d+)"/g);
      
      for (const [, path, displayName, frameTitle, timestamp] of entries) {
        const resolvedPath = path.replace("$USER_HOME$", homedir());
        const name = displayName || frameTitle || resolvedPath.split("/").pop() || resolvedPath;
        
        projects.push({
          path: resolvedPath,
          name,
          displayName,
          frameTitle,
          lastOpened: parseInt(timestamp),
        });
      }

      if (projects.length === 0) {
        await showToast({
          style: Toast.Style.Failure,
          title: "No Recent Projects Found",
          message: "Please open some projects in Rider first",
        });
      } else {
        setProjects(projects.sort((a, b) => b.lastOpened - a.lastOpened));
      }
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to Load Projects",
        message: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function openProject(project: RecentProject) {
    try {
      await execAsync(`open -na "Rider.app" --args "${project.path}"`);
      await showToast({
        style: Toast.Style.Success,
        title: "Project Opened",
        message: project.name,
      });
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to Open Project",
        message: String(error),
      });
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search projects...">
      {projects.map((project) => (
        <List.Item
          key={project.path}
          icon={getProjectIcon(project.path)}
          title={project.name}
          subtitle={project.path}
          accessories={[
            {
              text: new Date(project.lastOpened).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
          ]}
          actions={
            <ActionPanel>
              <Action title="Open Project" onAction={() => openProject(project)} />
              <Action.ShowInFinder path={project.path} />
              <Action.CopyToClipboard
                title="Copy Project Path"
                content={project.path}
                shortcut={{ modifiers: ["cmd"], key: "." }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
} 
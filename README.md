# Raycast Rider Extension

A Raycast extension for quickly searching and opening recent JetBrains Rider projects.

## Prerequisites

- [Raycast](https://raycast.com/) installed
- [JetBrains Rider](https://www.jetbrains.com/rider/) installed
- Node.js installed

## Installation

1. Clone this repository:
```bash
git clone https://github.com/YOUR_USERNAME/raycast-rider-extension
cd raycast-rider-extension
```

2. Install dependencies (choose one):
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. Development mode (use the same tool you chose above):
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm run dev
```

4. The extension will be automatically installed in Raycast. You can find it by:
   - Opening Raycast (⌘ Space)
   - Typing "Search Recent Project"

## Features

- List all recent Rider projects with their paths and last opened dates
- Quick search through project names and paths
- Open projects directly in Rider
- Show project location in Finder
- Copy project path (⌘ .)
- Different icons for:
  - Solution files (.sln)
  - GitHub projects
  - Regular folders

## Usage

1. Open Raycast (⌘ Space)
2. Type "Search Recent Project"
3. Browse or search through your recent projects
4. Available actions:
   - Press Enter to open the selected project in Rider
   - Press ⌘ . to copy the project path
   - Use the "Show in Finder" action to locate the project

## Configuration Files

The extension reads Rider's recent projects from:
- `~/Library/Application Support/JetBrains/Rider*/options/recentSolutions.xml`

## Troubleshooting

If you encounter any issues:

1. Make sure Rider is installed and can be opened from your system
2. Verify that:
   - You have opened at least one project in Rider
   - The configuration file exists and is accessible
   - You have the necessary permissions to read the configuration file

3. Common error messages and solutions:
   - "Rider application not found": Check your Rider installation
   - "No Recent Projects Found": Open some projects in Rider first
   - "Failed to Load Projects": Check file permissions and Rider's configuration

4. To reinstall:
   - Open Raycast
   - Go to Extensions
   - Find "JetBrains Rider Projects"
   - Click the gear icon
   - Choose "Remove Extension"
   - Follow the installation steps above again 
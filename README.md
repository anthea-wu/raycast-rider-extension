# Raycast Rider Extension

A Raycast extension for quickly searching and opening recent JetBrains Rider projects.

## Prerequisites

- [Raycast](https://raycast.com/)
- [JetBrains Rider](https://www.jetbrains.com/rider/)
- [Node.js](https://nodejs.org/)
- Package manager (npm, yarn, or pnpm)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/raycast-rider-extension
cd raycast-rider-extension
```

2. Install dependencies (choose one):
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Choose an installation method:

Method 1: Development Mode (recommended for development)
```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

Method 2: Production Build
```bash
# 1. Build the extension (choose one)
npm run build
# or
yarn build
# or
pnpm run build

# 2. Install in Raycast
# - Open Raycast Settings (⌘ + ,)
# - Select Extensions tab
# - Click + in bottom left
# - Choose "Import Extension"
# - Select the dist folder
```

## Features

- Quick search and open recent JetBrains Rider projects
- Show project details (name, path, last opened date)
- Open in Rider with Enter key
- Show in Finder
- Copy project path (⌘ .)
- Visual indicators for different project types

## Usage

1. Open Raycast (⌘ Space)
2. Type "Search Recent Project"
3. Available actions:
   - Enter: Open project in Rider
   - ⌘ .: Copy project path
   - Show in Finder: Locate project

## Technical Details

The extension reads project data from:
```
~/Library/Application Support/JetBrains/Rider*/options/recentSolutions.xml
```

It automatically:
- Finds the latest Rider installation
- Reads the configuration file
- Parses project information

## Troubleshooting

Common issues and solutions:

1. "Rider application not found"
   - Verify Rider installation
   - Check if Rider can be opened normally

2. "No Recent Projects Found"
   - Open at least one project in Rider first
   - Check if the configuration file exists

3. "Failed to Load Projects"
   - Verify file permissions
   - Check configuration file access

To reinstall:
1. Open Raycast Settings
2. Go to Extensions
3. Find "JetBrains Rider Projects"
4. Click gear icon → Remove Extension
5. Follow installation steps again 
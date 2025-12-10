# reps-deps

Multi-repositories dependencies reader for one final list output

A CLI tool that scans directories for Node.js repositories, extracts their dependencies (both production and development), and generates a comprehensive hierarchical report.

## Development

### Building the CLI

The CLI binary (`bin/cli.js`) is automatically generated from `index.js`:

```bash
# Build the CLI from index.js
npm run build
```

The build script:
- Reads the core logic from `index.js`
- Generates `bin/cli.js` with the CLI wrapper
- Makes the file executable automatically

**Note:** Always edit `index.js` for core functionality. The `bin/cli.js` file is auto-generated and should not be edited directly.

## Installation

### Local Installation
```bash
npm install
npm run build
```

### Global Installation
To use the CLI tool globally from anywhere in your terminal:
```bash
npm install -g .
```

Or use npm link for development:
```bash
npm link
```

## Usage

### Using the Global Command
After global installation, you can run the tool from anywhere:

```bash
# Scan the current directory and save report to default location (./dependencies-report.txt)
reps-deps

# Scan a specific directory
reps-deps /path/to/directory

# Scan a directory and specify custom output file
reps-deps /path/to/directory /path/to/custom-report.txt
```

### Using npm start
Without global installation:

```bash
# Scan the current directory
npm start

# Scan a specific directory
npm start /path/to/directory

# Scan with custom output file
npm start /path/to/directory /path/to/report.txt
```

### Using Node Directly
```bash
# Scan the current directory
node bin/cli.js

# Scan a specific directory
node bin/cli.js /path/to/directory

# Scan with custom output file
node bin/cli.js /path/to/directory custom-report.txt
```

## Features

- 🔍 **Automatic Discovery**: Scans directories and identifies Node.js repositories (with package.json)
- 📦 **Dependency Extraction**: Reads all production and development dependencies
- 📊 **Hierarchical Report**: Generates a detailed, well-formatted text report
- 📁 **Smart Filtering**: Automatically excludes hidden directories (starting with .)
- 🎯 **Flexible Scanning**: Can scan current directory or any specified path
- 💾 **Custom Output**: Specify custom output file location
- 🚀 **Global Installation**: Can be installed globally for easy CLI access
- 🛠️ **No Dependencies**: Uses only Node.js built-in modules
- ✨ **Clean Output**: Beautiful console summaries and detailed reports

## How It Works

1. Scans the target directory for subdirectories
2. Identifies which subdirectories contain `package.json` (Node.js repositories)
3. Reads and parses each `package.json` file
4. Extracts both production and development dependencies
5. Generates a hierarchical report file with all findings
6. Displays a summary in the console

## Example Output

### Console Output
```
🔍 Scanning for Node.js repositories...

Target Directory: /Users/username/projects

✅ Found 3 Node.js repositories
📄 Report saved to: /Users/username/projects/dependencies-report.txt

Summary:
------------------------------------------------------------
  my-api: 25 total dependencies (20 prod, 5 dev)
  frontend-app: 45 total dependencies (30 prod, 15 dev)
  shared-utils: 8 total dependencies (5 prod, 3 dev)

💡 Check the report file for detailed information.
```

### Report File (dependencies-report.txt)
```
================================================================================
NODE.JS REPOSITORIES DEPENDENCIES REPORT
================================================================================
Root Directory: /Users/username/projects
Scan Date: 2025-12-10T10:30:00.000Z
Total Repositories Found: 3
================================================================================

[1] my-api
--------------------------------------------------------------------------------
Package Name: my-api
Version: 1.0.0
Path: /Users/username/projects/my-api

Dependencies (20):
  - express: ^4.18.0
  - dotenv: ^16.0.0
  - mongoose: ^7.0.0
  ...

Dev Dependencies (5):
  - jest: ^29.0.0
  - eslint: ^8.0.0
  ...

[2] frontend-app
--------------------------------------------------------------------------------
...
```

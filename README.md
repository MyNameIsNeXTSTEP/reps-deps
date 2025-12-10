# reps-deps

Multi-repositories dependencies reader for one final list output

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
# Scan the current directory
reps-deps

# Scan a specific directory
reps-deps /path/to/directory
```

### Using npm start
Without global installation:

```bash
# Scan the current directory
npm start

# Scan a specific directory
npm start /path/to/directory
```

### Using Node Directly
```bash
# Scan the current directory
node bin/cli.js

# Scan a specific directory
node bin/cli.js /path/to/directory
```

## Features

- 🔍 Scans directories and lists all subdirectories
- 📁 Automatically excludes hidden directories (starting with .)
- 🎯 Can scan current directory or any specified path
- 🚀 Can be installed globally for easy CLI access
- ✨ Clean, sorted output

## Example Output

```
Scanning directory: /Users/username/projects/myproject

Found subdirectories:
-------------------
  - api
  - components
  - src
  - tests
  - utils

Total: 5 subdirectories
```

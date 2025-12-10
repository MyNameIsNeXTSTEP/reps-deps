// This file contains the core logic for directory scanning
// The CLI binary (bin/cli.js) is auto-generated from this file
// Run 'npm run build' after making changes to regenerate the CLI

const fs = require('fs');
const path = require('path');

/**
 * Scans a directory and returns a list of its subdirectories
 * @param {string} dirPath - The directory path to scan
 * @returns {string[]} Array of subdirectory names
 */
function scanDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory does not exist: ${dirPath}`);
    }

    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${dirPath}`);
    }

    const items = fs.readdirSync(dirPath);

    const directories = items.filter(item => {
      const itemPath = path.join(dirPath, item);
      try {
        const itemStats = fs.statSync(itemPath);
        return itemStats.isDirectory() && !item.startsWith('.');
      } catch (error) {
        return false;
      }
    });

    return directories.sort();
  } catch (error) {
    throw error;
  }
}

/**
 * Checks if a directory is a Node.js repository (contains package.json)
 * @param {string} dirPath - The directory path to check
 * @returns {boolean} True if package.json exists
 */
function isNodeRepository(dirPath) {
  const packageJsonPath = path.join(dirPath, 'package.json');
  return fs.existsSync(packageJsonPath);
}

/**
 * Reads and parses package.json from a directory
 * @param {string} dirPath - The directory path
 * @returns {Object|null} Parsed package.json or null if invalid
 */
function readPackageJson(dirPath) {
  try {
    const packageJsonPath = path.join(dirPath, 'package.json');
    const content = fs.readFileSync(packageJsonPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Warning: Could not read package.json in ${dirPath}: ${error.message}`);
    return null;
  }
}

/**
 * Extracts dependencies from package.json
 * @param {Object} packageJson - Parsed package.json object
 * @returns {Object} Object with dependencies and devDependencies arrays
 */
function extractDependencies(packageJson) {
  const result = {
    dependencies: [],
    devDependencies: []
  };

  if (packageJson.dependencies) {
    result.dependencies = Object.entries(packageJson.dependencies).map(
      ([name, version]) => ({ name, version })
    );
  }

  if (packageJson.devDependencies) {
    result.devDependencies = Object.entries(packageJson.devDependencies).map(
      ([name, version]) => ({ name, version })
    );
  }

  return result;
}

/**
 * Scans a directory for Node.js repositories and their dependencies
 * @param {string} dirPath - The directory path to scan
 * @returns {Array} Array of repository information objects
 */
function scanNodeRepositories(dirPath) {
  const repositories = [];
  const directories = scanDirectory(dirPath);

  for (const dir of directories) {
    const fullPath = path.join(dirPath, dir);
    if (isNodeRepository(fullPath)) {
      const packageJson = readPackageJson(fullPath);
      if (packageJson) {
        const deps = extractDependencies(packageJson);
        repositories.push({
          name: dir,
          path: fullPath,
          packageName: packageJson.name || dir,
          version: packageJson.version || 'unknown',
          dependencies: deps.dependencies,
          devDependencies: deps.devDependencies
        });
      }
    }
  }

  return repositories;
}

/**
 * Formats repository data into a readable text hierarchy
 * @param {Array} repositories - Array of repository objects
 * @param {string} rootPath - The root path that was scanned
 * @returns {string} Formatted text output
 */
function formatOutput(repositories, rootPath) {
  let output = '';
  output += '='.repeat(80) + '\n';
  output += 'NODE.JS REPOSITORIES DEPENDENCIES REPORT\n';
  output += '='.repeat(80) + '\n';
  output += `Root Directory: ${rootPath}\n`;
  output += `Scan Date: ${new Date().toISOString()}\n`;
  output += `Total Repositories Found: ${repositories.length}\n`;
  output += '='.repeat(80) + '\n\n';

  if (repositories.length === 0) {
    output += 'No Node.js repositories found in the scanned directory.\n';
    return output;
  }

  repositories.forEach((repo, index) => {
    output += `\n[${ index + 1}] ${repo.name}\n`;
    output += '-'.repeat(80) + '\n';
    output += `Package Name: ${repo.packageName}\n`;
    output += `Version: ${repo.version}\n`;
    output += `Path: ${repo.path}\n`;
    output += '\n';

    // Production Dependencies
    output += `Dependencies (${repo.dependencies.length}):\n`;
    if (repo.dependencies.length === 0) {
      output += '  (none)\n';
    } else {
      repo.dependencies.forEach(dep => {
        output += `  - ${dep.name}: ${dep.version}\n`;
      });
    }
    output += '\n';

    // Development Dependencies
    output += `Dev Dependencies (${repo.devDependencies.length}):\n`;
    if (repo.devDependencies.length === 0) {
      output += '  (none)\n';
    } else {
      repo.devDependencies.forEach(dep => {
        output += `  - ${dep.name}: ${dep.version}\n`;
      });
    }
    
    output += '\n';
  });

  output += '\n' + '='.repeat(80) + '\n';
  output += 'END OF REPORT\n';
  output += '='.repeat(80) + '\n';

  return output;
}

/**
 * Main function to scan directories and generate dependencies report
 * @param {string} dirPath - The directory path to scan
 * @param {string} outputFile - Optional output file path (defaults to dependencies-report.txt)
 * @returns {Object} Object with repositories array and output file path
 */
function generateDependenciesReport(dirPath, outputFile = null) {
  const absolutePath = path.resolve(dirPath);
  const repositories = scanNodeRepositories(absolutePath);
  const output = formatOutput(repositories, absolutePath);
  
  // Default output file name
  if (!outputFile) {
    outputFile = path.join(process.cwd(), 'dependencies-report.txt');
  } else {
    outputFile = path.resolve(outputFile);
  }

  // Write to file
  fs.writeFileSync(outputFile, output, 'utf8');

  return {
    repositories,
    outputFile,
    output
  };
}

module.exports = {
  scanDirectory,
  isNodeRepository,
  readPackageJson,
  extractDependencies,
  scanNodeRepositories,
  formatOutput,
  generateDependenciesReport
};

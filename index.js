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

module.exports = {
  scanDirectory
};

#!/usr/bin/env node

const { scanDirectory } = require('../index');
const path = require('path');

// Get the directory path from command line arguments or use current directory
const targetDir = process.argv[2] || process.cwd();
const absolutePath = path.resolve(targetDir);

console.log(`Scanning directory: ${absolutePath}\n`);

try {
  const directories = scanDirectory(absolutePath);
  
  if (directories.length === 0) {
    console.log('No subdirectories found.');
  } else {
    console.log('Found subdirectories:');
    console.log('-------------------');
    directories.forEach(dir => {
      console.log(`  - ${dir}`);
    });
    console.log(`\nTotal: ${directories.length} subdirectories`);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

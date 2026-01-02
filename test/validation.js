#!/usr/bin/env node

// Basic validation tests for CTriStateChecked component
// This script validates the built component before publishing

const fs = require('fs');
const path = require('path');

console.log('🧪 Running CTriStateChecked Component Validation...\n');

// Test 1: Check if built file exists
console.log('1. Checking built file...');
const builtFile = path.join(__dirname, '../dist/jsc_mctl_tri_state_check.js');
if (fs.existsSync(builtFile)) {
    console.log('✅ Built file exists');
    const stats = fs.statSync(builtFile);
    console.log(`   Size: ${stats.size} bytes`);
} else {
    console.log('❌ Built file missing!');
    process.exit(1);
}

// Test 2: Check if source files exist
console.log('\n2. Checking source files...');
const sourceFiles = [
    '../src/index.ts',
    '../src/jsc_mctl_tri_state_check.jsx'
];

sourceFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing!`);
        process.exit(1);
    }
});

// Test 3: Check package.json
console.log('\n3. Checking package.json...');
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Check required fields
    const requiredFields = ['name', 'version', 'description', 'main'];
    requiredFields.forEach(field => {
        if (pkg[field]) {
            console.log(`✅ ${field}: ${pkg[field]}`);
        } else {
            console.log(`❌ Missing ${field}!`);
            process.exit(1);
        }
    });
    
    // Check version format
    if (/^\d+\.\d+\.\d+$/.test(pkg.version)) {
        console.log(`✅ Version format is valid`);
    } else {
        console.log(`❌ Invalid version format!`);
        process.exit(1);
    }
} else {
    console.log('❌ package.json missing!');
    process.exit(1);
}

// Test 4: Check documentation
console.log('\n4. Checking documentation...');
const docFiles = [
    '../README.md',
    '../demo.html',
    '../example.js'
];

docFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`⚠️  ${file} missing (optional)`);
    }
});

// Test 5: Validate built content
console.log('\n5. Validating built content...');
const builtContent = fs.readFileSync(builtFile, 'utf8');

const checks = [
    { pattern: /CTriStateChecked/, name: 'Component name' },
    { pattern: /propTypes/, name: 'PropTypes definition' },
    { pattern: /onChange/, name: 'onChange handler' },
    { pattern: /useState/, name: 'React hooks' },
    { pattern: /useEffect/, name: 'React useEffect' }
];

checks.forEach(check => {
    if (check.pattern.test(builtContent)) {
        console.log(`✅ ${check.name} found`);
    } else {
        console.log(`❌ ${check.name} missing!`);
        process.exit(1);
    }
});

// Test 6: Check file sizes
console.log('\n6. Checking file sizes...');
const builtStats = fs.statSync(builtFile);
const maxSize = 50 * 1024; // 50KB max

if (builtStats.size <= maxSize) {
    console.log(`✅ Built file size is acceptable (${builtStats.size} bytes)`);
} else {
    console.log(`⚠️  Built file is large (${builtStats.size} bytes)`);
}

// Test 7: Validate export
console.log('\n7. Checking exports...');
const indexPath = path.join(__dirname, '../src/index.ts');
if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    if (indexContent.includes('CTriStateChecked')) {
        console.log('✅ Export is properly defined');
    } else {
        console.log('❌ Export missing!');
        process.exit(1);
    }
}

console.log('\n🎉 All validation tests passed!');
console.log('✅ Component is ready for publishing\n');

// Display package info
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
console.log('📦 Package Information:');
console.log(`   Name: ${pkg.name}`);
console.log(`   Version: ${pkg.version}`);
console.log(`   Description: ${pkg.description}`);
console.log(`   Main: ${pkg.main}`);
console.log(`   Size: ${fs.statSync(builtFile).size} bytes`);

console.log('\n🚀 Ready to publish with: npm publish');

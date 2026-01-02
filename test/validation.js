#!/usr/bin/env node

// Basic validation tests for Class_Radar_Screen component
// This script validates the built component before publishing

const fs = require('fs');
const path = require('path');

console.log('🧪 Running Class_Radar_Screen Component Validation...\n');

// Test 1: Check if built file exists
console.log('1. Checking built file...');
const builtFile = path.join(__dirname, '../dist/jsc_mctrl_radar_screen.js');
if (fs.existsSync(builtFile)) {
    console.log('✅ Built file exists');
    const stats = fs.statSync(builtFile);
    console.log(`   Size: ${stats.size} bytes`);
} else {
    console.log('❌ Built file missing!');
    process.exit(1);
}

// Test 2: Check if source file exists
console.log('\n2. Checking source file...');
const sourceFile = path.join(__dirname, '../src/jsc_mctrl_radar_screen.jsx');
if (fs.existsSync(sourceFile)) {
    console.log('✅ Source file exists');
    const stats = fs.statSync(sourceFile);
    console.log(`   Size: ${stats.size} bytes`);
} else {
    console.log('❌ Source file missing!');
    process.exit(1);
}

// Test 3: Validate source file content
console.log('\n3. Validating source file content...');
try {
    const sourceContent = fs.readFileSync(sourceFile, 'utf8');
    
    // Check for essential radar component elements
    const requiredElements = [
        { name: 'Class_Radar_Screen', pattern: /class\s+Class_Radar_Screen/ },
        { name: 'React.Component', pattern: /extends\s+React\.Component/ },
        { name: 'drawRadar method', pattern: /drawRadar\s*=/ },
        { name: 'highlightSection method', pattern: /highlightSection\s*=/ },
        { name: 'Canvas rendering', pattern: /canvasRef/ },
        { name: 'Props validation', pattern: /this\.props\./ }
    ];
    
    let allTestsPassed = true;
    
    requiredElements.forEach(element => {
        if (element.pattern.test(sourceContent)) {
            console.log(`✅ ${element.name} found`);
        } else {
            console.log(`❌ ${element.name} missing!`);
            allTestsPassed = false;
        }
    });
    
    if (!allTestsPassed) {
        console.log('❌ Source file validation failed!');
        process.exit(1);
    }
    
} catch (error) {
    console.log('❌ Error reading source file:', error.message);
    process.exit(1);
}

// Test 4: Check package.json configuration
console.log('\n4. Validating package.json...');
try {
    const packagePath = path.join(__dirname, '../package.json');
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const requiredFields = [
        { name: 'Package name', value: packageContent.name, expected: 'radar_screen_react' },
        { name: 'Main file', value: packageContent.main, expected: 'dist/jsc_mctrl_radar_screen.js' },
        { name: 'React peer dependency', value: packageContent.peerDependencies?.react, pattern: />=/ }
    ];
    
    let allTestsPassed = true;
    
    requiredFields.forEach(field => {
        if (field.pattern) {
            if (field.pattern.test(field.value)) {
                console.log(`✅ ${field.name} is valid`);
            } else {
                console.log(`❌ ${field.name} is invalid: ${field.value}`);
                allTestsPassed = false;
            }
        } else {
            if (field.value === field.expected) {
                console.log(`✅ ${field.name} is correct`);
            } else {
                console.log(`❌ ${field.name} mismatch: expected "${field.expected}", got "${field.value}"`);
                allTestsPassed = false;
            }
        }
    });
    
    if (!allTestsPassed) {
        console.log('❌ Package.json validation failed!');
        process.exit(1);
    }
    
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
    process.exit(1);
}

// Test 5: Check demo files
console.log('\n5. Validating demo files...');
const demoFiles = [
    { name: 'HTML Demo', path: '../demo.html' },
    { name: 'React Example', path: '../example.js' },
    { name: 'README', path: '../README.md' }
];

let allDemoTestsPassed = true;

demoFiles.forEach(demo => {
    const demoPath = path.join(__dirname, demo.path);
    if (fs.existsSync(demoPath)) {
        console.log(`✅ ${demo.name} exists`);
    } else {
        console.log(`❌ ${demo.name} missing!`);
        allDemoTestsPassed = false;
    }
});

if (!allDemoTestsPassed) {
    console.log('❌ Demo files validation failed!');
    process.exit(1);
}

// Test 6: Check radar resources
console.log('\n6. Validating radar resources...');
const radarImagePath = path.join(__dirname, '../resources/radar.png');
if (fs.existsSync(radarImagePath)) {
    console.log('✅ Radar image exists');
    const stats = fs.statSync(radarImagePath);
    console.log(`   Size: ${stats.size} bytes`);
} else {
    console.log('❌ Radar image missing!');
    process.exit(1);
}

console.log('\n🎉 All validation tests passed!');
console.log('✅ Class_Radar_Screen component is ready for publishing!');
console.log('\n📦 Next steps:');
console.log('   1. Run: npm run build');
console.log('   2. Run: npm run test:build');
console.log('   3. Run: npm publish');

// Display package info
const packagePath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
console.log('\n📦 Package Information:');
console.log(`   Name: ${pkg.name}`);
console.log(`   Version: ${pkg.version}`);
console.log(`   Description: ${pkg.description}`);
console.log(`   Main: ${pkg.main}`);
console.log(`   Size: ${fs.statSync(builtFile).size} bytes`);

console.log('\n🚀 Ready to publish with: npm publish');

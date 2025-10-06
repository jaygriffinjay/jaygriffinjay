#!/usr/bin/env node
const fs = require('fs');

// ===== CONFIGURATION - CHANGE THESE VALUES =====
const VALUES = "0.5;6;0.5";  // Animation keyframes (start;middle;end)
const DURATION = "1s";        // Animation duration
// ================================================

// Read the SVG file
let content = fs.readFileSync('triangle-fill.svg', 'utf8');

// Pattern 1: Update existing animate tags
const existingAnimatePattern = /<animate attributeName="stroke-width" values="[^"]*" dur="[^"]*" repeatCount="indefinite"\/>/g;
const animateReplacement = `<animate attributeName="stroke-width" values="${VALUES}" dur="${DURATION}" repeatCount="indefinite"/>`;
const updatedCount = (content.match(existingAnimatePattern) || []).length;
content = content.replace(existingAnimatePattern, animateReplacement);

// Pattern 2: Add animate tags to self-closing polygon tags (if any exist)
const selfClosingPattern = /(<polygon [^>]*stroke-width="0\.5")\/>/g;
const selfClosingReplacement = `$1>\n      <animate attributeName="stroke-width" values="${VALUES}" dur="${DURATION}" repeatCount="indefinite"/>\n    </polygon>`;
const addedCount = (content.match(selfClosingPattern) || []).length;
content = content.replace(selfClosingPattern, selfClosingReplacement);

// Write back
fs.writeFileSync('triangle-fill.svg', content);

console.log(`✓ Updated ${updatedCount} existing animations`);
console.log(`✓ Added ${addedCount} new animations`);
console.log(`✓ Settings: values="${VALUES}" dur="${DURATION}"`);

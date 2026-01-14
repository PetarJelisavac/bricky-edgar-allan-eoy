const fs = require('fs');
const path = require('path');

// Configuration
const inputFile = process.argv[2] || '../src/assets/images/BackSide.svg';
const outputFile = process.argv[3] || '../src/components/bricks/BackSide.tsx';
const componentName = process.argv[4] || 'BackSide';

// Color mappings
const colorMappings = {
  '#0080FF': 'primary',
  '#005FBE': 'secondary', 
  '#006DDA': 'tertiary',
  '#169AFF': 'highlight'
};

// Read SVG file
const svgPath = path.resolve(__dirname, inputFile);
const outputPath = path.resolve(__dirname, outputFile);

let svgContent = fs.readFileSync(svgPath, 'utf8');

// Extract SVG attributes and inner content
const svgMatch = svgContent.match(/<svg([^>]*)>([\s\S]*)<\/svg>/i);
if (!svgMatch) {
  console.error('Could not parse SVG file');
  process.exit(1);
}

const svgAttributes = svgMatch[1];
let innerContent = svgMatch[2];

// Replace colors with variable references
for (const [hexColor, varName] of Object.entries(colorMappings)) {
  // Replace fill="color" with fill={varName}
  const fillRegex = new RegExp(`fill="${hexColor}"`, 'gi');
  innerContent = innerContent.replace(fillRegex, `fill={${varName}}`);
  
  // Replace stroke="color" with stroke={varName}
  const strokeRegex = new RegExp(`stroke="${hexColor}"`, 'gi');
  innerContent = innerContent.replace(strokeRegex, `stroke={${varName}}`);
}

// Generate TSX component
const tsxContent = `// ${componentName} LEGO Brick Component
import type { BrickColorPalette } from '../../store/buildStore';

interface ${componentName}Props {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}

function ${componentName}({ style, colorPalette }: ${componentName}Props) {
  const primary = colorPalette?.primary || '#0080FF';
  const secondary = colorPalette?.secondary || '#005FBE';
  const tertiary = colorPalette?.tertiary || '#006DDA';
  const highlight = colorPalette?.highlight || '#169AFF';

  return (
    <svg${svgAttributes} style={style}>${innerContent}</svg>
  );
}

export default ${componentName};
`;

// Write output file
fs.writeFileSync(outputPath, tsxContent, 'utf8');
console.log(`Successfully converted ${inputFile} to ${outputFile}`);
console.log(`Component name: ${componentName}`);

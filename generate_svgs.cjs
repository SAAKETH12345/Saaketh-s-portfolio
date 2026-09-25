const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const svgs = {
  'project-1.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#000000"/>
    <g stroke="#0047ff" stroke-width="2" fill="none">
      ${Array.from({length: 50}).map(() => {
        const x1 = Math.random() * 800;
        const y1 = Math.random() * 600;
        const x2 = x1 + (Math.random() * 200 - 100);
        const y2 = y1 + (Math.random() * 200 - 100);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />
                <circle cx="${x1}" cy="${y1}" r="3" fill="#ffffff"/>`;
      }).join('')}
    </g>
  </svg>`,
  
  'project-2.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#000000"/>
    ${Array.from({length: 15}).map((_, i) => {
      const size = 600 - (i * 35);
      return `<rect x="${400 - size/2}" y="${300 - size/2}" width="${size}" height="${size}" 
              fill="none" stroke="${i % 2 === 0 ? '#0047ff' : '#ffffff'}" stroke-width="${3 + (i%3)}" 
              transform="rotate(${i * 5} 400 300)"/>`;
    }).join('')}
  </svg>`,
  
  'project-3.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#0047ff"/>
    <rect x="50" y="50" width="700" height="500" fill="none" stroke="#ffffff" stroke-width="4"/>
    <rect x="50" y="50" width="700" height="80" fill="#ffffff"/>
    <rect x="80" y="160" width="200" height="360" fill="none" stroke="#ffffff" stroke-width="4"/>
    <rect x="310" y="160" width="410" height="160" fill="none" stroke="#000000" stroke-width="4"/>
    <rect x="310" y="350" width="410" height="170" fill="#000000"/>
    <circle cx="100" cy="90" r="15" fill="#000000"/>
    <circle cx="140" cy="90" r="15" fill="#000000"/>
    <circle cx="180" cy="90" r="15" fill="#000000"/>
  </svg>`,
  
  'project-4.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#000000"/>
    <rect x="250" y="150" width="300" height="300" fill="none" stroke="#ffffff" stroke-width="8"/>
    <rect x="300" y="200" width="200" height="200" fill="#0047ff"/>
    <g stroke="#ffffff" stroke-width="4">
      ${Array.from({length: 10}).map((_, i) => `<line x1="${250 + i*30}" y1="150" x2="${250 + i*30}" y2="50" />`).join('')}
      ${Array.from({length: 10}).map((_, i) => `<line x1="${250 + i*30}" y1="450" x2="${250 + i*30}" y2="550" />`).join('')}
      ${Array.from({length: 10}).map((_, i) => `<line x1="150" y1="${150 + i*30}" x2="250" y2="${150 + i*30}" />`).join('')}
      ${Array.from({length: 10}).map((_, i) => `<line x1="550" y1="${150 + i*30}" x2="650" y2="${150 + i*30}" />`).join('')}
    </g>
  </svg>`,
  
  'project-5.svg': `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#000000"/>
    <g fill="none" stroke="#0047ff" stroke-width="3">
      <path d="M400,50 L400,150 L200,150 L200,250" />
      <path d="M400,150 L600,150 L600,250" />
      <path d="M200,250 L200,350 L100,350 L100,450" />
      <path d="M200,350 L300,350 L300,450" />
      <path d="M600,250 L600,350 L500,350 L500,450" />
      <path d="M600,350 L700,350 L700,450" />
    </g>
    <g fill="#ffffff">
      <rect x="350" y="50" width="100" height="40" />
      <rect x="150" y="250" width="100" height="40" />
      <rect x="550" y="250" width="100" height="40" />
      <rect x="50" y="450" width="100" height="40" />
      <rect x="250" y="450" width="100" height="40" />
      <rect x="450" y="450" width="100" height="40" />
      <rect x="650" y="450" width="100" height="40" />
    </g>
  </svg>`
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(publicDir, filename), content);
}
console.log('SVGs generated successfully.');

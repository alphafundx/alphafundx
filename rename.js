const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else {
            const ext = path.extname(file);
            // Ignore images or other binaries
            const validExts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.json', '.env', '.example', ''];
            if ((validExts.includes(ext) || file.endsWith('plan')) && !file.endsWith('package-lock.json')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('c:/Users/aetes/Documents/Projects/alphafundx');
let updatedCount = 0;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content.replace(/AlphaFundX/g, 'AlphaFundX')
                                .replace(/alphafundx/g, 'alphafundx')
                                .replace(/ALPHAFUNDX/g, 'ALPHAFUNDX');
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
            updatedCount++;
        }
    } catch (e) {
        // skip files that can't be read as utf8 text
    }
});

console.log(`Finished. Updated ${updatedCount} files.`);

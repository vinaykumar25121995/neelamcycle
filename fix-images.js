const fs = require('fs');
const path = require('path');

const filesToProcess = ['index.html', 'about.html', 'products.html', 'dealership.html', 'style.css'];
const imagesDir = path.join(__dirname, 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

filesToProcess.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Regex to match file:/// paths
    const regex = /file:\/\/\/(C:\/Users\/HP\/\.gemini\/antigravity\/brain\/[^"'\s\)]+\.(png|jpg|jpeg|svg|gif|webp))/gi;
    
    content = content.replace(regex, (match, p1) => {
        const localPath = p1.replace(/\//g, '\\');
        const fileName = path.basename(localPath);
        const destPath = path.join(imagesDir, fileName);

        if (fs.existsSync(localPath)) {
            fs.copyFileSync(localPath, destPath);
            console.log(`Copied ${fileName}`);
        } else {
            console.log(`File not found: ${localPath}`);
        }

        modified = true;
        return `images/${fileName}`;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated paths in ${file}`);
    }
});

import fs from 'fs';
const content = fs.readFileSync('c:\\Users\\della\\OneDrive\\Escritorio\\seogrowthers\\Nueva carpeta\\Nueva carpeta\\horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2\\src\\pages\\blog\\CreatePostPage.jsx', 'utf8');

const tags = [];
const regex = /<(\/?[a-zA-Z0-9]+|[\/]?)/g;
let match;

// Very simple tag parser
let inString = false;
let stringChar = '';

for (let i = 0; i < content.length; i++) {
    if ((content[i] === '"' || content[i] === "'" || content[i] === '`') && content[i-1] !== '\\') {
        if (!inString) {
            inString = true;
            stringChar = content[i];
        } else if (stringChar === content[i]) {
            inString = false;
        }
    }

    if (!inString && content[i] === '<') {
        let tag = '';
        let j = i + 1;
        while (content[j] && content[j] !== ' ' && content[j] !== '>' && content[j] !== '\n') {
            tag += content[j];
            j++;
        }
        
        // Skip comments and fragments
        if (tag === '!--') continue;
        
        // Check if self-closing
        let isSelfClosing = false;
        let k = i;
        while (content[k] && content[k] !== '>') {
             if (content[k] === '/' && content[k+1] === '>') {
                 isSelfClosing = true;
                 break;
             }
             k++;
        }

        if (isSelfClosing) {
            // console.log(`Self closing: <${tag}/>`);
        } else if (tag.startsWith('/')) {
            tags.push({ name: tag.substring(1) || 'Fragment', type: 'close', line: content.substring(0, i).split('\n').length });
        } else {
            tags.push({ name: tag || 'Fragment', type: 'open', line: content.substring(0, i).split('\n').length });
        }
    }
}

const stack = [];
for (const tag of tags) {
    if (tag.type === 'open') {
        stack.push(tag);
    } else {
        const last = stack.pop();
        if (!last || last.name !== tag.name) {
            console.log(`Mismatch: open <${last ? last.name : 'NONE'}> at line ${last ? last.line : '?'}, close </${tag.name}> at line ${tag.line}`);
        }
    }
}

if (stack.length > 0) {
    console.log(`Unclosed tags: ${stack.map(t => `<${t.name}> at line ${t.line}`).join(', ')}`);
} else {
    console.log("Tags are balanced!");
}

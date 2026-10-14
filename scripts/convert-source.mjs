import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2];
if (!source) throw new Error('Pass the original portfolio HTML path.');
const document = parse(readFileSync(source, 'utf8'));
const find = (node, tag) => node.tagName === tag ? node : (node.childNodes || []).map(child => find(child, tag)).find(Boolean);
const body = find(document, 'body');
const style = find(document, 'style');
writeFileSync(resolve(root, 'src/original.css'), style.childNodes.map(node => node.value || '').join(''));

const names = { hero: 'Hero', about: 'About', approach: 'Approach', programmes: 'Programmes', speaking: 'Speaking', testimonials: 'Testimonials', work: 'Work' };
const voidTags = new Set(['img', 'br', 'input', 'hr', 'meta', 'link']);
const attributes = { class: 'className', for: 'htmlFor', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', tabindex: 'tabIndex' };
let imageCount = 0;

function jsx(node) {
  if (node.nodeName === '#text') return node.value.trim() ? `{${JSON.stringify(node.value)}}` : '\n';
  if (!node.tagName) return '';
  let attrs = [...node.attrs];
  if (node.tagName === 'img') {
    const src = attrs.find(attr => attr.name === 'src');
    if (src?.value.startsWith('data:')) {
      const match = src.value.match(/^data:image\/(png|jpeg|webp);base64,(.*)$/s);
      if (!match) throw new Error('Unsupported embedded image');
      const filename = `${imageCount++ === 0 ? 'ida-portrait' : 'ida-coaching'}.${match[1] === 'jpeg' ? 'jpg' : match[1]}`;
      writeFileSync(resolve(root, 'public/images', filename), Buffer.from(match[2], 'base64'));
      src.value = `/images/${filename}`;
    }
    attrs.push({ name: 'loading', value: imageCount === 1 ? 'eager' : 'lazy' });
    attrs.push({ name: 'decoding', value: 'async' });
  }
  if (attrs.some(attr => attr.name === 'target' && attr.value === '_blank')) attrs.push({ name: 'rel', value: 'noopener noreferrer' });
  if (node.tagName === 'a') {
    const href = attrs.find(attr => attr.name === 'href');
    const label = attrs.find(attr => attr.name === 'aria-label');
    if (href?.value === '#' && label) {
      // The source does not provide social profile URLs; link to the contact section.
      href.value = '#contact';
      label.value = `Enquire about ${label.value}`;
    } else if (href?.value === '#') href.value = '#approach';
  }
  const renderedAttrs = attrs.map(({ name, value }) => {
    if (name === 'style') {
      const declarations = Object.fromEntries(value.split(';').filter(item => item.trim()).map(item => {
        const colon = item.indexOf(':');
        const key = item.slice(0, colon).trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return [key, item.slice(colon + 1).trim()];
      }));
      return ` style={${JSON.stringify(declarations)}}`;
    }
    return ` ${attributes[name] || name}={${JSON.stringify(value)}}`;
  }).join('');
  if (voidTags.has(node.tagName)) return `<${node.tagName}${renderedAttrs} />`;
  return `<${node.tagName}${renderedAttrs}>${(node.childNodes || []).map(jsx).join('')}</${node.tagName}>`;
}

const sections = body.childNodes.filter(node => node.tagName && node.tagName !== 'nav' && node.tagName !== 'script' && !node.attrs.some(attr => attr.name === 'id' && attr.value === 'contact'));
const components = sections.map(node => {
  const id = node.attrs.find(attr => attr.name === 'id')?.value;
  const name = node.tagName === 'footer' ? 'Footer' : names[id] || 'Stats';
  return `export function ${name}() {\n  return (\n${jsx(node)}\n  );\n}\n`;
});
writeFileSync(resolve(root, 'src/components/PortfolioSections.jsx'), components.join('\n'));
console.log(`Converted ${components.length} sections and extracted ${imageCount} original images.`);

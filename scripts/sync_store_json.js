const fs = require('fs');

const tsContent = fs.readFileSync('src/data/initialStore.ts', 'utf8');
// remove import and type annotation
const jsContent = tsContent
  .replace("import { AppStoreData } from '@/types';", "")
  .replace(": AppStoreData", "")
  .replace("export const initialStoreData", "exports.initialStoreData");

const mod = {};
const fn = new Function('exports', jsContent + '\nreturn exports.initialStoreData;');
const data = fn(mod);

fs.writeFileSync('data/store.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully wrote data/store.json with', data.products.length, 'products and', data.categories.length, 'categories!');

const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('zesto_menu_data.json', 'utf8'));
const cateList = raw.data.cate_list;

const allItems = [];
for (const cat of cateList) {
  console.log('\n========================================');
  console.log('CATEGORY:', cat.cate_name, '(items:', (cat.item_info || []).length, ')');
  for (const item of (cat.item_info || [])) {
    const price = (item.selling_price / 100).toFixed(2);
    console.log(' - [' + item.item_name + '] -> R$ ' + price + ' | Img: ' + (item.item_picture ? 'YES' : 'NO'));
    if (item.item_desc) console.log('   Desc: ' + item.item_desc);
    allItems.push({
      category: cat.cate_name,
      name: item.item_name,
      price: Number(price),
      desc: item.item_desc || '',
      img: item.item_picture || ''
    });
  }
}
console.log('\nTOTAL ITEMS FOUND:', allItems.length);
fs.writeFileSync('all_zesto_items.json', JSON.stringify(allItems, null, 2));

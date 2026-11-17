const fs = require('fs');

async function check() {
  const code = await fetch('https://img0.didiglobal.com/static/soda_static/c/food-saas-cfe-trans/js/index.377049af.js').then(r => r.text());
  let idx = 0;
  while ((idx = code.indexOf('menu-api.zesto.menu', idx + 1)) !== -1) {
    console.log('Snippet at', idx, ':', code.substring(idx - 100, idx + 200));
  }
}
check();

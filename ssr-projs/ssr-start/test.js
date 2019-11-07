const fs = require('fs')

const tpl = fs.readFileSync('./index.template.html', 'utf-8');
console.log(tpl)

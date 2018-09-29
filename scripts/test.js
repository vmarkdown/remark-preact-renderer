const unified = require('unified');
const parse = require('remark-parse');
const vfile = require('to-vfile');
const renderer = require('../src/renderer');
const { h } = require('preact');
const pretty = require('pretty');

const processor = unified()
    .use(parse, {
        footnotes: true
    }) //md => MDAST
    .use(require('remark-render'), { h:h, renderer:renderer }); //MDAST => Vdom

const file = vfile.readSync('test.md');

const vdom = processor.processSync(file).contents;
// console.log(vdom);

const render = require('preact-render-to-string');
// const html = render(vdom);
// console.log(pretty(html));


const mdast = processor.runSync(processor.parse(file));

console.log(JSON.stringify(mdast,null,2));
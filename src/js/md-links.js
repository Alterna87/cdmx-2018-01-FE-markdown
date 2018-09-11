const fs = require('fs');
const marked = require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const resolve = require('path').resolve;
const fetch = require("node-fetch");


const validateRoute = (path) => {
return path = resolve(path);

}

const mdLink = (path, options, err) => {
// Retornaremos una promesa con la función

return new Promise((resolve, reject) => {
    if (err) reject()
    else {
    resolve();
    const data = fs.readFileSync(path, 'utf8');
    const tokens = marked.lexer(data);
    const html = marked.parser(tokens);
    const dom = new JSDOM(html);
    let links = dom.window.document.querySelectorAll('a');
    let dataLinks = {};
    let arrayData = [];
    for (let i = 0; i < links.length; i++) {
        dataLinks = {
        href : links[i].href,
        text: links[i].textContent,
        file: path
      }
      arrayData.push(dataLinks);
      }
      //
      // console.log(arrayData);
      validateLink(arrayData);
  }
});
};

const validateLink =(arrayData,err)=> {
for (var i = 0; i < arrayData.length; i++) {
fetch(`${arrayData[i].href}`)
.then(res => {
  console.log(res.status)


});
};
}


module.exports = {
  mdLink,
  validateRoute
}

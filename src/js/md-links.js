const fs = require('fs');
const marked = require('marked');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const resolve = require('path').resolve;
const fetch = require("node-fetch");

const validateRoute = (path, option = false) => {
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

      if (options.validate) {

        console.log(validateLink(arrayData));

      } else {
        console.log(arrayData);
      }
      //
      // console.log(arrayData);

  }
});
};

// Funcion que que retorna : => [{ href, text, file, status, ok }]
const validateLink =(arrayData) => {
  let linksStatus = arrayData.map(obj => {
       return Object.defineProperty(obj, 'status', {
         value: '',
         writable: true,
         enumerable: true,
         configurable: true
       });
});
linksStatus.forEach(link => {
fetch(link.href)
.then(res => {
  if (res.status === 200) {
    link.status = res.statusText;
    console.log(link);
  }

});


});

}


module.exports = {
  mdLink,
  validateRoute
}

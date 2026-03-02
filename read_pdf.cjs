const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/Users/LENOVO/Downloads/evolvix-ai-threejs-website/Evolvix_Content/screencapture-pagespeed-web-dev-analysis-https-evolvix-ae-smvyts53ec-2026-03-02-02_33_05.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(e => console.error(e));

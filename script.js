const { ipcRenderer } = require("electron");

const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});
ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});


function closeNotification() {
  notification.classList.add('hidden');
}
function restartApp() {
  ipcRenderer.send('restart_app');
}






var html_code = document.querySelector('.html-code textarea')
var css_code = document.querySelector('.css-code textarea')
var javascript_code = document.querySelector('.javascript-code textarea')
var result = document.querySelector('#result');
var a = document.querySelector('a');

let finalhtml = html_code.value;
let finalcss = css_code.value;
let finaljs = javascript_code.value;



function run(){
    localStorage.setItem('html_code', html_code.value);
    localStorage.setItem('css_code', css_code.value);
    localStorage.setItem('javascript_code', javascript_code.value);
    result.contentDocument.body.innerHTML = `<style>${css_code.value}</style>` + html_code.value;
    result.contentWindow.eval(javascript_code.value)
};
html_code.value = localStorage.html_code;
css_code.value = localStorage.css_code;
javascript_code.value = localStorage.javascript_code;







let data = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    ${css_code.value}
  </style>
</head>
<body>
  ${html_code.value}





  <script>
    ${javascript_code.value}
  </script>
</body>
</html>`

let blob = new Blob([ data ], {type: "octet-stream"})
let href = URL.createObjectURL(blob);





a.onclick = function(){
    
    Object.assign(this,{
        href,
        download: "index.html"
    })

}
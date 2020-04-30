let date = new Date();

let time = date.getHours()

console.log(time);

if(time < 7 || time >= 19){
  document.getElementById('styleizedWebpage').innerHTML = `<link href="./etc/css/night.css" rel="stylesheet" type="text/css">`
}

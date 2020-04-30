// This script is for the purpose of changing the css Style Sheet on a webpage,
// by adding/changing a linked style sheet. The id convention for this script is
// to have the file paths for the style sheets in an array and use the index to
// indicate which one. The id which will be selected upon loading will be stored
// in the browsers localStorage under the value "StyleLock". -1 is used to
// indicate an unlocked State where the script will select the style applied
// based on addtional context, any other value will have that style Sheet
// selected so long as the index is valid (The array reaches that point).
// This script requires the inclusion of an html element with an id that matches
// the value for the varriable 'StyleObjectId', whose contents will be replaced
// with link tag which calls the selected css file.

//varriables
let StyleObjectId = 'styleizedWebpage'
let defaultStyle = 0;
let StylesArray = ['./etc/css/plain.css','./etc/css/day.css','./etc/css/night.css'];
let StylesIconArray = ['1F4D6;', '2600;', '1F315;']
let lockSymbol = '1F512'

//1F512

//Script to run on load
startupStyleSelection();

function startupStyleSelection(){

  //Check that localStorage works in Browser
  if(typeof(window.localStorage) !== "undefined"){

    // If this value does exist use it, otherwise create it
    if(window.localStorage.getItem("StyleLock") != null){

      if(window.localStorage.getItem("StyleLock") < 0){
        switchStyle(contextStyleSelection());

      } else {
        switchStyle(window.localStorage.getItem("StyleLock"));
      }

    } else {
      //Inintialize value to be the defaultStyle;
      window.localStorage.setItem('StyleLock', defaultStyle);
    }
  }
}

window.onload = function(){

  iconLockOnLoad();

}

function iconLockOnLoad(){

  let index = localStorage.getItem('StyleLock');
  if(index != -1){
    document.getElementById(`StyleButton${index}`).innerHTML = `&#x${lockSymbol}`;
  }

}

function switchStyle(index){

  try {

    if ((StylesArray.length - 1) < index || index < 0){
      index = 0;
    }

    console.log(index)

    if(index != 0){
      document.getElementById(StyleObjectId).innerHTML = `<link href="${StylesArray[index]}" rel="stylesheet" type="text/css">`
    } else {
      document.getElementById(StyleObjectId).innerHTML = ``
    }
  }
  catch(e) {
    console.log(e)
  }

}

function lockStyle(index){

  if(window.localStorage.getItem("StyleLock") == index){
    unlockStyle();
    document.getElementById(`StyleButton${index}`).innerHTML = `&#x${StylesIconArray[index]}`;

  } else {

    let oldIndex = window.localStorage.getItem('StyleLock');

    if(oldIndex != -1){
      document.getElementById(`StyleButton${oldIndex}`).innerHTML = `&#x${StylesIconArray[oldIndex]}`;
    }

    window.localStorage.setItem('StyleLock', index);
    document.getElementById(`StyleButton${index}`).innerHTML = `&#x${lockSymbol}`;

    switchStyle(index);
  }
}


function unlockStyle(){
  window.localStorage.setItem('StyleLock', -1);
}

function contextStyleSelection(){

  let date = new Date();
  let time = date.getHours()

  console.log(time);

  if (time >= 7 && time < 19) {
    return 1
  } else if(time < 7 || time >= 19){
    return 2
  } else {
    return 0
  }

}

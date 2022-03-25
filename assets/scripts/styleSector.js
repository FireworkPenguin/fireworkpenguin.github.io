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
let defaultStyle = contextStyleSelection();
let StylesArray = [
  {iconname:"plain", iconActive:"1F512", iconDeactive:"23F0", associatedStyleSheet:"/assets/css/themes/plain.css"},
  {iconname:"day",   iconActive:"1F33B", iconDeactive:"1F331", associatedStyleSheet:"/assets/css/themes/day.css"},
  {iconname:"night", iconActive:"1F315", iconDeactive:"1F311", associatedStyleSheet:"/assets/css/themes/night.css"}
]
let currentStyle = 0;

//Script to run on load

function startupStyleSelection(){

  //Check that localStorage works in Browser
  if(typeof(window.localStorage) !== "undefined"){

    // If this value does exist use it, otherwise create it
    if(localStorage.getItem('StyleLock') == null){

      window.localStorage.setItem('StyleLock', -1);
      currentStyle = defaultStyle;

    } else {

      try {

        currentStyle = parseInt(window.localStorage.getItem("StyleLock"));

      } catch(e) {

        console.log(e);
        currentStyle = defaultStyle;

      }
    }

    if(currentStyle <= 0){
      
      currentStyle = contextStyleSelection();

    }

  }}

window.onload = function(){
  startupStyleSelection();
  switchStyle(currentStyle);
  iconLockOnLoad();
}

function iconLockOnLoad(){

  let styleNum = localStorage.getItem('StyleLock');
  if(styleNum != -1){
    document.getElementById(`StyleButton0`).innerHTML = `&#x${StylesArray[0].iconActive}`;
  }

}

function switchStyle(index){

  try {

    //Bonds Check
    if (StylesArray.length < index || index < 0){
      currentStyle = defaultStyle;
    } else {
      currentStyle = index;
    }

    //Toggle the Active/Inactive status for each theme
    for (let x = 1; x <  StylesArray.length; x++){

      if(x == currentStyle){
        //Change Style Sheets
        document.getElementById(StyleObjectId).innerHTML = `<link href="${StylesArray[x].associatedStyleSheet}" rel="stylesheet" type="text/css">`
        document.getElementById(`StyleButton${x}`).innerHTML = `&#x${StylesArray[x].iconActive}`;

      } else {
        document.getElementById(`StyleButton${x}`).innerHTML = `&#x${StylesArray[x].iconDeactive}`;
      }

    }

  }
  catch(e) {
    console.log(e)
  }
}

function switchStyleButton(index){

  console.log(index);

  //If locked ignore
  if(localStorage.getItem('StyleLock') > 0)
    return;
  
  switchStyle(index);

}

function lockStyleToggle(){

  //Remove the lock, switch theme
  if(window.localStorage.getItem("StyleLock") > 0){
    unlockStyle();
  } 
  //Add the Lock
  else {
    lockStyle();

  }
}

function lockStyle(){
  document.getElementById(`StyleButton0`).innerHTML = `&#x${StylesArray[0].iconActive}`;
  window.localStorage.setItem('StyleLock', currentStyle);
}

function unlockStyle(){
  document.getElementById(`StyleButton0`).innerHTML = `&#x${StylesArray[0].iconDeactive}`;
  window.localStorage.setItem('StyleLock', -1);
}

function resetStyle(){
  unlockStyle();
  currentStyle = contextStyleSelection();
  switchStyle(currentStyle);
}

function contextStyleSelection(){

  let date = new Date();
  let time = date.getHours()



  if (time >= 7 && time < 19) {
    return 1
  } else if(time < 7 || time >= 19){
    return 2
  } else {
    return 0
  }

}

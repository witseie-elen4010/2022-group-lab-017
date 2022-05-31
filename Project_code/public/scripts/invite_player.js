function getOption () {
  selectElement = document.querySelector('#select1')
  output = selectElement.options[selectElement.selectedIndex].text
  outputText = 'Waiting for ' + output + ' to connect....'
  if (output == '') {
    outputText = ' '
  }
  document.querySelector('.invitePlayer').textContent = outputText
  console.log(output)
}
const path = require('path')
const express = require('express')
var app = express();

function getOption(){
    selectElement = document.querySelector('#select1');
    output = selectElement.options[selectElement.selectedIndex].text;
    /*outputText = "Waiting for " + output + " to connect....";
    if(output == "")
    {
        outputText = " ";
    }
        document.querySelector('.invitePlayer').textContent = outputText;
    
        //inviteBtn = document.createElement("button");
        //inviteBtn.innerHTML = "Invite " + output;
        //document.body.appendChild(inviteBtn); 
    */
    button = document.getElementById('singlePlayer');
    button.innerHTML = "Invite " + output;
}

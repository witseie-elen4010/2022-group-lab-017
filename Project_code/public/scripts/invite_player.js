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

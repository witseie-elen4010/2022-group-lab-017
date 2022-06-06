// All functions are called into this folder to avoid common problems of exporting functions

function isEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function validRoom (RoomID) {
  if (RoomID.length === 4) { return 'validRoom' } else { return 'InvalidRoom' }
}

function informationChecker (Username, RoomID) {
  if (Username === '' || RoomID === '') {
    return 'Please entre all information required to join a room'
  } else {
    return Username + '  Has successfully joined a valid room with room ID ' + RoomID
  }
}

module.exports = {
  method1: isEmail,
  method2: validRoom,
  method3: informationChecker
}

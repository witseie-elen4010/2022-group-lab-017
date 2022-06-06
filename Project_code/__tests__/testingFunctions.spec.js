'use strict'
/* eslint-env jest */
const myModule = require('../public/scripts/testingFunctions.js')
const isEmail = myModule.method1
const isValidRoom = myModule.method2
const informationChecker = myModule.method3

describe('Email validation testing', () => {
  test('valid email entered', () => {
    const email = 'goodwill.phooko@gmail.com'
    const result = true
    expect(isEmail(email)).toEqual(result)
  })

  test('invalid email entered', () => {
    const email = 'goodwill.phooko.com'
    const result = false
    expect(isEmail(email)).toEqual(result)
  })
})

describe('from index and client side in joining rooms ', () => {
  //
  test('Returns invalid room aftter recivieving stribg length of greater than 5', () => {
    const RoomID = '0x985146698523'
    const output = 'InvalidRoom'
    expect(isValidRoom(RoomID)).toEqual(output)
  })

  test('Returns invalid room aftter recivieving stribg length of equal to 4', () => {
    const RoomID = '0x74'
    const output = 'validRoom'
    expect(isValidRoom(RoomID)).toEqual(output)
  })
})

describe('From game-2.js,game_3.js when connecting to server and data base', () => {
  test('Both username and roomID are empty', () => {
    const Username = ''
    const RoomID = ''
    const result = 'Please entre all information required to join a room'
    expect(informationChecker(Username, RoomID)).toEqual(result)
  })
  test('Only username is empty', () => {
    const Username = ''
    const RoomID = '11X9'
    const result = 'Please entre all information required to join a room'
    expect(informationChecker(Username, RoomID)).toEqual(result)
  })
  test('Only RoomID is empty', () => {
    const Username = 'someUsername'
    const RoomID = ''
    const result = 'Please entre all information required to join a room'
    expect(informationChecker(Username, RoomID)).toEqual(result)
  })
  test('Both username and roomID are entered', () => {
    const Username = 'someUsername'
    const RoomID = '0x98'
    const result = Username + '  Has successfully joined a valid room with room ID ' + RoomID
    expect(informationChecker(Username, RoomID)).toEqual(result)
  })
})

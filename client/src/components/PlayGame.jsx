import React, { useState, useContext, useEffect } from 'react'
import { GameContext } from '../components'
import styled from 'styled-components'

const WrapperGen = styled.div
`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`
const Title = styled.h1.attrs({ className: 'h1' })
``
const PileCard = styled.button.attrs({ className: 'btn btn-success' })
``
const PickCard = styled.button.attrs({ className: 'btn btn-primary' })
``
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row border border-primary" })
`
  padding: 20px 20px 20px 20px;
`
const ContainerColumn = styled.div.attrs({ className: "d-flex flex-column border border-primary" })
`
  padding: 20px 20px 20px 20px;
`
const PUno = styled.p.attrs({ className: 'text-danger' })
``
const DivUno = styled.div.attrs({ className: 'text-danger' })
``
const PMe = styled.p.attrs({ className: 'text-success' })
``
const DivMe = styled.div.attrs({ className: 'text-success' })
``
const DivLastCard = styled.div.attrs({ className: 'text-primary' })
``

const DivCardExt = styled.div.attrs({ className:"d-flex justify-content-center align-items-center border border-dark rounded" })
`
  width: 125px;
  height: 200px;
`
const DivCardCirBigWhite = styled.div.attrs({ className:"rounded-circle bg-light" })
`
  width: 85px;
  height: 160px;
  transform: rotate(30deg);
  position: relative;
  top: 0px;
  left: -5px;
`
const DivCardCirLitWhite = styled.div.attrs({ className:"rounded-circle bg-light" })
`
  width: 15px;
  height: 27px;
  transform: rotate(30deg);
  position: relative;
  top: -75px;
  left: 5px;
`
const DivCardCirLitRed = styled.div.attrs({ className:"rounded-circle bg-danger" })
`
  width: 15px;
  height: 27px;
  transform: rotate(30deg);
  position: relative;
  top: -75px;
  left: 5px;
`
const DivCardCirLitYellow = styled.div.attrs({ className:"rounded-circle bg-warning" })
`
  width: 15px;
  height: 27px;
  transform: rotate(30deg);
  position: relative;
  top: -75px;
  left: 5px;
`
const DivCardCirLitGreen = styled.div.attrs({ className:"rounded-circle bg-success" })
`
  width: 15px;
  height: 27px;
  transform: rotate(30deg);
  position: relative;
  top: -75px;
  left: 5px;
`
const DivCardCirLitBlue = styled.div.attrs({ className:"rounded-circle bg-primary" })
`
  width: 15px;
  height: 27px;
  transform: rotate(30deg);
  position: relative;
  top: -75px;
  left: 5px;
`
const DivCardLitNumber = styled.div.attrs({ className:"text-light font-weight-bold font-italic" })
`
  font-size: 20px;
  position: relative;
  top: -80px;
  left: 0px;
  text-shadow: 2px 2px 2px #000000;
`
const DivCardExtRed = styled.div.attrs({ className:"d-flex justify-content-center align-items-center rounded bg-danger" })
`
  width: 105px;
  height: 180px;
`
const DivCardBigNumberRed = styled.div.attrs({ className:"text-danger font-weight-bold font-italic" })
`
  font-size: 80px;
  position: relative;
  top: 0px;
  left: 10px;
  text-shadow: 2px 2px 2px #000000;
  transform: rotate(-30deg);
`
const DivCardExtYellow = styled.div.attrs({ className:"d-flex justify-content-center align-items-center rounded bg-warning" })
`
  width: 105px;
  height: 180px;
`
const DivCardBigNumberYellow = styled.div.attrs({ className:"text-warning font-weight-bold font-italic" })
`
  font-size: 80px;
  position: relative;
  top: 0px;
  left: 10px;
  text-shadow: 2px 2px 2px #000000;
  transform: rotate(-30deg);
`
const DivCardExtGreen = styled.div.attrs({ className:"d-flex justify-content-center align-items-center rounded bg-success" })
`
  width: 105px;
  height: 180px;
`
const DivCardBigNumberGreen = styled.div.attrs({ className:"text-success font-weight-bold font-italic" })
`
  font-size: 80px;
  position: relative;
  top: 0px;
  left: 10px;
  text-shadow: 2px 2px 2px #000000;
  transform: rotate(-30deg);
`
const DivCardExtBlue = styled.div.attrs({ className:"d-flex justify-content-center align-items-center rounded bg-primary" })
`
  width: 105px;
  height: 180px;
`
const DivCardBigNumberBlue = styled.div.attrs({ className:"text-primary font-weight-bold font-italic" })
`
  font-size: 80px;
  position: relative;
  top: 0px;
  left: 10px;
  text-shadow: 2px 2px 2px #000000;
  transform: rotate(-30deg);
`
const DivCardExtWild = styled.div.attrs({ className:"d-flex justify-content-center align-items-center rounded bg-dark" })
`
  width: 105px;
  height: 180px;
`
const DivCardBigNumberWild = styled.div.attrs({ className:"text-dark font-weight-bold font-italic" })
`
  font-size: 80px;
  position: relative;
  top: 0px;
  left: 10px;
  text-shadow: 2px 2px 2px #000000;
  transform: rotate(-30deg);
`
const DivCardWildColorLit = styled.div.attrs({  })
`
  width: 13px;
  height: 13px;
  display: block;
  border-radius: 50%;
  background-color: black;
  border-style: solid;
  border-width: 6px 6px 6px 6px;
  border-color: red yellow blue green;
  position: relative;
  top: 7px;
  left: 1px;
  transform: scaleY(1.95);
`
const DivCardWildColorBig = styled.div.attrs({  })
`
  width: 75px;
  height: 75px;
  display: block;
  border-radius: 50%;
  background-color: black;
  border-style: solid;
  border-width: 37px 37px 37px 37px;
  border-color: red yellow blue green;
  position: relative;
  top: 42px;
  left: 5px;
  transform: scaleY(1.95);
`
const DivCardDrawTwoBigRed = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: red;
`
const DivCardDrawTwoBigRed2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: red;
`
const DivCardDrawTwoBigYellow = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: yellow;
`
const DivCardDrawTwoBigYellow2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: yellow;
`
const DivCardDrawTwoBigGreen = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: green;
`
const DivCardDrawTwoBigGreen2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: green;
`
const DivCardDrawTwoBigBlue = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: blue;
`
const DivCardDrawTwoBigBlue2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: blue;
`
const DivCardDrawFourBigRed = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 15px;
  background-color: red;
`
const DivCardDrawFourBigYellow = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: -40px;
  left: 35px;
  background-color: yellow;
`
const DivCardDrawFourBigGreen = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: -60px;
  left: 30px;
  background-color: green;
`
const DivCardDrawFourBigBlue = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: -150px;
  left: 45px;
  background-color: blue;
`
const DivCardReverseBigRed = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 51px;
  left: 20px;
  background-color: red;
  transform: translate(0px, -45px);
`
const DivCardReverseBigRed2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: red;
  border-radius: 0% 0% 0% 50%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigRed3 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 25px;
  left: 40px;
  background-color: red;
  border-radius: 0% 50% 0% 0%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigRed4 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 24px;
  left: 40px;
  background-color: red;
  transform: translate(0px, -45px);
`
const DivCardReverseBigRedArrow = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 52px;
  left: 5px;
  border-right: 25px solid transparent;
  border-top: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: 25px solid red;
  transform: translate(0px, -45px);
`
const DivCardReverseBigRedArrow2 = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 23px;
  left: 26px;
  border-right: 25px solid transparent;
  border-top: 25px solid red;
  border-left: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellow = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 51px;
  left: 20px;
  background-color: yellow;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellow2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: yellow;
  border-radius: 0% 0% 0% 50%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellow3 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 25px;
  left: 40px;
  background-color: yellow;
  border-radius: 0% 50% 0% 0%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellow4 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 24px;
  left: 40px;
  background-color: yellow;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellowArrow = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 52px;
  left: 5px;
  border-right: 25px solid transparent;
  border-top: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: 25px solid yellow;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellowArrow2 = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 23px;
  left: 26px;
  border-right: 25px solid transparent;
  border-top: 25px solid yellow;
  border-left: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreen = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 51px;
  left: 20px;
  background-color: green;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreen2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: green;
  border-radius: 0% 0% 0% 50%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreen3 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 25px;
  left: 40px;
  background-color: green;
  border-radius: 0% 50% 0% 0%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreen4 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 24px;
  left: 40px;
  background-color: green;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreenArrow = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 52px;
  left: 5px;
  border-right: 25px solid transparent;
  border-top: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: 25px solid green;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreenArrow2 = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 23px;
  left: 26px;
  border-right: 25px solid transparent;
  border-top: 25px solid green;
  border-left: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlue = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 51px;
  left: 20px;
  background-color: blue;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlue2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: blue;
  border-radius: 0% 0% 0% 50%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlue3 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 25px;
  left: 40px;
  background-color: blue;
  border-radius: 0% 50% 0% 0%;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlue4 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 24px;
  left: 40px;
  background-color: blue;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlueArrow = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 52px;
  left: 5px;
  border-right: 25px solid transparent;
  border-top: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: 25px solid blue;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlueArrow2 = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 23px;
  left: 26px;
  border-right: 25px solid transparent;
  border-top: 25px solid blue;
  border-left: 25px solid transparent;
  border-bottom: 25px solid transparent;
  transform: translate(0px, -45px);
`
const DivCardReverseLit = styled.div.attrs({})
`
  width: 4px;
  height: 5px;
  position: relative;
  top: 41px;
  left: 4px;
  background-color: white;
  transform: translate(0px, -45px);
`
const DivCardReverseLit2 = styled.div.attrs({})
`
  width: 4px;
  height: 5px;
  position: relative;
  top: 40px;
  left: 4px;
  background-color: white;
  border-radius: 0% 0% 0% 50%;
  transform: translate(0px, -45px);
`
const DivCardReverseLit3 = styled.div.attrs({})
`
  width: 4px;
  height: 5px;
  position: relative;
  top: 35px;
  left: 7px;
  background-color: white;
  border-radius: 0% 50% 0% 0%;
  transform: translate(0px, -45px);
`
const DivCardReverseLit4 = styled.div.attrs({})
`
  width: 4px;
  height: 5px;
  position: relative;
  top: 34px;
  left: 7px;
  background-color: white;
  transform: translate(0px, -45px);
`
const DivCardReverseLitArrow = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 41px;
  left: 1px;
  border-right: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid white;
  transform: translate(0px, -45px);
`
const DivCardReverseLitArrow2 = styled.div.attrs({})
`
  width: 0;
  height: 0;
  position: relative;
  top: 34px;
  left: 4px;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
  border-left: 5px solid transparent;
  border-bottom: 5px solid transparent;
  transform: translate(0px, -45px);
`
const DivCardSkipLit = styled.div.attrs({})
`
  width: 15px;
  height: 15px;
  position: relative;
  border-radius: 50%;
  top: 5px;
  left: 0px;
  background-color: white;
`
const DivCardSkipLitRed2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: red;
`
const DivCardSkipLitYellow2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: yellow;
`
const DivCardSkipLitGreen2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: green;
`
const DivCardSkipLitBlue2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: blue;
`
const DivCardSkipLit3 = styled.div.attrs({})
`
  width: 3px;
  height: 14px;
  position: relative;
  top: -20px;
  left: 6px;
  background-color: white;
`
const DivCardSkipBigRed = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: red;
`
const DivCardSkipBig2 = styled.div.attrs({})
`
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  top: -10px;
  left: 22px;
  background-color: white;
`
const DivCardSkipBigRed3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: red;
`
const DivCardSkipBigYellow = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: yellow;
`
const DivCardSkipBigYellow3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: yellow;
`
const DivCardSkipBigGreen = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: green;
`
const DivCardSkipBigGreen3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: green;
`
const DivCardSkipBigBlue = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: blue;
`
const DivCardSkipBigBlue3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: blue;
`

const cardsOrder = [
  { c: 'red', n: 0, o: 1 },
  { c: 'yellow', n: 0, o: 1 },
  { c: 'green', n: 0, o: 1 },
  { c: 'blue', n: 0, o: 1 },

  { c: 'wild', n: 'c', o: 1 },
  { c: 'wild', n: 'c', o: 2 },
  { c: 'wild', n: 'c', o: 3 },
  { c: 'wild', n: 'c', o: 4 },

  { c: 'wild', n: '+4', o: 1 },
  { c: 'wild', n: '+4', o: 2 },
  { c: 'wild', n: '+4', o: 3 },
  { c: 'wild', n: '+4', o: 4 },

  { c: 'red', n: 1, o: 1 }, { c: 'red', n: 1, o: 2 },
  { c: 'yellow', n: 1, o: 1 }, { c: 'yellow', n: 1, o: 2 },
  { c: 'green', n: 1, o: 1 }, { c: 'green', n: 1, o: 2 },
  { c: 'blue', n: 1, o: 1 }, { c: 'blue', n: 1, o: 2 },

  { c: 'red', n: 2, o: 1 }, { c: 'red', n: 2, o: 2 },
  { c: 'yellow', n: 2, o: 1 }, { c: 'yellow', n: 2, o: 2 },
  { c: 'green', n: 2, o: 1 }, { c: 'green', n: 2, o: 2 },
  { c: 'blue', n: 2, o: 1 }, { c: 'blue', n: 2, o: 2 },

  { c: 'red', n: 3, o: 1 }, { c: 'red', n: 3, o: 2 },
  { c: 'yellow', n: 3, o: 1 }, { c: 'yellow', n: 3, o: 2 },
  { c: 'green', n: 3, o: 1 }, { c: 'green', n: 3, o: 2 },
  { c: 'blue', n: 3, o: 1 }, { c: 'blue', n: 3, o: 2 },

  { c: 'red', n: 4, o: 1 }, { c: 'red', n: 4, o: 2 },
  { c: 'yellow', n: 4, o: 1 }, { c: 'yellow', n: 4, o: 2 },
  { c: 'green', n: 4, o: 1 }, { c: 'green', n: 4, o: 2 },
  { c: 'blue', n: 4, o: 1 }, { c: 'blue', n: 4, o: 2 },

  { c: 'red', n: 5, o: 1 }, { c: 'red', n: 5, o: 2 },
  { c: 'yellow', n: 5, o: 1 }, { c: 'yellow', n: 5, o: 2 },
  { c: 'green', n: 5, o: 1 }, { c: 'green', n: 5, o: 2 },
  { c: 'blue', n: 5, o: 1 }, { c: 'blue', n: 5, o: 2 },

  { c: 'red', n: 6, o: 1 }, { c: 'red', n: 6, o: 2 },
  { c: 'yellow', n: 6, o: 1 }, { c: 'yellow', n: 6, o: 2 },
  { c: 'green', n: 6, o: 1 }, { c: 'green', n: 6, o: 2 },
  { c: 'blue', n: 6, o: 1 }, { c: 'blue', n: 6, o: 2 },

  { c: 'red', n: 7, o: 1 }, { c: 'red', n: 7, o: 2 },
  { c: 'yellow', n: 7, o: 1 }, { c: 'yellow', n: 7, o: 2 },
  { c: 'green', n: 7, o: 1 }, { c: 'green', n: 7, o: 2 },
  { c: 'blue', n: 7, o: 1 }, { c: 'blue', n: 7, o: 2 },

  { c: 'red', n: 8, o: 1 }, { c: 'red', n: 8, o: 2 },
  { c: 'yellow', n: 8, o: 1 }, { c: 'yellow', n: 8, o: 2 },
  { c: 'green', n: 8, o: 1 }, { c: 'green', n: 8, o: 2 },
  { c: 'blue', n: 8, o: 1 }, { c: 'blue', n: 8, o: 2 },

  { c: 'red', n: 9, o: 1 }, { c: 'red', n: 9, o: 2 },
  { c: 'yellow', n: 9, o: 1 }, { c: 'yellow', n: 9, o: 2 },
  { c: 'green', n: 9, o: 1 }, { c: 'green', n: 9, o: 2 },
  { c: 'blue', n: 9, o: 1 }, { c: 'blue', n: 9, o: 2 },

  { c: 'red', n: '+2', o: 1 }, { c: 'red', n: '+2', o: 2 },
  { c: 'yellow', n: '+2', o: 1 }, { c: 'yellow', n: '+2', o: 2 },
  { c: 'green', n: '+2', o: 1 }, { c: 'green', n: '+2', o: 2 },
  { c: 'blue', n: '+2', o: 1 }, { c: 'blue', n: '+2', o: 2 },

  { c: 'red', n: 'r', o: 1 }, { c: 'red', n: 'r', o: 2 },
  { c: 'yellow', n: 'r', o: 1 }, { c: 'yellow', n: 'r', o: 2 },
  { c: 'green', n: 'r', o: 1 }, { c: 'green', n: 'r', o: 2 },
  { c: 'blue', n: 'r', o: 1 }, { c: 'blue', n: 'r', o: 2 },

  { c: 'red', n: 's', o: 1 }, { c: 'red', n: 's', o: 2 },
  { c: 'yellow', n: 's', o: 1 }, { c: 'yellow', n: 's', o: 2 },
  { c: 'green', n: 's', o: 1 }, { c: 'green', n: 's', o: 2 },
  { c: 'blue', n: 's', o: 1 }, { c: 'blue', n: 's', o: 2 },
]

function PlayGame (props) {

  const init = () => {
    let cards = [...cardsOrder], pile = []
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i)
    cards.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] )
    return ({unoTurn: true,
            unoCards: [], playerCards: [],
            unoCardsPile: [], playerCardsPile: [], playerPickCard: false,
            cards: cards, pile: [], finishRound: false, numberPlay: 0, unoWin: false,
            numCards: Number(state.game.cards), round: state.game.curr_round })
  }

  const unoPlay = (round) => {
    let { unoTurn, unoCards, unoCardsPile, playerCards, playerCardsPile,
          cards, pile, numCards, playerPickCard, finishRound, numberPlay, unoWin } = values
    if (finishRound) return
    if (unoCards.length === 0 && playerCards.length === 0) {
      for (let c = 0; c < numCards; c++) {
        let aux = cards.pop()
        unoCards.push(aux)
        aux = cards.pop()
        playerCards.push(aux)
      }
    }

    if (pile.length === 0) {
      while (true) {
        let aux = cards.pop()
        if (['red', 'yellow', 'green', 'blue'].includes(aux.c) && [0,1,2,3,4,5,6,7,8,9].includes(aux.n)) {
          pile.push({ card: aux, player: null, color: null })
          break
        } else {
          cards.unshift(aux)
        }
      }
    }

    if (!unoTurn) return

    let lastCardPile = pile[pile.length - 1].card
    let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile
    let arrHaveColorIndex = [], arrHaveNumberIndex = [], haveColorIndex = null, haveNumberIndex = null, haveCIndex = null, haveCd4Index = null, haveColorD2Index = null, haveColorReverseIndex = null, haveColorSkipIndex = null, rankingColor = { 'red': 0, 'yellow': 0, 'green': 0, 'blue': 0 }, rankingNumber = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '+2': 0, 's': 0, 'r': 0 }

    if (state.uno._id !== lastPlayerPile && lastCardPile.n === '+4') {
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoTurn = false
      setValues(values => ({ ...values, unoTurn: unoTurn,
                            unoCards: unoCards, cards: cards }))
      return
    } else if (state.uno._id !== lastPlayerPile && lastCardPile.n === '+2') {
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoTurn = false
      setValues(values => ({ ...values, unoTurn: unoTurn,
                            unoCards: unoCards, cards: cards }))
      return
    } else {
      let iHaveACard = false, keepTurn = false, index = null, color = null
      while (true) {
        lastCardPile = pile[pile.length - 1].card
        lastPlayerPile = pile[pile.length - 1].player
        lastColorPile = pile[pile.length - 1].color
        nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
        nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile
        arrHaveColorIndex = []
        arrHaveNumberIndex = []
        haveColorIndex = null
        haveNumberIndex = null
        haveCIndex = null
        haveCd4Index = null
        haveColorD2Index = null
        haveColorReverseIndex = null
        haveColorSkipIndex = null
        rankingColor = { 'red': 0, 'yellow': 0, 'green': 0, 'blue': 0 }
        rankingNumber = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '+2': 0, 's': 0, 'r': 0 }

        keepTurn = false
        index = null
        color = null
        unoCards.forEach((ele, ind) => {
          if (ele.c === nextColor) arrHaveColorIndex.push([ele.n.toString(), ind])
          if (ele.c === nextColor && ele.n === '+2') haveColorD2Index = ind
          if (ele.c === nextColor && ele.n === 'r') haveColorReverseIndex = ind
          if (ele.c === nextColor && ele.n === 's') haveColorSkipIndex = ind
          if (ele.n === nextNumber) arrHaveNumberIndex.push([ele.c, ind])
          if (ele.n === 'c') haveCIndex = ind
          if (ele.n === '+4') haveCd4Index = ind
          if (ele.c !== 'wild') {
            rankingColor[ele.c]++
            rankingNumber[ele.n.toString()]++
          }
        })
        console.log('actual', nextColor, nextNumber)
        console.log('color', arrHaveColorIndex, 'number', arrHaveNumberIndex, 'c', haveCIndex, '+4', haveCd4Index, '+2', haveColorD2Index, 'reverse', haveColorReverseIndex, 'skip', haveColorSkipIndex)
        let arrRankingColor = Object.entries(rankingColor).sort((a,b) => b[1] - a[1])
        let arrRankingNumber = Object.entries(rankingNumber).sort((a,b) => b[1] - a[1])
        console.log('color rank', arrRankingColor, 'number rank', arrRankingNumber)

        // mejor la que tenga mas del mismo color
        let exit = false
        for (let i = 0; i < arrRankingColor.length; i++) {
          for (let j = 0; j < arrHaveNumberIndex.length; j++ ) {
            console.log(i, arrRankingColor[i], j, arrHaveNumberIndex[j])
            if (arrRankingColor[i][0] === arrHaveNumberIndex[j][0]) {
              haveNumberIndex = arrHaveNumberIndex[j][1]
              exit = true
              break
            }
          }
          if (exit) break
        }

        // mejor el numero que se repita menos
        exit = false
        for (let i = arrRankingNumber.length - 1; i >= 0; i--) {
          for (let j = 0; j < arrHaveColorIndex.length; j++ ) {
            console.log(i, arrRankingNumber[i], j, arrHaveColorIndex[j])
            if (arrRankingNumber[i][0] === arrHaveColorIndex[j][0]) {
              haveColorIndex = arrHaveColorIndex[j][1]
              exit = true
              break
            }
          }
          if (exit) break
        }

        console.log('color', haveColorIndex)
        console.log('number', haveNumberIndex)


        if (playerCards.length <= 3) {
          if (haveColorD2Index !== null) {
            index = haveColorD2Index
            color = null
          } else if (haveCd4Index !== null) {
            index = haveCd4Index
            color = arrRankingColor[0][0]
          } else if (haveNumberIndex !== null) {
            index = haveNumberIndex
            color = null
          } else if (haveCIndex !== null) {
            index = haveCIndex
            color = arrRankingColor[0][0]
          } else if (haveColorReverseIndex !== null) {
            index = haveColorReverseIndex
            color = null
            keepTurn = true
          } else if (haveColorSkipIndex !== null) {
            index = haveColorSkipIndex
            color = null
            keepTurn = true
          } else if (haveColorIndex !== null) {
            index = haveColorIndex
            color = null
          } else {
            // robar carta
            index = null
            color = null
          }
        } else {
          if (haveColorReverseIndex !== null) {
            index = haveColorReverseIndex
            color = null
            keepTurn = true
          } else if (haveColorSkipIndex !== null) {
            index = haveColorSkipIndex
            color = null
            keepTurn = true
          } else if (haveColorIndex !== null) {
            index = haveColorIndex
            color = null
          } else if (haveNumberIndex !== null) {
            index = haveNumberIndex
            color = null
          } else if (haveColorD2Index !== null) {
            index = haveColorD2Index
            color = null
          } else if (haveCIndex !== null) {
            index = haveCIndex
            color = arrRankingColor[0][0]
          } else if (haveCd4Index !== null) {
            index = haveCd4Index
            color = arrRankingColor[0][0]
          } else {
            // robar carta
            index = null
            color = null
          }
        }
        if (index === null) {
          if (iHaveACard) break
          unoCards.push(cards.pop())
          iHaveACard = true
        } else {
          let aux = unoCards.splice(index, 1)[0]
          pile.push({ card: aux, player: state.uno._id, color: color })
          unoCardsPile.push({ card: aux, player: state.uno._id, color: color })

          if (aux.n === '+4') {
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            keepTurn = true
          }
          if (aux.n === '+2') {
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            keepTurn = true
          }

          if (!keepTurn) break
        }

        if (unoCards.length === 0) break

      } // while
    } // else
    if (unoCards.length === 0) {
      finishRound = true
      unoWin = true
    }
    unoTurn = false
    playerPickCard = false
    setValues(values => ({ ...values, unoTurn: unoTurn,
                          unoCards: unoCards, playerCards: playerCards, playerPickCard: playerPickCard,
                          unoCardsPile: unoCardsPile,
                          cards: cards, pile: pile, finishRound: finishRound, unoWin: unoWin }))
  }

  const handleClickPileCard = (event) => {
    if (event) event.preventDefault()
    let { unoTurn, unoCards, unoCardsPile, playerCards, playerCardsPile,
          cards, pile, numCards, finishRound, numberPlay, unoWin } = values
    if (finishRound) return
    if (unoTurn) return
    if (document.getElementById('color-' + event.target.id)) {
      if (!document.getElementById('color-' + event.target.id).value) return
    }
    let lastCardPile = pile[pile.length - 1].card
    let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let selectedCard = playerCards[event.target.id]
    console.log('play card', selectedCard)

    if (selectedCard.n === 'c' || selectedCard.n === '+4') {
      let inputColor = document.getElementById('color-' + event.target.id).value
      selectedCard = playerCards.splice(event.target.id, 1)[0]
      pile.push({ card: selectedCard, player: state.player._id, color: inputColor })
      playerCardsPile.push({ card: selectedCard, player: state.player._id, color: inputColor })
      unoTurn = true
    } else {
      if (selectedCard.c !== nextColor && selectedCard.n !== nextNumber) {
        return
      } else {
        if (selectedCard.n === 'r' || selectedCard.n === 's') {
          selectedCard = playerCards.splice(event.target.id, 1)[0]
          pile.push({ card: selectedCard, player: state.player._id, color: null })
          playerCardsPile.push({ card: selectedCard, player: state.player._id, color: null })
        } else {
          selectedCard = playerCards.splice(event.target.id, 1)[0]
          pile.push({ card: selectedCard, player: state.player._id, color: null })
          playerCardsPile.push({ card: selectedCard, player: state.player._id, color: null })
          unoTurn = true
        }
      }
    }

    if (playerCards.length === 0) {
      finishRound = true
      unoWin = false
    }

    setValues(values => ({ ...values, unoTurn: unoTurn,
                          playerCards: playerCards,
                          playerCardsPile: playerCardsPile,
                          cards: cards, pile: pile, finishRound: finishRound, numberPlay: numberPlay, unoWin: unoWin }))

  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value}))
  }

  const handleClickPickCard = (event) => {
    if (event) event.preventDefault()
    let { playerCards, cards, pile, playerPickCard, unoTurn, finishRound } = values
    if (finishRound) return
    let lastCardPile = pile[pile.length - 1].card
    let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let iCanPlay = false
    playerCards.forEach((ele, ind) => {
      if (ele.c === 'wild' || ele.c === nextColor || ele.n === nextNumber ) {
        iCanPlay = true
      }
    });

    if (!iCanPlay && playerPickCard) {
      unoTurn = true
      playerPickCard = false
      setValues(values => ({ ...values, unoTurn: unoTurn, playerPickCard: playerPickCard }))
      return
    }

    if (iCanPlay || playerPickCard) {
      return
    }

    playerCards.push(cards.pop())

    iCanPlay = false
    playerCards.forEach((ele, ind) => {
      if (ele.c === 'wild' || ele.c === nextColor || ele.n === nextNumber ) {
        iCanPlay = true
      }
    });

    if (!iCanPlay) {
      unoTurn = true
      playerPickCard = false
    } else {
      playerPickCard = true
    }

    if (!iCanPlay && playerPickCard) {
      unoTurn = true
    }

    setValues(values => ({ ...values, playerCards: playerCards, cards: cards,
                                      playerPickCard: playerPickCard, unoTurn:unoTurn }))
  }

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState(init())

  useEffect(() => {
    console.log('uno Play')
    unoPlay(state.game.curr_round + 1)
  })

  console.log('play game render', state, values)
  return (
    <WrapperGen>
      <ContainerRow>
        <ContainerColumn>
          <WrapperGen>
            <PUno> UNO {values.finishRound && values.unoWin && 'Winner!!!!'} </PUno>
            {values.unoCards.map(ele => {
              return (
                <ContainerRow>
                  <DivUno key={ele.c + ele.n + ele.o}>{ele.c} - {ele.n} - #{ele.o}</DivUno>
                </ContainerRow>
              )
            })}
          </WrapperGen>
        </ContainerColumn>
        <ContainerRow>
          <WrapperGen>
            <p> Pile </p>
            {values.pile.map(ele => {
              if (ele.player === state.player._id)
                return (<DivMe key={ele.card.c + ele.card.n + ele.card.o}>{ele.card.c} - {ele.card.n} - #{ele.card.o} -  {ele.color}</DivMe>)
              else if (ele.player === state.uno._id)
                return (<DivUno key={ele.card.c + ele.card.n + ele.card.o}>{ele.card.c} - {ele.card.n} - #{ele.card.o} - {ele.color}</DivUno>)
              else
                return (<DivLastCard key={ele.card.c + ele.card.n + ele.card.o}>{ele.card.c} - {ele.card.n} - #{ele.card.o} - {ele.color}</DivLastCard>)
            })}
          </WrapperGen>
          <WrapperGen>
            <p> Cards </p>
            {values.cards.map((ele, ind) => {
              if (ind < values.cards.length - 10)
                return ('')
              else if (ind === values.cards.length - 1)
                return (<DivLastCard key={ele.c + ele.n + ele.o}>{ind} ... {ele.c} - {ele.n} - #{ele.o}</DivLastCard>)
              else
                return (<div key={ele.c + ele.n + ele.o}>{ind} ... {ele.c} - {ele.n} - #{ele.o}</div>)
            })}
          </WrapperGen>
        </ContainerRow>
        <ContainerColumn>
          <WrapperGen>
            <PMe> Me {values.finishRound && !values.unoWin && 'Winner!!!!'} </PMe>
            {values.playerCards.map((ele, ind) => {
              return (
                <ContainerColumn key={ind}>
                  <ContainerRow>
                    { ele.c === 'red' &&
                    (<DivCardExt>
                      <DivCardExtRed>
                        {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.n) &&
                          (<DivCardLitNumber>{ele.n}</DivCardLitNumber>)
                        }
                        {ele.n === 'r' &&
                          (<DivCardCirLitRed>
                              <DivCardReverseLitArrow></DivCardReverseLitArrow>
                              <DivCardReverseLit></DivCardReverseLit>
                              <DivCardReverseLit2></DivCardReverseLit2>
                              <DivCardReverseLit3></DivCardReverseLit3>
                              <DivCardReverseLit4></DivCardReverseLit4>
                              <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                           </DivCardCirLitRed>)
                        }
                        {ele.n === 's' &&
                          (<DivCardCirLitRed>
                            <DivCardSkipLit></DivCardSkipLit>
                            <DivCardSkipLitRed2></DivCardSkipLitRed2>
                            <DivCardSkipLit3></DivCardSkipLit3>
                           </DivCardCirLitRed>)
                        }
                        <DivCardCirBigWhite>
                          {[0,1,2,3,4,5,6,7,8,9].includes(ele.n) &&
                            (<DivCardBigNumberRed>{ele.n}</DivCardBigNumberRed>)
                          }
                          {ele.n === '+2' &&
                            (<><DivCardDrawTwoBigRed></DivCardDrawTwoBigRed>
                               <DivCardDrawTwoBigRed2></DivCardDrawTwoBigRed2></>)
                          }
                          {ele.n === 'r' &&
                            (<><DivCardReverseBigRedArrow></DivCardReverseBigRedArrow>
                               <DivCardReverseBigRed></DivCardReverseBigRed>
                               <DivCardReverseBigRed2></DivCardReverseBigRed2>
                               <DivCardReverseBigRed3></DivCardReverseBigRed3>
                               <DivCardReverseBigRed4></DivCardReverseBigRed4>
                               <DivCardReverseBigRedArrow2></DivCardReverseBigRedArrow2></>)
                          }
                          {ele.n === 's' &&
                            (<>
                               <DivCardSkipBigRed></DivCardSkipBigRed>
                               <DivCardSkipBig2></DivCardSkipBig2>
                               <DivCardSkipBigRed3></DivCardSkipBigRed3>
                            </>)
                          }
                        </DivCardCirBigWhite>
                      </DivCardExtRed>
                    </DivCardExt>)
                    }
                    { ele.c === 'yellow' &&
                    (<DivCardExt>
                      <DivCardExtYellow>
                        {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.n) &&
                          (<DivCardLitNumber>{ele.n}</DivCardLitNumber>)
                        }
                        {ele.n === 'r' &&
                          (<DivCardCirLitYellow>
                              <DivCardReverseLitArrow></DivCardReverseLitArrow>
                              <DivCardReverseLit></DivCardReverseLit>
                              <DivCardReverseLit2></DivCardReverseLit2>
                              <DivCardReverseLit3></DivCardReverseLit3>
                              <DivCardReverseLit4></DivCardReverseLit4>
                              <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                           </DivCardCirLitYellow>)
                        }
                        {'r' === 's' &&
                          (<DivCardCirLitYellow>
                            <DivCardSkipLit></DivCardSkipLit>
                            <DivCardSkipLitYellow2></DivCardSkipLitYellow2>
                            <DivCardSkipLit3></DivCardSkipLit3>
                           </DivCardCirLitYellow>)
                        }
                        <DivCardCirBigWhite>
                          {[0,1,2,3,4,5,6,7,8,9].includes(ele.n) &&
                            (<DivCardBigNumberYellow>{ele.n}</DivCardBigNumberYellow>)
                          }
                          {ele.n === '+2' &&
                            (<><DivCardDrawTwoBigYellow></DivCardDrawTwoBigYellow>
                               <DivCardDrawTwoBigYellow2></DivCardDrawTwoBigYellow2></>)
                          }
                          {ele.n === 'r' &&
                            (<><DivCardReverseBigYellowArrow></DivCardReverseBigYellowArrow>
                               <DivCardReverseBigYellow></DivCardReverseBigYellow>
                               <DivCardReverseBigYellow2></DivCardReverseBigYellow2>
                               <DivCardReverseBigYellow3></DivCardReverseBigYellow3>
                               <DivCardReverseBigYellow4></DivCardReverseBigYellow4>
                               <DivCardReverseBigYellowArrow2></DivCardReverseBigYellowArrow2></>)
                          }
                          {ele.n === 's' &&
                            (<>
                               <DivCardSkipBigYellow></DivCardSkipBigYellow>
                               <DivCardSkipBig2></DivCardSkipBig2>
                               <DivCardSkipBigYellow3></DivCardSkipBigYellow3>
                            </>)
                          }
                        </DivCardCirBigWhite>
                      </DivCardExtYellow>
                    </DivCardExt>)
                    }
                    { ele.c === 'green' &&
                    (<DivCardExt>
                      <DivCardExtGreen>
                        {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.n) &&
                          (<DivCardLitNumber>{ele.n}</DivCardLitNumber>)
                        }
                        {ele.n === 'r' &&
                          (<DivCardCirLitGreen>
                              <DivCardReverseLitArrow></DivCardReverseLitArrow>
                              <DivCardReverseLit></DivCardReverseLit>
                              <DivCardReverseLit2></DivCardReverseLit2>
                              <DivCardReverseLit3></DivCardReverseLit3>
                              <DivCardReverseLit4></DivCardReverseLit4>
                              <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                           </DivCardCirLitGreen>)
                        }
                        {ele.n === 's' &&
                          (<DivCardCirLitGreen>
                            <DivCardSkipLit></DivCardSkipLit>
                            <DivCardSkipLitGreen2></DivCardSkipLitGreen2>
                            <DivCardSkipLit3></DivCardSkipLit3>
                           </DivCardCirLitGreen>)
                        }
                        <DivCardCirBigWhite>
                          {[0,1,2,3,4,5,6,7,8,9].includes(ele.n) &&
                            (<DivCardBigNumberGreen>{ele.n}</DivCardBigNumberGreen>)
                          }
                          {ele.n === '+2' &&
                            (<><DivCardDrawTwoBigGreen></DivCardDrawTwoBigGreen>
                               <DivCardDrawTwoBigGreen2></DivCardDrawTwoBigGreen2></>)
                          }
                          {ele.n === 'r' &&
                            (<><DivCardReverseBigGreenArrow></DivCardReverseBigGreenArrow>
                               <DivCardReverseBigGreen></DivCardReverseBigGreen>
                               <DivCardReverseBigGreen2></DivCardReverseBigGreen2>
                               <DivCardReverseBigGreen3></DivCardReverseBigGreen3>
                               <DivCardReverseBigGreen4></DivCardReverseBigGreen4>
                               <DivCardReverseBigGreenArrow2></DivCardReverseBigGreenArrow2></>)
                          }
                          {ele.n === 's' &&
                            (<>
                               <DivCardSkipBigGreen></DivCardSkipBigGreen>
                               <DivCardSkipBig2></DivCardSkipBig2>
                               <DivCardSkipBigGreen3></DivCardSkipBigGreen3>
                            </>)
                          }
                        </DivCardCirBigWhite>
                      </DivCardExtGreen>
                    </DivCardExt>)
                    }
                    { ele.c === 'blue' &&
                    (<DivCardExt>
                      <DivCardExtBlue>
                        {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.n) &&
                          (<DivCardLitNumber>{ele.n}</DivCardLitNumber>)
                        }
                        {ele.n === 'r' &&
                          (<DivCardCirLitBlue>
                              <DivCardReverseLitArrow></DivCardReverseLitArrow>
                              <DivCardReverseLit></DivCardReverseLit>
                              <DivCardReverseLit2></DivCardReverseLit2>
                              <DivCardReverseLit3></DivCardReverseLit3>
                              <DivCardReverseLit4></DivCardReverseLit4>
                              <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                           </DivCardCirLitBlue>)
                        }
                        {ele.n === 's' &&
                          (<DivCardCirLitBlue>
                            <DivCardSkipLit></DivCardSkipLit>
                            <DivCardSkipLitBlue2></DivCardSkipLitBlue2>
                            <DivCardSkipLit3></DivCardSkipLit3>
                           </DivCardCirLitBlue>)
                        }
                        <DivCardCirBigWhite>
                          {[0,1,2,3,4,5,6,7,8,9].includes(ele.n) &&
                            (<DivCardBigNumberBlue>{ele.n}</DivCardBigNumberBlue>)
                          }
                          {ele.n === '+2' &&
                            (<><DivCardDrawTwoBigBlue></DivCardDrawTwoBigBlue>
                               <DivCardDrawTwoBigBlue2></DivCardDrawTwoBigBlue2></>)
                          }
                          {ele.n === 'r' &&
                            (<><DivCardReverseBigBlueArrow></DivCardReverseBigBlueArrow>
                               <DivCardReverseBigBlue></DivCardReverseBigBlue>
                               <DivCardReverseBigBlue2></DivCardReverseBigBlue2>
                               <DivCardReverseBigBlue3></DivCardReverseBigBlue3>
                               <DivCardReverseBigBlue4></DivCardReverseBigBlue4>
                               <DivCardReverseBigBlueArrow2></DivCardReverseBigBlueArrow2></>)
                          }
                          {ele.n === 's' &&
                            (<>
                               <DivCardSkipBigBlue></DivCardSkipBigBlue>
                               <DivCardSkipBig2></DivCardSkipBig2>
                               <DivCardSkipBigBlue3></DivCardSkipBigBlue3>
                            </>)
                          }
                        </DivCardCirBigWhite>
                      </DivCardExtBlue>
                    </DivCardExt>)
                    }
                    { ele.c === 'wild' &&
                      (
                      <>
                        <DivCardExt>
                          <DivCardExtWild>
                            {ele.n === 'c' &&
                              (<DivCardCirLitWhite>
                                  <DivCardWildColorLit></DivCardWildColorLit>
                               </DivCardCirLitWhite>)
                            }
                            {ele.n === '+4' &&
                              (<DivCardLitNumber>{ele.n}</DivCardLitNumber>)
                            }
                            <DivCardCirBigWhite>
                              {ele.n === 'c' &&
                                (<DivCardWildColorBig></DivCardWildColorBig>)
                              }
                              {ele.n === '+4' &&
                                (<>
                                  <DivCardDrawFourBigRed></DivCardDrawFourBigRed>
                                  <DivCardDrawFourBigYellow></DivCardDrawFourBigYellow>
                                  <DivCardDrawFourBigGreen></DivCardDrawFourBigGreen>
                                  <DivCardDrawFourBigBlue></DivCardDrawFourBigBlue>
                                </>)
                              }
                            </DivCardCirBigWhite>
                          </DivCardExtWild>
                        </DivCardExt>
                      </>
                      )
                    }

                    { (ele.c === 'wild' ||
                        ele.c === values.pile[values.pile.length - 1].card.c ||
                        ele.n === values.pile[values.pile.length - 1].card.n ||
                        ele.c === values.pile[values.pile.length - 1].color) && !values.finishRound &&
                      <PileCard onClick={handleClickPileCard} id={ind}> Pile this Card </PileCard>
                    }
                  </ContainerRow>
                  { ele.c === 'wild' &&
                    (
                    <>
                    <ContainerRow>
                      <label>Change to Color:</label>
                      <select id={'color-' + ind} onChange={handleChange} value={values['color-' + ind] ? values['color-' + ind] : ''} required>
                        <option value=""></option>
                        <option value="red">red</option>
                        <option value="yellow">yellow</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                      </select>
                    </ContainerRow>
                    </>
                    )
                  }
                </ContainerColumn>
              )
            })}
          </WrapperGen>
          <WrapperGen>
            { !values.finishRound &&
              <PickCard onClick={handleClickPickCard} id="PickCard"> Pick a card </PickCard>
            }
          </WrapperGen>
        </ContainerColumn>
      </ContainerRow>
    </WrapperGen>
  )

}

export default PlayGame

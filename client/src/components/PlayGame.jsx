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
const PileCard = styled.button.attrs({ className: 'btn btn-secondary' })
``
const PickCard = styled.button.attrs({ className: 'btn btn-dark' })
``
const CancelGame = styled.button.attrs({ className: 'btn btn-secondary' })
`
  margin: 5px 5px 5px 5px;
`
const NewGame = styled.button.attrs({ className: 'btn btn-secondary' })
`
  margin: 5px 5px 5px 5px;
`
const ViewUnoCards = styled.button.attrs({ className: 'btn btn-dark' })
`
  margin: 5px 5px 5px 5px;
`
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 5px 5px 5px 5px;
`
const ContainerColumn = styled.div.attrs({ className: "d-flex flex-column" })
`
  padding: 5px 5px 5px 5px;
`
const PUno = styled.p.attrs({ className: 'text-secondary' })
`
  font-size: 35px;
  text-shadow: 2px 2px 2px #000000;
`
const PPile = styled.p.attrs({ className: 'text-dark' })
`
  font-size: 35px;
  text-shadow: 2px 2px 2px #000000;
`
const DivUno = styled.div.attrs({ className: 'text-danger' })
``
const PMe = styled.p.attrs({ className: 'text-secondary' })
`
  font-size: 35px;
  text-shadow: 2px 2px 2px #000000;
`
const PWinner = styled.p.attrs({ className: 'text-secondary d-flex justify-content-center align-items-center' })
`
  font-size: 70px;
  text-shadow: 2px 2px 2px #000000;
`
const DivMe = styled.div.attrs({ className: 'text-success' })
``
const DivLastCard = styled.div.attrs({ className: 'text-primary' })
``
const DivPile = styled.div.attrs({ className:"d-flex justify-content-center align-items-center border border-dark rounded" })
`
  width: 50px;
  height: 35px;
  margin: 3px 3px 3px 3px;
`

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
const DivCardCirBigUNO = styled.div.attrs({ className:"rounded-circle bg-danger" })
`
  width: 79px;
  height: 160px;
  transform: rotate(30deg);
  position: relative;
  top: 0px;
  left: 0px;
`
const DivCardBigNumberUNO = styled.div.attrs({ className:"text-warning font-weight-bold font-italic" })
`
  font-size: 35px;
  position: relative;
  top: 50px;
  left: -5px;
  text-shadow: 2px 2px 2px #000000;
  transform: rotate(-55deg);
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
const DivCardLitNumberPile = styled.div.attrs({ className:"text-light font-weight-bold font-italic" })
`
  font-size: 20px;
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
  border-color: #ff4444 #ffbb33 #4285f4 #00c851;
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
  border-color: #ff4444 #ffbb33 #4285f4 #00c851;
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
  background-color: #ff4444;
`
const DivCardDrawTwoBigRed2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: #ff4444;
`
const DivCardDrawTwoBigYellow = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #ffbb33;
`
const DivCardDrawTwoBigYellow2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: #ffbb33;
`
const DivCardDrawTwoBigGreen = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #00c851;
`
const DivCardDrawTwoBigGreen2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: #00c851;
`
const DivCardDrawTwoBigBlue = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #4285f4;
`
const DivCardDrawTwoBigBlue2 = styled.div.attrs({})
`
  width: 30px;
  height: 80px;
  border: 3px solid white;
  position: relative;
  top: -50px;
  left: 35px;
  background-color: #4285f4;
`
const DivCardDrawFourBigRed = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: 50px;
  left: 15px;
  background-color: #ff4444;
`
const DivCardDrawFourBigYellow = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: -40px;
  left: 35px;
  background-color: #ffbb33;
`
const DivCardDrawFourBigGreen = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: -60px;
  left: 30px;
  background-color: #00c851;
`
const DivCardDrawFourBigBlue = styled.div.attrs({})
`
  width: 25px;
  height: 65px;
  border: 3px solid white;
  position: relative;
  top: -150px;
  left: 45px;
  background-color: #4285f4;
`
const DivCardReverseBigRed = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 51px;
  left: 20px;
  background-color: #ff4444;
  transform: translate(0px, -45px);
`
const DivCardReverseBigRed2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #ff4444;
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
  background-color: #ff4444;
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
  background-color: #ff4444;
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
  border-bottom: 25px solid #ff4444;
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
  border-top: 25px solid #ff4444;
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
  background-color: #ffbb33;
  transform: translate(0px, -45px);
`
const DivCardReverseBigYellow2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #ffbb33;
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
  background-color: #ffbb33;
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
  background-color: #ffbb33;
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
  border-bottom: 25px solid #ffbb33;
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
  border-top: 25px solid #ffbb33;
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
  background-color: #00c851;
  transform: translate(0px, -45px);
`
const DivCardReverseBigGreen2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #00c851;
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
  background-color: #00c851;
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
  background-color: #00c851;
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
  border-bottom: 25px solid #00c851;
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
  border-top: 25px solid #00c851;
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
  background-color: #4285f4;
  transform: translate(0px, -45px);
`
const DivCardReverseBigBlue2 = styled.div.attrs({})
`
  width: 20px;
  height: 20px;
  position: relative;
  top: 50px;
  left: 20px;
  background-color: #4285f4;
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
  background-color: #4285f4;
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
  background-color: #4285f4;
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
  border-bottom: 25px solid #4285f4;
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
  border-top: 25px solid #4285f4;
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
  background-color: #ff4444;
`
const DivCardSkipLitYellow2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: #ffbb33;
`
const DivCardSkipLitGreen2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: #00c851;
`
const DivCardSkipLitBlue2 = styled.div.attrs({})
`
  width: 11px;
  height: 11px;
  position: relative;
  border-radius: 50%;
  top: -8px;
  left: 2px;
  background-color: #4285f4;
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
  background-color: #ff4444;
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
  background-color: #ff4444;
`
const DivCardSkipBigYellow = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: #ffbb33;
`
const DivCardSkipBigYellow3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: #ffbb33;
`
const DivCardSkipBigGreen = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: #00c851;
`
const DivCardSkipBigGreen3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: #00c851;
`
const DivCardSkipBigBlue = styled.div.attrs({})
`
  width: 70px;
  height: 70px;
  position: relative;
  border-radius: 50%;
  top: 45px;
  left: 7px;
  background-color: #4285f4;
`
const DivCardSkipBigBlue3 = styled.div.attrs({})
`
  width: 15px;
  height: 40px;
  position: relative;
  top: -50px;
  left: 34px;
  background-color: #4285f4;
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

    //let end = cards.length - 20
    //for (let ind = 0; ind < end; ind++) {
    //  pile.push({ card: cards.pop(), player: null, color: null, drawDone: true })
    //}

    return ({unoTurn: true,
            unoCards: [], playerCards: [],
            unoCardsPile: [], playerCardsPile: [], playerPickCard: false,
            cards: cards, pile: pile, finishRound: false, numberPlay: 0, unoWin: false,
            numCards: Number(state.game.cards), round: state.game.curr_round, viewUnoCards: false, checkUNO: false })
  }

  const initCardsAgain = (pile) => {
    let cards = []
    //console.log('cards', cards, cards.length, 'pile', pile, pile.length)
    pile.forEach((ele, ind) => {
      cards.unshift(ele.card)
    })

    cards.shift()
    //console.log('cards', cards, cards.length, 'pile', pile, pile.length)
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i)
    cards.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] )

    let last = pile[pile.length - 1]
    //console.log('last', last)
    let pileAux = []
    pileAux.push(last)
    //console.log('cards', cards, cards.length, 'pileAux', pileAux, pileAux.length)
    return { cards: cards, pile: pileAux }
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
    let drawDone = pile[pile.length - 1].drawDone
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile
    let arrHaveColorIndex = [], arrHaveNumberIndex = [], haveColorIndex = null, haveNumberIndex = null, haveCIndex = null, haveCd4Index = null, haveColorD2Index = null, haveColorReverseIndex = null, haveColorSkipIndex = null, rankingColor = { 'red': 0, 'yellow': 0, 'green': 0, 'blue': 0 }, rankingNumber = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '+2': 0, 's': 0, 'r': 0 }

    if (!drawDone && lastCardPile.n === '+4') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push(cards.pop())
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push(cards.pop())
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push(cards.pop())
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push(cards.pop())
      unoTurn = false
      pile[pile.length - 1].drawDone = true
      setValues(values => ({ ...values, unoTurn: unoTurn, pile: pile,
                            unoCards: unoCards, cards: cards }))
      return
    } else if (!drawDone && lastCardPile.n === '+2') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push(cards.pop())
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push(cards.pop())
      unoTurn = false
      pile[pile.length - 1].drawDone = true
      setValues(values => ({ ...values, unoTurn: unoTurn, pile: pile,
                            unoCards: unoCards, cards: cards }))
      return
    } else {
      let iHaveACard = false, keepTurn = false, index = null, color = null
      while (true) {
        lastCardPile = pile[pile.length - 1].card
        lastPlayerPile = pile[pile.length - 1].player
        lastColorPile = pile[pile.length - 1].color
        drawDone = pile[pile.length - 1].drawDone
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
        //console.log('color', arrHaveColorIndex, 'number', arrHaveNumberIndex, 'c', haveCIndex, '+4', haveCd4Index, '+2', haveColorD2Index, 'reverse', haveColorReverseIndex, 'skip', haveColorSkipIndex)
        let arrRankingColor = Object.entries(rankingColor).sort((a,b) => b[1] - a[1])
        let arrRankingNumber = Object.entries(rankingNumber).sort((a,b) => b[1] - a[1])
        //console.log('color rank', arrRankingColor, 'number rank', arrRankingNumber)

        // mejor la que tenga mas del mismo color
        let exit = false
        for (let i = 0; i < arrRankingColor.length; i++) {
          for (let j = 0; j < arrHaveNumberIndex.length; j++ ) {
            //console.log(i, arrRankingColor[i], j, arrHaveNumberIndex[j])
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
            //console.log(i, arrRankingNumber[i], j, arrHaveColorIndex[j])
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
            if (nextColor === arrRankingColor[0][0]) {
              if (arrRankingColor[1][1] > 0)
                color = arrRankingColor[1][0]
              else
                color = arrRankingColor[0][0]
            } else {
              color = arrRankingColor[0][0]
            }
          } else if (haveColorReverseIndex !== null) {
            index = haveColorReverseIndex
            color = null
          } else if (haveColorSkipIndex !== null) {
            index = haveColorSkipIndex
            color = null
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
          } else if (haveColorSkipIndex !== null) {
            index = haveColorSkipIndex
            color = null
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
            if (nextColor === arrRankingColor[0][0]) {
              if (arrRankingColor[1][1] > 0)
                color = arrRankingColor[1][0]
              else
                color = arrRankingColor[0][0]
            } else {
              color = arrRankingColor[0][0]
            }
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
          if (cards.length === 0) {
            let obj = initCardsAgain(pile)
            cards = obj.cards
            pile = obj.pile
          }
          unoCards.push(cards.pop())
          iHaveACard = true
        } else {
          let aux = unoCards.splice(index, 1)[0]
          pile.push({ card: aux, player: state.uno._id, color: color, drawDone: true })
          unoCardsPile.push({ card: aux, player: state.uno._id, color: color })

          if (aux.n === '+4') {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push(cards.pop())
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push(cards.pop())
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push(cards.pop())
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push(cards.pop())
            keepTurn = true
          } else if (aux.n === '+2') {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push(cards.pop())
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push(cards.pop())
            keepTurn = true
          } else if (aux.n === 'r' || aux.n === 's') {
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
          cards, pile, numCards, finishRound, numberPlay, unoWin, checkUNO } = values
    if (finishRound) return
    if (unoTurn) return
    if (document.getElementById('color-' + event.target.id)) {
      if (!document.getElementById('color-' + event.target.id).value) return
    }
    let lastCardPile = pile[pile.length - 1].card
    let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    let drawDone = pile[pile.length - 1].drawDone
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let selectedCard = playerCards[event.target.id]
    console.log('play card', selectedCard)

    if (selectedCard.n === 'c' || selectedCard.n === '+4') {
      let inputColor = document.getElementById('color-' + event.target.id).value
      selectedCard = playerCards.splice(event.target.id, 1)[0]
      pile.push({ card: selectedCard, player: state.player._id, color: inputColor, drawDone: false })
      playerCardsPile.push({ card: selectedCard, player: state.player._id, color: inputColor })
      unoTurn = true
    } else {
      if (selectedCard.c !== nextColor && selectedCard.n !== nextNumber) {
        return
      } else {
        selectedCard = playerCards.splice(event.target.id, 1)[0]
        pile.push({ card: selectedCard, player: state.player._id, color: null, drawDone: false })
        playerCardsPile.push({ card: selectedCard, player: state.player._id, color: null })
        if (!(selectedCard.n === 'r' || selectedCard.n === 's')) {
          unoTurn = true
        }
      }
    }

    if (playerCards.length === 0) {
      finishRound = true
      unoWin = false
    }

    if (playerCards.length === 1 && !checkUNO) {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      playerCards.push(cards.pop())
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      playerCards.push(cards.pop())
    }

    setValues(values => ({ ...values, unoTurn: unoTurn,
                          playerCards: playerCards,
                          playerCardsPile: playerCardsPile,
                          cards: cards, pile: pile, finishRound: finishRound, numberPlay: numberPlay, unoWin: unoWin, checkUNO: false }))

  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value }))
  }

  const handleClickPickCard = (event) => {
    if (event) event.preventDefault()
    let { playerCards, cards, pile, playerPickCard, unoTurn, finishRound } = values
    if (finishRound) return
    let lastCardPile = pile[pile.length - 1].card
    let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    let drawDone = pile[pile.length - 1].drawDone
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    console.log('pick', nextColor, nextNumber)

    let iCanPlay = false
    playerCards.forEach((ele, ind) => {
      if (ele.c === 'wild' || ele.c === nextColor || ele.n === nextNumber ) {
        iCanPlay = true
      }
    })

    if (!iCanPlay && playerPickCard) {
      unoTurn = true
      playerPickCard = false
      setValues(values => ({ ...values, unoTurn: unoTurn, playerPickCard: playerPickCard }))
      return
    }

    if (iCanPlay || playerPickCard) {
      return
    }

    if (cards.length === 0) {
      let obj = initCardsAgain(pile)
      cards = obj.cards
      pile = obj.pile
    }
    playerCards.push(cards.pop())

    iCanPlay = false
    playerCards.forEach((ele, ind) => {
      if (ele.c === 'wild' || ele.c === nextColor || ele.n === nextNumber ) {
        iCanPlay = true
      }
    })

    if (!iCanPlay) {
      unoTurn = true
      playerPickCard = false
    } else {
      playerPickCard = true
    }

    if (!iCanPlay && playerPickCard) {
      unoTurn = true
      playerPickCard = false
    }

    console.log('unoTurn', unoTurn, 'playerPickCard', playerPickCard)

    setValues(values => ({ ...values, playerCards: playerCards, cards: cards, pile: pile,
                                      playerPickCard: playerPickCard, unoTurn:unoTurn }))
  }

  const handleClickCancelGame = (event) => {
    if (event) event.preventDefault()
    setState(state => ({ ...state, game: null, player: null, uno: null }))
  }

  const handleClickNewGame = (event) => {
    if (event) event.preventDefault()
    setValues(values => ({ ...values, ...init() }))
  }

  const handleViewUnoCards = (event) => {
    if (event) event.preventDefault()
    setValues(values => ({ ...values, viewUnoCards: !values.viewUnoCards }))
  }

  const handleChangeCheckUNO = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.checked }))
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
      <ContainerColumn>
        <ContainerRow>
          <CancelGame onClick={handleClickCancelGame} id="CancelGame"> Cancel Game </CancelGame>
          <NewGame onClick={handleClickNewGame} id="NewGame"> New Game </NewGame>
          <ViewUnoCards onClick={handleViewUnoCards} id="ViewUnoCards"> View / Hide UNO Cards </ViewUnoCards>
        </ContainerRow>
        <ContainerRow>
          <>
            {!values.finishRound && !values.unoWin &&
              <PUno>P<br/>E<br/>P<br/>E</PUno>
            }

            {values.finishRound && values.unoWin &&
              <PWinner>PEPE is the Winner!!!!</PWinner>
            }
            {values.unoCards.map((ele, ind) => {
              if (values.viewUnoCards)
                return (
                  <ContainerRow key={ind}>
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
                          {ele.n === 's' &&
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
                  </ContainerRow>
                )
              else
                return (
                  <ContainerRow key={ind}>
                    <DivCardExt>
                      <DivCardExtWild>
                        <DivCardCirBigUNO>
                          <DivCardBigNumberUNO>{'UNO'}</DivCardBigNumberUNO>
                        </DivCardCirBigUNO>
                      </DivCardExtWild>
                    </DivCardExt>
                  </ContainerRow>
                )
            })}
          </>
        </ContainerRow>
        <ContainerRow>
          <ContainerRow>
            <ContainerRow>
            {values.pile.map((ele, ind) => {
              if (ind > values.pile.length - 11 && ind !== values.pile.length - 1)
                return(
                 ele.player === state.player._id ?
                  (
                    <DivPile key={ind + ele.player} className={ele.card.c === 'red' ? 'align-self-end bg-danger' : ele.card.c === 'yellow' ? 'align-self-end bg-warning' : ele.card.c === 'green' ? 'align-self-end bg-success' : ele.card.c === 'blue' ? 'align-self-end bg-primary' : ele.card.c === 'wild' ? 'align-self-end bg-dark' : ''}>

                      {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                        (<DivCardLitNumberPile>{ele.card.n}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 'r' &&
                        (<DivCardLitNumberPile>{'Rev.'}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 's' &&
                        (<DivCardLitNumberPile>{'Skip'}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 'c' &&
                        (<DivCardLitNumberPile>{'Col.'}</DivCardLitNumberPile>)
                      }
                    </DivPile>
                  )
                  :
                  ele.player === state.uno._id ?
                  (
                    <DivPile key={ind + ele.player} className={ele.card.c === 'red' ? 'align-self-start bg-danger' : ele.card.c === 'yellow' ? 'align-self-start bg-warning' : ele.card.c === 'green' ? 'align-self-start bg-success' : ele.card.c === 'blue' ? 'align-self-start bg-primary' : ele.card.c === 'wild' ? 'align-self-start bg-dark' : ''}>

                      {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                        (<DivCardLitNumberPile>{ele.card.n}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 'r' &&
                        (<DivCardLitNumberPile>{'Rev.'}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 's' &&
                        (<DivCardLitNumberPile>{'Skip'}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 'c' &&
                        (<DivCardLitNumberPile>{'Col.'}</DivCardLitNumberPile>)
                      }
                    </DivPile>
                  )
                  :
                  (
                    <DivPile key={ind + ele.player} className={ele.card.c === 'red' ? 'align-self-center bg-danger' : ele.card.c === 'yellow' ? 'align-self-center bg-warning' : ele.card.c === 'green' ? 'align-self-center bg-success' : ele.card.c === 'blue' ? 'align-self-center bg-primary' : ele.card.c === 'wild' ? 'align-self-center bg-dark' : ''}>

                      {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                        (<DivCardLitNumberPile>{ele.card.n}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 'r' &&
                        (<DivCardLitNumberPile>{'Rev.'}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 's' &&
                        (<DivCardLitNumberPile>{'Skip'}</DivCardLitNumberPile>)
                      }
                      {ele.card.n === 'c' &&
                        (<DivCardLitNumberPile>{'Col.'}</DivCardLitNumberPile>)
                      }
                    </DivPile>
                  )
                )
              else
                return ('')
            })}
            </ContainerRow>
            {values.pile.map((ele, ind) => {
              if (ind === values.pile.length - 1)
                return (
                  <ContainerRow key={ind + ele.player} className={ele.color === 'red' ? 'bg-danger' : ele.color === 'yellow' ? 'bg-warning' : ele.color === 'green' ? 'bg-success' : ele.color === 'blue' ? 'bg-primary' : ''}>
                      { ele.card.c === 'red' &&
                      (<DivCardExt>
                        <DivCardExtRed>
                          {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                            (<DivCardLitNumber>{ele.card.n}</DivCardLitNumber>)
                          }
                          {ele.card.n === 'r' &&
                            (<DivCardCirLitRed>
                                <DivCardReverseLitArrow></DivCardReverseLitArrow>
                                <DivCardReverseLit></DivCardReverseLit>
                                <DivCardReverseLit2></DivCardReverseLit2>
                                <DivCardReverseLit3></DivCardReverseLit3>
                                <DivCardReverseLit4></DivCardReverseLit4>
                                <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                             </DivCardCirLitRed>)
                          }
                          {ele.card.n === 's' &&
                            (<DivCardCirLitRed>
                              <DivCardSkipLit></DivCardSkipLit>
                              <DivCardSkipLitRed2></DivCardSkipLitRed2>
                              <DivCardSkipLit3></DivCardSkipLit3>
                             </DivCardCirLitRed>)
                          }
                          <DivCardCirBigWhite>
                            {[0,1,2,3,4,5,6,7,8,9].includes(ele.card.n) &&
                              (<DivCardBigNumberRed>{ele.card.n}</DivCardBigNumberRed>)
                            }
                            {ele.card.n === '+2' &&
                              (<><DivCardDrawTwoBigRed></DivCardDrawTwoBigRed>
                                 <DivCardDrawTwoBigRed2></DivCardDrawTwoBigRed2></>)
                            }
                            {ele.card.n === 'r' &&
                              (<><DivCardReverseBigRedArrow></DivCardReverseBigRedArrow>
                                 <DivCardReverseBigRed></DivCardReverseBigRed>
                                 <DivCardReverseBigRed2></DivCardReverseBigRed2>
                                 <DivCardReverseBigRed3></DivCardReverseBigRed3>
                                 <DivCardReverseBigRed4></DivCardReverseBigRed4>
                                 <DivCardReverseBigRedArrow2></DivCardReverseBigRedArrow2></>)
                            }
                            {ele.card.n === 's' &&
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
                      { ele.card.c === 'yellow' &&
                      (<DivCardExt>
                        <DivCardExtYellow>
                          {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                            (<DivCardLitNumber>{ele.card.n}</DivCardLitNumber>)
                          }
                          {ele.card.n === 'r' &&
                            (<DivCardCirLitYellow>
                                <DivCardReverseLitArrow></DivCardReverseLitArrow>
                                <DivCardReverseLit></DivCardReverseLit>
                                <DivCardReverseLit2></DivCardReverseLit2>
                                <DivCardReverseLit3></DivCardReverseLit3>
                                <DivCardReverseLit4></DivCardReverseLit4>
                                <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                             </DivCardCirLitYellow>)
                          }
                          {ele.card.n === 's' &&
                            (<DivCardCirLitYellow>
                              <DivCardSkipLit></DivCardSkipLit>
                              <DivCardSkipLitYellow2></DivCardSkipLitYellow2>
                              <DivCardSkipLit3></DivCardSkipLit3>
                             </DivCardCirLitYellow>)
                          }
                          <DivCardCirBigWhite>
                            {[0,1,2,3,4,5,6,7,8,9].includes(ele.card.n) &&
                              (<DivCardBigNumberYellow>{ele.card.n}</DivCardBigNumberYellow>)
                            }
                            {ele.card.n === '+2' &&
                              (<><DivCardDrawTwoBigYellow></DivCardDrawTwoBigYellow>
                                 <DivCardDrawTwoBigYellow2></DivCardDrawTwoBigYellow2></>)
                            }
                            {ele.card.n === 'r' &&
                              (<><DivCardReverseBigYellowArrow></DivCardReverseBigYellowArrow>
                                 <DivCardReverseBigYellow></DivCardReverseBigYellow>
                                 <DivCardReverseBigYellow2></DivCardReverseBigYellow2>
                                 <DivCardReverseBigYellow3></DivCardReverseBigYellow3>
                                 <DivCardReverseBigYellow4></DivCardReverseBigYellow4>
                                 <DivCardReverseBigYellowArrow2></DivCardReverseBigYellowArrow2></>)
                            }
                            {ele.card.n === 's' &&
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
                      { ele.card.c === 'green' &&
                      (<DivCardExt>
                        <DivCardExtGreen>
                          {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                            (<DivCardLitNumber>{ele.card.n}</DivCardLitNumber>)
                          }
                          {ele.card.n === 'r' &&
                            (<DivCardCirLitGreen>
                                <DivCardReverseLitArrow></DivCardReverseLitArrow>
                                <DivCardReverseLit></DivCardReverseLit>
                                <DivCardReverseLit2></DivCardReverseLit2>
                                <DivCardReverseLit3></DivCardReverseLit3>
                                <DivCardReverseLit4></DivCardReverseLit4>
                                <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                             </DivCardCirLitGreen>)
                          }
                          {ele.card.n === 's' &&
                            (<DivCardCirLitGreen>
                              <DivCardSkipLit></DivCardSkipLit>
                              <DivCardSkipLitGreen2></DivCardSkipLitGreen2>
                              <DivCardSkipLit3></DivCardSkipLit3>
                             </DivCardCirLitGreen>)
                          }
                          <DivCardCirBigWhite>
                            {[0,1,2,3,4,5,6,7,8,9].includes(ele.card.n) &&
                              (<DivCardBigNumberGreen>{ele.card.n}</DivCardBigNumberGreen>)
                            }
                            {ele.card.n === '+2' &&
                              (<><DivCardDrawTwoBigGreen></DivCardDrawTwoBigGreen>
                                 <DivCardDrawTwoBigGreen2></DivCardDrawTwoBigGreen2></>)
                            }
                            {ele.card.n === 'r' &&
                              (<><DivCardReverseBigGreenArrow></DivCardReverseBigGreenArrow>
                                 <DivCardReverseBigGreen></DivCardReverseBigGreen>
                                 <DivCardReverseBigGreen2></DivCardReverseBigGreen2>
                                 <DivCardReverseBigGreen3></DivCardReverseBigGreen3>
                                 <DivCardReverseBigGreen4></DivCardReverseBigGreen4>
                                 <DivCardReverseBigGreenArrow2></DivCardReverseBigGreenArrow2></>)
                            }
                            {ele.card.n === 's' &&
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
                      { ele.card.c === 'blue' &&
                      (<DivCardExt>
                        <DivCardExtBlue>
                          {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(ele.card.n) &&
                            (<DivCardLitNumber>{ele.card.n}</DivCardLitNumber>)
                          }
                          {ele.card.n === 'r' &&
                            (<DivCardCirLitBlue>
                                <DivCardReverseLitArrow></DivCardReverseLitArrow>
                                <DivCardReverseLit></DivCardReverseLit>
                                <DivCardReverseLit2></DivCardReverseLit2>
                                <DivCardReverseLit3></DivCardReverseLit3>
                                <DivCardReverseLit4></DivCardReverseLit4>
                                <DivCardReverseLitArrow2></DivCardReverseLitArrow2>
                             </DivCardCirLitBlue>)
                          }
                          {ele.card.n === 's' &&
                            (<DivCardCirLitBlue>
                              <DivCardSkipLit></DivCardSkipLit>
                              <DivCardSkipLitBlue2></DivCardSkipLitBlue2>
                              <DivCardSkipLit3></DivCardSkipLit3>
                             </DivCardCirLitBlue>)
                          }
                          <DivCardCirBigWhite>
                            {[0,1,2,3,4,5,6,7,8,9].includes(ele.card.n) &&
                              (<DivCardBigNumberBlue>{ele.card.n}</DivCardBigNumberBlue>)
                            }
                            {ele.card.n === '+2' &&
                              (<><DivCardDrawTwoBigBlue></DivCardDrawTwoBigBlue>
                                 <DivCardDrawTwoBigBlue2></DivCardDrawTwoBigBlue2></>)
                            }
                            {ele.card.n === 'r' &&
                              (<><DivCardReverseBigBlueArrow></DivCardReverseBigBlueArrow>
                                 <DivCardReverseBigBlue></DivCardReverseBigBlue>
                                 <DivCardReverseBigBlue2></DivCardReverseBigBlue2>
                                 <DivCardReverseBigBlue3></DivCardReverseBigBlue3>
                                 <DivCardReverseBigBlue4></DivCardReverseBigBlue4>
                                 <DivCardReverseBigBlueArrow2></DivCardReverseBigBlueArrow2></>)
                            }
                            {ele.card.n === 's' &&
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
                      { ele.card.c === 'wild' &&
                        (
                        <>
                          <DivCardExt>
                            <DivCardExtWild>
                              {ele.card.n === 'c' &&
                                (<DivCardCirLitWhite>
                                    <DivCardWildColorLit></DivCardWildColorLit>
                                 </DivCardCirLitWhite>)
                              }
                              {ele.card.n === '+4' &&
                                (<DivCardLitNumber>{ele.card.n}</DivCardLitNumber>)
                              }
                              <DivCardCirBigWhite>
                                {ele.card.n === 'c' &&
                                  (<DivCardWildColorBig></DivCardWildColorBig>)
                                }
                                {ele.card.n === '+4' &&
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
                  </ContainerRow>
                )
              else
                return ('')
            })}
          </ContainerRow>
        </ContainerRow>
        <ContainerRow>
          {!values.finishRound &&
            <PMe>{state.player.player_id.name.split('').map(ele => {
              return (
                <>
                  {ele}<br/>
                </>
              )
            })}</PMe>
          }
          {values.finishRound && !values.unoWin &&
            <PWinner>{state.player.player_id.name} is the Winner!!!!</PWinner>
          }
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
                      {ele.n === 's' &&
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
                </ContainerRow>

                { (ele.c === 'wild' ||
                    ele.c === values.pile[values.pile.length - 1].card.c ||
                    ele.n === values.pile[values.pile.length - 1].card.n ||
                    ele.c === values.pile[values.pile.length - 1].color) && !values.finishRound &&
                  <ContainerRow>
                    <PileCard onClick={handleClickPileCard} id={ind}> Play Card </PileCard>
                  </ContainerRow>
                }

                { ele.c === 'wild' &&
                  (
                  <>
                  <ContainerRow>
                    <select id={'color-' + ind} onChange={handleChange} required>
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
          <ContainerColumn>
            { !values.finishRound &&
              <>
                <PickCard onClick={handleClickPickCard} id="PickCard"> Pick Card </PickCard>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="checkUNO" onChange={handleChangeCheckUNO} checked={values.checkUNO} />
                  <label class="form-check-label" for="checkUNO">I say UNO!!!!</label>
                </div>
              </>
            }
          </ContainerColumn>
        </ContainerRow>
      </ContainerColumn>
    </WrapperGen>
  )

}

export default PlayGame

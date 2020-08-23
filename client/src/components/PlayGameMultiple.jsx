import React, { useState, useContext, useEffect } from 'react'
import { GameContext, Card, MiniCard, socket, Points } from '../components'
import api from '../api'
import styled from 'styled-components'

const WrapperGen = styled.div
`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`
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
const PUnoLit = styled.div.attrs({ className: 'text-dark text-center' })
`
  width: 125px;
  font-size: 10px;
`
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
const PScore = styled.div.attrs({ className: 'text-dark text-center' })
`
  font-size: 15px;
`
const StartGame = styled.button.attrs({ className: 'btn btn-secondary' })
``
const PUnoLitNumber = styled.div.attrs({ className: 'text-dark text-center' })
`
  width: 20px;
  height: 20px;
  font-size: 10px;
  border: 1px solid black;
  border-radius: 10px;
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

const value = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '+2': 20, 's': 20, 'r': 20, '+4': 50, 'c': 50 }

function PlayGameMultiple(props) {

  const init = () => {
    if (state.game.creator_id._id === state.user._id) {
      let cards = [...cardsOrder], pile = []
      const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i)
      cards.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] )

      //let end = cards.length - 20
      //for (let ind = 0; ind < end; ind++) {
      //  pile.push({ card: cards.pop(), player: null, color: null, drawDone: true })
      //}

      return ({unoTurn: -1, playerPickCard: false, startGame: false, nextTurnStep: 1,
              cards: cards, pile: pile, finishRound: false, numberPlay: 0, unoWin: -1,
              numCards: Number(state.game.cards), mySocket: null, round: state.game.curr_round,
              viewUnoCards: false, playersUno: {}, cardIndex: -1, wildColor: null, pickCard: false, checkUno: false })
    } else {
      return ({})
    }
  }

  const initCardsAgain = (pile) => {
    let cards = []
    pile.filter(ele => ele.card.c !== null && ele.card.o !== null).forEach(ele => cards.unshift(ele.card))

    cards.shift()
    const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i)
    cards.forEach( (elem, i, arr, j = getRandomValue(i, arr.length)) => [arr[i], arr[j]] = [arr[j], arr[i]] )

    let pilef = pile.filter(ele => ele.card.c !== null && ele.card.o !== null)
    let last = pilef[pilef.length - 1]

    let pileAux = []
    pileAux.push(last)

    return { cards: cards, pile: pileAux }
  }

  const play = () => {
    let {playersUno,
        unoTurn,
        nextTurnStep,
        numCards,
        finishRound,
        playerPickCard,
        numberPlay,
        unoWin,
        cards,
        pile,
        cardIndex,
        wildColor,
        pickCard,
        checkUno,
        startGame,
        viewUnoCards,
        mySocket,
        round} = values

    if (state.game.creator_id._id !== state.user._id) return
    if (!values.startGame) return
    socket.emit('sincro', { playersUno: playersUno, unoTurn: unoTurn, nextTurnStep: nextTurnStep, finishRound: finishRound, playerPickCard: playerPickCard, numberPlay: numberPlay,
      unoWin: unoWin, cards: cards, pile: pile, cardIndex: cardIndex, wildColor: wildColor, pickCard: pickCard, checkUno: checkUno, startGame: startGame, numCards: numCards,
      viewUnoCards: viewUnoCards }, state.game._id)
    if (values.finishRound) return

    let firstTime = false
    if (Object.entries(playersUno).length === 0) {
      firstTime = true
      Object.entries(state.listUserGame).forEach(([ind, ele]) => {
        if (ele.game_id === state.game._id) {
          for (let i = 0; i < state.players.length; i++) {
            let auxCards = []
            if (ele.user_id === state.players[i].user_id._id) {
              for (let c = 0; c < numCards; c++) {
                let aux = cards.pop()
                auxCards.push({ card: aux, numberPlay: numberPlay })
              }
              playersUno[ind] = { user: state.players[i].user_id, cards: auxCards, pile: [], uno: false, player: state.players[i] }
              break
            }
          }
        }
      })
      let auxCards = []
      for (let c = 0; c < numCards; c++) {
        let aux = cards.pop()
        auxCards.push({ card: aux, numberPlay: numberPlay })
      }
      playersUno['UNO'] = { user: state.uno.user_id, cards: auxCards, pile: [], uno: true, player: state.uno }
      unoTurn = Object.entries(playersUno).length - 1
      if (pile.length === 0) {
        while (true) {
          let aux = cards.pop()
          if (['red', 'yellow', 'green', 'blue'].includes(aux.c) && [0,1,2,3,4,5,6,7,8,9].includes(aux.n)) {
            pile.push({ card: aux, user_id: null, color: null, drawDone: true, numberPlay: numberPlay, name: '---' })
            break
          } else {
            cards.unshift(aux)
          }
        }
      }
    }

    let obj = {}
    if (unoTurn === Object.entries(playersUno).length - 1) {
      obj = unoPlay({ unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep, round })
      playersUno = obj.playersUno
      unoTurn = obj.unoTurn
      nextTurnStep = obj.nextTurnStep
      finishRound = obj.finishRound
      playerPickCard = obj.playerPickCard
      numberPlay = obj.numberPlay
      unoWin = obj.unoWin
      cards = obj.cards
      pile = obj.pile
      checkUno = false
      round = obj.round
    } else {
      obj = {}
      if (cardIndex > -1) {
        obj = pileACard({ unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep, cardIndex, wildColor, checkUno, round })
        playersUno = obj.playersUno
        unoTurn = obj.unoTurn
        nextTurnStep = obj.nextTurnStep
        finishRound = obj.finishRound
        playerPickCard = obj.playerPickCard
        numberPlay = obj.numberPlay
        unoWin = obj.unoWin
        cards = obj.cards
        pile = obj.pile
        cardIndex = -1
        wildColor = null
        checkUno = false
        round = obj.round
      } else if (pickCard) {
        obj = pickACard({ unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep })
        playersUno = obj.playersUno
        unoTurn = obj.unoTurn
        nextTurnStep = obj.nextTurnStep
        finishRound = obj.finishRound
        playerPickCard = obj.playerPickCard
        numberPlay = obj.numberPlay
        unoWin = obj.unoWin
        cards = obj.cards
        pile = obj.pile
        pickCard = false
        checkUno = false
      } else {
        if (firstTime) {
          setValues(values =>({ ...values, playersUno: playersUno, unoTurn: unoTurn, nextTurnStep: nextTurnStep, finishRound: finishRound, playerPickCard: playerPickCard, numberPlay: numberPlay,
            unoWin: unoWin, cards: cards, pile: pile, cardIndex: cardIndex, wildColor: wildColor, pickCard: pickCard, checkUno: checkUno, startGame: startGame, numCards: numCards,
            viewUnoCards: viewUnoCards, round: round }))
          socket.emit('sincro', { playersUno: playersUno, unoTurn: unoTurn, nextTurnStep: nextTurnStep, finishRound: finishRound, playerPickCard: playerPickCard, numberPlay: numberPlay,
            unoWin: unoWin, cards: cards, pile: pile, cardIndex: cardIndex, wildColor: wildColor, pickCard: pickCard, checkUno: checkUno, startGame: startGame, numCards: numCards,
            viewUnoCards: viewUnoCards, round: round }, state.game._id)
        }
        return
      }
    }

    setValues(values =>({ ...values, playersUno: playersUno, unoTurn: unoTurn, nextTurnStep: nextTurnStep, finishRound: finishRound, playerPickCard: playerPickCard, numberPlay: numberPlay,
      unoWin: unoWin, cards: cards, pile: pile, cardIndex: cardIndex, wildColor: wildColor, pickCard: pickCard, checkUno: checkUno, startGame: startGame, numCards: numCards,
      viewUnoCards: viewUnoCards, round: round }))
    socket.emit('sincro', { playersUno: playersUno, unoTurn: unoTurn, nextTurnStep: nextTurnStep, finishRound: finishRound, playerPickCard: playerPickCard, numberPlay: numberPlay,
      unoWin: unoWin, cards: cards, pile: pile, cardIndex: cardIndex, wildColor: wildColor, pickCard: pickCard, checkUno: checkUno, startGame: startGame, numCards: numCards,
      viewUnoCards: viewUnoCards, round: round }, state.game._id)
  }

  const nextPlayer = (unoTurn, nextTurnStep, length) => {
    if (unoTurn + nextTurnStep > length - 1) {
      return 0
    } else if (unoTurn + nextTurnStep < 0) {
      return length - 1
    } else {
      return unoTurn + nextTurnStep
    }
  }

  const unoPlay = (obj) => {
    let { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep, round } = obj

    if (finishRound) return obj
    if (unoTurn < Object.entries(playersUno).length - 1) return obj

    let pilef = pile.filter(ele => ele.card.c !== null && ele.card.o !== null)
    let lastCardPile = pilef[pilef.length - 1].card
    let lastColorPile = pilef[pilef.length - 1].color
    let drawDone = pilef[pilef.length - 1].drawDone
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile
    let arrHaveColorIndex = [], arrHaveNumberIndex = [], haveColorIndex = null, haveNumberIndex = null, haveCIndex = null, haveCd4Index = null, haveColorD2Index = null, haveColorReverseIndex = null, haveColorSkipIndex = null, rankingColor = { 'red': 0, 'yellow': 0, 'green': 0, 'blue': 0 }, rankingNumber = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '+2': 0, 's': 0, 'r': 0 }

    if (!drawDone && lastCardPile.n === '+4') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)
      playerPickCard = false
      for (let i = pile.length - 1; i >= 0; i--) {
        let ele = pile[i]
        if (ele.card.c !== null && ele.card.n !== null && ele.card.o !== null) {
          pile[i].drawDone = true
          break
        }
      }
      return { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay: numberPlay + 1, unoWin, playersUno, nextTurnStep }
    } else if (!drawDone && lastCardPile.n === '+2') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)
      playerPickCard = false
      for (let i = pile.length - 1; i >= 0; i--) {
        let ele = pile[i]
        if (ele.card.c !== null && ele.card.n !== null && ele.card.o !== null) {
          pile[i].drawDone = true
          break
        }
      }
      return { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay: numberPlay + 1, unoWin, playersUno, nextTurnStep }
    } else {
      let iHaveACard = false, keepTurn = false, index = null, color = null
      while (true) {
        let pilef = pile.filter(ele => ele.card.c !== null && ele.card.o !== null)
        lastCardPile = pilef[pilef.length - 1].card
        lastColorPile = pilef[pilef.length - 1].color
        drawDone = pilef[pilef.length - 1].drawDone
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
        for (let ind = 0; ind < Object.entries(playersUno)[unoTurn][1].cards.length; ind++) {
          let ele = Object.entries(playersUno)[unoTurn][1].cards[ind]
          if (ele.card.c === nextColor) arrHaveColorIndex.push([ele.card.n.toString(), ind])
          if (ele.card.c === nextColor && ele.card.n === '+2') haveColorD2Index = ind
          if (ele.card.c === nextColor && ele.card.n === 'r') haveColorReverseIndex = ind
          if (ele.card.c === nextColor && ele.card.n === 's') haveColorSkipIndex = ind
          if (ele.card.n === nextNumber) arrHaveNumberIndex.push([ele.card.c, ind])
          if (ele.card.n === 'c') haveCIndex = ind
          if (ele.card.n === '+4') haveCd4Index = ind
          if (ele.card.c !== 'wild') {
            rankingColor[ele.card.c]++
            rankingNumber[ele.card.n.toString()]++
          }
        }
        let arrRankingColor = Object.entries(rankingColor).sort((a,b) => b[1] - a[1])
        let arrRankingNumber = Object.entries(rankingNumber).sort((a,b) => b[1] - a[1])

        let exit = false
        for (let i = 0; i < arrRankingColor.length; i++) {
          for (let j = 0; j < arrHaveNumberIndex.length; j++ ) {
            if (arrRankingColor[i][0] === arrHaveNumberIndex[j][0]) {
              haveNumberIndex = arrHaveNumberIndex[j][1]
              exit = true
              break
            }
          }
          if (exit) break
        }

        exit = false
        for (let i = arrRankingNumber.length - 1; i >= 0; i--) {
          for (let j = 0; j < arrHaveColorIndex.length; j++ ) {
            if (arrRankingNumber[i][0] === arrHaveColorIndex[j][0]) {
              haveColorIndex = arrHaveColorIndex[j][1]
              exit = true
              break
            }
          }
          if (exit) break
        }

        if (Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.length <= 3) {
          if (haveColorD2Index !== null) {
            index = haveColorD2Index
            color = null
          } else if (haveCd4Index !== null) {
            index = haveCd4Index
            if (nextColor === arrRankingColor[0][0]) {
              if (arrRankingColor[1][1] > 0)
                color = arrRankingColor[1][0]
              else
                color = arrRankingColor[0][0]
            } else {
              color = arrRankingColor[0][0]
            }
          } else if (haveColorSkipIndex !== null) {
            index = haveColorSkipIndex
            color = null
          } else if (haveColorReverseIndex !== null) {
            index = haveColorReverseIndex
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
          } else if (haveNumberIndex !== null) {
            index = haveNumberIndex
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
          if (haveColorIndex !== null) {
            index = haveColorIndex
            color = null
          } else if (haveNumberIndex !== null) {
            index = haveNumberIndex
            color = null
          } else if (haveColorSkipIndex !== null) {
            index = haveColorSkipIndex
            color = null
          } else if (haveColorReverseIndex !== null) {
            index = haveColorReverseIndex
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
            if (nextColor === arrRankingColor[0][0]) {
              if (arrRankingColor[1][1] > 0)
                color = arrRankingColor[1][0]
              else
                color = arrRankingColor[0][0]
            } else {
              color = arrRankingColor[0][0]
            }
          } else {
            // robar carta
            index = null
            color = null
          }
        }
        if (index === null) {
          if (!iHaveACard) {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            iHaveACard = true
            keepTurn = true
          } else {
            pile.push({ card: { c: null, n: 'pickedCard', o: null }, user_id: state.uno.user_id._id, color: null, drawDone: true, numberPlay: numberPlay, name: state.uno.user_id.name })
            Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'pickedCard', o: null }, user_id: state.uno.user_id._id, color: null, drawDone: true, numberPlay: numberPlay, name: state.uno.user_id.name })
          }
        } else {
          let aux = Object.entries(playersUno)[unoTurn][1].cards.splice(index, 1)[0].card
          pile.push({ card: aux, user_id: state.uno.user_id._id, color: color, drawDone: true, numberPlay: numberPlay, name: state.uno.user_id.name })
          Object.entries(playersUno)[unoTurn][1].pile.push({ card: aux, user_id: state.uno.user_id._id, color: color, drawDone: true, numberPlay: numberPlay, name: state.uno.user_id.name })

          if (Object.entries(playersUno)[unoTurn][1].cards.length === 0) {
            finishRound = true
            unoWin = unoTurn
            playersUno = unoFinishWin(unoWin, playersUno)
            round++
          }

          if (aux.n === '+4') {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)

            pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
            Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

          } else if (aux.n === '+2') {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
            unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)

            pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
            Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

          } else if (aux.n === 'r') {
            nextTurnStep = nextTurnStep * (-1)
          } else if (aux.n === 's') {
            unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)

            pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
            Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

          }

        }

        if (!keepTurn) break

      } // while
    } // else

    unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)
    playerPickCard = false
    return { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay: numberPlay + 1, unoWin, playersUno, nextTurnStep, round }
  }

  const pileACard = (obj) => {
    let { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep, cardIndex, wildColor, checkUno, round } = obj
    if (finishRound) return obj
    if (unoTurn === Object.entries(playersUno).length - 1) return obj

    let pilef = pile.filter(ele => ele.card.c !== null && ele.card.o !== null)
    let lastCardPile = pilef[pilef.length - 1].card
    let lastColorPile = pilef[pilef.length - 1].color
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let selectedCard = Object.entries(playersUno)[unoTurn][1].cards[cardIndex].card

    if (selectedCard.n === 'c' || selectedCard.n === '+4') {
      selectedCard = Object.entries(playersUno)[unoTurn][1].cards.splice(cardIndex, 1)[0].card
      pile.push({ card: selectedCard, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: wildColor, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
      Object.entries(playersUno)[unoTurn][1].pile.push({ card: selectedCard, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: wildColor, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
    } else {
      if (selectedCard.c !== nextColor && selectedCard.n !== nextNumber) {
        return
      } else {
        selectedCard = Object.entries(playersUno)[unoTurn][1].cards.splice(cardIndex, 1)[0].card
        pile.push({ card: selectedCard, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
        Object.entries(playersUno)[unoTurn][1].pile.push({ card: selectedCard, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
      }
    }

    if (Object.entries(playersUno)[unoTurn][1].cards.length === 0) {
      finishRound = true
      unoWin = unoTurn
      playersUno = unoFinishWin(unoWin, playersUno)
      round++
    }
    if (Object.entries(playersUno)[unoTurn][1].cards.length === 1 && !checkUno) {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
    }

    if (selectedCard.n === '+4') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)

      pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
      Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

    } else if (selectedCard.n === '+2') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      Object.entries(playersUno)[nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })
      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)

      pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
      Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

    } else if (selectedCard.n === 'r') {
      nextTurnStep = nextTurnStep * (-1)
    } else if (selectedCard.n === 's') {
      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)

      pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
      Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'lostTurn', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

    }

    unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)
    playerPickCard = false

    return { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay: numberPlay + 1, unoWin, playersUno, nextTurnStep, cardIndex, wildColor, round }
  }

  const pickACard = (obj) => {
    let { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep } = obj
    if (finishRound) return obj

    let pilef = pile.filter(ele => ele.card.c !== null && ele.card.o !== null)
    let lastCardPile = pilef[pilef.length - 1].card
    let lastColorPile = pilef[pilef.length - 1].color
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let iCanPlay = false
    Object.entries(playersUno)[unoTurn][1].cards.forEach((ele, ind) => {
      if (ele.card.c === 'wild' || ele.card.c === nextColor || ele.card.n === nextNumber ) {
        iCanPlay = true
      }
    })

    if (!iCanPlay && playerPickCard) {
      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)
      playerPickCard = false
      return { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep }
    }

    if (iCanPlay || playerPickCard) {
      return obj
    }

    if (cards.length === 0) {
      let obj = initCardsAgain(pile)
      cards = obj.cards
      pile = obj.pile
    }
    Object.entries(playersUno)[unoTurn][1].cards.push({ card: cards.pop(), numberPlay: numberPlay })

    iCanPlay = false
    Object.entries(playersUno)[unoTurn][1].cards.forEach((ele, ind) => {
      if (ele.card.c === 'wild' || ele.card.c === nextColor || ele.card.n === nextNumber ) {
        iCanPlay = true
      }
    })

    if (!iCanPlay) {

      pile.push({ card: { c: null, n: 'pickedCard', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })
      Object.entries(playersUno)[unoTurn][1].pile.push({ card: { c: null, n: 'pickedCard', o: null }, user_id: Object.entries(playersUno)[unoTurn][1].user._id, color: null, drawDone: true, numberPlay: numberPlay, name: Object.entries(playersUno)[unoTurn][1].user.name })

      unoTurn = nextPlayer(unoTurn, nextTurnStep, Object.entries(playersUno).length)
      playerPickCard = false
    } else {
      playerPickCard = true
    }

    return { unoTurn, cards, pile, playerPickCard, finishRound, numberPlay, unoWin, playersUno, nextTurnStep }
  }

  const unoFinishWin = (unoWin, playersUno) => {
    let game = state.game
    let t = 0
    for (let i = 0; i < Object.entries(playersUno).length; i++) {
      for (let j = 0; j < Object.entries(playersUno)[i][1].cards.length; j++) {
        t += Number(value[Object.entries(playersUno)[i][1].cards[j].card.n.toString()])
      }
    }
    game.curr_round++
    let player_id = Object.entries(playersUno)[unoWin][1].player._id
    api.getPlayerById(player_id).then(player => {
      let payload = { score: player.data.data[0].score + t }
      api.updatePlayerById(player_id, payload).then(player2 => {
        api.getPlayersByGameId(state.game._id).then(players => {
          let payload2 = { curr_round: game.curr_round }
          api.updateGameById(game._id, payload2).then(game2 => {
            playersUno[Object.entries(playersUno)[unoWin][0]].player.score = player.data.data[0].score + t
            setState(state => ({ ...state, players: players.data.data, game: game }))
          })
          .catch(error => {
            console.log(error)
          })
        })
        .catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
    return playersUno
  }

  const handleClickStartGame = (event) => {
    if (event) event.preventDefault()
    if (Object.entries(state.listUserGame).filter((ele, ind) => ele[1].game_id === state.game._id).length < 2) return
    socket.emit('start', { message: 'Player ' + state.user.name + ' Start the game ' + state.game.keyWord + '.', user_id: state.user._id, game_id: state.game._id });
  }

  const handleClickPileCard = (event) => {
    if (event) event.preventDefault()
    if (document.getElementById('color-' + event.target.id)) {
      if (!document.getElementById('color-' + event.target.id).value) return
      socket.emit('pile card', { cardIndex: event.target.id, wildColor: document.getElementById('color-' + event.target.id).value, checkUno: document.getElementById('checkUno').checked }, state.game._id)
    } else {
      socket.emit('pile card', { cardIndex: event.target.id, wildColor: null, checkUno: document.getElementById('checkUno').checked }, state.game._id)
    }
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value }))
  }

  const handleClickPickCard = (event) => {
    if (event) event.preventDefault()
    socket.emit('pick card', { pickCard: true  }, state.game._id)
  }

  const handleClickCancelGame = (event) => {
    if (event) event.preventDefault()
    socket.emit('cancel game', { user_id: state.user._id }, state.game._id)
  }

  const handleClickCancel = (event) => {
    if (event) event.preventDefault()
    socket.emit('cancel', { user_id: state.user._id }, state.game._id)
  }

  const handleClickNewGame = (event) => {
    if (event) event.preventDefault()
    setValues(values => ({ ...values, ...init() }))
    socket.emit('start', { message: 'Player ' + state.user.name + ' Start the game ' + state.game.keyWord + '.', user_id: state.user._id, game_id: state.game._id });
  }

  const handleViewUnoCards = (event) => {
    if (event) event.preventDefault()
    socket.emit('sincro view', { viewUnoCards: !values.viewUnoCards }, state.game._id)
    setValues(values => ({ ...values, viewUnoCards: !values.viewUnoCards }))
  }

  const handleChangeCheckUNO = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.checked }))
  }

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState(init())
  const [ response, setResponse ] = useState(" waiting ")

  useEffect(() => {
    socket.on("log in", (obj, id, listClients) => {
     //console.log('emit log in', obj, id, listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
      setResponse(obj.message)
    })
    socket.on("game", (obj, id, listClients) => {
     //console.log('emit game',obj, id, listClients)
      api.getPlayersByGameId(obj.game_id).then(players => {
        setState(state => ({ ...state, players: players.data.data, listUserGame: listClients }))
        setValues(values => ({ ...values, mySocket: socket.id, playersUno: (!values.playersUno ? {} : values.playersUno) }))
      })
      .catch(error => {
        console.log(error)
      })
      setResponse(obj.message)
    })
    socket.on("log out", (obj, id, listClients) => {
     //console.log('emit log out', obj, id, listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
      //socket.emit('cancel game', { user_id: state.user._id }, state.game._id)
      setResponse(obj.message)
    })
    socket.on("start", (obj, id, listClients) => {
     //console.log('emit start', obj, id, listClients)
      setState(state => ({ ...state, listUserGame: listClients }))
      setValues(values => ({ ...values, startGame: true, mySocket: socket.id }))
      setResponse(obj.message)
    })
    socket.on("sincro", (obj, id, listClients, message) => {
      if (state.game.creator_id._id !== state.user._id) {
       //console.log('emit sincro', obj, id, listClients)
        setState(state => ({ ...state, listUserGame: listClients }))
        setValues(values => ({ ...values, ...obj, mySocket: socket.id }))
        setResponse(message)
      }
    })
    socket.on("pile card", (obj, id, listClients, message) => {
      if (state.game.creator_id._id === state.user._id) {
       //console.log('emit pile card', obj, id, listClients)
        setState(state => ({ ...state, listUserGame: listClients }))
        setValues(values => ({ ...values, ...obj }))
        setResponse(message)
      }
    })
    socket.on("pick card", (obj, id, listClients, message) => {
      if (state.game.creator_id._id === state.user._id) {
       //console.log('emit pick card', obj, id, listClients)
        setState(state => ({ ...state, listUserGame: listClients }))
        setValues(values => ({ ...values, ...obj }))
        setResponse(message)
      }
    })
    socket.on("cancel game", (obj, id, listClients, message) => {
      //if (state.game.creator_id._id === state.user._id) {
       //console.log('emit cancel', obj, id, listClients)
        setState(state => ({ ...state, game: null, player: null, uno: null, listUserGame: listClients }))
        setResponse(message)
      //}
    })
    socket.on("new connection", (obj, id, listClients) => {
      //if (state.game.creator_id._id === state.user._id) {
       //console.log('emit cancel', obj, id, listClients)
        setState(state => ({ ...state, game: null, player: null, uno: null, listUserGame: listClients }))
        //socket.emit('cancel game', { user_id: state.user._id }, state.game._id)
        //setResponse(message)
      //}
    })
    socket.on("cancel", (obj, id, listClients, message) => {
     //console.log('emit cancel', obj, id, listClients)
      if (obj.user_id === state.user._id) {
        setState(state => ({ ...state, game: null, player: null, uno: null, listUserGame: listClients }))
      } else {
        setState(state => ({ ...state, listUserGame: listClients }))
      }
      setResponse(message)
    })
    socket.on("sincro view", (obj, id, listClients, message) => {
      //if (state.game.creator_id._id !== state.user._id) {
       //console.log('emit sincro view', obj, id, listClients)
        setState(state => ({ ...state, listUserGame: listClients }))
        setValues(values => ({ ...values, ...obj }))
        setResponse(message)
      //}
    })

    //return (() => socket.disconnect())

  }, [])

  useEffect(() => {
    //console.log('uno Play')
    play()
  })

 //console.log('play multiplayer game render', state, values)
  return (
    <WrapperGen>
      <div style={{ display: 'none' }} style={{ fontSize: '20px', color: '#ddd', backgroundColor: '#222' }}>
        ::: {response} :::
      </div>
      <hr />
      { state.game.creator_id._id === state.user._id && !values.startGame &&
        <ContainerRow>
          <StartGame onClick={handleClickStartGame}>Start Game</StartGame>
          <ContainerColumn>
            <PUnoLit>All posible Players: {state.players.length}</PUnoLit>
            <PUnoLit>Connected Players: {state.listUserGame ? Object.entries(state.listUserGame).filter((ele, ind) => ele[1].game_id === state.game._id).length : '0'}</PUnoLit>
          </ContainerColumn>
          <CancelGame onClick={handleClickCancel} id="Cancel"> Cancel Game </CancelGame>
        </ContainerRow>
      }

      { state.game.creator_id._id !== state.user._id && !values.startGame &&
        <ContainerRow>
          <p>Waiting for the principal player start the game</p>
          <ContainerColumn>
            <PUnoLit>All posible Players: {state.players.length}</PUnoLit>
            <PUnoLit>Connected Players: {state.listUserGame ? Object.entries(state.listUserGame).filter((ele, ind) => ele[1].game_id === state.game._id).length : '0'}</PUnoLit>
          </ContainerColumn>
          <CancelGame onClick={handleClickCancel} id="Cancel"> Cancel Game </CancelGame>
        </ContainerRow>
      }

      { values.startGame && !(Object.entries(values.playersUno).length > 0 && values.mySocket && values.playersUno[values.mySocket] ? values.playersUno[values.mySocket].user._id === state.user._id : false) &&
        <ContainerRow>
          <p>The game is running now. Waiting for the principal player start a new round</p>
          <ContainerColumn>
            <PUnoLit>All posible Players: {state.players.length}</PUnoLit>
            <PUnoLit>Connected Players: {state.listUserGame ? Object.entries(state.listUserGame).filter((ele, ind) => ele[1].game_id === state.game._id).length : '0'}</PUnoLit>
          </ContainerColumn>
          <CancelGame onClick={handleClickCancel} id="Cancel"> Cancel Game </CancelGame>
        </ContainerRow>
      }

      { values.startGame && (Object.entries(values.playersUno).length > 0 && values.mySocket && values.playersUno[values.mySocket] ? values.playersUno[values.mySocket].user._id === state.user._id : false) &&
        (
          <ContainerColumn>
            <ContainerRow>
              <CancelGame onClick={handleClickCancelGame} id="CancelGame"> Cancel Game </CancelGame>
              { state.game.creator_id._id === state.user._id && values.finishRound &&
                <NewGame onClick={handleClickNewGame} id="NewGame"> New Game </NewGame>
              }
              <ViewUnoCards onClick={handleViewUnoCards} id="ViewUnoCards"> View / Hide All Cards </ViewUnoCards>
              <ContainerColumn>
                <PUnoLit> # Cards left: {values.cards.length}</PUnoLit>
                <PUnoLit> # Round: {values.round}</PUnoLit>
              </ContainerColumn>
            </ContainerRow>

            <ContainerRow>
              <ContainerRow>
                <ContainerRow style={{ backgroundColor: 'lightgray' }}>
                  {values.pile.map((ele, ind) => {
                    if (ind > values.pile.length - 11 && ind !== values.pile.length - 1)
                      return(
                       ele.user_id === state.user._id ?
                        (
                          <MiniCard name={ele.name.substr(0,6)} color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="end" width={50} height={35} />
                        )
                        :
                        !ele.user_id ?
                        (
                          <MiniCard name={ele.name.substr(0,6)} color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="center" width={50} height={35} />
                        )
                        :
                        (
                          <MiniCard name={ele.name.substr(0,6)} color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="start" width={50} height={35} />
                        )
                      )
                    else
                      return ('')
                  })}

                  {values.pile.map((ele, ind) => {
                    if (ind === values.pile.length - 1)
                      return (
                        <ContainerColumn key={ind + ele.user_id}>
                          <PUnoLit>{ele.name.substr(0,6)}</PUnoLit>
                          <Card color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} width={125} height={200} lastCard={values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null)[values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null).length - 1]} />
                          <PUnoLit>NEXT : {Object.entries(values.playersUno)[values.unoTurn][1].user.name.substr(0,6)}</PUnoLit>
                        </ContainerColumn>
                      )
                    else
                      return ('')
                  })}
                </ContainerRow>
              </ContainerRow>
            </ContainerRow>

            <ContainerRow>
              <ContainerColumn>
                {
                  Object.entries(values.playersUno).map((e, i, a) => {
                    //{console.log('1:', i, '-1:', a.length - 1 - i, 'e', e, 'e arr', a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1])}
                    if (a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].user._id !== state.user._id)
                      return (
                        <ContainerRow style={ values.unoTurn === (values.nextTurnStep === 1 ? i : a.length - 1 - i) ? { border: '3px solid black'} : { border: '0px solid black' }}>
                          <PUnoLitNumber> {i + 1} </PUnoLitNumber>
                          {!(values.finishRound && values.unoWin === (values.nextTurnStep === 1 ? i : a.length - 1 - i)) &&
                            <PUno>{a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].user.name.substr(0,6)}</PUno>
                          }
                          <PScore> ({a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].player.score}) </PScore>
                          {values.finishRound && values.unoWin === (values.nextTurnStep === 1 ? i : a.length - 1 - i) &&
                            <PWinner>{a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].user.name} is the Winner!!!!</PWinner>
                          }
                          {
                            a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].cards.map((ele, ind) => {
                              if (values.viewUnoCards || values.finishRound)
                                return (
                                  <ContainerRow key={ind} id={ind}>
                                    <MiniCard color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="center" width={55} height={35} />
                                  </ContainerRow>
                                )
                              else
                                return (
                                  <ContainerRow key={ind} id={ind}>
                                    <MiniCard color={'red'} wildColor={null} number={'UNO'} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="center" width={55} height={35} />
                                  </ContainerRow>
                                )
                            })
                          }
                          { (values.viewUnoCards || values.finishRound) &&
                            <Points cards={a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].cards} />
                          }
                        </ContainerRow>
                      )
                    else
                      return (
                        <ContainerRow style={ values.unoTurn === (values.nextTurnStep === 1 ? i : a.length - 1 - i) ? { border: '3px solid black'} : { border: '0px solid black' }}>
                          <PUnoLitNumber> {i + 1} </PUnoLitNumber>
                          {!(values.finishRound && values.unoWin === (values.nextTurnStep === 1 ? i : a.length - 1 - i)) &&
                            <PMe>{a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].user.name.split('').map((ele, ind) => {
                              if (ind <= 5)
                                return (
                                  <>
                                    {ele}<br/>
                                  </>
                                )
                              else {
                                return null
                              }
                            })}</PMe>
                          }
                          <PScore> ({a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].player.score}) </PScore>
                          {values.finishRound && values.unoWin === (values.nextTurnStep === 1 ? i : a.length - 1 - i) &&
                            <PWinner>{a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].user.name} is the Winner!!!!</PWinner>
                          }
                          {a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].cards.map((ele, ind) => {
                            return (
                              <ContainerColumn key={ind} id={ind}>
                                <ContainerRow>
                                  <Card color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} width={125} height={200} />
                                </ContainerRow>

                                { (ele.card.c === 'wild' ||
                                    ele.card.c === values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null)[values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null).length - 1].card.c ||
                                    ele.card.n === values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null)[values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null).length - 1].card.n ||
                                    ele.card.c === values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null)[values.pile.filter(ele => ele.card.c !== null && ele.card.o !== null).length - 1].color) &&
                                    !values.finishRound && values.unoTurn === (values.nextTurnStep === 1 ? i : a.length - 1 - i) &&
                                  (<ContainerRow>
                                    <PileCard onClick={handleClickPileCard} id={ind}> Play Card </PileCard>
                                  </ContainerRow>)
                                }

                                { ele.card.c === 'wild' && !values.finishRound && values.unoTurn === (values.nextTurnStep === 1 ? i : a.length - 1 - i) &&
                                  (<ContainerRow>
                                    <select id={'color-' + ind} onChange={handleChange} required>
                                      <option value=""></option>
                                      <option value="red">red</option>
                                      <option value="yellow">yellow</option>
                                      <option value="green">green</option>
                                      <option value="blue">blue</option>
                                    </select>
                                  </ContainerRow>)
                                }
                              </ContainerColumn>
                            )
                          })
                          }
                          <ContainerColumn>
                            { !values.finishRound && values.unoTurn === (values.nextTurnStep === 1 ? i : a.length - 1 - i) &&
                              (<>
                                  <PickCard onClick={handleClickPickCard} id="PickCard"> Pick Card </PickCard>
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="checkUno" onChange={handleChangeCheckUNO} checked={values.checkUno} />
                                    <label className="form-check-label" htmlFor="checkUno">I say UNO!!!!</label>
                                  </div>
                              </>)
                            }
                            <Points cards={a[values.nextTurnStep === 1 ? i : a.length - 1 - i][1].cards} />
                          </ContainerColumn>
                        </ContainerRow>
                      )
                  })
                }
              </ContainerColumn>
            </ContainerRow>

          </ContainerColumn>
        )
      }
    </WrapperGen>
  )
}

export default PlayGameMultiple

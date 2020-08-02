import React, { useState, useContext, useEffect } from 'react'
import { GameContext, Card, MiniCard } from '../components'
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

function PlayGameAlone (props) {

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
    let { unoTurn, unoCards, unoCardsPile, playerCards,
          cards, pile, numCards, playerPickCard, finishRound, numberPlay, unoWin } = values
    if (finishRound) return
    if (unoCards.length === 0 && playerCards.length === 0) {
      for (let c = 0; c < numCards; c++) {
        let aux = cards.pop()
        unoCards.push({ card: aux, numberPlay: numberPlay })
        aux = cards.pop()
        playerCards.push({ card: aux, numberPlay: numberPlay })
      }
    }

    if (pile.length === 0) {
      while (true) {
        let aux = cards.pop()
        if (['red', 'yellow', 'green', 'blue'].includes(aux.c) && [0,1,2,3,4,5,6,7,8,9].includes(aux.n)) {
          pile.push({ card: aux, player: null, color: null, drawDone: true, numberPlay: numberPlay })
          break
        } else {
          cards.unshift(aux)
        }
      }
    }

    if (!unoTurn) return

    let lastCardPile = pile[pile.length - 1].card
    //let lastPlayerPile = pile[pile.length - 1].player
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
      unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
      unoTurn = false
      pile[pile.length - 1].drawDone = true
      setValues(values => ({ ...values, unoTurn: unoTurn, pile: pile,
                            unoCards: unoCards, cards: cards, numberPlay: numberPlay + 1 }))
      return
    } else if (!drawDone && lastCardPile.n === '+2') {
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
      unoTurn = false
      pile[pile.length - 1].drawDone = true
      setValues(values => ({ ...values, unoTurn: unoTurn, pile: pile,
                            unoCards: unoCards, cards: cards, numberPlay: numberPlay + 1 }))
      return
    } else {
      let iHaveACard = false, keepTurn = false, index = null, color = null
      while (true) {
        lastCardPile = pile[pile.length - 1].card
        //lastPlayerPile = pile[pile.length - 1].player
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
        for (let ind = 0; ind < unoCards.length; ind++) {
          let ele = unoCards[ind]
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
          unoCards.push({ card: cards.pop(), numberPlay: numberPlay })
          iHaveACard = true
        } else {
          let aux = unoCards.splice(index, 1)[0].card
          pile.push({ card: aux, player: state.uno._id, color: color, drawDone: true, numberPlay: numberPlay })
          unoCardsPile.push({ card: aux, player: state.uno._id, color: color, drawDone: true, numberPlay: numberPlay })

          if (aux.n === '+4') {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
            keepTurn = true
          } else if (aux.n === '+2') {
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
            if (cards.length === 0) {
              let obj = initCardsAgain(pile)
              cards = obj.cards
              pile = obj.pile
            }
            playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
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
                          unoCardsPile: unoCardsPile, numberPlay: numberPlay + 1,
                          cards: cards, pile: pile, finishRound: finishRound, unoWin: unoWin }))
  }

  const handleClickPileCard = (event) => {
    if (event) event.preventDefault()
    let { unoTurn, playerCards, playerCardsPile,
          cards, pile, finishRound, numberPlay, unoWin, checkUNO } = values
    if (finishRound) return
    if (unoTurn) return
    if (document.getElementById('color-' + event.target.id)) {
      if (!document.getElementById('color-' + event.target.id).value) return
    }
    let lastCardPile = pile[pile.length - 1].card
    //let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    //let drawDone = pile[pile.length - 1].drawDone
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let selectedCard = playerCards[event.target.id].card
    console.log('play card', selectedCard)

    if (selectedCard.n === 'c' || selectedCard.n === '+4') {
      let inputColor = document.getElementById('color-' + event.target.id).value
      selectedCard = playerCards.splice(event.target.id, 1)[0].card
      pile.push({ card: selectedCard, player: state.player._id, color: inputColor, drawDone: false, numberPlay: numberPlay })
      playerCardsPile.push({ card: selectedCard, player: state.player._id, color: inputColor, drawDone: true, numberPlay: numberPlay })
      if (selectedCard.n === 'c') {
        unoTurn = true
      }
    } else {
      if (selectedCard.c !== nextColor && selectedCard.n !== nextNumber) {
        console.log('no coincide color o numero')
        return
      } else {
        selectedCard = playerCards.splice(event.target.id, 1)[0].card
        pile.push({ card: selectedCard, player: state.player._id, color: null, drawDone: false, numberPlay: numberPlay })
        playerCardsPile.push({ card: selectedCard, player: state.player._id, color: null, drawDone: true, numberPlay: numberPlay })
        if (!(selectedCard.n === 'r' || selectedCard.n === 's' || selectedCard.n === '+2')) {
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
      playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
      if (cards.length === 0) {
        let obj = initCardsAgain(pile)
        cards = obj.cards
        pile = obj.pile
      }
      playerCards.push({ card: cards.pop(), numberPlay: numberPlay })
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
    let { playerCards, cards, pile, playerPickCard, unoTurn, finishRound, numberPlay } = values
    if (finishRound) return
    let lastCardPile = pile[pile.length - 1].card
    //let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    //let drawDone = pile[pile.length - 1].drawDone
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    console.log('pick', nextColor, nextNumber)

    let iCanPlay = false
    playerCards.forEach((ele, ind) => {
      if (ele.card.c === 'wild' || ele.card.c === nextColor || ele.card.n === nextNumber ) {
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
    playerCards.push({ card: cards.pop(), numberPlay: numberPlay })

    iCanPlay = false
    playerCards.forEach((ele, ind) => {
      if (ele.card.c === 'wild' || ele.card.c === nextColor || ele.card.n === nextNumber ) {
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
                                      playerPickCard: playerPickCard, unoTurn:unoTurn, numberPlay: numberPlay }))
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
                  <ContainerRow key={ind + ele.player}>
                    <Card color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} width={125} height={200} />
                  </ContainerRow>
                )
              else
                return (
                  <ContainerRow key={ind + ele.player}>
                    <Card color={'wild'} wildColor={null} number={'UNO'} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} width={125} height={200} />
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
                    <MiniCard color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="end" width={50} height={35} />
                  )
                  :
                  ele.player === state.uno._id ?
                  (
                    <MiniCard color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="start" width={50} height={35} />
                  )
                  :
                  (
                    <MiniCard color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} align="center" width={50} height={35} />
                  )
                )
              else
                return ('')
            })}
            </ContainerRow>
            {values.pile.map((ele, ind) => {
              if (ind === values.pile.length - 1)
                return (
                  <ContainerRow key={ind + ele.player}>
                    <Card color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} width={125} height={200} />
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
                <ContainerRow key={ind + ele.player}>
                  <Card color={ele.card.c} wildColor={ele.color} number={ele.card.n} order={ele.card.o} lastPlay={(ele.numberPlay >= values.numberPlay - 1)} width={125} height={200} />
                </ContainerRow>

                { (ele.card.c === 'wild' ||
                    ele.card.c === values.pile[values.pile.length - 1].card.c ||
                    ele.card.n === values.pile[values.pile.length - 1].card.n ||
                    ele.card.c === values.pile[values.pile.length - 1].color) && !values.finishRound &&
                  <ContainerRow>
                    <PileCard onClick={handleClickPileCard} id={ind}> Play Card </PileCard>
                  </ContainerRow>
                }

                { ele.card.c === 'wild' &&
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
              (<>
                <PickCard onClick={handleClickPickCard} id="PickCard"> Pick Card </PickCard>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="checkUNO" onChange={handleChangeCheckUNO} checked={values.checkUNO} />
                  <label className="form-check-label" htmlFor="checkUNO">I say UNO!!!!</label>
                </div>
              </>)
            }
          </ContainerColumn>
        </ContainerRow>
      </ContainerColumn>
    </WrapperGen>
  )

}

export default PlayGameAlone
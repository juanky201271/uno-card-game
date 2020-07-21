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
const PileCard = styled.button.attrs({ className: 'btn btn-primary' })
``
const PickCard = styled.button.attrs({ className: 'btn btn-danger' })
``
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 10px 10px 10px 10px;
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

  { c: 'wild', n: 'cd4', o: 1 },
  { c: 'wild', n: 'cd4', o: 2 },
  { c: 'wild', n: 'cd4', o: 3 },
  { c: 'wild', n: 'cd4', o: 4 },

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

  { c: 'red', n: 'd2', o: 1 }, { c: 'red', n: 'd2', o: 2 },
  { c: 'yellow', n: 'd2', o: 1 }, { c: 'yellow', n: 'd2', o: 2 },
  { c: 'green', n: 'd2', o: 1 }, { c: 'green', n: 'd2', o: 2 },
  { c: 'blue', n: 'd2', o: 1 }, { c: 'blue', n: 'd2', o: 2 },

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
            cards: cards, pile: [], finishRound: false,
            numCards: Number(state.game.cards), round: state.game.curr_round })
  }

  const unoPlay = (round) => {
    let { unoTurn, unoCards, unoCardsPile, playerCards, playerCardsPile,
          cards, pile, numCards, playerPickCard, finishRound } = values
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
    let haveColorIndex = null, haveNumberIndex = null, haveCIndex = null, haveCd4Index = null, haveColorD2Index = null, haveColorReverseIndex = null, haveColorSkipIndex = null, rankingColor = { 'red': 0, 'yellow': 0, 'green': 0, 'blue': 0 }

    if (state.uno._id !== lastPlayerPile && lastCardPile.n === 'cd4') {
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoCards.push(cards.pop())
      unoTurn = false
      setValues(values => ({ ...values, unoTurn: unoTurn,
                            unoCards: unoCards, cards: cards }))
      return
    } else if (state.uno._id !== lastPlayerPile && lastCardPile.n === 'd2') {
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
        haveColorIndex = null
        haveNumberIndex = null
        haveCIndex = null
        haveCd4Index = null
        haveColorD2Index = null
        haveColorReverseIndex = null
        haveColorSkipIndex = null
        rankingColor = { 'red': 0, 'yellow': 0, 'green': 0, 'blue': 0 }

        keepTurn = false
        index = null
        color = null
        unoCards.forEach((ele, ind) => {
          if (ele.c === nextColor) haveColorIndex = ind
          if (ele.c === nextColor && ele.n === 'd2') haveColorD2Index = ind
          if (ele.c === nextColor && ele.n === 'r') haveColorReverseIndex = ind
          if (ele.c === nextColor && ele.n === 's') haveColorSkipIndex = ind
          if (ele.n === nextNumber) haveNumberIndex = ind
          if (ele.n === 'c') haveCIndex = ind
          if (ele.n === 'cd4') haveCd4Index = ind
          if (ele.c !== 'wild') rankingColor[ele.c]++;
        })
        console.log('actual', nextColor, nextNumber)
        console.log('color', haveColorIndex, 'number', haveNumberIndex, 'c', haveCIndex, 'cd4', haveCd4Index, 'd2', haveColorD2Index, 'reverse', haveColorReverseIndex, 'skip', haveColorSkipIndex)
        let arrRankingColor = Object.entries(rankingColor).sort((a,b) => b[1] - a[1])

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

          if (aux.n === 'cd4') {
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            keepTurn = true
          }
          if (aux.n === 'd2') {
            playerCards.push(cards.pop())
            playerCards.push(cards.pop())
            keepTurn = true
          }

          if (!keepTurn) break
        }

        if (unoCards.length === 0) break

      } // while
    } // else
    if (unoCards.length === 0) finishRound = true
    unoTurn = false
    playerPickCard = false
    setValues(values => ({ ...values, unoTurn: unoTurn,
                          unoCards: unoCards, playerCards: playerCards, playerPickCard: playerPickCard,
                          unoCardsPile: unoCardsPile,
                          cards: cards, pile: pile, finishRound: finishRound }))
  }

  const handleClickPileCard = (event) => {
    if (event) event.preventDefault()
    let { unoTurn, unoCards, unoCardsPile, playerCards, playerCardsPile, cards, pile, numCards, finishRound } = values
    if (finishRound) return
    if (unoTurn) return

    let lastCardPile = pile[pile.length - 1].card
    let lastPlayerPile = pile[pile.length - 1].player
    let lastColorPile = pile[pile.length - 1].color
    let nextNumber = lastCardPile.c === 'wild' ? null : lastCardPile.n
    let nextColor = lastColorPile === null ? lastCardPile.c : lastColorPile

    let selectedCard = playerCards[event.target.id]
    console.log('play card', selectedCard)

    if (selectedCard.n === 'c' || selectedCard.n === 'cd4') {
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

    if (playerCards.length === 0) finishRound = true

    setValues(values => ({ ...values, unoTurn: unoTurn,
                          playerCards: playerCards,
                          playerCardsPile: playerCardsPile,
                          cards: cards, pile: pile, finishRound: finishRound }))

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
    <Title>Playing... Round: {values.round}</Title>
      <WrapperGen>
        <p> UNO </p>
        {values.unoCards.map(ele => {
          return (<div key={ele.c + ele.n + ele.o}>{ele.c} - {ele.n}</div>)
        })}
      </WrapperGen>
      <ContainerRow>
        <WrapperGen>
          <p> Pile </p>
          {values.pile.map(ele => {
            return (<div key={ele.card.c + ele.card.n + ele.card.o}>{ele.card.c} - {ele.card.n} - {ele.card.o} - {ele.player} - {ele.color}</div>)
          })}
        </WrapperGen>
        <WrapperGen>
          <p> Cards </p>
          {values.cards.map((ele, ind) => {
            if (ind < values.cards.length - 10) return ('')
            else return (<div key={ele.c + ele.n + ele.o}>{ele.c} - {ele.n} - {ele.o}</div>)
          })}
        </WrapperGen>
      </ContainerRow>
      <WrapperGen>
        <p> Me </p>
        {values.playerCards.map((ele, ind) => {
          return (
            <ContainerRow key={ind}>
              <div key={ele.c + ele.n + ele.o}>{ele.c} - {ele.n}</div>

              { ele.c === 'wild' &&
                (
                <>
                  <label>Change to Color:</label>
                  <select id={'color-' + ind} onChange={handleChange} value={values['color-' + ind] ? values['color-' + ind] : ''} required>
                    <option value="red">red</option>
                    <option value="yellow">yellow</option>
                    <option value="green">green</option>
                    <option value="blue">blue</option>
                  </select>
                </>
                )
              }

              <PileCard onClick={handleClickPileCard} id={ind}> Pile this Card </PileCard>
            </ContainerRow>
          )
        })}
      </WrapperGen>
      <WrapperGen>
        <PickCard onClick={handleClickPickCard} id="PickCard"> Pick a card </PickCard>
      </WrapperGen>
    </WrapperGen>
  )

}

export default PlayGame

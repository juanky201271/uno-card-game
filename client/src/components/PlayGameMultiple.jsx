import React, { useState, useContext } from 'react'
import { GameContext, Card, MiniCard } from '../components'
import styled from 'styled-components'


const WrapperGen = styled.div
`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`
const StartGame = styled.button.attrs({ className: 'btn btn-secondary' })
``

function PlayGameMultiple(props) {

  const [ state, setState ] = useContext(GameContext)
  //const [ values, setValues ] = useState(init())

  const handleClickStartGame = (event) => {

  }
  return (
    <WrapperGen>
      <p>multiple</p>
      { state.game.creator_id._id === state.user._id &&
        <StartGame onClick={handleClickStartGame}>Start Game</StartGame>
      }

    </WrapperGen>
  )
}

export default PlayGameMultiple

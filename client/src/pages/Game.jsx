import React, { useContext } from 'react'
import { GameContext, ChooseGame, PlayGameAlone, PlayGameMultiple } from '../components'
import styled from 'styled-components'

const WrapperGen = styled.div
`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`

const Title = styled.h1.attrs({ className: 'h2' })
`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`

function Game (props) {

  const [ state, setState ] = useContext(GameContext)

  //console.log('game', state)
  return (
    <WrapperGen>
        <Title>{state.game ? 'Game - ' + state.game.keyWord : 'Games' }</Title>
        <hr />
        { !state.game && state.user &&
          (<ChooseGame />)
        }
        { state.game ?
            state.game.players === 'Alone' ?
              (
                <PlayGameAlone />
              )
              :
              (
                <PlayGameMultiple />
              )
          :
          null
        }
    </WrapperGen>
  )

}

export default Game

import React, { useState, useContext } from 'react'
import { Soc, GameContext, ChooseGame, PlayGameAlone, PlayGameMultiple } from '../components'
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
  const [ values, setValues ] = useState({ isLoading: false, socket: '' })

  console.log('game', state, values)
  return (
    <WrapperGen>
        <Title>Game {state.game ? ' - ' + state.game.keyWord : '' }</Title>

        <hr />
        { !state.game &&
          (<ChooseGame />)
        }
        { state.game ?

            state.game.players === 'Alone' ?
              (
                <PlayGameAlone />
              )
              :
              (
                <>
                  <Soc />
                  <PlayGameMultiple />
                </>
              )
          :
          (
            <></>
          )
        }
    </WrapperGen>
  )

}

export default Game

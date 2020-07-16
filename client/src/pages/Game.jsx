import React, { useState, useContext } from 'react'
import api from '../api'
import { Soc, GameContext, ChooseGame } from '../components'
import styled from 'styled-components'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  transitionDuration: 0
}
const imagesLoadedOptions = {
  background: '.my-bg-image-el'
}

const WrapperGen = styled.div`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
`
const Wrapper = styled.div`
  margin: 5px 5px 5px 5px;
  padding: 10px 10px 10px 10px;
  background-color: #ddd;
  border-radius: 10px;
  border: 2px solid #555;
  width: 200px;
`
const Title = styled.h1.attrs({ className: 'h1' })``
const Title3 = styled.h3.attrs({ className: 'h3' })`
  font-weight: bold;
  cursor: pointer;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
`
const Text = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #555;
  display: initial;
`
const InputText = styled.input.attrs({ className: 'form-control' })`
    margin: 5px;
`

function Game (props) {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({ isLoading: false, socket: '' })

  console.log('game', state, values)

  return (
    <WrapperGen>
        <Title>Game {state.game ? ' - ' + state.game.keyWord : '' }</Title>
        <Soc />
        <hr />
        { !state.game &&
          (<ChooseGame />)
        }
    </WrapperGen>
  )

}

export default Game

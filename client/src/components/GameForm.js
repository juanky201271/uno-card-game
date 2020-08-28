import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import api from '../api'
import { GameContext } from './GameContext'
import socket from './socket'

const Container = styled.div.attrs({ className: "form-group" })
`
  padding: 5px 5px 5px 5px;
`
const ContainerExt = styled.div.attrs({ className: "d-flex flex-column justify-content-end" })
`
  padding: 2px 2px 2px 2px;
`
const LabelRed = styled.label.attrs({ className: "text-danger" })
``
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 5px 5px 5px 5px;
`
const Button = styled.button.attrs({ })
`
  margin: 5px 5px 5px 5px;
`

function LoginForm() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({ players: 'Alone', cards: '7' })

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    addGame()
  }

  const handleClickCancel = (event) => {
    setValues(values => ({ players: 'Alone', cards: '7' }))
    setState(state => ({ ...state, addGame: false }))
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value}))
  }

  const addGame = async () => {
    if (!values.players || !values.cards || !values.keyWord) return

    const payload = { creator_id: state.user._id, winner_id: null, keyWord: values.keyWord,
                      players: values.players, cards: values.cards, curr_round: 1,
                      curr_cards: [], curr_cards_pile: [], curr_score: 0,
                      curr_user_id: null, curr_dealer_id: null }
    await api.createGame(payload).then(async game => {
      //console.log(game.data.data)
      const payload2 = { user_id: state.user._id, game_id: game.data.data._id, score: 0,
                        curr_round: 0, curr_cards: [], curr_cards_pile: [],
                        curr_score: 0, uno: false }
      await api.createPlayer(payload2).then(async player => {
        //console.log(player.data.data)
        await api.getUserByEmail("UNO").then(async user => {
          const payload3 = { user_id: user.data.data._id, game_id: game.data.data._id, score: 0,
                            curr_round: 0, curr_cards: [], curr_cards_pile: [],
                            curr_score: 0, uno: true }
          await api.createPlayer(payload3).then(playerUNO => {
            //console.log(playerUNO.data.data)
            setValues(values => ({ players: 'Alone', cards: '7' }))
            setState(state => ({ ...state, addGame: false }))
            socket.emit('add game', {}, state.user ? state.user._id : null, state.game ? state.game._id : null, 'Add game with name: ' + game.data.data.name)
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
  }

  //console.log('form game', values, state)
  return (
    <ContainerExt>
      { !state.game && state.user &&
        (<>
          <form className="form-group" onSubmit={handleSubmit}>
           <Container>
             <label># Players:</label>
             <select className="form-control" id="players" onChange={handleChange} value={values ? values.players : ''} required>
                <option value="Alone">Alone</option>
                <option value="Multiple">Multiple</option>
             </select>
           </Container>
           <Container>
             <label># Cards:</label>
             <select className="form-control" id="cards" onChange={handleChange} value={values ? values.cards : ''} required>
                <option value="7">7</option>
                <option value="8">8</option>
             </select>
           </Container>
           <Container>
             <label>Key word:</label>
             <input type="text" className="form-control" id="keyWord" onChange={handleChange} value={values ? values.keyWord : ''} required />
           </Container>
           <ContainerRow>
             <Button type="submit" className="btn btn-dark">Submit</Button>
             <Button type="button" className="btn btn-secondary" onClick={handleClickCancel}>Cancel</Button>
           </ContainerRow>
          </form>
          <LabelRed>{values.message ? values.message : ''}</LabelRed>
        </>)
      }
    </ContainerExt>
  )

}

export default LoginForm

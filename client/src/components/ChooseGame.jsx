import React, { useState, useContext, useEffect } from 'react'
import api from '../api'
//import socketIOClient from "socket.io-client"
import { GameContext, GameForm, socket } from '../components'
import styled from 'styled-components'

//const ENDPOINT = process.env.PUBLIC_URL
const Container = styled.div.attrs({ className: "container" })
`
  padding: 10px;
`
const AddGame = styled.button.attrs({ className: 'btn btn-secondary' })
``
const JoinGame = styled.button.attrs({ className: 'btn btn-secondary d-flex justify-content-center align-items-center align-self-center' })
`
  margin: 10px 10px 10px 10px;
`
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 10px 10px 10px 10px;
`
const ContainerColumn = styled.div.attrs({ className: "d-flex flex-column" })
`
  padding: 10px 10px 10px 10px;
`
const PGame = styled.p.attrs({ className: 'd-flex justify-content-center align-items-center align-self-center' })
`
  margin: 10px 10px 10px 10px;
`
const PUnoLit = styled.div.attrs({ className: 'text-dark text-center' })
`
  width: 200px;
  font-size: 10px;
`
//const socket = socketIOClient(ENDPOINT)

function ChooseGame() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({})

  //const socket = state.socket

  const handleClickAddGame = (event) => {
    if (event) event.preventDefault()
    setValues(values => ({ ...values, addGame: true} ))
  }

  const handleClickJoinGame = (event) => {
    event.persist()
    //if (!state.listUserGame) return
    api.getGameById(event.target.id).then(game => {

      //if (Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === game.data.data[0].creator_id._id && e[1].game_id === game.data.data[0]._id).length === 0 &&
      //    state.user_id !== game.data.data[0].creator_id._id)
      //  return

      api.getPlayersByGameId(event.target.id).then(players => {
        //console.log(players.data.data)
        let player, uno, playerExist = false
        for (let i = 0; i < players.data.data.length; i++) {
          if (players.data.data[i].uno)
            uno = players.data.data[i]
          else if (game.data.data[0].creator_id._id === players.data.data[i].player_id._id) {
            if (state.user._id === players.data.data[i].player_id._id)
              playerExist = true
            player = players.data.data[i]
          }
          else if (state.user._id === players.data.data[i].player_id._id)
            playerExist = true
        }
        socket.emit('game', { message: 'Player ' + state.user.name + ' join to the game ' + game.data.data[0].keyWord + '.', user_id: state.user._id, game_id: game.data.data[0]._id });
        if (!playerExist) {
          const payload = { player_id: state.user._id, game_id: game.data.data[0]._id, score: 0,
                            curr_round: 0, curr_cards: [], curr_cards_pile: [],
                            curr_score: 0, uno: false }
          api.createPlayer(payload).then(player2 => {

            setValues(values => ({ ...values, addGame: false }))
            setState(state => ({ ...state, game: game.data.data[0], player: player, uno: uno,
                                           players: [ ...players.data.data, player2.data.data] }))
          })
          .catch(error => {
            console.log(error)
          })
        } else {
          setValues(values => ({ ...values, addGame: false }))
          setState(state => ({ ...state, game: game.data.data[0], player: player, uno: uno,
                                         players: players.data.data }))
        }
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    socket.on("log in", (obj, id, listClients) => {
      console.log('emit log in', obj, id, listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
      //setResponse(obj.message)
    })
    socket.on("game", (obj, id, listClients) => {
      console.log('emit game',obj, id, listClients)
      setState(state => ({ ...state, listUserGame: listClients }))
      //setResponse(obj.message)
    })
    socket.on("cancel", (obj, id, listClients) => {
      console.log('emit cancel',obj, id, listClients)
      setState(state => ({ ...state, listUserGame: listClients }))
      //setResponse(obj.message)
    })
    socket.on("log out", (obj, id, listClients) => {
      console.log('emit log out', obj, id, listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
      //setResponse(obj.message)
    })
  }, [])

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      var listGames = []
      await api.getGames().then(games => {
        //console.log(games.data.data)
        listGames = games.data.data.map((ele, ind) => {
          return (
            <ContainerRow key={'div-' + ele._id} id={'div-' + ele._id}>
              <PGame>Description: {ele.keyWord} - Principal Player: {ele.creator_id.name}</PGame>
              { !state.game && state.user && ele.players === 'Alone' && state.user._id === ele.creator_id._id &&
                (<JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Alone! </JoinGame>)
              }
              { !state.game && state.user && ele.players === 'Multiple' &&
                (<ContainerRow>
                  <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Multiple Players! </JoinGame>
                  <ContainerColumn>
                    <PUnoLit>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                    <PUnoLit>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                  </ContainerColumn>
                </ContainerRow>)
              }
            </ContainerRow>
          )
        })
      })
      .catch(error => {
        console.log(error)
      })
      if (!ignore) setValues(values => ({ ...values, listGames: listGames}))
    }

    fetchData()
    return () => { ignore = true }

  }, [state])

  console.log('game choose', values, state)
  return (
    <Container>

      { !state.game && state.user &&
        (<>
          <AddGame onClick={handleClickAddGame}> Add Game </AddGame>
          { values.addGame &&
            <GameForm />
          }
        </>)
      }
      { values.listGames &&
        (<Container>
          {values.listGames}
        </Container>)
      }

    </Container>
  )

}

export default ChooseGame

import React, { useState, useContext, useEffect } from 'react'
import api from '../api'
import { GameContext, GameForm, socket } from '../components'
import styled from 'styled-components'

const Container = styled.div.attrs({ className: "container" })
`
  padding: 10px;
`
const AddGame = styled.button.attrs({ className: 'btn btn-secondary' })
`
  margin: 5px 5px 5px 5px;
`
const LogOut = styled.button.attrs({ className: 'btn btn-dark' })
`
  margin: 5px 5px 5px 5px;
`
const JoinGame = styled.button.attrs({ className: 'btn btn-secondary d-flex justify-content-center align-items-center align-self-center' })
`
  margin: 10px 10px 10px 10px;
`
const DeleteGame = styled.button.attrs({ className: 'btn btn-dark d-flex justify-content-center align-items-center align-self-center' })
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
const PUnoLit = styled.div.attrs({ className: 'text-center' })
`
  width: 200px;
  font-size: 10px;
`
const PUno = styled.div.attrs({ className: 'text-dark text-center' })
`
  font-size: 15px;
`

function ChooseGame() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({})

  const handleClickAddGame = (event) => {
    if (event) event.preventDefault()
    setState(state => ({ ...state, addGame: true }))
  }

  const handleClickLogOut = (event) => {
    if (event) event.preventDefault()
    socket.emit('log out', {}, state.user ? state.user._id : null, state.game ? state.game._id : null, 'User: ' + state.user.name + ' Log out.' )
  }

  const handleClickDeleteGame = (event) => {
    event.persist()
    api.deleteGameById(event.target.id).then(game => {
      api.deletePlayersByGameId(event.target.id).then(players => {
        //setState(state => ({ ...state, doRender: (state.doRender ? state.doRender + 1 : 0) }))
        socket.emit('delete game', {}, state.user ? state.user._id : null, state.game ? state.game._id : null, 'Delete game with name: ' + game.data.data.name)
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleClickJoinGame = (event) => {
    event.persist()
    api.getGameById(event.target.id).then(game => {
      api.getPlayersByGameId(event.target.id).then(players => {
        //console.log(players.data.data)
        let player, uno, playerExist = false
        for (let i = 0; i < players.data.data.length; i++) {
          if (players.data.data[i].uno)
            uno = players.data.data[i]
          else if (game.data.data[0].creator_id._id === players.data.data[i].user_id._id) {
            if (state.user._id === players.data.data[i].user_id._id)
              playerExist = true
            player = players.data.data[i]
          }
          else if (state.user._id === players.data.data[i].user_id._id)
            playerExist = true
        }
        socket.emit('game', {}, state.user ? state.user._id : null, game.data.data[0]._id, 'User: ' + state.user.name + ' join to the game: ' + game.data.data[0].keyWord);
        if (!playerExist) {
          const payload = { user_id: state.user._id, game_id: game.data.data[0]._id, score: 0,
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
    socket.on("new connection", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("log in", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("game", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("cancel game", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("cancel game multiple", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("cancel game alone", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("log out", (obj, socket_id, listClients, message) => {
      if (socket.id === socket_id) {
        setState(state => ({ listUserGame: {} }))
        setValues(values => ({ }))
      }
      else
        setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("new disconnect", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })

    socket.on("add game", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
    socket.on("delete game", (obj, socket_id, listClients, message) => {
      setState(state => ({ ...state, listUserGame: listClients }))
    })
  }, [])

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      var listMyGames = [], listMoreGames = [], listRestGames = []
      await api.getGames().then(games => {
        //console.log(games.data.data)
        listMyGames = games.data.data.map((ele, ind) => {
          if (state.user._id === ele.creator_id._id)
            return (
              <ContainerRow key={'div-' + ele._id} id={'div-' + ele._id}>
                <PGame>{ele.creator_id.name}: {ele.keyWord}</PGame>
                { !state.game && state.user && ele.players === 'Alone' && state.user._id === ele.creator_id._id &&
                  (<>
                    <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Alone! </JoinGame>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                    <DeleteGame onClick={handleClickDeleteGame} id={ele._id}> Delete Game </DeleteGame>
                  </>)
                }
                { !state.game && state.user && ele.players === 'Multiple' &&
                  (<>
                    <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Multiple Players! </JoinGame>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                    { state.user._id === ele.creator_id._id &&
                      (
                        <DeleteGame onClick={handleClickDeleteGame} id={ele._id}> Delete Game </DeleteGame>
                      )
                    }
                  </>)
                }
              </ContainerRow>
            )
          else
            return null
        })

        listMoreGames = games.data.data.map((ele, ind) => {
          if (state.user._id !== ele.creator_id._id && ele.players === 'Multiple')
            return (
              <ContainerRow key={'div-' + ele._id} id={'div-' + ele._id}>
                <PGame>{ele.creator_id.name}: {ele.keyWord}</PGame>
                { !state.game && state.user && ele.players === 'Alone' && state.user._id === ele.creator_id._id &&
                  (<>
                    <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Alone! </JoinGame>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                    <DeleteGame onClick={handleClickDeleteGame} id={ele._id}> Delete Game </DeleteGame>
                  </>)
                }
                { !state.game && state.user && ele.players === 'Multiple' &&
                  (<>
                    <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Multiple Players! </JoinGame>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                    { state.user._id === ele.creator_id._id &&
                      (
                        <DeleteGame onClick={handleClickDeleteGame} id={ele._id}> Delete Game </DeleteGame>
                      )
                    }
                  </>)
                }
              </ContainerRow>
            )
          else
            return null
        })

        listRestGames = games.data.data.map((ele, ind) => {
          if (state.user._id !== ele.creator_id._id && ele.players !== 'Multiple')
            return (
              <ContainerRow key={'div-' + ele._id} id={'div-' + ele._id}>
                <PGame>{ele.creator_id.name}: {ele.keyWord}</PGame>
                { !state.game && state.user && ele.players === 'Alone' && state.user._id === ele.creator_id._id &&
                  (<>
                    <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Alone! </JoinGame>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                    <DeleteGame onClick={handleClickDeleteGame} id={ele._id}> Delete Game </DeleteGame>
                  </>)
                }
                { !state.game && state.user && ele.players === 'Alone' && state.user._id !== ele.creator_id._id &&
                  (<>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                  </>)
                }
                { !state.game && state.user && ele.players === 'Multiple' &&
                  (<>
                    <JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Multiple Players! </JoinGame>
                    <ContainerColumn>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Principal player connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].user_id === ele.creator_id._id && e[1].game_id === ele._id).length > 0 ? 'Yes' : 'No' : 'No'}</PUnoLit>
                      <PUnoLit style={state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length > 0 ? { color: 'green', fontWeight: 'bold' } : {} : {}}>Players connected: {state.listUserGame ? Object.entries(state.listUserGame).filter((e, i) => e[1].game_id === ele._id).length : '0'}</PUnoLit>
                      <PUnoLit>Round: {ele.curr_round}</PUnoLit>
                    </ContainerColumn>
                    { state.user._id === ele.creator_id._id &&
                      (
                        <DeleteGame onClick={handleClickDeleteGame} id={ele._id}> Delete Game </DeleteGame>
                      )
                    }
                  </>)
                }
              </ContainerRow>
            )
          else
            return null
        })

      })
      .catch(error => {
        console.log(error)
      })
      if (!ignore) setValues(values => ({ ...values, listMyGames: listMyGames, listMoreGames: listMoreGames, listRestGames: listRestGames }))
    }

    fetchData()
    return () => { ignore = true }

  }, [state])

  //console.log('game choose', values, state)
  return (
    <Container>

      { !state.game && state.user &&
        (<>
          <ContainerRow>
            <AddGame onClick={handleClickAddGame}> Add Game </AddGame>
            <LogOut onClick={handleClickLogOut}> Log out </LogOut>
          </ContainerRow>
          { state.addGame &&
            <GameForm />
          }
        </>)
      }
      { !state.game && state.user && values.listMyGames &&
        (<Container>
          <PUno>My Games</PUno>
          <hr />
          {values.listMyGames}
        </Container>)
      }
      { !state.game && state.user && values.listMoreGames &&
        (<Container>
          <PUno>More Games</PUno>
          <hr />
          {values.listMoreGames}
        </Container>)
      }
      { !state.game && state.user && values.listRestGames &&
        (<Container>
          <PUno>Rest of Games</PUno>
          <hr />
          {values.listRestGames}
        </Container>)
      }
    </Container>
  )

}

export default ChooseGame

import React, { useState, useContext, useEffect } from 'react'
import api from '../api'
import { GameContext, GameForm } from '../components'
import styled from 'styled-components'

const Container = styled.div.attrs({ className: "container" })
`
  padding: 10px;
`
const AddGame = styled.button.attrs({ className: 'btn btn-secondary' })
``
const JoinGame = styled.button.attrs({ className: 'btn btn-secondary' })
``
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 10px 10px 10px 10px;
`

function ChooseGame() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({})

  const handleClickAddGame = (event) => {
    if (event) event.preventDefault()
    setValues(values => ({ ...values, addGame: true} ))
  }

  const handleClickJoinGame = (event) => {
    event.persist()
    api.getGameById(event.target.id).then(game => {
      api.getPlayersByGameId(event.target.id).then(players => {
        console.log(players.data.data)
        let player, uno
        for (let i = 0; i < players.data.data.length; i++) {
          if (players.data.data[i].uno) uno = players.data.data[i]
          else player = players.data.data[i]
        }
        setValues(values => ({ ...values, addGame: false }))
        setState(state => ({ ...state, game: game.data.data[0], player: player, uno: uno }))
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
    let ignore = false

    async function fetchData() {
      var listGames = []
      await api.getGames().then(games => {
        //console.log(games.data.data)
        listGames = games.data.data.map((ele, ind) => {
          return (
            <ContainerRow key={'div-' + ele._id} id={'div-' + ele._id}>
              <p>{ele.keyWord} - {ele.players} - {ele.creator_id.name}</p>
              { !state.game && state.user && ele.players === 'Alone' && state.user._id === ele.creator_id._id &&
                (<JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game, Alone! </JoinGame>)
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

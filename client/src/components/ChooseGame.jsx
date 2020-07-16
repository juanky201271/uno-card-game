import React, { useState, useContext, useEffect } from 'react'
import api from '../api'
import { GameContext, GameForm } from '../components'
import styled from 'styled-components'

const Container = styled.div.attrs({ className: "container" })`
  padding: 10px;
`
const AddGame = styled.button.attrs({ className: 'btn btn-secondary' })``
const JoinGame = styled.button.attrs({ className: 'btn btn-primary' })``
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })`
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
    if (event) event.preventDefault()
    api.getGameById(event.target.id).then(game => {
      setValues(values => ({ ...values, addGame: false }))
      setState(state => ({ ...state, game: game.data.data[0]}))
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    api.getGames().then(games => {
      console.log(games.data.data)
      const listGames = games.data.data.map((ele, ind) => {
        return (
          <ContainerRow key={'div-' + ele._id} id={'div-' + ele._id}>
            <p>{ele.keyWord} - {ele.creator_id.name}</p>
            { !state.game && state.user &&
              (<JoinGame onClick={handleClickJoinGame} id={ele._id}> Join Game </JoinGame>)
            }
          </ContainerRow>
        )
      })
      setValues(values => ({ ...values, listGames: listGames}))
    })
    .catch(error => {
      console.log(error)
    })
  }, [state, setState])

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

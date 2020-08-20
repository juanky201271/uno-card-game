import React, { useContext, useEffect, useState } from 'react'
import api from '../api'
import { GameContext, ChooseGame, PlayGameAlone, PlayGameMultiple, socket } from '../components'
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
const PUnoLit = styled.div.attrs({ className: 'text-dark text-center' })
`
  font-size: 10px;
`

function Game (props) {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({})

  useEffect(() => {
    socket.on("log in", (obj, id, listClients) => {
      //console.log('emit log in', obj, id, listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
      //setResponse(obj.message)
    })
    socket.on("log out", (obj, id, listClients) => {
      //console.log('emit log out', obj, id, listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
      //setResponse(obj.message)
    })
  }, [])

  useEffect(() => {
    let ignore = false

    async function fetchData() {
      var listUsers = ''

      //console.log(games.data.data)
      if (state.listUserGame) {
        let ret = null
        for (let i = 0; i < Object.entries(state.listUserGame).length; i++) {
          let ele = Object.entries(state.listUserGame)[i]
 //console.log(ele[1].user_id)

          await api.getUserById(ele[1].user_id).then(user => {
            //console.log('user', user.data.data.name)
            listUsers += user.data.data.name + ' // '
          })
          .catch(error => {
            console.log(error)
          })

        }

      }

      if (!ignore) setValues(values => ({ ...values, listUsers: listUsers }))
    }

    fetchData()
    return () => { ignore = true }

  }, [state])

  //console.log('game', values, state)
  return (
    <WrapperGen>
      { values.listUsers && state.user &&
        (<PUnoLit>Users on-line: {values.listUsers}</PUnoLit>)
      }
      <hr />
      { state.game &&
        (<>
          <Title>{'Game - ' + state.game.keyWord}</Title>
          <hr />
        </>)
      }
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

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
    socket.on("new connection", (obj, socket_id, listClients, message) => {
      fetchData(listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
    })
    socket.on("log in", (obj, socket_id, listClients, message) => {
      fetchData(listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
    })
    socket.on("log out", (obj, socket_id, listClients, message) => {
      fetchData(listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
    })
    socket.on("new disconnect", (obj, socket_id, listClients, message) => {
      fetchData(listClients)
      setState(state =>({ ...state, listUserGame: listClients }))
    })
  }, [])

  //useEffect(() => {
  //  let ignore = false

    async function fetchData(list) {
      var listUsers = ''
      if (list) {
        for (let i = 0; i < Object.entries(list).length; i++) {
          let ele = Object.entries(list)[i]

          await api.getUserById(ele[1].user_id).then(user => {
            listUsers += user.data.data.name + ' // '
          })
          .catch(error => {
            console.log(error)
          })

        }
      }
      setValues(values => ({ ...values, listUsers: listUsers }))
    }

    //fetchData()
    //return () => { ignore = true }

  //}, [state])

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

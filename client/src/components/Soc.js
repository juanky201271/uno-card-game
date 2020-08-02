import React, { useState, useEffect, useContext } from "react"
//import socketIOClient from "socket.io-client"
import { GameContext } from './GameContext'
import socket from './socket'
import api from '../api'

//const ENDPOINT = process.env.PUBLIC_URL

function Soc(props) {

  const [ state, setState ] = useContext(GameContext)
  const [ response, setResponse ] = useState(" waiting ")



  useEffect(() => {
    //const socket = socketIOClient(ENDPOINT)
    //const socket = state.socket
    socket.on("log in", (obj, id, listClients) => {
      console.log('emit log in', obj, id, listClients, listClients.keys)
      setState(state =>({ ...state, listUserGame: listClients }))
      setResponse(obj.message)
    })
    socket.on("game", (obj, id, listClients) => {
      console.log('emit game',obj, id, listClients)
      api.getPlayersByGameId(obj.game_id).then(players => {
        setState(state => ({ ...state, players: players.data.data }))
      })
      .catch(error => {
        console.log(error)
      })
      setState(state =>({ ...state, listUserGame: listClients }))
      setResponse(obj.message)
    })
    socket.on("log out", (obj, id, listClients) => {
      setState(state =>({ ...state, listUserGame: listClients }))
      setResponse(obj.message)
    })
  }, [state, response])

  console.log('socket', response, state)
  return (
    <>
      <div style={{ fontSize: '20px', color: '#ddd', backgroundColor: '#222' }}>
        ::: {response} :::
      </div>
      <div>
        {state.listUserGame &&
          Object.entries(state.listUserGame).map(([ind, ele]) => {
            return (<p key={ind}>
              {ind + ' - ' + ele.user_id + ' - ' + ele.game_id}
            </p>)
          })
        }
      </div>
    </>
  )

}

export default Soc

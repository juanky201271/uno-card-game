import React, { useState, useEffect, useContext } from "react"
import socketIOClient from "socket.io-client"
import { GameContext } from './GameContext'

const ENDPOINT = process.env.PUBLIC_URL

function Soc(props) {

  const [ state, setState ] = useContext(GameContext)
  const [ response, setResponse ] = useState(" waiting ")

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("Stock", data => {
      setResponse(data.message)
      let sockets = state.sockets ? [...state.sockets] : []
      setState(state => ({ ...state, sockets: sockets.push(data.message) }))
    })
  }, [state, response, setState])

  console.log('socket', response, state)
  return (
    <div style={{ fontSize: '20px', color: '#ddd', backgroundColor: '#222' }}>
      ::: {response} :::
    </div>
  )

}

export default Soc

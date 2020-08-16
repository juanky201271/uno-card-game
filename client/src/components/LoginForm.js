import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import api from '../api'
//import socketIOClient from "socket.io-client"
import { GameContext } from './GameContext'
import socket from './socket'

//const ENDPOINT = process.env.PUBLIC_URL
const Container = styled.div.attrs({ className: "form-group" })
`
  padding: 5px;
`
const ContainerExt = styled.div.attrs({ className: "d-flex flex-column justify-content-end" })
`
  padding: 2px;
`
const LabelRed = styled.label.attrs({ className: "text-danger" })
``
//const socket = socketIOClient(ENDPOINT)

function LoginForm() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({})

  //const socket = state.socket

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    login()
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value}))
  }

  const login = async () => {
    if (!values.email || !values.pwd) return

    await api.getUserByEmail(values.email).then(user => {
      if (user.data.data.password === values.pwd) {
        socket.emit('log in', { message: 'User ' + user.data.data.name + ' Log in.', user_id: user.data.data._id });
        setValues(values => ({ ...values, user: user.data.data }))
        setState(state => ({ ...state, user: user.data.data }))
      } else {
        setValues(values => ({ ...values, message: 'User or Password incorrect, try again.' }))
      }
    })
    .catch(error => {
      console.log(error)
      setValues(values => ({ ...values, message: 'User or Password incorrect, try again.' }))
    })

  }

  //console.log('login form', values, state)
  return (
    <ContainerExt>
      { !values.user &&
        (<>
          <form className="form-inline" onSubmit={handleSubmit}>
           <Container>
             <label>Email address:</label>
             <input type="email" className="form-control" id="email" onChange={handleChange} value={values ? values.email : ''} required />
           </Container>
           <Container>
             <label>Password:</label>
             <input type="password" className="form-control" id="pwd" onChange={handleChange} value={values ? values.pwd : ''} required />
           </Container>
           <button type="submit" className="btn btn-secondary">Submit</button>
          </form>
          <LabelRed>{values.message ? values.message : ''}</LabelRed>
        </>)
      }
      {
        values.user &&
        (
           <Container>
             <label>User: {values.user.name}</label>
           </Container>
        )
      }
    </ContainerExt>
  )

}

export default LoginForm

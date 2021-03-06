import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import api from '../api'
import { GameContext } from './GameContext'
import SignUpForm from './SignUpForm'
import socket from './socket'

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

function LoginForm() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({})

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    login()
  }

  const handleClickSignUp = (event) => {
    if (event) event.preventDefault()
    setState(state => ({ ...state, addUser: true }))
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value}))
  }

  const login = async () => {
    if (!values.email || !values.pwd) return

    await api.getUserByEmail(values.email).then(user => {
      if (user.data.data.password === values.pwd) {
        //console.log('---', Object.entries(state.listUserGame), user.data.data._id)
        if (Object.entries(state.listUserGame).filter(ele => ele[1].user_id === user.data.data._id).length === 0) {
          socket.emit('log in', {}, user.data.data._id, state.game ? state.game._id : null, 'User: ' + user.data.data.name + ' Log in.');
          setState(state => ({ ...state, user: user.data.data }))
        } else {
          setValues(values => ({ ...values, message: 'You are already log in.' }))
        }
      } else {
        setValues(values => ({ ...values, message: 'User or Password incorrect, try again.' }))
      }
    })
    .catch(error => {
      console.log(error)
      setValues(values => ({ ...values, message: 'ERROR: User or Password incorrect, try again.' }))
    })

  }

  //console.log('login form', values, state)
  return (
    <ContainerExt>
      { !state.user &&
        (<>
          <form className="form-inline" onSubmit={handleSubmit}>
           <Container>
             <label>Email:</label>
             <input type="email" className="form-control" id="email" onChange={handleChange} value={values ? values.email : ''} required />
           </Container>
           <Container>
             <label>Pwd:</label>
             <input type="password" className="form-control" id="pwd" onChange={handleChange} value={values ? values.pwd : ''} required />
           </Container>
           <button type="submit" className="btn btn-secondary" style={{margin: '5px 5px 5px 5px'}}>Log in</button>
           <button type="button" className="btn btn-dark" onClick={handleClickSignUp} style={{margin: '5px 5px 5px 5px'}}>Sign up</button>
          </form>
          <LabelRed>{values.message ? values.message : ''}</LabelRed>
          { state.addUser &&
            <SignUpForm />
          }
        </>)
      }
      { state.user &&
        (<Container>
          <label>User: {state.user.name}</label>
        </Container>)
      }
    </ContainerExt>
  )

}

export default LoginForm

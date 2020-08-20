import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import api from '../api'
import { GameContext } from './GameContext'

const Container = styled.div.attrs({ className: "form-group" })
`
  padding: 5px 5px 5px 5px;
`
const ContainerExt = styled.div.attrs({ className: "d-flex flex-column justify-content-end" })
`
  padding: 2px 2px 2px 2px;
`
const LabelRed = styled.label.attrs({ className: "text-danger" })
``
const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 5px 5px 5px 5px;
`
const Button = styled.button.attrs({ })
`
  margin: 5px 5px 5px 5px;
`

function SignUpForm() {

  const [ state, setState ] = useContext(GameContext)
  const [ values, setValues ] = useState({ })

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    addUser()
  }

  const handleClickCancel = (event) => {
    setValues(values => ({ players: 'Alone', cards: '7' }))
    setState(state => ({ ...state, addUser: false }))
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.id]: event.target.value}))
  }

  const addUser = async () => {
    if (!values.name || !values.email || !values.password) return

    const payload = { name: values.name, email: values.email, password: values.password }
    await api.createUser(payload).then(async user => {

      setValues(values => ({ }))
      setState(state => ({ ...state, addUser: false }))

    })
    .catch(error => {
      console.log(error)
    })
  }

  //console.log('form user', values, state)
  return (
    <ContainerExt>
      { !state.user &&
        (<>
          <form className="form-group" onSubmit={handleSubmit}>
           <Container>
             <label>Name:</label>
             <input type="text" className="form-control" id="name" onChange={handleChange} value={values ? values.name : ''} required />
           </Container>
           <Container>
             <label>email:</label>
             <input type="email" className="form-control" id="email" onChange={handleChange} value={values ? values.email: ''} required />
           </Container>
           <Container>
             <label>Password:</label>
             <input type="password" className="form-control" id="password" onChange={handleChange} value={values ? values.password : ''} required />
           </Container>
           <ContainerRow>
             <Button type="submit" className="btn btn-dark">Submit</Button>
             <Button type="button" className="btn btn-secondary" onClick={handleClickCancel}>Cancel</Button>
           </ContainerRow>
          </form>
          <LabelRed>{values.message ? values.message : ''}</LabelRed>
        </>)
      }
    </ContainerExt>
  )

}

export default SignUpForm

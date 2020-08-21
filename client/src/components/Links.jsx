import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Logo from './Logo'
import styled from 'styled-components'

const ContainerRow = styled.div.attrs({ className: "d-flex flex-row" })
`
  padding: 5px 5px 5px 5px;
`

function Links() {

    return (
      <ContainerRow>
        <Logo className="navbar-brand d-flex justify-content-center align-items-center align-self-start" />
        <Link to="/" className="navbar-brand d-flex justify-content-center align-items-center align-self-start">
          <div style={{ color: '#222' }} >UNO Card Game<br />(juanky201271&copy;)</div>
        </Link>
        <LoginForm />
      </ContainerRow>
    )

}

export default Links

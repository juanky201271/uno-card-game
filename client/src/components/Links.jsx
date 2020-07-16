import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

function Links() {

    return (
      <>
        <Link to="/" className="navbar-brand">
          <div style={{ color: '#222' }} >UNO Card Game</div>
        </Link>
        <LoginForm />
      </>
    )

}

export default Links

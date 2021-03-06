import React from 'react'
import styled from 'styled-components'

import Links from './Links'

const Container = styled.div.attrs({ className: "container" })``
const Nav = styled.nav.attrs({ className: "navbar navbar-expand-lg navbar-dark" })`
  margin-bottom: 20px;
  background-color: #eee;
`

function NavBar() {

    return (
      <Container>
        <Nav>
          <Links/>
        </Nav>
      </Container>
    )

}

export default NavBar

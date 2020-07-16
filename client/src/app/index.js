import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar, GameProvider } from '../components'
import { Game } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <GameProvider>
      <Router>

        <NavBar/>
        <Switch>
          <Route path="/" exact component={Game} />
        </Switch>

      </Router>
    </GameProvider>
  )

}

export default App

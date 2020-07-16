import React, { useState } from 'react'

const GameContext = React.createContext([{ sockets: [] }, () => {}])

const GameProvider = (props) => {
  const [ state, setState ] = useState({})
  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider }

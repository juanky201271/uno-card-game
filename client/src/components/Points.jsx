import React from 'react'
import styled from 'styled-components'

const Ptxt = styled.div.attrs({ className: 'text-dark text-center' })
`
  width: 150px;
`
const value = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '+2': 20, 's': 20, 'r': 20, '+4': 50, 'c': 50 }

function Points(props) {
  const total = () => {
    let t = 0
    for (let i = 0; i < props.cards.length; i++) {
      t += Number(value[props.cards[i].card.n.toString()])
    }
    return t
  }

  return (
    <Ptxt>Cards Points: {total()}</Ptxt>
  )
}

export default Points

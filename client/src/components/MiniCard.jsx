import React from 'react'
import styled from 'styled-components'

const DivPile = styled.div.attrs({})
`
`
const DivCardLitNumberPile = styled.div.attrs({ className:"font-weight-bold font-italic" })
`
  font-size: 20px;
  text-shadow: 2px 2px 2px #000000;
`

const colors = {
  red: '#f44336',
  yellow: '#ffeb3b',
  green: '#4caf50',
  blue: '#2196f3',
  wild: '#292b2c'
}

function MiniCard(props) {

  const color = colors[props.color]
  const wildColor = colors[props.wildColor]
  const clN = 'd-flex justify-content-center align-items-center align-self-' + props.align
  const DivPileStyle = { border: (props.lastPlay ? '5px solid black' : '1px solid black'), borderRadius: '5px',
                         backgroundColor: color, width: props.width, height: props.height, margin: '3px 3px 3px 3px',
                         color: (['c','+4'].includes(props.number) ? wildColor : 'white') }

  //console.log('MiniCard', props)
  return (
    <DivPile key={props.color + props.number + props.order} className={clN} style={DivPileStyle}>
      {[0,1,2,3,4,5,6,7,8,9,'+2','+4'].includes(props.number) &&
        (<DivCardLitNumberPile>{props.number}</DivCardLitNumberPile>)
      }
      {props.number === 'r' &&
        (<DivCardLitNumberPile>{'Rev.'}</DivCardLitNumberPile>)
      }
      {props.number === 's' &&
        (<DivCardLitNumberPile>{'Skip'}</DivCardLitNumberPile>)
      }
      {props.number === 'c' &&
        (<DivCardLitNumberPile>{'Col.'}</DivCardLitNumberPile>)
      }
    </DivPile>
  )
}

export default MiniCard

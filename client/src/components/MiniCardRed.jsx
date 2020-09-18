import React from 'react'
import styled from 'styled-components'

const DivPile = styled.div.attrs({})
`
`
const ContainerColumn = styled.div.attrs({ className: "d-flex flex-column" })
`
  padding: 5px 5px 5px 5px;
`

function MiniCardRed(props) {

  const color = 'transparent'
  const clN = 'd-flex justify-content-center align-items-center align-self-' + props.align
  const DivPileStyle = { border: '5px solid red', borderRadius: '5px',
                         backgroundColor: color, width: props.width, height: props.height, margin: '3px 3px 3px 3px' }

  //console.log('MiniCard', props)
  return (
    <ContainerColumn className={clN}>
      <DivPile className={clN} style={DivPileStyle}>
      </DivPile>
    </ContainerColumn>
  )
}

export default MiniCardRed

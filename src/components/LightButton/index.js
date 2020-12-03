import React from 'react'
import { Container, Title } from './styles'

const LightButton = ({ name, onPress, textColor, borderColor, children }) => {
    return (
        <Container borderColor={borderColor} onPress={onPress}>
            <Title textColor={textColor}>{name}</Title>
            {children}
        </Container>
    )
}
export default LightButton
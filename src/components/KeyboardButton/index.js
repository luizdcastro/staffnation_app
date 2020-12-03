import React from 'react'
import { Container, Title } from './styles'

const KeyboardButton = ({ name, onPress, textColor, borderColor, children }) => {
    return (
        <Container borderColor={borderColor} onPress={onPress}>
            <Title textColor={textColor}>{name}</Title>
            {children}
        </Container>
    )
}
export default KeyboardButton
import React from 'react'
import { Container, Title } from './styles'

const DarkButton = ({ name, onPress, children }) => {
    return (
        <Container onPress={onPress} >
            <Title>{name}</Title>
            {children}
        </Container>
    )
}
export default DarkButton

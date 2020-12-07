import React from 'react'
import { Container, Title } from './styles'

const CustomButton = ({ name, onPress, background, children }) => {
    return (
        <Container onPress={onPress} background={background} >
            <Title>{name}</Title>
            {children}
        </Container>
    )
}
export default CustomButton

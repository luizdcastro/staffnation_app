import React from 'react'
import { Container, Title } from './styles'
import { Image } from 'react-native'

const CategoryCard = ({ title, image, style }) => {
    return (
        <Container style={style}>
            <Image source={image} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
            <Title>{title}</Title>
        </Container>
    )
}

export default CategoryCard
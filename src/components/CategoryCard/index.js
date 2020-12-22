import React from 'react'
import { Container, Title } from './styles'
import { Image } from 'react-native'

const CategoryCard = ({ title, image, style, onPress }) => {
    return (
        <Container style={style} onPress={onPress}>
            <Image source={image} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
            <Title>{title}</Title>
        </Container>
    )
}

export default CategoryCard
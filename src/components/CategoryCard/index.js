import React from 'react'
import { Container, CategoryIcon, Title } from './styles'

const CategoryCard = ({ title, children, style }) => {
    return (
        <Container style={style} >
            <CategoryIcon >
                {children}
            </CategoryIcon>
            <Title>{title}</Title>
        </Container>
    )
}

export default CategoryCard
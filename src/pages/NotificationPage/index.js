import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Container } from './styles'

import { AntDesign } from '@expo/vector-icons';

const NotificationPage = () => {
    return (
        <Container>

        </Container>
    )
}

export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Notificações',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            color: 'grey',
            fontFamily: "NunitoSans_700Bold",
        },
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#FFF',
            height: 75,
        },
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <AntDesign name="arrowleft" size={25} color="grey" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        ),
    }
}

export default NotificationPage
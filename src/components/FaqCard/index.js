import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";


const FaqCard = ({ title, text, setModal }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}>
            <View style={{
                backgroundColor: '#fafafa',
                width: '90%',
                height: '70%',
                borderRadius: 10,
                paddingHorizontal: 20
            }}>
                <TouchableOpacity onPress={() => setModal(false)}>
                    <Ionicons name="md-close" size={30} color="#00A699" style={{ alignSelf: 'flex-end', marginTop: 15 }} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subject}>{text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848',
        fontSize: 18,
        marginBottom: 15
    },
    subject: {
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
})

export default FaqCard
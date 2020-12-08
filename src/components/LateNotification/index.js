import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Slider from "@react-native-community/slider";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import GradientButton from '../../components/GradientButton'
import { color } from 'react-native-reanimated';


const LateNotification = ({ navigation, setModalNotification }) => {
    const [time, setTime] = useState(15)
    const [optionOne, setOptionOne] = useState(false)
    const [optionTwo, setOptionTwo] = useState(false)
    const [optionThree, setOptionThree] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.notification}>
                <TouchableOpacity onPress={() => setModalNotification(false)}>
                    <Ionicons name="md-close" size={30} color="grey" style={{ alignSelf: 'flex-end', marginTop: 15 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Selecione seu tempo estimado de chegada. Tolerância de até uma hora de atraso.</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={15}
                    maximumValue={60}
                    step={15}
                    minimumTrackTintColor="#6978EA"
                    maximumTrackTintColor="#E8E8E8"
                    thumbTintColor="#523BE4"
                    value={time}
                    onValueChange={(value) => setTime(value)}
                />
                <View>
                    <Text style={styles.timer}> {time} minutos</Text>
                </View>
                <View style={styles.notificationCard}>
                    <Text style={styles.textCard}>Problemas com o trânsito</Text>
                    <TouchableOpacity onPress={() => {
                        setOptionOne(!optionOne)
                        setOptionTwo(false)
                        setOptionThree(false)
                    }
                    }>
                        {!optionOne ? <Feather name="circle" size={26} color="grey" /> :
                            <MaterialIcons
                                name="check-circle"
                                size={26}
                                color="#523BE4"
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.notificationCard}>
                    <Text style={styles.textCard}>Problemas com o trânsito</Text>
                    <TouchableOpacity onPress={() => {
                        setOptionTwo(!optionTwo)
                        setOptionOne(false)
                        setOptionThree(false)
                    }
                    }>
                        {!optionTwo ? <Feather name="circle" size={26} color="grey" /> :
                            <MaterialIcons
                                name="check-circle"
                                size={26}
                                color="#523BE4"
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.notificationCard}>
                    <Text style={styles.textCard}>Problemas com o trânsito</Text>
                    <TouchableOpacity onPress={() => {
                        setOptionThree(!optionThree)
                        setOptionOne(false)
                        setOptionTwo(false)
                    }
                    }>
                        {!optionThree ? <Feather name="circle" size={26} color="grey" /> :
                            <MaterialIcons
                                name="check-circle"
                                size={26}
                                color="#523BE4"
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => setModalNotification(false)}>
                        <Text style={styles.textButton}>Enviar Notificação</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    notification: {
        backgroundColor: '#fafafa',
        width: '90%',
        height: '70%',
        borderRadius: 10,
        paddingHorizontal: 20
    },
    title: {
        textAlign: 'center',
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 16,
        marginTop: 20,
        color: '#484848'
    },
    slider: {
        width: "90%",
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    timer: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15, color: '#484848',
        fontFamily: 'NunitoSans_400Regular'
    },
    button: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#523BE4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textButton: {
        fontFamily: 'NunitoSans_700Bold',
        textTransform: 'uppercase',
        color: '#523BE4'
    },
    buttonsContainer: {
        flex: 1,
        marginBottom: 25,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    notificationCard: {
        flexDirection: 'row',
        marginTop: 10,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#fff",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },

    textCard: {
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    }
})

export default LateNotification
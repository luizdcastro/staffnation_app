import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Slider from "@react-native-community/slider";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import GradientButton from '../../components/GradientButton'


const LateNotification = ({ navigation, setModalNotification }) => {
    const [time, setTime] = useState(15)
    const [optionOne, setOptionOne] = useState(false)
    const [optionTwo, setOptionTwo] = useState(false)
    const [optionThree, setOptionThree] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.notification}>
                <TouchableOpacity onPress={() => setModalNotification(false)}>
                    <Ionicons name="md-close" size={30} color="#00A699" style={{ alignSelf: 'flex-end', marginTop: 15 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Selecione seu tempo estimado de chegada. Tolerância de até uma hora de atraso.</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={15}
                    maximumValue={60}
                    step={15}
                    minimumTrackTintColor="#00A699"
                    maximumTrackTintColor="#b0bec5"
                    thumbTintColor="#00A699"
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
                        {!optionOne ? <Feather name="circle" size={30} color="#00A699" /> :
                            <MaterialIcons
                                name="check-circle"
                                size={30}
                                color="#00A699"
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
                        {!optionTwo ? <Feather name="circle" size={30} color="#00A699" /> :
                            <MaterialIcons
                                name="check-circle"
                                size={30}
                                color="#00A699"
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
                        {!optionThree ? <Feather name="circle" size={30} color="#00A699" /> :
                            <MaterialIcons
                                name="check-circle"
                                size={30}
                                color="#00A699"
                            />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <GradientButton
                        title="ENVIAR NOTIFICAÇÃO"
                        gradient={["#00A699", "#00A699"]}
                        onPress={() => setModalNotification(false)}
                    />
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
    buttonsContainer: {
        flex: 1,
        marginBottom: 20,
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
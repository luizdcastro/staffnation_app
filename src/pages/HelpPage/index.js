import React, { useState } from 'react'
import { View, Text, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import FaqCard from '../../components/FaqCard'

const HelpPage = () => {
    const [modal1, setModal1] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [modal3, setModal3] = useState(false)
    const [modal4, setModal4] = useState(false)

    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={styles.card} onPress={() => setModal1(!modal1)}>
                    <View>
                        <Text style={styles.title}>Dúvida 1</Text>
                        <Text style={styles.subject}>Header dúvida 1</Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={20} color="#00A699" />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal1}>
                        <FaqCard
                            setModal={setModal1}
                            title='Dúvida 1'
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel est a lacus aliquam tincidunt sed eu est. Donec hendrerit lacus in diam ornare suscipit. "
                        />
                    </Modal>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => setModal2(!modal2)}>
                    <View>
                        <Text style={styles.title}>Dúvida 2</Text>
                        <Text style={styles.subject}>Header dúvida 2</Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={20} color="#00A699" />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal2}>
                        <FaqCard
                            setModal={setModal2}
                            title='Dúvida 2'
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel est a lacus aliquam tincidunt sed eu est. Donec hendrerit lacus in diam ornare suscipit. "
                        />
                    </Modal>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => setModal3(!modal3)}>
                    <View>
                        <Text style={styles.title}>Dúvida 3</Text>
                        <Text style={styles.subject}>Header dúvida 3</Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={20} color="#00A699" />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal3}>
                        <FaqCard
                            setModal={setModal3}
                            title='Dúvida 3'
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel est a lacus aliquam tincidunt sed eu est. Donec hendrerit lacus in diam ornare suscipit. "
                        />
                    </Modal>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => setModal4(!modal4)}>
                    <View>
                        <Text style={styles.title}>Dúvida 4</Text>
                        <Text style={styles.subject}>Header dúvida 4</Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={20} color="#00A699" />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal4}>
                        <FaqCard
                            setModal={setModal4}
                            title='Dúvida 4'
                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel est a lacus aliquam tincidunt sed eu est. Donec hendrerit lacus in diam ornare suscipit. "
                        />
                    </Modal>
                </TouchableOpacity>
            </ScrollView>
            <View >
                <TouchableOpacity style={styles.footerButton} onPress={() => { }}>
                    <Text style={styles.footerButtonText}>Suporte via email</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const pageOptions = {
    headerTitle: 'Dúvidas e Suporte',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        color: '#484848',
        fontFamily: "NunitoSans_700Bold",
        fontSize: 20,
        textAlign: 'center',

    },
    headerBackTitleVisible: false,
    headerStyle: {
        backgroundColor: '#fafafa',
        height: Platform.OS === 'ios' ? 90 : 70,

    },
    headerTintColor: '#00A699',

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 15,
        borderBottomWidth: 0.3,
        borderColor: '#484848',
        paddingVertical: 10
    },
    title: {
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848',
        fontSize: 16
    },
    subject: {
        fontFamily: 'NunitoSans_400Regular',
        color: '#484848'
    },
    footerButton: {
        backgroundColor: '#fff',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    footerButtonText: {
        fontFamily: "NunitoSans_700Bold",
        fontSize: 18,
        color: '#00A699'
    }
})

export default HelpPage
import React from 'react'
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { logoutUser } from "../../redux/actions/authActions";

const DrawerContent = ({ dispatchLogoutAction, navigation }) => {

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatchLogoutAction()
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.personalData}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg' }}
                    />
                    <View>
                        <Text style={styles.name}>Luiz Castro</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                            <Text style={styles.rate}>4.90</Text>
                            <Ionicons name="ios-star" size={13} color="#767676" />
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate('ProfilePage')}>
                        <Text style={[styles.buttonText, { color: '#767676', marginHorizontal: 20 }]} >Editar Perfil</Text>
                        <Ionicons name="ios-arrow-forward" size={24} color="#00A699" style={{ marginHorizontal: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 25 }}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.toggleDrawer()}>
                        <Feather name="home" size={24} color="#00A699" style={{ marginLeft: 20, marginRight: 15 }} />
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('JobsTab')}>
                        <Feather name="calendar" size={24} color="#00A699" style={{ marginLeft: 20, marginRight: 15 }} />
                        <Text style={styles.buttonText}>Meus Trabalhos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchPage')}>
                        <Feather name="search" size={24} color="#00A699" style={{ marginLeft: 20, marginRight: 15 }} />
                        <Text style={styles.buttonText}>Pesquisar Vagas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TransferPage')}>
                        <Feather name="repeat" size={24} color="#00A699" style={{ marginLeft: 20, marginRight: 15 }} />
                        <Text style={styles.buttonText}>Transferir Saldo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, justifyContent: 'flex-end', marginBottom: 15 }}>
                    <View >
                        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                            <Ionicons name="md-exit" size={24} color="#00A699" style={{ marginLeft: 20, marginRight: 15 }} />
                            <Text style={styles.buttonText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    personalData: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
        marginLeft: 20,
    },
    name: {
        fontFamily: "NunitoSans_700Bold",
        fontSize: 17,
        color: '#484848',
        paddingBottom: 3
    },
    rate: {
        fontFamily: "NunitoSans_600SemiBold",
        color: '#484848',
        paddingRight: 5,
    },
    buttonEdit: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderTopWidth: 0.3,
        borderTopColor: '#767676',
        borderBottomWidth: 0.3,
        borderBottomColor: '#767676',
        justifyContent: 'space-between'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    buttonText: {
        fontFamily: "NunitoSans_600SemiBold",
        color: '#767676',
        paddingRight: 5,
    },


})


const mapDispatchToProps = (dispatch) => ({
    dispatchLogoutAction: () => dispatch(logoutUser()),
});


export default connect(null, mapDispatchToProps)(DrawerContent)

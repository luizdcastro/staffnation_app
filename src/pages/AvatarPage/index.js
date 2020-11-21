import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { selectUserData } from '../../redux/reducers/user/userSelector'

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

import {
    uploadImage,
    deleteImage,
} from '../../redux/actions/fileActions';
import { getUser, updateUser } from "../../redux/actions/userActions"

import GradientButton from '../../components/GradientButton'

const AvatarPage = ({
    navigation,
    user,
    dispathUploadAction,
    dispatchGetUserAction,
    dispatchUpdateUserAction,
    dispatchDeleteImage
}) => {
    const [imagePreview, setImagePreviw] = useState('')
    const [file, setFile] = useState('')

    const ImagePickerCall = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status !== 'granted') {
                alert('Precisamos de permissão para galeria de fotos')
            }

        }
        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0,
        })

        if (data.cancelled) {
            return
        }

        if (!data.uri) {
            return
        }
        setImagePreviw(data)

        const form = new FormData();
        form.append('file', {
            uri: data.uri, name: 'avatar.png', type: 'image/png'
        })
        setFile(form)
    }

    const handleUploadImage = () => {
        dispathUploadAction(
            file,
            async (response) => {
                const data = await response
                dispatchUpdateUserAction(
                    user.data._id,
                    { id: data._id, url: data.url },
                    () => {
                        if (user.data.avatar.id) {
                            dispatchDeleteImage(user.data.avatar.id)
                        }
                    },
                    (error) => console.log(error)
                )
                dispatchGetUserAction(user.data._id)
            },
            (error) => console.log('error:', error)
        )
        navigation.navigate('ProfilePage')
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end', }}>
                <Image
                    style={styles.avatar}
                    source={{ uri: `${imagePreview.uri ? imagePreview.uri : user.data.avatar?.url}` }}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={ImagePickerCall}>
                        <Text style={styles.textButton}>Procurar Imagem</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {imagePreview.uri ?
                        <GradientButton
                            title="Salvar Alteração"
                            gradient={["#00A699", "#00A699"]}
                            onPress={handleUploadImage}
                        /> :
                        <GradientButton
                            onPress={() => { }}
                            gradient={["#E8E8E8", "#E8E8E8"]}
                            title="Salvar Alteração"
                            textStyle={{ color: "#767676" }}
                        />
                    }
                </View>

            </View>
        </View>
    )
}

export const pageOptions = {
    headerTitle: 'Alterar Foto',
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
        backgroundColor: '#fafafa',
        justifyContent: 'space-evenly'
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginRight: 15,
        marginLeft: 20,
    },
    buttonsContainer: {
        flex: 1,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 50,
        borderWidth: 1.3,
        borderColor: '#00A699',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        borderRadius: 5,
        marginBottom: 10,
    },
    textButton: {
        color: '#00A699',
        textTransform: 'uppercase',
        fontFamily: 'NunitoSans_600SemiBold'
    },
})

const mapStateToProps = createStructuredSelector({
    user: selectUserData,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchGetUserAction: (id) => dispatch(getUser(id)),
    dispathUploadAction: (file, onSuccess, onError) =>
        dispatch(uploadImage(file, onSuccess, onError)),
    dispatchUpdateUserAction: (id, avatar, onSuccess, onError) =>
        dispatch(updateUser(id, { avatar }, onSuccess, onError)),
    dispatchDeleteImage: (imageId) => dispatch(deleteImage(imageId)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarPage)

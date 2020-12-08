import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

import {
    uploadImage,
    deleteImage,
} from '../../redux/actions/fileActions';
import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

import { AntDesign } from '@expo/vector-icons';
import LightButton from '../../components/LightButton'
import CustomButton from '../../components/CustomButton'

const AvatarPage = ({
    navigation,
    getme,
    dispathUploadAction,
    dispatchGetMe,
    dispatchUpdateUserAction,
    dispatchDeleteImage
}) => {
    const [imagePreview, setImagePreviw] = useState('')
    const [file, setFile] = useState('')

    const ImagePickerCall = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissão para acessar a galeria de fotos');
            }
        }

        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
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
                    getme.data._id,
                    { id: data._id, url: data.url },
                    () => {
                        if (getme.data.avatar.id) {
                            dispatchDeleteImage(getme.data.avatar.id)
                        }

                    },
                    (error) => console.log(error)
                )
                dispatchGetMe()
            },
            (error) => console.log(error)
        )
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end', }}>
                <Image
                    style={styles.avatar}
                    source={{ uri: `${imagePreview.uri ? imagePreview.uri : getme.data.avatar?.url}` }}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <View style={{ width: '90%', alignItems: 'center' }}>
                    <LightButton
                        textColor="#523BE4"
                        borderColor="#523BE4"
                        name="Procurar Imagem"
                        onPress={ImagePickerCall} />
                </View>
                <View style={{ width: '90%' }}>
                    {imagePreview.uri ?
                        <CustomButton
                            name="Salvar Alteração"
                            background="#523BE4"
                            onPress={handleUploadImage}
                        /> :
                        <CustomButton
                            name="Salvar Alteração"
                            background="#96a0f0"
                        />
                    }
                </View>

            </View>
        </View>
    )
}
export const pageOptions = ({ navigation }) => {
    return {
        headerTitle: 'Alterar Imagem',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            color: 'grey',
            fontFamily: "NunitoSans_700Bold",
            textAlign: 'center',

        },
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: '#FFF',
            height: 80,
        },
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <AntDesign name="arrowleft" size={25} color="grey" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        ),
    }
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

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
    dispathUploadAction: (file, onSuccess, onError) =>
        dispatch(uploadImage(file, onSuccess, onError)),
    dispatchUpdateUserAction: (id, avatar, onSuccess, onError) =>
        dispatch(updateUser(id, { avatar }, onSuccess, onError)),
    dispatchDeleteImage: (imageId) => dispatch(deleteImage(imageId)),
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarPage)

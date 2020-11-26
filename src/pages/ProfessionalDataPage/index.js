import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

import { updateUser } from "../../redux/actions/userActions"
import { getMe } from "../../redux/actions/getMeActions"

import _ from "lodash";
import SelectorCategory from '../../components/SelectorCategory'

const ProfessionalDataPge = ({ navigation, getme, dispatchGetMe, dispatchUpdateUserAction }) => {
    const [segCardExpanded, setSegCardExpanded] = useState(false);
    const [segExperience, setSegExperience] = useState(0);
    const [segCertificate, setSegCertificate] = useState(false);
    const [barCardExpanded, setBarCardExpanded] = useState(false);
    const [barExperience, setBarExperience] = useState(0);
    const [barCertificate, setBarCertificate] = useState(false);
    const [hostCardExpanded, setHostCardExpanded] = useState(false);
    const [hostExperience, setHostExperience] = useState(0);
    const [hostCertificate, setHostCertificate] = useState(false);
    const [limpCarExpanded, setLimpCardExpanded] = useState(false);
    const [limpExprience, setLimpExperience] = useState(0);
    const [limpCertificate, setLimpCertificate] = useState(false);
    const [garCardExpanded, setGacCardExpanded] = useState(false);
    const [garExperience, setGarExperience] = useState(0);
    const [garCertificate, setGarCertificate] = useState(false);

    const categories = [
        {
            id: 1,
            name: "segurança",
            certificado: segCertificate,
            experiencia: segExperience,
            selected: segCardExpanded,
        },
        {
            id: 2,
            name: "bar",
            certificado: barCertificate,
            experiencia: barExperience,
            selected: barCardExpanded,
        },
        {
            id: 3,
            name: "hostess",
            certificado: hostCertificate,
            experiencia: hostExperience,
            selected: hostCardExpanded,
        },
        {
            id: 4,
            name: "limpeza",
            certificado: limpCertificate,
            experiencia: limpExprience,
            selected: limpCarExpanded,
        },
        {
            id: 5,
            name: "garçom",
            certificado: garCertificate,
            experiencia: garExperience,
            selected: garCardExpanded,
        },
    ];

    const userCategories = _.filter(categories, ["selected", true]);

    const handleUpdateCategories = (event) => {
        event.preventDefault();
        dispatchUpdateUserAction(
            getme.data._id,
            userCategories,
            () => dispatchGetMe(),
            (error) => console.log(error)
        )
        navigation.navigate('ProfilePage')
    }


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ paddingRight: 15 }} onPress={handleUpdateCategories}>
                    <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_700Bold', color: '#00A699' }}>Salvar</Text>
                </TouchableOpacity>
            )
        })
    }, [userCategories])

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { marginBottom: 5 }]}>Categoria atual</Text>
            <View style={styles.tagContainer}>
                {getme.data.categories?.length > 0
                    ? getme.data.categories.map((item) => (
                        <View key={item.id} style={styles.tag}>
                            <Text style={styles.tagText}>{item.name}</Text>
                        </View>
                    ))
                    : null}
            </View>
            <Text style={styles.label}>Alterar categorias</Text>
            <ScrollView style={{ marginVertical: 10 }}>
                <SelectorCategory
                    title="Segurança"
                    setCardExpanded={setSegCardExpanded}
                    setCertificate={setSegCertificate}
                    setExperience={setSegExperience}
                    cardExpanded={segCardExpanded}
                    experience={segExperience}
                    certificate={segCertificate}
                    categoriesLimit={userCategories.length}
                />
                <SelectorCategory
                    title="Bar"
                    setCardExpanded={setBarCardExpanded}
                    setCertificate={setBarCertificate}
                    setExperience={setBarExperience}
                    cardExpanded={barCardExpanded}
                    experience={barExperience}
                    certificate={barCertificate}
                    categoriesLimit={userCategories.length}
                />
                <SelectorCategory
                    title="Hostess"
                    setCardExpanded={setHostCardExpanded}
                    setCertificate={setHostCertificate}
                    setExperience={setHostExperience}
                    cardExpanded={hostCardExpanded}
                    experience={hostExperience}
                    certificate={hostCertificate}
                    categoriesLimit={userCategories.length}
                />
                <SelectorCategory
                    title="Limpeza"
                    setCardExpanded={setLimpCardExpanded}
                    setCertificate={setLimpCertificate}
                    setExperience={setLimpExperience}
                    cardExpanded={limpCarExpanded}
                    experience={limpExprience}
                    certificate={limpCertificate}
                    categoriesLimit={userCategories.length}
                />
                <SelectorCategory
                    title="Garçom"
                    setCardExpanded={setGacCardExpanded}
                    setCertificate={setGarCertificate}
                    setExperience={setGarExperience}
                    cardExpanded={garCardExpanded}
                    experience={garExperience}
                    certificate={garCertificate}
                    categoriesLimit={userCategories.length}
                />
            </ScrollView>
        </View >
    )
}

export const pageOptions = {
    headerTitle: 'Perfil Profissional',
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
    label: {
        fontSize: 16,
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848',
        marginLeft: 20,
        marginTop: 10
    },
    tagContainer: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row'
    },
    tag: {
        borderWidth: 1,
        borderColor: '#00A699',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 35,
        marginRight: 10
    },
    tagText: {
        fontSize: 18,
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#00A699'
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe()),
    dispatchUpdateUserAction: (id, categories, onSuccess, onError) =>
        dispatch(updateUser(id, { categories }, onSuccess, onError))
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDataPge)
import React from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions } from 'react-native'
import { Container, ImageBanner, MainContent, DiscontDetails, DetailsHeader, Title, SubTitle, DiscontTitle, IconBar, IconButton, IconTitle, TitleContent, RegularText, ButtonContainer, BackIcon } from './styles'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const JobDetails = ({
    title,
    category,
    positions,
    date,
    timeStart,
    timeEnd,
    payment,
    uniform,
    addressStreet,
    addressNumber,
    addressNeighborhood,
    addressCity,
    addressState,
    navigation,
    image
}) => {
    return (
        <Container>
            <StatusBar barStyle='light-content' />
            <BackIcon>
                <AntDesign name="arrowleft" size={25} color="#fafafa" onPress={() => navigation.goBack()} />
            </BackIcon>
            <ImageBanner source={{ uri: image }} width={width} />
            <MainContent width={width} height={height - 110}>
                <DiscontDetails>

                    <DetailsHeader>
                        <View>
                            <Title>{title}</Title>
                            <SubTitle>{category}</SubTitle>
                        </View>
                        <View>
                            <SubTitle>Pagamento</SubTitle>
                            <DiscontTitle>R$ {payment}</DiscontTitle>
                        </View>
                    </DetailsHeader>
                    <IconBar>
                        <IconButton>
                            <Text style={{ fontSize: 22, fontFamily: 'NunitoSans_600SemiBold', color: "#523BE4" }}>{positions}</Text>
                            <Text style={{ fontFamily: 'NunitoSans_600SemiBold', color: 'grey', lineHeight: 12 }}>{positions <= 1 ? "Vaga" : "Vagas"}</Text>
                        </IconButton>
                        <IconButton>
                            <Feather name="map-pin" size={22} color="#523BE4" />
                            <IconTitle>Localização</IconTitle>
                        </IconButton>
                        <IconButton>
                            <Feather name="globe" size={22} color="#523BE4" />
                            <IconTitle>Website</IconTitle>
                        </IconButton>
                    </IconBar>
                    <View>
                        <TitleContent>Data e Horário</TitleContent>
                        <RegularText>Dia: {date}</RegularText>
                        <RegularText>Horário: {timeStart} às {timeEnd}</RegularText>
                    </View>
                    <View>
                        <TitleContent>Endereço</TitleContent>
                        <RegularText>{addressStreet}, {addressNumber}{"\n"}{addressNeighborhood}, {addressCity} - {addressState}</RegularText>
                    </View>
                    <View>
                        <TitleContent>Observações</TitleContent>
                        <ScrollView style={{ maxHeight: 120 }} showsVerticalScrollIndicator={false}>
                            <RegularText>Uniforme: {uniform}</RegularText>
                        </ScrollView>
                    </View>
                </DiscontDetails>
            </MainContent>
        </Container>
    )
}

const styles = StyleSheet.create({})

export default JobDetails
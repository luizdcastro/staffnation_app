import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #fafafa;
`;

export const ImageBanner = styled.Image`
    width: ${props => props.width + 'px'};
    height: 120px;
`;

export const BackIcon = styled.TouchableOpacity`
    position: absolute;
    top: 10%;
    left: 2%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    padding: 5px;
`;

export const MainContent = styled.View`
    width: ${props => props.width + 'px'};
    height: ${props => props.height + 'px'};
    background-color: #fafafa;
    position: absolute;
    margin-top: 110px;
    border-radius: 10px;
    justify-content: space-between;
`;

export const DiscontDetails = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    justify-content: space-between;
`;

export const DetailsHeader = styled.View`
    flex-direction: row;
    border-bottom-width: 0.3px;
    border-bottom-color: grey;
    padding-bottom: 15px;
    margin-top: 15px;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-family: 'NunitoSans_700Bold';
    font-size: 20px
`;

export const SubTitle = styled.Text`
    font-family: 'NunitoSans_600SemiBold';
    font-size: 16px;
    color: grey
`;

export const DiscontTitle = styled.Text`
    font-family: 'NunitoSans_700Bold';
    font-size: 18px;
    text-align: center
`;

export const IconBar = styled.View`
    flex-direction: row;
    justify-content: space-around;
    border-bottom-width: 0.3px;
    border-bottom-color: grey;
    padding-top: 15px;
    padding-bottom: 15px;
`;

export const IconButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 90px
`;

export const IconTitle = styled.Text`
    margin-top: 3px;
    font-family: 'NunitoSans_600SemiBold';
    color: grey
`;

export const TitleContent = styled.Text`
    font-family: 'NunitoSans_700Bold';
    font-size: 18px;
    margin-top: 15px;
    padding-bottom: 5px
`;

export const RegularText = styled.Text`
    font-family: 'NunitoSans_600SemiBold';
    font-size: 15px;
    color: grey
`;

export const ButtonContainer = styled.View`
    margin-left: 15px;
    margin-right: 15px;
    justify-content: flex-end;
    padding-bottom: 30px
`;
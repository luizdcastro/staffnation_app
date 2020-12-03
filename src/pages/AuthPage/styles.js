import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const ImageCover = styled.ImageBackground`
    flex: 1;
`;

export const ButtonContainer = styled.View`
    flex: 1;
    width: 90%;
    justify-content: flex-end;
    align-items: center;
    align-self: center;
    margin-bottom: 25px
`;

export const Title = styled.Text`
    color: #FAFAFA;
    font-family: "NunitoSans_300Light";
    font-size: 38px;
    line-height: 41px;
    align-self: flex-start;
    margin-bottom: 25px
`;

export const Logo = styled.Text`
    color: #FAFAFA;
    font-family: "NunitoSans_900Black";
    font-size: 38px;
    margin-top: 15%;
    align-self: flex-end;
    margin-right: 5%    
`;

export const CustomModal = styled.View`
     width: 100%;
     height: 100%; 
     z-index: 1 
`;
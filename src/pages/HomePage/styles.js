import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #fafafa
`;

export const Title = styled.Text`
    font-family: 'NunitoSans_600SemiBold';
    font-size: 20px;
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const HeaderLeft = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: #fafafa;
    padding: 5px;
    border-radius: 30px;
`;

export const HeaderTitle = styled.Text`
    font-family: 'NunitoSans_700Bold';
    font-size: 15px;
    color: grey;
    padding-left: 5px;
    color: #484848
`;
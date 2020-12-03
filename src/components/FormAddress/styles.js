import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`;

export const ModalContent = styled.View`
    flex: 1;
    background-color: #FAFAFA;
    width: 100%;
    margin-top: 8%;
`;

export const RegisterContent = styled.View`
    flex: 1;
    justify-content: space-between;
    margin-top: 5%;
`;

export const Title = styled.Text`
    font-size: 22px;
    font-family: 'NunitoSans_400Regular';
    color: #484848;
    margin: 5% 5% 5% 5%;

`;

export const ErrorMessage = styled.Text`
font-size: 15px;
    font-family: 'NunitoSans_400Regular';
    color: #BA000D;
    margin: 0 0 5% 5%;
`;

export const InputContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 0 5%;
`;
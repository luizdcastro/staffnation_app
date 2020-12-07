import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: ${props => props.background};
    justify-content: center;
    align-items: center;
    margin-top: 10px
`;

export const Title = styled.Text`
    color: #FAFAFA;
    text-transform: uppercase;
    font-family: 'NunitoSans_800ExtraBold';
`;
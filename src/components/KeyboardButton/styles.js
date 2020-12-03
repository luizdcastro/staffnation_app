import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 55px;
    justify-content: center;
    align-items: center;
    border-color: ${props => props.borderColor};    
    border-top-width: 0.5px;
`;

export const Title = styled.Text`
    color: ${props => props.textColor};
    text-transform: uppercase;
    font-family: 'NunitoSans_800ExtraBold';
`;
import React from 'react'
import styled from 'styled-components'

const Watchlist = props => {

    return (
        <Container>
            <PageTitle>Watchlist</PageTitle>

        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #223343;
    align-items: center;
    justify-content: flex-start;
    padding-top: 30px;
`;

const PageTitle = styled.Text`
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const StyledButton = styled.TouchableOpacity`
    background-color: grey;
    color: black;
    margin-bottom: 10px;
    padding: 10px;
`

const StyledText = styled.Text`
    color: white;
    font-size: 16px;
    text-align: center;
`;


export default Watchlist
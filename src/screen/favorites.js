import React, { useState } from 'react'
import styled from 'styled-components'

const Favorites = props => {

    const [favorites, setFavorites] = useState([]);

    const handleNavigation = page => {
        props.navigation.navigate(page);
    };

    return (
        <FavoritesList>
            <StyledButton onPress={() => handleNavigation('Home')}>
                <StyledText>Retour</StyledText>
            </StyledButton>
            
            <PageTitle>Favorites</PageTitle>
            {favorites.map((result) => (
                <FavoriteContainer key={result.imdbID}>
                    <StyledMovieTitle>{result.Type} - {result.Title}</StyledMovieTitle>
                    <StyledMovieInfos>{result.Plot}</StyledMovieInfos>
                </FavoriteContainer>
            ))}
        </FavoritesList>
    )
}

const FavoritesList = styled.View`
    flex: 1;
    background-color: #223343;
    align-items: center;
    justify-content: flex-start;
    padding-top: 70px;
`

const FavoriteContainer = styled.View`
    flex: 1;
    width: 370px;
    margin-bottom: 20px;
`

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
`;

export default Favorites
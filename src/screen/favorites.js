import React, { useState } from 'react'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {

    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData !== null) {
                setFavorites(JSON.parse(favoritesData));
            }
        } catch (error) {
            console.log(error);
        }
    };
    getFavorites();

    const removeFavorite = async (imdbID) => {
        try {
            const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            alert('Le film a bien été supprimé de vos favoris !')
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <Container>
            <PageTitle>Favorites</PageTitle>

            <FavoritesContainer>
                {favorites.map((movie) => (
                    <FavoriteList key={movie.imdbID}>
                        <MovieImage source={{ uri: movie.Poster }} />

                        <MovieInfo>
                            <MovieTitle>{movie.Title}{'\n'}</MovieTitle>
                        </MovieInfo>

                        <DeleteButton onPress={() => removeFavorite(movie.imdbID)} >
                            <StyledText>Delete</StyledText>
                        </DeleteButton>
                    </FavoriteList>
                ))}
            </FavoritesContainer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background-color: #223343;
    align-items: center;
    justify-content: flex-start;
    padding-top: 30px;
`

const PageTitle = styled.Text`
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
`

const FavoritesContainer = styled.ScrollView`
    flex: 1;
    width: 370px;
`

const FavoriteList = styled.View`
    flex: 1;
    padding: 10px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #445565;
    flex-direction: row;
    gap: 20px;
`

const MovieImage = styled.Image`
    width: 100px;
    height: 150px;
    object-fit: contain;
`;

const MovieInfo = styled.View`
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    margin-top: 14px;
`;

const MovieTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 700;
`;

const DeleteButton = styled.TouchableOpacity`
    background-color: #FF4C4C;
    padding: 10px;
    border-radius: 10px;
    margin-right: 10px;
`;

const StyledText = styled.Text`
    color: white;
    font-size: 16px;
    text-align: center;
`;

export default Favorites
import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

    const [searchMovie, setSearchMovie] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?s=${searchMovie}&apikey=513876dc`
            );
            setSearchResults(response.data.Search);
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddToFavorites = async (movie) => {
        if (favorites.includes(movie)) {
            alert("Ce film est déjà dans votre liste de favoris !");
        } else {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            try {
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                alert("Le film a été ajouté à votre liste de favoris !");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleAddToWatchlist = async (movie) => {
        if (watchlist.includes(movie)) {
            alert("Ce film est déjà dans votre watchlist !");
        } else {
            const updatedWatchlist = [...watchlist, movie];
            setWatchlist(updatedWatchlist);
            try {
                await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
                alert("Le film a été ajouté à votre watchlist !");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Container>
            <PageTitle>Movie DB</PageTitle>

            <SearchContainer>
                <SearchInput
                    placeholder="Search for movies or series..."
                    value={searchMovie}
                    onChangeText={setSearchMovie}
                    onSubmitEditing={handleSearch}
                />
                <SearchButton onPress={handleSearch}>
                    <StyledText>Search</StyledText>
                </SearchButton>
            </SearchContainer>

            <MoviesContainer>
                {searchResults.map((movie) => (
                    <MovieList key={movie.imdbID}>
                        <MovieImage source={{ uri: movie.Poster }} />

                        <MovieInfo>
                            <MovieTitle>{movie.Title}{'\n'}</MovieTitle>
                            <MovieDetails>{movie.Year} - {movie.Type}</MovieDetails>
                        </MovieInfo>

                        <ButtonContainer>
                            <FavoriteButton onPress={() => handleAddToFavorites(movie)}>
                                <StyledText>Add to favorites</StyledText>
                            </FavoriteButton>
                            <WatchListButton onPress={() => handleAddToWatchlist(movie)}>
                                <StyledText>Add to watchlist</StyledText>
                            </WatchListButton>
                        </ButtonContainer>
                    </MovieList>
                ))}
            </MoviesContainer>
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
    margin-bottom: 10px;
`;

const StyledText = styled.Text`
    color: white;
    font-size: 16px;
    text-align: center;
`;

const SearchContainer = styled.View`
    margin: 20px;
    align-items: center;
    flex-direction: row;
    gap: 20px;
`;

const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 18px;
    font-weight: 300;
    padding: 14px;
    background-color: #fff;
    border-radius: 10px;
`;

const SearchButton = styled.TouchableOpacity`
    background-color: #FF4C4C;
    padding: 17px;
    border-radius: 10px;
`;

const MoviesContainer = styled.ScrollView`
    flex: 1;
    width: 370px;
`;

const MovieList = styled.View`
    flex: 1;
    padding: 20px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #445565;
`;

const MovieImage = styled.Image`
    width: 270px;
    height: 270px;
    object-fit: contain;
`;

const MovieInfo = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    margin-top: 14px;
`;

const MovieTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
`;

const MovieDetails = styled.Text`
    color: #fff;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    gap: 20px;
    align-items: center;
`

const FavoriteButton = styled.TouchableOpacity`
    color: white;
    font-size: 16px;
    padding: 10px;
    background-color: #FF4C4C;
    border-radius: 8px;
    margin-top: 20px;
`

const WatchListButton = styled.TouchableOpacity`
    color: white;
    font-size: 16px;
    padding: 10px;
    background-color: #FF4C4C;
    border-radius: 8px;
    margin-top: 20px;
`

export default Home
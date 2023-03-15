import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Image } from 'react-native'

const Home = props => {

    const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=513876dc'

    const [searchMovie, setSearchMovie] = useState({
        s: "Batman",
        searchResults: [],
        selected: {}
    })

    const [favorites, setFavorites] = useState([]);

    const handleNavigation = page => {
        props.navigation.navigate(page)
    }

    const search = () => {
        axios(apiurl + "&s=" + searchMovie.s).then(({ data }) => {
            let searchResults = data.Search;
            // console.log(searchResults)
            setSearchMovie(prevSearch => {
                return { ...prevSearch, searchResults: searchResults }
            })
        })
    }

    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie])
        console.log(setFavorites)
    }

    return (
        <Container>
            <PageTitle>Movie DB</PageTitle>

            <StyledButton onPress={() => handleNavigation('Favorites')}>
                <StyledText>Mes favoris</StyledText>
            </StyledButton>

            <SearchContainer>
                <SearchInput
                    onChangeText={text => setSearchMovie(prevSearch => {
                        return { ...prevSearch, s: text }
                    })}
                    onSubmitEditing={search}
                    value={searchMovie.s}
                />
            </SearchContainer>

            <MoviesContainer>
                {searchMovie.searchResults.map(movie => (
                    <MovieList key={movie.imdbID}>
                        {/* <Image
                            source={{ uri: movie.Poster }}
                            style={{
                                width: 300,
                                height: 300
                            }}
                            resizeMode="cover"
                        /> */}
                        <MovieTitle>{movie.Title}</MovieTitle>

                        <FavoriteContainer>
                            <FavoriteButton onPress={() => addToFavorites(movie)}>
                                <StyledText>Ajouter aux favoris</StyledText>
                            </FavoriteButton>
                        </FavoriteContainer>
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
    padding-top: 70px;
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

const SearchContainer = styled.View`
    margin: 4px;
`;

const SearchInput = styled.TextInput`
    font-size: 20px;
    font-weight: 300;
    padding: 20px;
    width: 370px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 40px;
    border: 2px;
    border-color: #FF4C4C;
`;

const MoviesContainer = styled.ScrollView`
    flex: 1;
`;

const MovieList = styled.View`
    flex: 1;
    margin-bottom: 20px;
    align-items: center;
`;

const MovieTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 20px;
    background-color: #445565;
    width: 370px;
`;

const FavoriteContainer = styled.View`
    flex: 1;
    width: 200px;
    align-items: center;
`

const FavoriteButton = styled.TouchableOpacity`
    color: white;
    font-size: 16px;
    padding: 10px;
    background-color: #FF4C4C;
    border-radius: 8px;
    margin-top: 10px;
`

export default Home
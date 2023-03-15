import axios from "axios"
import React, { useState } from "react"
import styled from 'styled-components'

const Home = props => {

    const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=513876dc'

    const [searchMovie, setSearchMovie] = useState({
        s: "...",
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
            console.log(searchResults)
            setSearchMovie(prevSearch => {
                return { ...prevSearch, searchResults: searchResults }
            })
        })
    }

    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie])
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
                        return {... prevSearch, s: text}
                    })}
                    onSubmitEditing={search}
                    value={searchMovie.s}
                />
            </SearchContainer>

            <MoviesContainer>
                {searchMovie.searchResults.map(movie => (
                    <MovieList key={map.imdbID}>
                        <MovieTitle>{movie.Title}</MovieTitle>
                        <StyledButton onPress={() => addToFavorites(movie)}>Ajouter aux favoris</StyledButton>
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
`;

const MoviesContainer = styled.ScrollView`
    flex: 1;
`;

const MovieList = styled.View`
    flex: 1;
    width: 370px;
    margin-bottom: 20px;
`;

export default Home
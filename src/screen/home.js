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
    const [watchList, setWatchList] = useState([]);

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

    const addToWatchList = (movie) => {
        setWatchList([...watchList, movie])
        console.log(setWatchList)
    }

    return (
        <Container>
            <PageTitle>Movie DB</PageTitle>

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
                        <Image
                            source={{ uri: movie.Poster }}
                            style={{
                                width: 270,
                                height: 270
                            }}
                            resizeMode='contain'
                        />
                        <MovieTitle>{movie.Title}</MovieTitle>
                        <MovieInfo>{movie.Year} - {movie.Type}</MovieInfo>

                        <ButtonContainer>
                            <FavoriteButton onPress={() => addToFavorites(movie)}>
                                <StyledText>Ajouter aux favoris</StyledText>
                            </FavoriteButton>
                            <WatchListButton onPress={() => addToWatchList(movie)}>
                                <StyledText>A regarder</StyledText>
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
    margin-bottom: 20px;
`;

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
    margin-bottom: 20px;
    border: 2px;
    border-color: #FF4C4C;
`;

const MoviesContainer = styled.ScrollView`
    flex: 1;
    width: 300px;
`;

const MovieList = styled.View`
    flex: 1;
    padding: 20px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #445565;
`;

const MovieTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding-top: 10px;
    text-align: center;
`;

const MovieInfo = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    text-align: center;
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
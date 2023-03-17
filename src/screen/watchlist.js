import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Watchlist = () => {

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const getWatchlsit = async () => {
            try {
                const watchlistData = await AsyncStorage.getItem('watchlist');
                if (watchlistData !== null) {
                    setWatchlist(JSON.parse(watchlistData));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getWatchlsit();
    }, []);

    return (

        <Container>
            <PageTitle>Watchlist</PageTitle>

            <WatchlistContainer>
                {watchlist.map((movie) => (
                    <WatchlistList key={movie.imdbID}>
                        <MovieImage source={{ uri: movie.Poster }} />

                        <MovieInfo>
                            <MovieTitle>{movie.Title}{'\n'}</MovieTitle>
                            <MovieDetails>{movie.Year} - {movie.Type}</MovieDetails>
                        </MovieInfo>
                    </WatchlistList>
                ))}
            </WatchlistContainer>
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

const WatchlistContainer = styled.ScrollView`
    flex: 1;
    width: 370px;
`

const WatchlistList = styled.View`
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

const MovieInfo = styled.Text`
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

const MovieDetails = styled.Text`
    color: #fff;
`;

export default Watchlist
import React, { useState } from 'react'
import styled from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Watchlist = () => {

    const [watchlist, setWatchlist] = useState([]);

    const getWatchlist = async () => {
        try {
            const watchlistData = await AsyncStorage.getItem('watchlist');
            if (watchlistData !== null) {
                setWatchlist(JSON.parse(watchlistData));
            }
        } catch (error) {
            console.log(error);
        }
    };
    getWatchlist();


    const removeWatchlist = async (imdbID) => {
        try {
            const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
            setWatchlist(updatedWatchlist);
            await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            Alert.alert(
                'Suppression réussie',
                'Le film a bien été supprimé de votre watchlist !',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <Container>
            <PageTitle>Watchlist</PageTitle>

            <WatchlistContainer>
                {watchlist.map((movie) => (
                    <WatchlistList key={movie.imdbID}>
                        <MovieImage source={{ uri: movie.Poster }} />

                        <MovieInfo>
                            <MovieTitle>{movie.Title}{'\n'}</MovieTitle>
                        </MovieInfo>

                        <DeleteButton onPress={() => removeWatchlist(movie.imdbID)} >
                            <StyledText>Delete</StyledText>
                        </DeleteButton>
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

export default Watchlist
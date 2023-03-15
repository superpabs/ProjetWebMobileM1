import React, { useState } from "react"
import styled from 'styled-components'
import axios from 'axios'

const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=b8da74de'

const App = props => {

    const [state, setState] = useState({
        s: "Search a movie...",
        results: [],
        selected: {}
    })

    const [favorites, setFavorites] = useState([]);

    const search = () => {
        axios(apiurl + "&s=" + state.s).then(({ data }) => {
            let results = data.Search || [];
            console.log(results)
            setState(prevState => {
                return { ...prevState, results: results }
            })
        })
    }

    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie]);
    };

    const handleNavigation = page => {
        props.navigation.navigate(page);
    };

    return (
        <Container>
            <StyledTextTitle>Movie DB</StyledTextTitle>
            
            <StyledButton onPress={() => handleNavigation('Favorites')}>
                <StyledText>Mes favoris</StyledText>
            </StyledButton>

            <InputContainer>
                <StyledTextInput
                    onChangeText={text => setState(prevState => {
                        return { ...prevState, s: text }
                    })}
                    value={state.s}
                    onSubmitEditing={search}
                />
            </InputContainer>

            <ResultsContainer>
                {state.results.map(result => (
                    <ResultContainer key={result.imdbID}>
                        <StyledMovieTitle>{result.Type} - {result.Title}</StyledMovieTitle>
                        <StyledMovieInfos>{result.Plot}</StyledMovieInfos>
                        <StyledButton onPress={() => addToFavorites(result)}>Ajouter aux favoris</StyledButton>
                    </ResultContainer>
                ))}
            </ResultsContainer>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #223343;
    align-items: center;
    justify-content: flex-start;
    padding-top: 70px;
`;

const StyledTextTitle = styled.Text`
    color: #fff;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const InputContainer = styled.View`
    margin: 4px;
`;

const StyledTextInput = styled.TextInput`
    font-size: 20px;
    font-weight: 300;
    padding: 20px;
    width: 370px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 40px;
`;

const ResultsContainer = styled.ScrollView`
    flex: 1;
`;

const ResultContainer = styled.View`
    flex: 1;
    width: 370px;
    margin-bottom: 20px;
`;

const StyledMovieTitle = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 20px;
    background-color: #445565;
`;

const StyledMovieInfos = styled.Text`
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    padding: 20px;
    background-color: #445565;
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

export default App;
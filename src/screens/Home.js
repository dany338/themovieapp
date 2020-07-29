/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import { Title }  from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import apiMovies from '../api/movies';
import {GENRE_DEFAULT_SELECTED} from '../utils/constants';
import CarouselMulti from '../components/CarouselMulti';

const Home = (props) => {
  const { navigation } = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(GENRE_DEFAULT_SELECTED);
  const [genreMovies, setGenreMovies] = useState(null);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  useEffect(() => {
    apiMovies.getNewsMovies().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    apiMovies.getAllGenresApi().then((response) => {
      setGenreList(response.genres);
    });
  }, []);

  useEffect(() => {
    apiMovies.getGenreMoviesApi(genreSelected).then((response) => {
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas películas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Películas por genero</Title>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
          {genreList.map((genre) => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                genre.id !== genreSelected ? '#8697A5' : '#fff'
              ]}
              onPress={() => onChangeGenre(genre.id)}
            >
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 20,
  },
});

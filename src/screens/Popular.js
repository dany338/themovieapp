/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { Text, Title, Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import apiMovies from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import noImage from '../assets/images/default-imgage.png';
import starDark from '../assets/images/starDark.png';
import starLight from '../assets/images/starLight.png';

const MovieRating = (props) => {
  const { voteCount, voteAverage, theme } = props;
  const media = voteAverage / 2;
  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 12, color: '#8697a5', marginTop: 5 }}>
        {voteCount} votos
      </Text>
    </View>
  );
};

const Movie = (props) => {
  const { movie, theme, navigation } = props;
  const { id, poster_path, title, release_date, vote_count, vote_average } = movie;

  const goMovie = () => {
    navigation.navigate('movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={
              poster_path ? { uri: `${BASE_PATH_IMG}/w500${poster_path}` } : noImage
            }
          />
        </View>
        <View style={styles.left}>
          <Title>{title}</Title>
          <Title>{release_date}</Title>
          <MovieRating voteCount={vote_count} voteAverage={vote_average} theme={theme} />
        </View>
      </View>d
    </TouchableWithoutFeedback>
  );
};

const Popular = (props) => {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const [page, setPage] = useState(1);
  const { theme } = usePreferences();

  const changePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    apiMovies.getPopularMovies(page).then((response) => {
      const totalPages = response.total_pages; // response.total_results;
      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([ ...movies, ...response.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      {movies && movies.map((movie, index) => (
        <Movie key={index} movie={movie} theme={theme} navigation={navigation} />
      ))}
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadedMoreContainer}
          style={styles.loadMore}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          onPress={() => changePage()}
        >
          Cargas mas...
        </Button>
      )}
    </ScrollView>
  );
};

export default Popular;

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  loadedMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});

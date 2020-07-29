/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Image, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import { Text, Button } from 'react-native-paper';
import apiMovies from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import noImage from '../assets/images/default-imgage.png';

const { width } = Dimensions.get('window');

const Movie = (props) => {
  const { movie, navigation } = props;
  const { id, title, poster_path } = movie;

  const goMovie = () => {
    navigation.navigate('movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <Text style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}` }} />
        ) : (
          <Text>{title}</Text>
        )}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const News = (props) => {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);
  const { theme } = usePreferences();

  const changePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    apiMovies.getNewsMovies(page).then((response) => {
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {movies && movies.map((movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
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
    </SafeAreaView>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 300,
  },
  loadedMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});

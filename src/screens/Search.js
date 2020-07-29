/* eslint-disable prettier/prettier */
import React, { useState, useEffect }  from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, Image, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import apiMovies from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';

const { width } = Dimensions.get('window');

const Movie = (props) => {
  const { movie, navigation } = props;
  const { id, poster_path, title } = movie;

  const goMovie = () => {
    console.log('search id:', id);
    navigation.navigate('movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}` }} />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const Search = (props) => {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  const handleChangeSearch = e => {
    setSearch(e);
  };

  useEffect(() => {
    if (search.length > 2) {
      apiMovies.searchMovies(search).then((response) => {
        setMovies(response.results);
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Buscar tu película"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={(e) => handleChangeSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {movies && movies.map((movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
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
});

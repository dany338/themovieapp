/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Title, IconButton} from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import apiMovies from '../api/movies';
import ModalVideo from '../components/ModalVideo';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import startDark from '../assets/png/startDark.png';
import starLight from '../assets/png/starLight.png';

const MovieRating = (props) => {
  const { voteCount, voteAverage } = props;
  const media = voteAverage / 2;
  const { theme } = usePreferences();

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? startDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, marginRight: 5}}>{media}</Text>
      <Text style={{ fontSize: 12, Color: '#8697a5' }}>{voteCount} votes</Text>
    </View>
  );
};

const MovieTitle = (props) => {
  const { movie } = props;

  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
      <View style={styles.viewGenres}>
        {movie.genres.map((genre) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const MovieTrailer = props => {
  const { setShowVideo } = props;

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
};

const MovieImage = (props) => {
  const { posterPath } = props;

  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}` }} />
    </View>
  );
};

const Movie = (props) => {
  const { route } = props;
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    apiMovies.getMovieById(id).then((response) => {
      setMovie(response);
    });
  }, [id]);

  if(!movie) return null;

  return (
    <>
      <ScrollView>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
        <MovieRating voteCount={movie.vote_count} voteAverage={} />
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
};

export default Movie;

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenres: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 20,
    color: '#8697a5',
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

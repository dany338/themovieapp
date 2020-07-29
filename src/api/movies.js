/* eslint-disable prettier/prettier */
import {API_HOST, API_KEY, LANG} from '../utils/constants';

export const apiMovies = {
  getNewsMovies: (page = 1) => {
    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((result) => {
      return result;
    });
  },
  getGenreMovie: idGenres => {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((result) => {
      const arrrGenres = idGenres.map((item) => result.genres.filter((genre) => Number(genre.id) === Number(item))[0]?.name).filter(item => typeof item !== 'undefined');
      return arrrGenres;
    });
  },
  getAllGenresApi: () => {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((result) => {
      return result;
    });
  },
  getGenreMoviesApi: idGenres => {
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((result) => {
      return result;
    });
  },
  getMovieById: idMovie => {
    const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((result) => {
      return result;
    });
  },
  getVideoMovie: idMovie => {
    const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;
    return fetch(url).then((response) => {
      return response.json();
    }).then((result) => {
      return result;
    });
  },
};

export default apiMovies;

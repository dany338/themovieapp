/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import YouTube from 'react-native-youtube';
import { WebView } from 'react-native-webview';
import apiMovies from '../api/movies';

const ModalVideo = (props) => {
  const { show, setShow, idMovie } = props;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    apiMovies.getVideoMovie(idMovie).then((response) => {
      const idVideo = response.results.filter((item) => item.site === 'YouTube')[0]?.key;
      setVideo(idVideo);
    });
  }, [idMovie]);

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <YouTube videoId={video} style={styles.video}/>
      ) : (
        <WebView
          style={{with: 500}}
          source={{ uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0` }}
        />
      )}
      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
};

export default ModalVideo;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1ea1f2',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});

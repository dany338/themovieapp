/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import { Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

const RenderItem = (props) => {
  const { data, navigation } = props;
  const { id, title, poster_path } = data.item;
  const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;

  const onNavigation = () => {
    navigation.navigate('movie', { id });
  };

  return (
    <TouchableNativeFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: imageUrl }}/>
        <Title style={styles.title} numberOfLines={1}>{title}</Title>
      </View>
    </TouchableNativeFeedback>
  );
};

const CarouselMulti = (props) => {
  const { data, navigation } = props;

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      firstItem={1}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  )
};

export default CarouselMulti;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '85%',
    height: 170,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
  },
});

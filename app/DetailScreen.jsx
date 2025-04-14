import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './DetailsScreenStyles';

const logo = require('../assets/Images/KnowitBlack.png');

const soundMap = {
  1: require('../assets/Sounds/1.mp3'),
  2: require('../assets/Sounds/2.mp3'),
  3: require('../assets/Sounds/3.mp3'),
  4: require('../assets/Sounds/4.mp3'),
  5: require('../assets/Sounds/5.mp3'),
  6: require('../assets/Sounds/6.mp3'),
  7: require('../assets/Sounds/7.mp3'),
  8: require('../assets/Sounds/8.mp3'),
  9: require('../assets/Sounds/9.mp3'),
  10: require('../assets/Sounds/10.mp3'),
  11: require('../assets/Sounds/11.mp3'),
  12: require('../assets/Sounds/12.mp3'),
  13: require('../assets/Sounds/13.mp3'),
  14: require('../assets/Sounds/14.mp3'),
  15: require('../assets/Sounds/15.mp3'),
};

const DetailsScreen = ({ route }) => {
  const { image, audioIndex, title } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        soundMap[audioIndex + 1] // ✅ Use soundMap here
      );
      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          const { positionMillis, durationMillis } = status;
          setPosition(positionMillis);
          setDuration(durationMillis);
          setSliderValue(positionMillis / durationMillis || 0);

          if (positionMillis >= durationMillis && durationMillis > 0) {
            setPosition(0);
            setSliderValue(0);
            setIsPlaying(false);
            setIsFinished(true);
          }
        }
      });

      await sound.playAsync();
    };

    loadSound();

    return () => {
      if (sound) {
        sound.stopAsync().then(() => sound.unloadAsync());
      }
    };
  }, [audioIndex]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync().then(() => sound.unloadAsync());
        }
      };
    }, [sound])
  );

  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if (isFinished) {
        await sound.setPositionAsync(0);
        setSliderValue(0);
        setIsFinished(false);
      }
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} resizeMode="contain" />

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onSlidingComplete={async (value) => {
          const seekPosition = value * duration;
          await sound.setPositionAsync(seekPosition);
          if (!isPlaying) {
            await sound.playAsync();
            setIsPlaying(true);
          }
        }}
        minimumTrackTintColor="#0d6efd"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#0d6efd"
      />

      <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;
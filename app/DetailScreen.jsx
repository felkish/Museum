// DetailsScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './DetailsScreenStyles';

const audioFiles = [
  require('../assets/Sounds/Jcole Type Beat.mp3'),
  require('../assets/Sounds/Port Antonio.mp3'),
  require('../assets/Sounds/She Knows.mp3'),
  require('../assets/Sounds/Tee Grizzley.mp3'),
  require('../assets/Sounds/Truly Yours.mp3'),
  require('../assets/Sounds/Work Out.mp3'),
];

const DetailsScreen = ({ route }) => {
  const { image, audioIndex, title } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing automatically
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      const { sound1 } = await Audio.Sound.createAsync(audioFiles[audioIndex]);
      setSound(sound1);

      // Set the playback status update to monitor progress
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }
      });

      await sound.playAsync(); // Automatically play the sound on load
    };

    loadSound();

    // Cleanup function to unload sound when leaving screen
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioIndex]);

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const onSliderValueChange = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition); // Seek to the specified position without pausing
      setIsPlaying(true);

      // Ensure the song keeps playing after seeking if it was previously playing
      if (!isPlaying) {
        await sound.playAsync(); // Continue playing after seeking if it was paused
        setIsPlaying(true); // Update the play state to "playing" after seeking
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} resizeMode="contain" />

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={position / duration || 0}
        onSlidingComplete={onSliderValueChange}
        minimumTrackTintColor="#0d6efd"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#0d6efd" // Set thumb color to match track color
      />

      <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;

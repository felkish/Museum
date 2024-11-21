import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './DetailsScreenStyles';

const audioFiles = [
  require('../assets/Sounds/1.mp3'),
  require('../assets/Sounds/2.mp3'),
  require('../assets/Sounds/3.mp3'),
  require('../assets/Sounds/4.mp3'),
  require('../assets/Sounds/5.mp3'),
  require('../assets/Sounds/6.mp3'),
  require('../assets/Sounds/7.mp3'),
  require('../assets/Sounds/8.mp3'),
  require('../assets/Sounds/9.mp3'),
  require('../assets/Sounds/10.mp3'),
  require('../assets/Sounds/11.mp3'),
  require('../assets/Sounds/12.mp3'),
  require('../assets/Sounds/13.mp3'),
  require('../assets/Sounds/14.mp3'),
  require('../assets/Sounds/15.mp3')
];

const DetailsScreen = ({ route }) => {
  const { image, audioIndex, title } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start playing automatically
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(audioFiles[audioIndex]);
      setSound(sound);

      // Set the playback status update to monitor progress
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);

          // When the audio finishes playing, reset the position, slider, and pause the audio
          if (status.positionMillis === status.durationMillis) {
            setPosition(0); // Reset position to 0
            setSliderValue(0); // Reset slider to 0
            setIsPlaying(false); // Pause the audio automatically when it finishes
            setIsFinished(true);
          }
        }
      });

      await sound.playAsync(); // Automatically play the sound on load
    };

    loadSound();

    // Cleanup function to unload sound when leaving screen
    return () => {
      if (sound) {
        sound.stopAsync().then(() => {
          sound.unloadAsync();
        });
      }
    };
  }, [audioIndex]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync().then(() => {
            sound.unloadAsync();
          });
        }
      };
    }, [sound])
  );

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      if(isFinished) {
        await sound.setPositionAsync(0);
        setSliderValue(0); // Reset slider to 0 when restarting
        setIsFinished(false);
      }
      await sound.playAsync();
      setIsPlaying(true); 
    }
  };

  const onSliderValueChange = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition); // Seek to the specified position without pausing


      // Ensure the song keeps playing after seeking if it was previously playing
      if (!isPlaying) {
        await sound.playAsync(); // Continue playing after seeking if it was paused
        setIsPlaying(true); // Update the play state to "playing" after seeking
      }
    }
  };

  // Update slider position continuously while sound is playing
  useEffect(() => {
    let interval;
    if (sound && isPlaying) {
      interval = setInterval(() => {
        sound.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setSliderValue(status.positionMillis / duration || 0); // Update slider as well
          }
        });
      }, 100); // Update every 100ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [sound, isPlaying, duration]);

  return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} resizeMode="contain" />

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue} // Use sliderValue for the slider's value
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

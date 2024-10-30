import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export default function App() {
  const { width, height } = Dimensions.get('window');
  const boxSize = Math.min(width, height) / 6;

  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([[]]);
  const [sounds, setSounds] = useState([[]]);
  const [tapTimeout, setTapTimeout] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [currentCol, setCurrentCol] = useState(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [showPauseButton, setShowPauseButton] = useState(false);

  // Sound wave animation state
  const waveAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadResources = async () => {
      const soundArray = [
        [
          await Audio.Sound.createAsync(require('../assets/Sounds/Jcole Type Beat.mp3')),
          await Audio.Sound.createAsync(require('../assets/Sounds/Port Antonio.mp3'))
        ],
        [
          await Audio.Sound.createAsync(require('../assets/Sounds/She Knows.mp3')),
          await Audio.Sound.createAsync(require('../assets/Sounds/Tee Grizzley.mp3'))
        ],
        [
          await Audio.Sound.createAsync(require('../assets/Sounds/Truly Yours.mp3')),
          await Audio.Sound.createAsync(require('../assets/Sounds/Work Out.mp3'))
        ],
      ];
      setSounds(soundArray);

      const imageArray = [
        [require('../assets/Images/JcoleTypeBeat.jpg'), require('../assets/Images/Port Antonio.jpg')],
        [require('../assets/Images/She knows.jpg'), require('../assets/Images/Tee Grizzley.jpg')],
        [require('../assets/Images/Truly Yours.jpg'), require('../assets/Images/Work Out.jpeg')]
      ];
      setImages(imageArray);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadResources();

    return () => {
      sounds.flat().forEach(async (soundObj) => {
        if (soundObj?.sound) {
          await soundObj.sound.unloadAsync();
        }
      });
    };
  }, []);

  const playSound = async (row, col) => {
    // Pause the currently playing sound if it exists
    if (isPlaying) {
      const soundObj = sounds[currentRow][currentCol];
      if (soundObj) {
        await soundObj.sound.pauseAsync();
        setIsPlaying(false);
        stopWaveAnimation();
      }
    }

    // Play the new sound
    const soundObj = sounds[row][col];
    if (soundObj) {
      await soundObj.sound.replayAsync();
      setIsPlaying(true);
      setCurrentRow(row);
      setCurrentCol(col);
      startWaveAnimation();

      setShowPlayButton(true);
      setTimeout(() => {
        setShowPlayButton(false);
      }, 1000); // Show play button for 1 second
    }
  };

  const pauseSound = async () => {
    const soundObj = sounds[currentRow][currentCol];
    if (soundObj) {
      await soundObj.sound.pauseAsync();
      setIsPlaying(false);
      stopWaveAnimation();

      setShowPauseButton(true);
      setTimeout(() => {
        setShowPauseButton(false);
      }, 1000); // Show pause button for 1 second
    }
  };

  const startWaveAnimation = () => {
    waveAnimation.setValue(1);
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopWaveAnimation = () => {
    waveAnimation.stopAnimation();
  };

  const handleTap = (row, col) => {
    if (tapTimeout) {
      clearTimeout(tapTimeout);
      setTapTimeout(null);
      pauseSound(); // Pause the currently playing sound
    } else {
      setTapTimeout(
        setTimeout(() => {
          playSound(row, col); // Play sound for tapped box
          setTapTimeout(null);
        }, 300) // 300ms for double-tap detection
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {[...Array(3)].map((_, row) => (  // 3 rows
        <View key={row} style={styles.row}>
          {[...Array(2)].map((_, col) => (  // 2 columns
            <TouchableOpacity
              key={col}
              style={styles.box}
              onPress={() => handleTap(row, col)}  // Handle single and double taps
            >
              <Image
                source={images[row][col] || require('../assets/Images/Default.jpg')}  // Default image if missing
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.boxText}>
                {row + 1}, {col + 1}
              </Text>

              {showPlayButton && currentRow === row && currentCol === col && (
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>▶️</Text>
                </View>
              )}

              {showPauseButton && currentRow === row && currentCol === col && (
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>⏸️</Text>
                </View>
              )}

              {isPlaying && currentRow === row && currentCol === col && (
                <Animated.View style={[styles.soundWave, { transform: [{ scale: waveAnimation }] }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
}

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  box: {
    flex: 1,
    margin: 5,
    backgroundColor: '#00A9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
  },
  boxText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundWave: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#00ff00',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    marginLeft: -40,
    marginTop: -40,
  },
  buttonContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

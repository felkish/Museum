import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function App() {


  const { width, height } = Dimensions.get('window');
  const boxSize = Math.min(width, height) / 6;


  const [isLoading, setIsLoading] = useState(true);
  // Images
  const [images, setImages] = useState([[]]);
  // sound
  const [sounds, setSounds] = useState([[]]);

    // Function to handle the press event on each box
    const handlePress = (row, col) => {
        Alert.alert(`Box at row ${row + 1}, column ${col + 1} pressed!`);
        playSound(row, col);
    };

  useEffect (() => {

    const loadResources = async () => {
        //Sounds
        const soundArray = [
            [
                await Audio.Sound.createAsync(require('../assets/Sounds/ZenSpiritual.mp3')), // 0,0
            ],
            [
                await Audio.Sound.createAsync(require('../assets/Sounds/3secCountdown.mp3')), // 1,0
            ],
            // Add sound files here
        ];
    
        setSounds(soundArray);
        const imageArray = [
            [
                require('../assets/Images/thumbnail.png'),
            ],
            [
                require('../assets/Images/logo-small.png'),
            ],
        ];
        setImages(imageArray);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    }
    
    loadResources();

    return () => {
        sounds.flat().forEach(async (soundObj) => {
            await soundObj.sound.unloadAsync();
        });
    };
}, []);

    const playSound = async (row, col) => {
        const soundObj = sounds[row][col];
        if(soundObj) {
            await soundObj.sound.replayAsync();
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
  // Render the 6x6 grid
  return (
    <SafeAreaView style={styles.container}>
      {[...Array(2)].map((_, row) => (
        <View key={row} style={styles.row}>
          {[...Array(1)].map((_, col) => (
            <TouchableOpacity
              key={col}
              style={[styles.box, {width: boxSize, height: boxSize}]}
              onPress={() => handlePress(row, col)}
            >
            <Image
                source={images[row][col]}
                style={styles.image}
                resizeMode='contain'
            />
              <Text style={styles.boxText}>
                {row + 1}, {col + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
};

// Define the styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    box: {
      margin: 2,
      backgroundColor: '#00A9FF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    boxText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },  
      image: {
        width: '100%',
        height: '100%',
      },
    
  });
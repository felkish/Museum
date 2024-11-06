// app/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import styles from './HomeScreenStyles';

const audioFiles = [
  require('../assets/Sounds/Jcole Type Beat.mp3'),
  require('../assets/Sounds/Port Antonio.mp3'),
  require('../assets/Sounds/She Knows.mp3'),
  require('../assets/Sounds/Tee Grizzley.mp3'),
  require('../assets/Sounds/Truly Yours.mp3'),
  require('../assets/Sounds/Work Out.mp3'),
];

const imageFiles = [
  require('../assets/Images/JcoleTypeBeat.jpg'),
  require('../assets/Images/Port Antonio.jpg'),
  require('../assets/Images/She knows.jpg'),
  require('../assets/Images/Tee Grizzley.jpg'),
  require('../assets/Images/Truly Yours.jpg'),
  require('../assets/Images/Work Out.jpeg'),
];

function HomeScreen({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const boxSize = Math.min(width, height) / 6;

  const [isLoading, setIsLoading] = useState(true);
  const [sounds, setSounds] = useState([]);

  useEffect(() => {
    const loadResources = async () => {
      const soundArray = await Promise.all(
        audioFiles.map(async (audio) => await Audio.Sound.createAsync(audio))
      );
      setSounds(soundArray);
      setIsLoading(false);
    };

    loadResources();
  }, []);

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {imageFiles.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() =>
                navigation.navigate('Details', {
                  image,
                  audioIndex: index,
                  title: `Track ${index + 1}`,
                })
              }
            >
              <Image source={image} style={styles.image} resizeMode="cover" />
              <Text style={styles.boxText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
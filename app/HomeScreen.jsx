// app/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import styles from './HomeScreenStyles';

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

const imageFiles = [
  require('../assets/Images/Default.jpg'),
  require('../assets/Images/2. Rothboa.jpg'),
  require('../assets/Images/Default.jpg'),
  require('../assets/Images/Default.jpg'),
  require('../assets/Images/Default.jpg'),

  require('../assets/Images/Default.jpg'),
  require('../assets/Images/Default.jpg'),
  require('../assets/Images/8. Stora kyrkan.jpg'),
  require('../assets/Images/9. Gamla kyrkan.jpg'),
  require('../assets/Images/Default.jpg'),

  require('../assets/Images/11. Solkanonen.jpg'),
  require('../assets/Images/12. Templet.jpg'),
  require('../assets/Images/13. Adelsnäs.jpg'),
  require('../assets/Images/Default.jpg'),
  require('../assets/Images/15. Stallet.jpg'),
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
                  title: `Hållplats ${index + 1}`,
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
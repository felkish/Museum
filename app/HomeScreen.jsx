// app/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import styles from './HomeScreenStyles';

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
  //Add new image here
];

function HomeScreen({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const boxSize = Math.min(width, height) / 6;

  const [sounds, setSounds] = useState([]);

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
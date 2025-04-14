// app/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import createStyles from './HomeScreenStyles'; // 🔁 not styles or { createStyles }

const logo = require('../assets/Images/KnowitBlack.png');

const imageFiles = [
  require('../assets/Ljudbild/1_Verksgatan.jpg'),
  require('../assets/Ljudbild/2_Rootboden.jpg'),
  require('../assets/Ljudbild/3_Luffarhotellet.jpg'),
  require('../assets/Ljudbild/4_Rootvillan.jpg'),
  require('../assets/Ljudbild/5_Dalmansaffär.jpg'),

  require('../assets/Ljudbild/6_Kalkugnen.jpg'),
  require('../assets/Ljudbild/7_Klockstapeln.jpg'),
  require('../assets/Ljudbild/8_Storakyrkan.jpg'),
  require('../assets/Ljudbild/9_Gamlakyrkan.jpg'),
  require('../assets/Ljudbild/10_Kammabovillan.jpg'),

  require('../assets/Ljudbild/11_Solkanon.jpg'),
  require('../assets/Ljudbild/12_Templet.jpg'),
  require('../assets/Ljudbild/13_Adelsnäs.jpg'),
  require('../assets/Ljudbild/14_Hembygdsgården.jpg'),
  require('../assets/Ljudbild/15_Stallet.jpg'),
  //Add new image here
];

function HomeScreen({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const boxSize = Math.min(width, height) / 6;
  const styles = createStyles(boxSize);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Theview below is ecpected to be the header of this page, will it be like i expect ehen the app is rendered? */}
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
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
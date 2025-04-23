// app/HomeScreen.jsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import createStyles from './HomeScreenStyles';

const logo = require('../assets/Images/KnowitBlack.png');

const locations = [
  'Verksgatan',
  'Rootboden',
  'Luffarhotellet',
  'Rootvillan',
  'Dalmansaffär',
  'Kalkugnen',
  'Klockstapeln',
  'Storakyrkan',
  'Gamlakyrkan',
  'Kammabovillan',
  'Solkanon',
  'Templet',
  'Adelsnäs',
  'Hembygdsgården',
  'Stallet',
];

const imageFiles = [
  require('../assets/temp/1_Verksgatan.jpg'),
  require('../assets/temp/2_Rootboden.jpg'),
  require('../assets/temp/3_Luffarhotellet.jpg'),
  require('../assets/temp/4_Rootvillan.jpg'),
  require('../assets/temp/5_Dalmansaffär.jpg'),
  require('../assets/temp/6_Kalkugnen.jpg'),
  require('../assets/temp/7_Klockstapeln.jpg'),
  require('../assets/temp/8_Storakyrkan.jpg'),
  require('../assets/temp/9_Gamlakyrkan.jpg'),
  require('../assets/temp/10_Kammabovillan.jpg'),
  require('../assets/temp/11_Solkanon.jpg'),
  require('../assets/temp/12_Templet.jpg'),
  require('../assets/temp/13_Adelsnäs.jpg'),
  require('../assets/temp/14_Hembygdsgården.jpg'),
  require('../assets/temp/15_Stallet.jpg'),
];

function HomeScreen({ navigation }) {
  const { width } = Dimensions.get('window');
  const isTablet = width > 600;
  const columns = isTablet ? Math.min(4, Math.floor(width / 220)) : 1;
  const boxSize = width / columns;
  const styles = createStyles(boxSize);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                  title: `Hållplats ${index + 1}: ${locations[index]}`,
                })
              }
            >
              <Image source={image} style={styles.image} resizeMode="cover" />
              <Text style={styles.boxText}>
                {index + 1} {locations[index]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
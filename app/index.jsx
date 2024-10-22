import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const { width, height } = Dimensions.get('window');
  const boxSize = Math.min(width, height) / 6;
    // Function to handle the press event on each box
  const handlePress = (row, col) => {
    Alert.alert(`Box at row ${row + 1}, column ${col + 1} pressed!`);
  };

  // Render the 6x6 grid
  return (
    <SafeAreaView style={styles.container}>
      {[...Array(6)].map((_, row) => (
        <View key={row} style={styles.row}>
          {[...Array(6)].map((_, col) => (
            <TouchableOpacity
              key={col}
              style={[styles.box, {width: boxSize, height: boxSize}]}
              onPress={() => handlePress(row, col)}
            >
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
  });
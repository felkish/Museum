// app/HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const createStyles = (boxSize) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 20,
    },
    header: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: 15,
      backgroundColor: '#f3f3f3',
    },
    logo: {
      width: 200,
      height: 50,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
    },
    box: {
      width: boxSize - 10,
      height: boxSize - 10,
      margin: 5,
      backgroundColor: '#00A9FF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    boxText: {
      fontSize: 13,
      color: '#fff',
      fontWeight: 'bold',
      position: 'absolute',
      bottom: 5,
      left: 5,
      backgroundColor: 'rgba(0,0,0,0.5)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
  });

export default createStyles;
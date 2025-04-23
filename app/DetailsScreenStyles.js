import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'space-evenly', // 🔁 Even vertical spacing
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 140,
    height: 45,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: height * 0.35, // Adapt image to about 35% of screen height
    borderRadius: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  playPauseButton: {
    width: 80,              // 🆙 Bigger
    height: 80,
    backgroundColor: '#0d6efd',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#495057',
  }
});
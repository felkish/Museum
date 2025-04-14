import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '50%',
    maxHeight: 300,
    marginBottom: 20,
  },
  slider: {
    width: '90%',
    height: 40,
    marginVertical: 20,
  },
  playPauseButton: {
    width: 60,
    height: 60,
    backgroundColor: '#0d6efd',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  }  
});
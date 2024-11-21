import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '70%',
    marginBottom: 20,
  },
  slider: {
    width: '90%',
    height: '10%',
    marginVertical: 20,
  },
  playPauseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0d6efd',
    borderRadius: 5,
    marginBottom: 40,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
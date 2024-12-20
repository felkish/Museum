import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  box: {
    width: 350,
    height: 250,
    margin: 5,
    backgroundColor: '#00A9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'relative',
  },
  boxText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
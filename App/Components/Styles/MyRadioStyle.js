import { StyleSheet, Dimensions } from 'react-native'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  radioButton: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: height * 0.13,
    width: width * 0.28,
    borderRadius: 10,
  },
  radioButtonChecked: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    height: height * 0.13,
    width: width * 0.28,
    borderWidth: 2,
    borderColor: '#451E5D',
    borderRadius: 10,
  },
  radioButtonHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20

  },
  radioImage: {
    width: 90,
    height: 70,
    position: 'absolute',
    bottom: 2,
  },
  label: {
    position: 'absolute',
    bottom: 15,
    fontSize: 15,
  },
})

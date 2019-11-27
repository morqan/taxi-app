import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: width * 0.05
  },
  countryItem: {
    fontSize: 20,
    margin: 10,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  instructions: {
    fontSize: 12,
    textAlign: 'left',
    color: '#888',
    marginBottom: 5,
  },
  btnBox: {
    marginBottom: width * 0.1,
    flex: 1,
    justifyContent: 'flex-end'
  }
})

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,

  },
  gainSumBox: {
    flex: 1,
    backgroundColor: '#27093D',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gainSum: {
    color: '#fff',
    fontSize: 34
  },
  box: {
    flex: 2,
    paddingHorizontal: 10,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'flex-start'
  },
  componentBox: {
    marginVertical: 15
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%'
  },
  label: {
    color: '#BCBEC0',
    fontSize: 11
  }
})

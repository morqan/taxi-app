import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
  customBackgroundModal: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
  notificationTitle: {
    backgroundColor: '#451E5D',
    color: '#fff',
    fontSize: 18
  },
  notificationTextB: {
    color: '#606060',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10
  },
  notificationTextR: {
    color: '#606060',
    fontSize: 14,
    textAlign: 'center'
  }
})

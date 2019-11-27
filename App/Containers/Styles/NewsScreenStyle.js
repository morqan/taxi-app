import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  newsItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',

  },
  newsImage: {
    width: 65,
    height: 65,
    marginHorizontal: 10
  },
  newsDate: {
    color: '#451E5D',
    fontSize: 10,
    paddingTop: 15,
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  newsText: {
    color: '#606060',
    fontSize: 12,
  },
  newsTextBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 15
  }
})

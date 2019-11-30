import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginHorizontal: width * 0.05,

  },
  adressBox: {
    flexDirection: 'row',
    height: 100,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#353535'
  },
  textBox: {
    justifyContent: 'space-between',
    marginVertical: 3
  },
  iconBox: {
    alignItems: 'center',
    width: width * 0.1,

  },
  orderDash: {
    height: 30,
    flexDirection: 'column' ,
  },
  text: {
    fontSize: 17
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#353535'
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  nameBoxText : {
    fontSize: 17,
    color: '#606060',

  },
  nameBoxIcon: {
    fontSize: 35,
    color: '#606060',
    fontWeight: '200',
    marginRight: 20
  },
  infoText: {
    fontSize: 19,
    fontWeight : 'bold',
    color: '#606060'
  }
})

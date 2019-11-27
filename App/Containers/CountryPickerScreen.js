import React, { Component, useState } from 'react'
import { View, Text, StatusBarIOS} from 'react-native'
import { connect } from 'react-redux'
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from '../Fixtures/types'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CountryPickerScreenStyle'
import MyButton from '../Components/MyButton'

class CountryPickerScreen extends Component {
  constructor(props){
    // StatusBarIOS.setHidden(true);
    super(props);
    this.state = {
      cca2: 'AZ',
      text:'fransa'
    };
  }
  onChangeCountry=(value)=>{
    console.log(value)
  }
  render () {

    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Dil seçimi
        </Text>
        <View style={styles.countryBox}>
          <CountryPicker
            // onChange={(value)=> this.setState({country: value, cca2: value.cca2})}
            onChange={this.onChangeCountry}
            cca2={this.state.cca2}
            translation='eng'
            text={this.state.text}
          />
          <Text style={styles.countryItem}>fransa</Text>
        </View>
        <View style={styles.btnBox}>
          <MyButton
            text="OK"
            color="#fff"
            backgroundColor="#451E5D"/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryPickerScreen)

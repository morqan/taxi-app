import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InvoiceScreenStyle'
import MyButton from '../Components/MyButton'
import MyInput from '../Components/MyInput'

class InvoiceScreen extends Component {
  _onChange = (formData) => console.log(JSON.stringify(formData, null, ' '));
  _onFocus = (field) => console.log('focusing', field);
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.gainSumBox}>
          <Text style={styles.gainSum}>245.60 AZN</Text>
        </View>
        <View style={{ flex: 3 }}>
          <View style={styles.box}>
            <View style={styles.componentBox}>
              <Text style={styles.label}>KARTIN NÖMRƏSİ </Text>
              <LiteCreditCardInput
                autoFocus
                inputStyle={styles.inputContainer}

                validColor={'black'}
                invalidColor={'red'}
                placeholderColor={'darkgray'}

                onFocus={this._onFocus}
                onChange={this._onChange}/>
            </View>
            <View style={styles.componentBox}>
              <MyInput
                text='MƏBLƏĞ'
                color='#fff'
                backgroundColor='#451E5D'/>
            </View>
            <View style={styles.componentBox}>
              <MyButton
                text='BALANSI ARTIR'
                color='#fff'
                borderColor='#451E5D'
                backgroundColor='#451E5D'/>
            </View>
            <View style={styles.componentBox}>
              <MyInput
                text='NÖMRƏ'
                color='#fff'
                backgroundColor='#451E5D'/>
            </View>
            <View style={styles.componentBox}>
              <MyButton
                text='BALANS TRANSFER'
                color='#fff'
                borderColor='#FFCC32'
                backgroundColor='#FFCC32'/>
            </View>
          </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceScreen)

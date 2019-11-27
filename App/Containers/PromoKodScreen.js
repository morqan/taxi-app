import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import CodeInput from 'react-native-code-input'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PromoKodScreenStyle'
import MyButton from '../Components/MyButton'

class PromoKodScreen extends Component {
  render () {
    return (
      <View style={styles.container}>

          <View style={styles.kodBox}>
            <Text style={styles.kodTitle}>Zəhmət olmasa promo kodu daxil edin</Text>
            <KeyboardAvoidingView behavior='position'  style={{ borderBottomWidth: 1}}>
              <CodeInput
                ref="codeInputRef2"
                secureTextEntry
                borderType='circle'
                activeColor='#7C7C7C'
                inactiveColor='#7C7C7C'
                autoFocus={false}
                inputPosition='center'
                codeLength={6}
                size={25}
                onFulfill={(code) => this._onFinishCheckingCode1(code)}
                containerStyle={{ marginTop: 40, marginBottom: 45}}
                codeInputStyle={{ borderWidth: 0, backgroundColor: '#D9D9DA' }}
              />
            </KeyboardAvoidingView>
            <Text style={styles.kodDescription}>Promo kod növbəti sifariş
              zamanı aktiv olacaq</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PromoKodScreen)

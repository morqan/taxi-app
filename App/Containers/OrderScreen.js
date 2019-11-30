import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dash from 'react-native-dash'

class OrderScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.adressBox}>
          <View style={styles.iconBox}>
            <Icon name="circle-outline" size={20} color="#606060" />
            <Dash style={styles.orderDash} />
            <Icon name="map-marker-outline" size={24} color="#606060" />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.text}>Füzuli küçəsi 14</Text>
            <Text style={styles.text}>Dilarə Əliyeva 23A</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='cash' />
            <Text style={styles.nameBoxText}>Nəğd</Text>
          </View>
          <View>
            <Text style={styles.infoText}>4.60 AZN</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='clock-outline' />
            <Text style={styles.nameBoxText}>Sifariş saatı:</Text>
          </View>
          <View>
            <Text style={styles.infoText}>19:25</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='car-hatchback' />
            <Text style={styles.nameBoxText}>Hyundai Accent / 90-PR-552</Text>
          </View>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.nameBox}>
            <Icon style={styles.nameBoxIcon} name='phone' />
            <Text style={styles.nameBoxText}>+99455 520 86 52</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)

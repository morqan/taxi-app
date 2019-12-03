import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image  } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MenuLink from '../Components/MenuLink'
import MyButton from '../Components/MyButton'
import  { Images } from '../Themes'

class ProfileScreen extends Component {


  render () {
    return (
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <View style={styles.profileHeaderLeft}>
            <Image style={styles.newsImage} source={Images.news1} />
          </View>
          <View style={styles.profileHeaderBody}>
            <Text style={styles.profileHeaderBodyText}>ALİ HASANLİ</Text>
            <Text style={styles.profileHeaderBodyTextY}>Balans: 30.00 AZN</Text>
          </View>
          <View style={styles.profileHeaderRight}>
            <Icon style={styles.profileHeaderRightIcon} name='star' size={25} color='#FFCC32'  />
            <Text style={styles.profileHeaderRightRating}>4.5 </Text>
          </View>
        </View>
        <View style={styles.profileBody}>
          <MenuLink text="Hesab"
                    icon='account-settings'
                    color="#606060"
                    size={25}
                    fontSize={20}
                    onPress={this.onPress}/>
          <MenuLink text="Sənədlər"
                    icon='file-document-box-multiple-outline'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
          <MenuLink text="Sifarişlər"
                    icon='map-search-outline'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
          <MenuLink text="Bank hesabı"
                    icon='bank'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
          <MenuLink text="Qazanc"
                    icon='cash-multiple'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
          <MenuLink text="Balans"
                    icon='notification-clear-all'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
          <MenuLink text="Bildirişlər"
                    icon='settings'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
          <MenuLink text="Dəstək"
                    icon='percent'
                    color="#606060"
                    size={25}
                    fontSize={20}/>
        </View>
        <View style={styles.profileFooter}>
          <TouchableOpacity
            style={styles.exit}
            onPress={this.onPress}>
            <Icon name="exit-to-app" size={30} color="#fff" />
            <Text style={styles.exitText}> Touch Here </Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

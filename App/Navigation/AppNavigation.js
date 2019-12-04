import { createStackNavigator, createAppContainer } from 'react-navigation'
import ModalScreen from '../Containers/ModalScreen'
import RadioScreen from '../Containers/RadioScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import DriverOrederScreen from '../Containers/DriverOrederScreen'
import RatingsScreen from '../Containers/RatingsScreen'
import OrderScreen from '../Containers/OrderScreen'
import Gain2Screen from '../Containers/Gain2Screen'
import PaymentMethodScreen from '../Containers/PaymentMethodScreen'
import AddCrediCardScreen from '../Containers/AddCrediCardScreen'
import CountryPickerScreen from '../Containers/CountryPickerScreen'
import PromoKodScreen from '../Containers/PromoKodScreen'
import GainScreen from '../Containers/GainScreen'
import NewsScreen from '../Containers/NewsScreen'
import TestScreen from '../Containers/TestScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  ModalScreen: {
    screen: ModalScreen,
    navigationOptions: {
      title: 'ModalScreen',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  RadioScreen: {
    screen: RadioScreen,
    navigationOptions: {
      title: 'RadioScreen',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'ProfileScreen',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  DriverOrederScreen: {
    screen: DriverOrederScreen,
    navigationOptions: {
      title: 'DriverOrederScreen',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  RatingsScreen: {
    screen: RatingsScreen,
    navigationOptions: {
      title: 'Ratings',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  OrderScreen: {
    screen: OrderScreen,
    navigationOptions: {
      title: 'Order',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  Gain2Screen: {
    screen: Gain2Screen,
    navigationOptions: {
      title: 'Qazanc',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  PaymentMethodScreen: {
    screen: PaymentMethodScreen,
    navigationOptions: {
      title: 'Ödəmə üsulu',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  AddCrediCardScreen: {
    screen: AddCrediCardScreen ,
    navigationOptions: {
      title: 'Kart əlavə et',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  CountryPickerScreen: {
    screen: CountryPickerScreen ,
    navigationOptions: {
      title: 'Parametrlər',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  PromoKodScreen: {
    screen: PromoKodScreen,
    navigationOptions: {
      title: 'Promo kod',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  GainScreen: {
    screen: GainScreen,
    navigationOptions: {
      title: 'Qazanc',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      title: 'Bildirişlər',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }
  },
  TestScreen: {
    screen: TestScreen,
    navigationOptions: {
      title: 'Sifarişlər',
      headerStyle: {
        backgroundColor: '#451E5D'
      },
      headerTitleStyle: {
        color: '#FFFFFF'
      }
    }},
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens

  initialRouteName: 'ModalScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)

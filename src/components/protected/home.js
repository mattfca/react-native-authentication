import React, {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import User from '../common/user';

module.exports = class Button extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      email: ''
    }
  }

  componentWillMount(){

    let currentUser = User.current();

    this.setState({
      email: currentUser.email,
      token: currentUser.token,
      refresh: currentUser.refresh,
      loading: false
    });
  }

  render(){
    return (
      <View style={styles.container}>
      <Spinner
        style={{marginTop: 30}}
        overlayColor='rgba(0,0,0,1)'
        visible={this.state.loading}
        />
        <Text>Email: {this.state.email}!</Text>
        <Text>Token: {this.state.token}</Text>
        <Text>Refresh: {this.state.refresh}</Text>

        <Text onPress={ () => this.onLogoutPress() }>Logout</Text>
      </View>
    );
  }

  onLogoutPress(){
    if(User.deleteAllUsers())
      this.props.navigator.immediatelyResetRouteStack([{ name: 'signin'}]);
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

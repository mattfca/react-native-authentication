import React, {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Realm from '../common/realm';

module.exports = class Button extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      email: ''
    }
  }

  componentWillMount(){
    let User = Realm.objects('User');

    this.setState({
      email: User[0].email,
      token: User[0].token,
      refresh: User[0].refresh,
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
    Realm.write(() => {
      // right now we will delete all users
      // in the future we should be checking for one user?
      Realm.delete(Realm.objects('User'));

      this.props.navigator.immediatelyResetRouteStack([{ name: 'signin'}]);
    });
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

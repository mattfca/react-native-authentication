import React, {
  Component,
  StyleSheet,
  Navigator
} from 'react-native';

import Jwt from './components/common/jwt';
import Realm from './components/common/realm';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Home from './components/protected/home';

const ROUTES ={
  signin: Signin,
  signup: Signup,
  home: Home
};

module.exports = class Main extends React.Component {
  renderScene(route, navigator){
    let Component = ROUTES[route.name];

    return <Component route={route} navigator={navigator} />
  }

  render(){
    let User = Realm.objects('User')[0];

    let initial = 'signup';

    // if user has a valid token send them to home
    if(User){
      if(Jwt.checkExpiredAndRefresh()){
        initial = 'home';
      }
    }

    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: initial}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

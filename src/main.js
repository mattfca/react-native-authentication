var React = require('react-native');
var {
  StyleSheet,
  Navigator
} = React;

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Home = require('./components/protected/home');

const ROUTES ={
  signin: Signin,
  signup: Signup,
  home: Home
};

module.exports = React.createClass({
  componentWillMount: function(){

  },

  renderScene: function(route, navigator){
    var Component = ROUTES[route.name];

    return <Component route={route} navigator={navigator} />
  },

  render: function(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

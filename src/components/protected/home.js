var React = require('react-native');
var {
  View,
  StyleSheet,
  Text
} = React;

var Loading = require('../common/loading');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      loading: true
    }
  },

  componentWillMount: function(){
    setTimeout(() => {
      this.setState({ loading: false });
    },3000);
  },

  render: function(){
    if(this.state.loading){
      return (
        <Loading />
      );
    }

    return (
      <View style={styles.container}>
        <Text>Welcome to the app!</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

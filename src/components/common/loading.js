var React = require('react-native');
var {
  View,
  StyleSheet,
  Text
} = React;

module.exports = React.createClass({
  render: function(){
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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

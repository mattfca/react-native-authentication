import React, {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

module.exports = class Link extends React.Component {
  render(){
    return (
      <TouchableHighlight
        underlayColor={'gray'}
        style={styles.link}
        onPress={this.props.onPress}
        >
        <Text style={styles.linkText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  link: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 250
  },

  linkText: {
    flex: 1,
    alignItems: 'center',
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline'
  }
});

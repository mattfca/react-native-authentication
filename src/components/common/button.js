import React, {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

module.exports = class Button extends React.Component {
  render(){
    return (
      <TouchableHighlight
        underlayColor={'gray'}
        style={styles.button}
        onPress={this.props.onPress}
        >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

let styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    padding: 5,
    width: 250,
    backgroundColor: '#c9c9c9',
    marginTop: 10
  },

  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  }
});

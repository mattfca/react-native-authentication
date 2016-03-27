import React, {
  Component,
  View,
  StyleSheet,
  Text
} from 'react-native';

module.exports = class Loading extends React.Component {
  render(){
    return (
      <Spinner
        overlayColor={this.props.overlayColor}
        visible={this.props.loading}
        />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

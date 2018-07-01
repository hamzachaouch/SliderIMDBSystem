import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MoviesSlider from './components/MoviesSlider'
import tabs from './components/movies/index'
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            movies:  tabs
        }
    }
    render() {

    return (
      <View style={styles.container}>
          <MoviesSlider movies={this.state.movies}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MoviesSlider from './components/MoviesSlider'
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            movies:[
                'http://cache.marieclaire.fr/data/photo/w1000_ci/1bk/titanic.jpg',
                'http://jarviscity.com/wp-content/uploads/2014/06/300-Movie-Slow-Motion-Fight-Scene.jpg',
                'http://img.actucine.com/wp-content/uploads/2016/02/batmanv-03.jpg'
            ]
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

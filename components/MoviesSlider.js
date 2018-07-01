import React from 'react'
import {Animated,View,Image,Dimensions,PanResponder} from 'react-native'
import PropTypes from 'prop-types'


export default class MoviesSlider extends React.Component{
 static  propTypes = {
     movies: PropTypes.array

 }
    constructor (props){
     super(props)
        let {width} = Dimensions.get('window')
        this.state = {
         page : 0,
         width : width,
         translate : new Animated.Value(0)
        }
    }

    componentWillMount(){
     this.panResponder = PanResponder.create({
         onStartShouldSetPanResponder: (evt , gestureState) => false,
         onStartShouldSetPanResponderCapture: (evt , gestureState) => false,
         onMoveShouldSetPanResponder : (evt , gestureState) => Math.abs(gestureState.dx) > 7,
         onMoveShouldSetPanResponderCapture : (evt , gestureState) => true,
         onPanResponderTerminationRequest:  (evt,gestureState) => false,
         onPanResponderMove : Animated.event([null,{dx:this.state.translate}]),
         onPanResponderRelease : this.endGesture.bind(this),
         onPanResponderTerminate : (evt,gestureState) => {
             console.log ('je')},
         onShouldBlockNativeResponder: (evt,gestureState) => true

     })
    }
    nextPage(){
     let page = this.state.page +1
        if (page >= this.props.movies.length ){
         page = 0
        }
     this.setState({page})
    }
    prevPage(){
     let page = this.state.page-1
        if (page<0){
         page = this.props.movies.length - 1
        }
        this.setState({page})
    }
    endGesture(evt,gestureState){
     let toValue=0
     if (Math.abs(gestureState.dx)/this.state.width > 0.2) {
         if (gestureState.dx < 0) {
             toValue = this.state.width * (-1)
         } else {
             toValue = this.state.width
         }

     }
        Animated.timing(this.state.translate,
             {
                 toValue: toValue ,
                 duration: 300,
                 useNativeDriver : true
             }).start(()=>{
                 this.state.translate.setValue(0)
                 if (toValue<0){
                     this.nextPage()
                 }else if (toValue>0){
                      this.prevPage()
                 }
        })
     }

    getStyle(){
     return {
         slider :{
            flexDirection: 'row' ,
            height: 300,
            width : (this.props.movies.length+2) * this.state.width,
            left : (this.state.page+1) * -1 * this.state.width ,
            transform : [{
                translateX : this.state.translate,

            }]
         },
         image : {
             width : this.state.width,
             height: 300 ,
         }
     }
    }


    render() {
     const style = this.getStyle()
        return (
            <Animated.View  {...this.panResponder.panHandlers} style={style.slider}>
                <Image  source={{ uri:this.props.movies[this.props.movies.length-1]}} style={ style.image }/>

                {this.props.movies.map((movie,k)=>{
                    return (
                         <Image key={k} source={{ uri:movie}} style={ style.image }/>
                    )
                })}
                <Image  source={{ uri:this.props.movies[0]}} style={ style.image }/>

            </Animated.View>
        )
    }



}
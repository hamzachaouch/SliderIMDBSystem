import React from 'react'
import {Animated,View,Image,Dimensions,PanResponder,TouchableHighlight} from 'react-native'
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
            height: 390,
             backgroundColor: '#1b1b1b',
            width : (this.props.movies.length+2) * this.state.width,
            left : (this.state.page+1) * -1 * this.state.width ,
            transform : [{
                translateX : this.state.translate,

            }]
         },
         image : {
             width : this.state.width,
             height: 300 ,
         },
         viewSlide:{
             width : this.state.width,
             height: 390 ,
             position: 'relative'
         },
         poster:{
            position:'absolute',
            top: 150 ,
            left: 25 ,
            width : 150,
            height : 220,

         },
         title:{
             color : '#FFF',
             fontSize : 18,
         },
         masque :{
                 backgroundColor: 'transparent',
                 position : 'absolute',
                 left : 200 ,
                 top : 330 ,
                 right: 0 ,
                 overflow : 'hidden'
         },
     }
    }
    posterTranslte(index){
     if (index === this.state.page){
         return {
             transform: [{
                 translateX: Animated.divide(this.state.translate,2)
             }]
        }
     }
     if (index === this.state.page+1){
         return {
             transform: [{
                 translateX: Animated.divide(Animated.add(this.state.translate,this.state.width),2)
             }]
         }
     }
     if (index === this.state.page-1){
         return {
             transform: [{
                 translateX: Animated.divide(Animated.add(this.state.translate,this.state.width * (-1)),2)
             }]
         }
     }

 }

    posterClick(movie){
        alert(movie.name)
    }

    render() {
     const style = this.getStyle()
        return (
            <Animated.View  {...this.panResponder.panHandlers} style={style.slider}>
                <TouchableHighlight onPress={()=>this.posterClick(this.props.movies.length-1) } >

                <Image key={-1} source={this.props.movies[this.props.movies.length-1].scene} style={style.image} />
                </TouchableHighlight>
                <Animated.Image key={-1} source={this.props.movies[this.props.movies.length-1].poster} style={[style.poster,this.posterTranslte((-1))]} />
                <View style={style.masque}>
                <Animated.Text style={[style.title,this.posterTranslte((-1))]}>
                    {this.props.movies[this.props.movies.length-1].name}
                </Animated.Text>
                </View>
                {this.props.movies.map((obj,k)=>{
                     return(

                         <View key={k} style={style.viewSlide}>
                             <TouchableHighlight onPress={()=>this.posterClick(obj) } >
                             <Image  source={obj.scene} style={style.image} />
                             </TouchableHighlight>

                             <Animated.Image source={obj.poster} style={ [style.poster,this.posterTranslte((k))]} />
                             <View  style={style.masque}>
                             <Animated.Text style={[style.title,this.posterTranslte((k))]}>
                                 {obj.name}
                             </Animated.Text>
                             </View>
                         </View>
                     )
                })}
                <View>
                    <TouchableHighlight onPress={()=>this.posterClick(this.props.movies[0]) } >

                    <Image key={this.props.movies.length} source={this.props.movies[0].scene} style={style.image} />
                    </TouchableHighlight>

                        <Animated.Image key={this.props.movies.length} source={this.props.movies[0].poster} style={[style.poster,this.posterTranslte((this.props.movies.length))]} />
                   <View  style={style.masque}>
                    <Animated.Text style={[style.title,this.posterTranslte((this.props.movies.length))]}>
                        {this.props.movies[0].name}

                    </Animated.Text>
                   </View>
                </View>
            </Animated.View>
              )
            }



}
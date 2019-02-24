import React, { Component } from 'react'
import YouTube from 'react-youtube'
import * as Videos from './youtube';
import  {videoRepeat ,quequeRepeat, queueVideos, playVideoId} from '../_services/queue.service'
class VideoArea extends Component {
  state={
    playerObj:[],
    id:"",
    count:0,
    flag:0,
    
  }
  
  videoOnReady =(event)=> {
    const player = event.target;
     this.state.playerObj= player;
     this.setState({playerObj:this.state.playerObj})
    player.seekTo(50)
    console.log(event.target)
  }
  videoOnPlay (event) {
    const player = event.target
  }
  videoStateChange (event) {
    const player = event.target
    console.log(player.getCurrentTime())
  }

  componentWillUnmount () {
    const {playerObj} = this.state
  }
  videoOnEnd =()=>{
    this.state.flag=1;
    
    this.setState({id:this.state.id});
  }
  render () {
    if(this.state.flag==0)
    {
      this.state.id=this.props.id;
    }
    else {
      
    this.state.id=queueVideos[this.state.count].id;
    this.state.count=this.state.count+1;
    }
    if(queueVideos.length==this.state.count)
    if(quequeRepeat==1)
    this.state.count=0;
    const opts = {
      height: '80%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        loop:1
      }
    }
    
    return (
      <YouTube
        videoId={this.state.id}
        opts={opts}
        onReady={this.videoOnReady}
        onPlay={this.videoOnPlay}
        onEnd={this.videoOnEnd}
        onStateChange={this.videoStateChange}
      />
    )
  }
}

export default VideoArea
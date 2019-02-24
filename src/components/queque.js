import  React , {Component} from 'react';

import styles from "../css_files/queque.css";
import 'font-awesome/css/font-awesome.min.css';

import * as Youtube from './youtube'
import  {videoRepeat ,quequeRepeat, queueVideos} from './../_services/queue.service'
import { Link } from 'react-router-dom';
class Queque extends Component{
  state={
    queque:[]
  }
  componentDidMount(){ 
        
    this.setState(state=>({
      queque:queueVideos
    }))
  }
  addToQueque =(video)=>{
   queueVideos.push(video);
    this.setState(state=>({
        queque:queueVideos    
    }))
}
repeatQueque=()=>{
  quequeRepeat=!quequeRepeat;
}
repeatVideo=()=>{
  videoRepeat=!videoRepeat;
}
    render(){
      Youtube.obj['onAddQueque'] = this.addToQueque;
      let videos=this.state.queque;
        return(
            <div> 
               <div className="upnextSwitch">
      <label className="switch switch_type1" role="switch">
        <input type="checkbox" id="quequeRepeat" onClick={() => { this.repeatQueque.bind(this) }} />
        <span id="switch__label">Repeat Queque</span>
      </label>
    </div>
    <div className="upnextSwitch" >
      <label className="switch switch_type1" role="switch"> 
        <input type="checkbox" id="videorepeat" onClick={() => { this.repeatVideo.bind(this) }}  defaultChecked /> 
        <span className="switch">Repeat video</span>
      </label>
    </div>
            {videos==="" ? (<div></div>):( 
                 <ul className="list-group">
                {videos.map((video, index) => (
            <li key={index} className="wid">
                <div className="d-flex tile flex-row bgcolour">
              <div className="image" >
                 <img
                    width={64}
                    height={64}
                    src={video.snippet.thumbnails.high.url}
                    alt="thumbnail"
                  />
                  </div>
                   
                <div className="flex-grow-1">
                  <span className="title">{video.snippet.title}</span>
                  <span className="author"> by {video.snippet.channelTitle}</span>
                </div>
                <div className="item-buttons">
                <button  >
                <Link to={`play/${video.id}`}>  <span className="fa fa-play"></span></Link>
                </button>
                <button >
                  <span className="fa fa-plus"></span>
                </button>
              </div>
                </div>
              </li>
          ))}
          </ul>
            )}
                </div>
        )
    }
}
export default Queque;
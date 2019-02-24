import React, { Component } from 'react';
import * as  Youtube from './youtube';
import styles from '../css_files/popularSong.css'
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

class PopularSong extends Component {
    state={
        music:[]
    }
    componentDidMount(){
            if(this.props.id)
            Youtube.popularSong(this.props.id).then(res=>{
              this.setState({music:res.items})
            });
            console.log(this.state.music);
    }
    render(){
        return(
            <div>
            <div className="resCarousel">
            <span className="categoryName">{this.props.catname}</span>
            <div className="resCarousel-inner">
          {this.state.music.map((video, index) => (
            
              <div key={index}  className="item" >
                <div className="tile">
                  <div className="tile-img">
                    <img src={video.snippet.thumbnails.high.url} alt="" width="304" height="200" />
                  </div>
                   <div className="tile-info">
                    <span className="title"> {video.snippet.title}</span>
                    <span className="author">by {video.snippet.channelTitle}</span>
                  </div>
                  <div className="item-buttons">
            <button className="search-btn-play" >
            <Link to={`play/${video.id}`}  >  <span className="fa fa-play"></span></Link>
            </button>
            <button className="search-buttons" >
              <span className="fa fa-plus" onClick={() => { Youtube.obj.onAddQueque(video) }}></span>
            </button>
        </div>
                </div>
             
          </div>
          ))}
           </div>
            </div>
        </div>
        );
    }
}
export default PopularSong
import React, { Component } from "react";
import styles from '../css_files/searchVideos.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'
import * as Youtube from './youtube'
class SearchVideos extends Component {
  render() {
    let videos = this.props.svid;
    console.log(videos);
    return (
      <div className="searchbar">
        {videos==="" ? (<div></div>):(  <ul className="list-group-app search-list">
          {videos.map((video, index) => (
            <li key={index} className=" search-list-item">
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
                  {video.snippet.title}
                  <br/><span className="author"> by {video.snippet.channelTitle}</span>
                </div>
                <div class="item-buttons">
                <button class="search-btn-play" >
                <Link to={`play/${video.id}`}>  <span class="fa fa-play"></span></Link>
                </button>
                <button class="search-buttons">
                  <span class="fa fa-plus" onClick={() => { Youtube.obj.onAddQueque(video) }}></span>
                </button>
              </div>
                </div>
              </li>
          ))}
       </ul>)}
      </div>
    );
  }
}
export default SearchVideos;

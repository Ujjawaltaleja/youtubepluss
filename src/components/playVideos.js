import React, { Component } from "react";

// import styles from "./searchVideos.css";
import styles from "../css_files/playVideos.css";
// import "./App.css";
import * as Youtube from "./youtube";
import SearchVideos from "./searchVideos";
import { DebounceInput } from "react-debounce-input";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import VideoArea from "./videoArea";
import Queque from "./queque";

class PlayVideos extends Component {
  state = {
    relVid: [],
    svid: [],
    fVid: [],
    videoId: " "
  };
  componentDidMount() {
    
    this.state.videoId = this.props.match.params.id;
    Youtube.getRelatedVideos(this.props.match.params.id).then(res => {
      this.state.relVid = res.items;
      res.items = res.items.filter((_, i) => i == 0);
      this.state.fVid = res.items;
      this.setState({
        relVid: this.state.relVid.filter((_, i) => i !== 0)
      });
    });
  }

  showVideos = query => {
    if (query)
      Youtube.searchVideosByQuery(query).then(res => {
        this.setState({ svid: res.items });
      });
    else {
      this.setState({ svid: query });
    }
    console.log(this.state.svid);
  };
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  navigate = (id) => {
    
    this.props.history.push("/play/"+id.videoId);
    this.setState({videoId:id.videoId})
  };

  render() {
    let videos = this.state.relVid;
    let fvid = this.state.fVid;

    return (
      <div>
        <div id="mySidenav" className="sidenav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={this.closeNav.bind(this)}
          >
            &times;
          </a>
          <Queque />
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="d-flex">
              <div className="navbar-header">
                <span
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={this.openNav.bind(this)}
                >
                  &#9776;
                </span>
                <a className="navbar-brand" href="#">
                  <span>YouTube</span>
                  <img src="youtubeplus\src\plus.png" alt="+" />
                </a>
              </div>
              <div className="form col-md-6 flex-fill">
                <DebounceInput
                  type="text"
                  className="search-bar"
                  placeholder="Search"
                  debounceTimeout={1000}
                  onChange={event => this.showVideos(event.target.value)}
                />
                <SearchVideos svid={this.state.svid} />
              </div>
            </div>
          </div>
        </nav>

        <div className="row">
          <div className="col-md-8">
            <VideoArea id={this.state.videoId} />
          </div>
          <div className="col-md-4 bg">
            <div>
              <span className="red">Up Next</span>
              <ul className="list-group-fvid search-list">
                {fvid.map((video, index) => (
                  <li key={index} className="wid">
                    <div className="d-flex tile flex-row bgcolour">
                      <div className="image">
                        <img
                          width={64}
                          height={64}
                          src={video.snippet.thumbnails.high.url}
                          alt="thumbnail"
                        />
                      </div>

                      <div className="flex-grow-1">
                        <span className="title">{video.snippet.title}</span>
                        <span className="author">
                          {" "}
                          by {video.snippet.channelTitle}
                        </span>
                      </div>
                      <div class="item-buttons">
                        <button class="search-btn-play">
                          <Link to={`play/${video.id}`}>
                            {" "}
                            <span class="fa fa-play" />
                          </Link>
                        </button>
                        <button class="search-buttons">
                          <span
                            class="fa fa-plus"
                            onClick={() => {
                              Youtube.obj.onAddQueque(video);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <ul className="list-group search-list">
              {videos.map((video, index) => (
                <li key={index} className="wid">
                  <div className="d-flex tile flex-row bgcolour">
                    <div className="image">
                      <img
                        width={64}
                        height={64}
                        src={video.snippet.thumbnails.high.url}
                        alt="thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <span className="title">{video.snippet.title}</span>
                      <span className="author">
                        {" "}
                        by {video.snippet.channelTitle}
                      </span>
                    </div>
                    <div class="item-buttons">
                      <button
                        class="search-btn-play"
                        onClick={() => {
                          this.navigate(video.id);
                        }}
                      >
                        <span class="fa fa-play" />
                      </button>
                      <button class="search-buttons">
                        <span
                          class="fa fa-plus"
                          onClick={() => {
                            Youtube.obj.onAddQueque(video);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default PlayVideos;

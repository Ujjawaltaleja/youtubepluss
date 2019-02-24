import React, { Component } from "react";
import { Route } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import styles from "./../css_files/App.css"
import * as Youtube from "./youtube";
import { DebounceInput } from "react-debounce-input";
import SearchVideos from "./searchVideos";
import PopularSong from "./popularSong";
import PlayVideos from "./playVideos";
import Queque from "./queque";

class App extends Component {
  state = {
    svid: []
  };
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
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <div id="mySidenav" className="sidenav">
                <a
                  href="javascript:void(0)"
                  className={styles.closebtn}
                  onClick={this.closeNav.bind(this)}
                >
                  &times;
                </a>
                <Queque />
              </div>
              <nav className="navbar fix navbar-default">
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
                      <SearchVideos
                        onAdd={this.addToQueque}
                        svid={this.state.svid}
                      />
                    </div>
                  </div>
                </div>
              </nav>
              <div className="container">
                <PopularSong catname={"Trending Videos"} id={17} />
                <PopularSong catname={"Sports"} id={10} />
                <PopularSong catname={"Music"} id={24} />
              </div>
            </div>
          )}
        />
        <Route path="/play/:id" render={({match, history}) => (<PlayVideos history={history} match={match}></PlayVideos>)} />
      </div>
    );
  }
}
export default App;

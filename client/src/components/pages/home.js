import React, { Component } from "react";
import "../../utilities.css";
import "./Home.css";

const Home = (userId) => {
    return (<div className="u-flex u-flex-alignCenter u-flex-alignVertical">
        <img src="/logo.png" height="250px" width="250px" className="blue-backing" />
        <h1 className="u-font">"Imagine Dragons!"</h1>
        <div className="home-instructions">
            <div className="home-instruction">
            <div className="home-circle u-background-turquoise">1</div>connect
            </div>
            <div className="home-instruction">
            <div className="home-circle u-background-turquoisegreen">2</div>listen
            </div>
            <div className="home-instruction">
            <div className="home-circle u-background-brightgreen">3</div>guess
            </div>
            <div className="home-instruction">
            <div className="home-circle u-background-lightbrightgreen">4</div>win
            </div>
        </div>
        {/*userId ? (
            <div>
            <h1>You are logged in</h1>
            </div>
        ) : (
            <div>
            <div id="login">
                <h2 className="u-font u-textCenter">First, log in to spotify</h2>
                <div className="login-button">
                <a href="/api/login">
                    LOGIN TO PLAY
                </a>
                </div>
            </div>
            </div>
        )*/}
        <div id="login">
            <h2 className="u-font u-textCenter">First, log in to spotify</h2>
            <div className="login-button">
            <a href="/api/login">
                LOGIN TO PLAY
            </a>
            </div>
        </div>
    </div>);
};

export default Home;
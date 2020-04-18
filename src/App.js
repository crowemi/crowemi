import React from 'react';
import RotatingWords from './components/rotating_words.js'

function App() {
  return (
          <div className="main-container">
            <div className="top-container container-fluid center">
                  <div className="col-sm-6 title">
                    <RotatingWords />
                  </div>
                  <div className="col-sm-6">
                    <div className="text-center">
                      <img src="andy1.png" className="img-fluid rounded" alt="Andy Crowe"></img>
                      <p style={{ paddingTop: 20 }}>Andy Crowe</p>
                    </div>
                  </div>
            </div>
            <div className="bottom-container container-fluid center">
              <div className="row center">
                <div className="col-12 icon-container center">
                  <div className="icon">
                    <a href="https://www.linkedin.com/in/crowemi/" target="_new"><i className="fab fa-linkedin fa-2x"></i></a>
                  </div>
                  <div className="icon">
                    <a href="https://github.com/crowemi" target="_new"><i className="fab fa-github fa-2x"></i></a>
                  </div>
                  <div className="icon">
                    <a href="https://instagram.com/crowemi" target="_new"><i className="fab fa-instagram fa-2x"></i></a>
                  </div>
                  <div className="icon">
                    <a href="https://twitter.com/crowemi" target="_new"><i className="fab fa-twitter fa-2x"></i></a>
                  </div>
                  <div className="icon">
                    <a href="https://www.strava.com/athletes/crowemi" target="_new"><i className="fab fa-strava fa-2x"></i></a>
                  </div>
                </div> 
                <div className="col-12 center">        
                  <span className="text-muted small">© Copyright 2020 <span className="title-underline">crowemi</span>. All Rights Reserved.</span>
                </div>  
              </div>
            </div>
          </div>
  );
}

export default App;

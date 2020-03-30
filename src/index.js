import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './crowemi.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="left-content col-3">
                        <div className="left-content-head"></div>
                        <div className="left-content-main">
                            <img src="" class="rounded mx-auto d-block" alt="image"></img>
                        </div>
                        <div className="left-content-footer">
                            <ul>
                                <li><FontAwesomeIcon icon={faLinkedin} size="2x" /></li>
                                <li><FontAwesomeIcon icon={faGithub} size="2x" /></li>
                                <li><FontAwesomeIcon icon={faEnvelope} size="2x" /></li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="right-content-container col-9 offset-3">
                        <div className="row">
                        <div className="right-content-menu col-12"></div>
                        <div className="right-content-main col-12">
                            <div>No content.</div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
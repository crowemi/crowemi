import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './crowemi.scss'

var FA = require('react-fontawesome')

class App extends Component {
    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="left-content col-md-3">
                        <h1>Andy Crowe</h1>
                    </div>
                    <div className="right-content col-md-9">
                        <div>Main content goes here</div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
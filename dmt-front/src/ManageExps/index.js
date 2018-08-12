import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './ManageExps.css'

class ManageExps extends Component {
    render(){
        return(
            <div className="sidenav">
                <a href="#about">Add New Experiment</a>
                <a href="#services">Manage Experiments</a>
                <a href="#clients">Claim Open Experiment</a>
                <a href="#contact">Help</a>
            </div>
        );
    }
}export default withRouter(ManageExps);

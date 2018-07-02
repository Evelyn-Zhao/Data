import React, { Component } from 'react';
import SearchBar from './SearchBar'
import experiment from './icons/scientist.png';
import data from './icons/analysis.png';
import './Main.css'

export default class Main extends Component {

    getExpList = async () => {
        this.props.history.push("/exp");
    }

    render() {
        return (
            <div style={{paddingTop: "60px"}}>
                <div className = "Main-intro">
                    <center>
                        <h1>EXPLORE THE DATA</h1>
                    </center>
                    <SearchBar/>
                </div>
               
                
                <div className = "Main-categories">
                    <div onClick={this.getExpList} className = "Main-category"> 
                        <img alt = "Experiments list" src={experiment}/>
                        <h2>Experiments</h2>
                        <h5 style={{marginTop:"0"}}>Grab the list of experiment with relavant info</h5>
                    </div>
                    <div className = "Main-category">
                        <img alt = "Data list" src={data}/>
                        <h2>Data</h2>
                        <h5 style={{marginTop:"0"}}>Grab the list of data with relavant info</h5>
                    </div>
                </div>

                {/*<Link to='/'>Back to home</Link>*/}
            </div>
           
        );
    }
}
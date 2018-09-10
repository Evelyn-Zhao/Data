import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DownloadData extends Component { 
   
    async componentDidMount() {
        //会问服务器又没有登录过 每次刷新后
        // try {
        //     const response = await fetch('http://localhost:8000/downloadData?id='+this.props.match.params.id, {
        //         method: 'GET',
        //         mode: 'NO-CORS',
        //         credentials: 'include', //set up cookies 
        //     });
            
        //     // { user: { ... } }
        //     console.log("downloading")
            
        // } catch (e) { }
    }
    download = () => {
        console.log("Downloading", this.props.match.params.id);
        window.location.href = 'http://localhost:8000/downloadData?id=' + this.props.match.params.id;
    }
    render() {

        return (
            <div style={{ paddingTop: "60px" }}>
            
                <h1>Download File</h1>
                <button onClick={this.download}>Download file 1</button>
                <br/>
                <a href={'http://localhost:8000/downloadData?id=' + this.props.match.params.id}>Download File 1</a>

                {/*<Link to='/'>Back to home</Link>*/}
            </div>

    );}
}

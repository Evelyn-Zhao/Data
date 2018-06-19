import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import logo from './logo.svg';
import './AppBar.css';
import AppLogin from './AppLogin';

class AppBar extends Component {
    async componentDidMount() {
        //会问服务器又没有登录过 每次刷新后
        try{
            const response = await fetch('http://localhost:8000/me', {
                method: 'GET',
                mode: 'CORS',
                credentials: 'include', //set up cookies 
            });
            const data = await response.json();
            // { user: { ... } }
            console.log(data)
            if(data.user){
                this.onLoginSuccessful(data.user)
            }
        }catch(e){}

        window.onscroll = () => {
            if(this.appBar)
            this.appBar.onScroll()
        }
    }

    state = {
        user: undefined,
        counter: 0,
        hide: true, // an attribute controls the transparency of the popup
    }
    increaseCounter = () => {
        this.setState({ counter: this.state.counter + 1 })
    }//the method is defined by labmda expression, so can be invoked from this, otherwise, it cannot be found because it is a window
    increaseHide = () => {
        this.setState({ hide: !this.state.hide })
    }
    logout = async () => {
        try{
            const response = await fetch('http://localhost:8000/logout', {
                method: 'GET',
                mode: 'CORS',
                credentials: 'include', //set up cookies 
            });
            const data = await response.json();
           
            console.log(data)
           
        }catch(e){}
        this.setState({user: undefined})
        this.props.history.push("/");
    }
    onScroll = () => {
        //to be implemented
    }

    onLoginSuccessful = (user) =>{
        this.setState({user: user, hide: true})

    }

    register = async () => {
        this.props.history.push("/register");
        this.setState({hide: true})
    }

    renderButton() {
        if (this.state.user) {
            console.log(this.state);
            return  [
                    <div key = {1} className = "AppBar-username-label"> Hi, {this.state.user.usrname} </div>,
                    <div key = {2} className = "AppBar-button1" onClick={this.logout}> Logout </div>
            ];
        } else {
            return  [
                    <div key = {3} onClick={this.increaseHide} className = "AppBar-button1" > Login </div>,
                    <div key = {4} onClick={this.register} className = "AppBar-button2" > Register </div>
            ];
        }
    }
    
    render() {
    return (
        //green is the style of itself, the later one is its parent style (from App)
        
        <nav style = {{ background: "rgba(151, 151, 151,0.8)", transition: "all 1s", ...this.props.style }} className="AppBar">
            <div>{this.state.hide ? null : <AppLogin onLoginSuccessful={this.onLoginSuccessful}/> } </div>
            <img className = "AppBar-logo" alt = " " src={logo}/>

            { this.renderButton() }
            
        </nav>
    );
  }
}

export default withRouter(AppBar);
//JsonResponse(JSON Object) => the way to change the state of the webpage
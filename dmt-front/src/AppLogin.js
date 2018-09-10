import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './AppLogin.css';

class AppLogin extends Component{

    state = {
        username: "",
        password: "", 
    } 
   
      
    login = async () => {
        try{
            console.log([this.state.username, this.state.password]);
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                mode: 'CORS',
                body: `username=${this.state.username}&password=${this.state.password}`,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const data = await response.json();
            // { user: { ... } }
            // { error: "Incorrect password" }
            console.log(data);
            if (data.error) {
                //throw to chatch ()
                //all exceptions will be dealt in catch(e) 
            }else{
                console.log("logged in");
                //will switch to the main pag
                this.props.history.push("/main");
                //the login page should disappear
                //the login button should change to username 
                this.props.onLoginSuccessful(data.user);
            }
        } catch(e) {
            //两次错误处理
            alert(e.message)
        }

    }

    
    render(){
       
        return(
            

            
                <div  key={1} onClick={this.increaseHide} className = "AppBar-popup-outer"></div>,
    
                <div  key={2} className = "AppLogin-popup-inner">
                    <div className = "AppLogin-login-field">
                        <label htmlFor="username">Username: </label>
                        <Input onChange={e => this.setState({username:e.target.value})} type="text" name="username" id="username"/>
                    </div>
                    <div className = "AppLogin-login-field">
                        <label htmlFor="password">Password: </label>
                        <Input onChange={e => this.setState({password:e.target.value})} type="password" name="password" id="password"/>
                    </div>
                    <Checkbox style={{"padding":"10px"}}>Remember me</Checkbox>
                    <Button type="primary" className="login-form-button" onClick={this.login}>Log in</Button>
                    Or <a><Link to={'/register'}>register now!</Link></a>
                    
                </div>

                
            
        );
    }
}

export default withRouter(AppLogin);
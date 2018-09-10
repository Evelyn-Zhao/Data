import React, { Component } from 'react';
import './Register.css';
import { Button } from 'antd';

function checkPassword(password) {
    if (!password) return null;
    if (password.length < 5) return <span style={{color: 'red'}}>Weak</span>;
    return <span style={{color: 'green'}}>Strong</span>;
}

export default class Register extends Component {

    state = {
        useremail: "",
        username: "",
        userfirstname: "",
        userlastname: "",
        password: "", 
        rpassword: "", 
        authority: 0,
    } 

    submit = async () => {
        console.log([this.state.username, this.state.password, this.state.rpassword]);
        if (this.state.password === this.state.rpassword && (this.state.password !== "" && this.state.rpassword !== "" && this.state.userfirstname !== ""&& this.state.userlastname !=="")){
            try{
                console.log([this.state.username, this.state.password]);
                const response = await fetch('http://localhost:8000/register', {
                    method: 'POST',
                    mode: 'CORS',
                    body: `username=${this.state.username}&password=${this.state.password}&useremail=${this.state.useremail}&userfirstname=${this.state.userfirstname}&userlastname=${this.state.userlastname}`,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                const data = await response.json();
            
                console.log(data);

                //throw to chatch ()
                //all exceptions will be dealt in catch(e) 
                if (data.error) throw new Error(data.error);
                console.log(data.error)
                
                console.log("registered");
                    
            } catch(e) {
                //两次错误处理
                alert(e.message)
            }
        }else{
        }
    }

    render() {
        return (
           <div className = "Register-page">
               <h1>Register Page</h1>
               <p>Please fill in the following form to create an account</p>
               <hr/>
            <div className = "Register-each-row">
                <label><b>Username (Used for login)</b></label>
                <input onChange={e => this.setState({username:e.target.value})} className = "Register-input-field" placeholder="Enter Username" name="username" required/>
            </div>
            <div className = "Register-each-row">
                <label><b>First Name</b></label>
                <input onChange={e => this.setState({userfirstname:e.target.value})} className = "Register-input-field" placeholder="Enter your First Name" name="username" required/>
            </div>
            <div className = "Register-each-row">
                <label><b>Last Name</b></label>
                <input onChange={e => this.setState({userlastname:e.target.value})} className = "Register-input-field" placeholder="Enter your Last Name" name="username" required/>
            </div>
            <div className = "Register-each-row">
                <label><b>Email</b></label>
                <input onChange={e => this.setState({useremail:e.target.value})} className = "Register-input-field" placeholder="Enter Email" name="email" required/>
            </div>
            <div className = "Register-each-row">
                <label><b>Password</b></label>
                <input onChange={e => this.setState({password:e.target.value})} className = "Register-input-field" placeholder="Enter Password" name="psw" type="password" required/>
                { checkPassword(this.state.password) }
            </div>
            <div className = "Register-each-row">
                <label><b>Repeat Password</b></label>
                <input onChange={e => this.setState({rpassword:e.target.value})} className = "Register-input-field" placeholder="Repeat Password" name="psw-repeat" type="password" required/>
            </div>
           
      
           <Button onClick = {this.submit}>submit</Button>
           </div>
        );
    }
}
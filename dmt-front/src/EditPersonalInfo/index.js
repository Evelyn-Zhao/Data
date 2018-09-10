import React, { Component } from 'react';
import '../Register.css';
import { Button } from 'antd';

export default class EditPersonalInfo extends Component {

    state = {
        userfirstname: "",
        userlastname: "",
        useremail: "",
        user: undefined,
    } 

    async componentDidMount() {
        //会问服务器又没有登录过 每次刷新后
        try{
            const response = await fetch('http://localhost:8000/showPersonalInfo', {
                method: 'GET',
                mode: 'CORS',
                credentials: 'include', //set up cookies 
            });
            const data = await response.json();
            // { user: { ... } }
            console.log(data)
           
            if(data.user){
                this.setState({ user: data.user })
                console.log(this.state.user["usrfirstname"])
            }
        }catch(e){}

        
    }
   
    updateInfo = async() =>{
        try{
          
            const response = await fetch('http://localhost:8000/updatePersonalInfo', {
                method: 'POST',
                mode: 'CORS',
                body: `useremail=${this.state.useremail}&userfirstname=${this.state.userfirstname}&userlastname=${this.state.userlastname}`,
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
            
            console.log("UPDATED");
                
        } catch(e) {
            //两次错误处理
            alert(e.message)
        }

    }

    render() {
        return (
            <div>
            {this.state.user? 
                <div className = "Register-page">
                <h1>Edit Personal Information</h1>
               
                <hr/>
            <div className = "Register-each-row">
                <label><b>First Name</b></label>
                <input onChange={e => this.setState({userfirstname:e.target.value})} className = "Register-input-field" placeholder={this.state.user["usrfirstname"]} name="username" required/>
            </div>
            <div className = "Register-each-row">
                <label><b>Last Name</b></label>
                <input onChange={e => this.setState({userlastname:e.target.value})} className = "Register-input-field" placeholder={this.state.user["usrlastname"]} name="username" required/>
            </div>
            <div className = "Register-each-row">
                <label><b>Email</b></label>
                <input onChange={e => this.setState({useremail:e.target.value})} className = "Register-input-field" placeholder={this.state.user["usremail"]} name="email" required/>
            </div>
           
           <Button onClick={this.updateInfo}>submit</Button>
           </div>: <div>Loading</div>}
          
            </div>
        );
    }
}
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import logo from '../logo.svg';
import './AppBar.css';
import AppLogin from '../AppLogin';
import NaviBar from '../NaviBar';
import { Avatar } from 'antd';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
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

    manageExps = () =>{
        this.props.history.push("/manageExps");
    }
    managePersonalInfo = () => {
        this.props.history.push("/editPersonalInfo");
    }
    renderButton() {
        if (this.state.user) {
            console.log(this.state);
            const SubMenu = Menu.SubMenu;
        const MenuItemGroup = Menu.ItemGroup;
            return  [
                    <div className = "AppBar-navi-and-user">
                        <Menu onClick={this.handleClick} mode="horizontal">
                            <Menu.Item key="1">
                                <Icon type="home" theme="outlined" /><span><Link to ='/main'>Main</Link></span>
                            </Menu.Item>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span><Link to ='/manageExps'>Manage Experiment</Link></span></span>}>
                                <Menu.Item key="5">Add New Experiment</Menu.Item>
                                <Menu.Item key="6">Edit My Experiment</Menu.Item>
                                <Menu.Item key="7">Shopping Experiment</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Settings</span></span>}>
                                <Menu.Item key="9"><Link to ='/editPersonalInfo'>Personal Account</Link></Menu.Item>
                                <Menu.Item key="10">Help</Menu.Item>
                                <Menu.Item key="11" onClick={this.logout}><Link to ='/'>Log Out</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                        <Avatar shape="square" size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', paddingLeft: '140px', marginLeft:'200px' }}> <Icon type="user" theme="outlined" />{this.state.user.usrname} </Avatar>
                    </div>
                  //  <a key = {1} className = "AppBar-username-label"> Hi, {this.state.user.usrname} 
                  //      <ul>
                  //          <li onClick={this.manageExps}>Manage Experiments</li>
                  //          <li onClick={this.managePersonalInfo}>Manage Personal Information</li>
                  //          <li onClick={this.logout}>Log Out</li>
                            
                  //      </ul>
                        
                  //   </a>
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
        
        <nav style = {{ background: "rgba(255,255,255)", transition: "all 1s", ...this.props.style }} className="AppBar">
            <div>{this.state.hide ? null : <AppLogin onLoginSuccessful={this.onLoginSuccessful}/> } </div>
            <img className = "AppBar-logo" alt = " " src={logo}/>

            { this.renderButton() }
            
        </nav>
    );
  }
}

export default withRouter(AppBar);
//JsonResponse(JSON Object) => the way to change the state of the webpage
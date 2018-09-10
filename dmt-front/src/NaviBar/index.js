import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import './NaviBar.css'

export default class NaviBar extends Component {
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

    }
    
   
    render(){

        const SubMenu = Menu.SubMenu;
        const MenuItemGroup = Menu.ItemGroup;
        return(
            <Menu
            onClick={this.handleClick}
          
      
         
            mode="horizontal"
          >
          
            <Menu.Item key="1">
                <Icon type="home" theme="outlined" />
                <span>Main</span>
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
        );
    }

}
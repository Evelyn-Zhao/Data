import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './ManageExps.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import { Menu, Dropdown, Icon, message } from 'antd';

class ManageExps extends Component {

    state = {
        service: undefined,
        types: ["Closed","Ongoing","Available"],
        expname: undefined,
        exptype: undefined,
        expperiod: undefined,
        expdescription: undefined,
        expers: undefined,
        cexps: undefined,
        myexps: undefined,
    }

    handleMenuClick = (e) => {
        
        this.state.exptype = this.state.types[e['key']-1]
        message.info(this.state.exptype);
        console.log(e)
    }
    
    addExp = () =>{
        this.setState()
        this.state.service = "add"
    }

    editExp =  async () =>{
        this.state.service = "edit"
        try{
            const response = await fetch('http://localhost:8000/myExps', {
                    method: 'GET',
                    mode: 'CORS',
                    credentials: 'include',
                });
            const data = await response.json();
            console.log(data)
            this.setState({myexps:data["myexps"]})
        }catch(e) {
            //两次错误处理
            alert(e.message)
        }
    }

    claimExp = async () =>{
        this.state.service = "claim"
        try{
            const response = await fetch('http://localhost:8000/claimableExps', {
                    method: 'GET',
                    mode: 'CORS',
                    credentials: 'include',
                });
            const data = await response.json();
            console.log(data)
            this.setState({cexps:data["cexps"]})
        }catch(e) {
            //两次错误处理
            alert(e.message)
        }
    }

    help = () =>{
        this.state.service = "help"
    }

    submit = async () => {
        console.log([this.state.expname, this.state.expperiod, this.state.expdescription, this.state.exptype]);
        if (this.state.expname !== "" && (this.state.expperiod !== "" && this.state.expdescription !== "" && this.state.exptype !== "")){
            try{
                console.log([this.state.expname, this.state.expperiod]);
                const response = await fetch('http://localhost:8000/newexp', {
                    method: 'POST',
                    mode: 'CORS',
                    body: `expname=${this.state.expname}&expperiod=${this.state.expperiod}&expdescription=${this.state.expdescription}&expers=${this.state.expers}&exptype=${this.state.exptype}`,
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
                
                console.log("experiment registered");
                    
            } catch(e) {
                //两次错误处理
                alert(e.message)
            }
        }else{
        }
    }

    renderMain (){
        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1"><Icon type="right-square" /> Closed</Menu.Item>
              <Menu.Item key="2"><Icon type="right-square" /> Ongoing</Menu.Item>
              <Menu.Item key="3"><Icon type="right-square" /> Available</Menu.Item>
            </Menu>
          );
        
        if(this.state.service){
            if(this.state.service == "add"){
                return[
                    <div className = "ManageApp-Main"> 
                        <h1>Create New Experiment Page</h1>
                        <p>Please fill in the following form to create a new experiment</p>
                        <hr/>
                        <div className = "ManageApp-each-row">
                            <label><b>Experiment Name</b></label>
                            <input onChange={e => this.setState({expname:e.target.value})} className = "Register-input-field" placeholder="Enter Experiment Name" name="expname" required/>
                        </div>

                        <div className = "ManageApp-each-row">
                            <label><b>Experiment Period</b></label>
                            <input onChange={e => this.setState({expperiod:e.target.value})} className = "Register-input-field" placeholder="Enter Experiment Period" name="expperiod" required/>
                        </div>

                        <div className = "ManageApp-each-row">
                            <label><b>Experiment Description</b></label>
                            <input onChange={e => this.setState({expdescription:e.target.value})} className = "Register-input-field" placeholder="Enter Experiment Description" name="expdescription" required/>
                        </div>
                        <div className = "ManageApp-each-row">
                            <label><b>Experimenters (separate the names by comma (,))</b></label>
                            <input onChange={e => this.setState({expers:e.target.value})} className = "Register-input-field" placeholder="Enter Experimenter Names" name="expdescription" required/>
                        </div>
                        <div className = "ManageApp-exptype-row">
                            <label><b>Experiment Type</b></label>
                            <Dropdown overlay={menu}>
                                <Button style={{ marginLeft: 8 }}>
                                    Experiment Type <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </div>
                        
                        <Button onClick = {this.submit}>submit</Button>
                    </div>
                ];
            } else if(this.state.service == "edit"){
                return[
                    <div className = "ManageApp-Main"> 
                        <h2>Edit My Experiments</h2>
                        <table>
                            <tbody>
                                <tr >
                                    <th className="Exp-th">Experiment ID</th>
                                    <th className="Exp-th">Name</th>
                                    <th className="Exp-th">Type</th>
                                </tr>
                                {
                                    this.state.myexps && this.state.myexps.map(d =>                         
                                
                                    <tr className="Exp-th">
                                        <td className="Exp-th">{d.expid}</td>
                                        <td className="Exp-th"><Link to={'/experiments/' + d.expid}>{d.expname}</Link></td>
                                        <td className="Exp-th">{d.exptype}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    
                    </div>
                ];
            } else if(this.state.service == "claim"){
                return[
                    <div className = "ManageApp-Main"> 
                    <table>
                    <tbody>
                         <tr >
                            <th className="Exp-th">Exp ID</th>
                            <th className="Exp-th">Name</th>
                            <th className="Exp-th">Type</th>
                            <th className="Exp-th">Click to Claim</th>
                        </tr>
                        {
                            this.state.cexps && this.state.cexps.map(d =>                         
                                
                                <tr className="Exp-th">
                                        <td className="Exp-th">{d.expid}</td>
                                        <td className="Exp-th"><Link to={'/experiments/' + d.expid}>{d.expname}</Link></td>
                                        <td className="Exp-th">{d.exptype}</td>
                                        <a className="Exp-th" href={'http://localhost:8000/claimExp?id=' + d.expid}> <Icon type="shopping-cart" theme="outlined" /> Claim </a>
                                    
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                    
                    </div>
                ];
            }else if(this.state.service == "help"){
                return[
                    <div className = "ManageApp-Main">
                        <h2>Q&A</h2>
                          
                    </div>
                ];
            } 
        }else{
            return[
                <div className = "ManageApp-Main"> 
                    <h2>Please click the term in left nav bar to manage experiments</h2>
                    
                
                </div>
            ];
        }
    }

    render(){
        return(
            <div>
                <div className="sidenav">
                    <a href="#about" onClick={this.addExp}><Icon type="right-circle" /> Add New Experiment</a>
                    <a href="#services" onClick={this.editExp}><Icon type="right-circle" /> Manage Experiments</a>
                    <a href="#clients" onClick={this.claimExp} ><Icon type="right-circle" /> Claim Open Experiment</a>
                    <a href="#contact" onClick={this.help}><Icon type="right-circle" />   Help</a>
                </div>
                
                <div>
                    {this.renderMain()}
                </div>
            
            </div>
            

        );
    }
}export default withRouter(ManageExps);

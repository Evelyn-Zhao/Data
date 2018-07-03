import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './ExpDetails.css'

export default class ExpDetails extends Component {

    async componentDidMount() {
        console.log(this.props.match.params.id)
        //会问服务器又没有登录过 每次刷新后
        try {
            const response = await fetch('http://localhost:8000/expdetails?id='+this.props.match.params.id, {
                method: 'GET',
                mode: 'CORS',
                credentials: 'include', //set up cookies 
            });
            const data = await response.json();
            // { user: { ... } }
            console.log(data)
            this.setState({details:data})
        } catch (e) { }
    }

    state = {
        details: undefined,
    }

    render() {
        const details = this.state.details;
        if(details === undefined){
            return <h1>Loading...</h1>
        }
        return (
            <div style={{ paddingTop: "60px" }}>
                <div style={{margin: 30}}>
                    <center>
                        <h1>{details.name}</h1>
                    </center>
                    <div style={{marginLeft: 70}}>
                        <h3 style = {{textAlign:"left"}} >Experimenters</h3>
                        <p style={{marginLeft: 30}}>{details.experimenters.map (exper => <p>{exper}</p>)}</p>
                        <h3 style = {{textAlign:"left"}}>Date</h3>
                        <p style={{marginLeft: 30}}>{details.date ? details.date + '/' : ''}{details.month}/{details.year}</p>
                        <h3 style = {{textAlign:"left"}}>Description</h3>
                        <p style={{marginLeft: 30}}>{details.description}</p>
                        <h3 style = {{textAlign:"left"}}>Outcomes</h3>
                        <p style={{marginLeft: 30}}>{details.outcomes ? details.outcomes.map(d =>                         
                                                                                                <tr>
                                                                                                    <td>{d.name}</td>
                                                                                                    <td>{d.relation}</td>
                                                                                                </tr>
                                                                                            ) : 'NULL'}</p>
                        <h3 style = {{textAlign:"left"}}>Data Generated</h3>
                        <p style={{marginLeft: 30}}>{details.data ? details.data.map(d =>                         
                                                                                                <tr>
                                                                                                    <td>{d.name}</td>
                                                                                                    <td>{d.relation}</td>
                                                                                                </tr>
                                                                                            ) : 'NULL'}</p>
                        <h3 style = {{textAlign:"left"}}>Experiment Timeline</h3>
                    </div>
                </div>

                {/*<Link to='/'>Back to home</Link>*/}
            </div>

        );
    }
}
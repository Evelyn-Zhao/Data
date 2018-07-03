import React, { Component } from 'react';
import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'
import './Data.css'

export default class Data extends Component {

    async componentDidMount() {
        console.log(this.props.match.params.id)
        //会问服务器又没有登录过 每次刷新后
        try {
            const response = await fetch('http://localhost:8000/data', {
                method: 'GET',
                mode: 'CORS',
                credentials: 'include', //set up cookies 
            });
            const data = await response.json();
            // { user: { ... } }
            console.log(data.data)
            if (data.data) {
                this.setState({ dataList: data.data })
                // this.onLoginSuccessful(data.user)
            }
        } catch (e) { }
    }

    state = {
       dataList: undefined,
    }

    render() {
        return (
            <div style={{ paddingTop: "60px" }}>
                <div className="Main-intro">
                    <center>
                        <h1>EXPLORE THE DATA</h1>
                    </center>
                    <SearchBar />
                </div>


                <div className="Exp">

                    <table className="Exp-table">
                        <tbody>
                            <tr className="Exp-th">
                                <th className="Exp-th">Number</th>
                                <th style = {{"width": "150px"}}className="Exp-th">Name</th>
                                <th className="Exp-th">Data Type</th>
                                <th className="Exp-th">Generate From</th>
                            </tr>
                            {
                                this.state.dataList && this.state.dataList.map(e =>
                                    <tr className="Exp-th">
                                        <td className="Exp-th">{e.dataid}</td>
                                        <td className="Exp-th"><Link to={'/data/' + e.dataid}>{e.dataname}</Link></td>
                                        <td className="Exp-th">{e.datatype}</td>
                                        <td className="Exp-th"><Link to={'/experiments/' + e.exp_id}>{'Experiment ' + e.exp_id}</Link></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                {/*<Link to='/'>Back to home</Link>*/}
            </div>

        );
    }
}
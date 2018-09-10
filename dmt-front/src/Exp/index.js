import React, { Component } from 'react';
import SearchBar from '../SearchBar'
import { Link } from 'react-router-dom'
import './Exp.css'

export default class Exp extends Component {

    async componentDidMount() {
        console.log(this.props.match.params.id)
        //会问服务器又没有登录过 每次刷新后
        try {
            const response = await fetch('http://localhost:8000/exp', {
                method: 'GET',
                mode: 'CORS',
                credentials: 'include', //set up cookies 
            });
            const data = await response.json();
            // { user: { ... } }
            console.log(data.exps)
            if (data.exps) {
                this.setState({ experiments: data.exps })
                // this.onLoginSuccessful(data.user)
            }
        } catch (e) { }
    }

    state = {
        experiments: undefined,
    }

    displayExps() {
        //语句和表达式不是一个东西
        //html只能用表达式 所以需要 return
        return (
            <table>

                {this.state.experiments.map(function (e) {
                    console.log(e)
                    return (
                        <tr>
                            <td>e</td>
                            <td>experiments[e]</td>
                        </tr>
                    )
                })

                }
            </table>
        )
    }

    // onLoginSuccessful = (user) =>{
    //     this.setState({user: user, hide: true})
    // }

    render() {
        return (
            <div style={{ paddingTop: "60px" }}>
                <div className="Main-intro">
                    <center>
                        <h1>EXPLORE THE EXPERIMENT</h1>
                    </center>
                    <SearchBar />
                </div>


                <div className="Exp">

                    <table className="Exp-table">
                        <tbody>
                            <tr className="Exp-th">
                                <th className="Exp-th">Experiment ID</th>
                                <th style = {{"width": "150px"}}className="Exp-th">Name</th>
                                <th className="Exp-th">Experiment Description</th>
                                <th className="Exp-th">Type</th>
                            </tr>
                            {
                                this.state.experiments && this.state.experiments.map(e =>
                                    <tr className="Exp-th">
                                        <td className="Exp-th">{e.expid}</td>
                                        <td className="Exp-th"><Link to={'/experiments/' + e.expid}>{e.expname}</Link></td>
                                        <td className="Exp-th">{e.description}</td>
                                        <td className="Exp-th">{e.exptype}</td>
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
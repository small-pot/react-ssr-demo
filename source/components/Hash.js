import React from 'react'
import { HashRouter } from "react-router-dom";

export default class Hash extends React.Component{
    render(){
        return process.env.REACT!=='server'?<HashRouter>{this.props.children}</HashRouter>:null
    }
}
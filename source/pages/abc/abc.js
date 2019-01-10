import React from 'react';
import './abc.less';
import http from '#/http';
import { HashRouter,Switch, Route } from "react-router-dom";
import Hash from '../../components/Hash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { DatePicker } from 'antd';
import moment from '#/moment';
import createHashHistory from 'history/createHashHistory';



class Hello extends React.Component{
    static propTypes={
        time:PropTypes.string
    }
    constructor(props){
        super(props);
        let a=2;
        http({
            method:'get',
            url:'/API/Attendance/getTime.htm'
        }).then(res=>{
            //console.log(88888,res);
        });
    }
    componentDidMount(){
        this.history=createHashHistory();
    }
    timeChange(moment,time){
        this.props.dispatch({type:'abc/getTime',time});
    }
    render(){
        return (<div className="abc">
            <img src={require('../../img/gg.jpg')} alt=""/>
            <div onClick={()=>console.log(8888)}>time:{this.props.time}</div>
            <DatePicker onChange={(moment,val)=>this.timeChange(moment,val)} value={moment(this.props.time)}/>
            <div className="btn-box">
                <a onClick={()=>this.history.push('/abc')}>to abc</a>
                <a onClick={()=>this.history.push('/ttt')}>to ttt</a>
            </div>
            <Hash>
                <Switch>
                    <Route path={'/abc'} component={()=><div>我是abc组件</div>} />
                    <Route path={'/ttt'} component={()=><div>我是ttt组件</div>} />
                </Switch>
            </Hash>
        </div>);
    }
}
export default connect(state=>{
    console.log(state);
    return {
        time:state.abc.time
    };
})(Hello);
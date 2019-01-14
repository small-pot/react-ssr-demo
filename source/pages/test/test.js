import React from 'react';
import Tree from '@/components/common/tree';
import {connect} from 'react-redux';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import './test.less';


class Test extends React.Component{
    static propTypes={
        dispatch:PropTypes.func,
        list:PropTypes.array
    }
    constructor(props){
        super(props);
        this.state={
            current:1
        };
    }
    pageChange(n){
        this.props.dispatch({type:'test/getList',page:n});
        this.setState({
            current:n
        });
    }
    render(){
        return (
            <div className="container">
                <Tree/>
                <div className="right-box">
                    <ul>
                        {this.props.list.map((item,index)=>
                            (<li className="list-content" key={item.createdOnStr}>
                                <h2>{item.content}</h2>
                                <p>
                                    <span>time：{item.createdOn}</span>
                                    <span>name：{item.creatorName}</span>
                                </p>
                            </li>)
                        )}
                    </ul>
                    <Pagination showQuickJumper current={this.state.current} total={500} onChange={(n)=>this.pageChange(n)} />
                </div>
            </div>
        );
    }
}
export default connect(function (state) {
    return {
        list:state.test.list
    };
})(Test);
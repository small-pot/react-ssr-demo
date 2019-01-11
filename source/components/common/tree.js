import React from 'react';
import './tree.less';
import { Tree } from 'antd';

const { TreeNode } = Tree;
const treeData = [{
    title: '0-0',
    key: '0-0',
    children: [{
        title: '0-0-0',
        key: '0-0-0',
        children: [
            {title: '0-0-0-0', key: '0-0-0-0'},
            {title: '0-0-0-1', key: '0-0-0-1'},
            {title: '0-0-0-2', key: '0-0-0-2'},
        ],
    }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
            {title: '0-0-1-0', key: '0-0-1-0'},
            {title: '0-0-1-1', key: '0-0-1-1'},
            {title: '0-0-1-2', key: '0-0-1-2'},
        ],
    }, {
        title: '0-0-2',
        key: '0-0-2',
    }],
}, {
    title: '0-1',
    key: '0-1',
    children: [
        {title: '0-1-0-0', key: '0-1-0-0'},
        {title: '0-1-0-1', key: '0-1-0-1'},
        {title: '0-1-0-2', key: '0-1-0-2'},
    ],
}, {
    title: '0-2',
    key: '0-2',
}];
// const TreeNode = ({title, icon, children, show}) => {
//     const Icon = icon || (() => null)
//     console.log(show)
//     return (
//         <li>
//             <Icon/>
//             <span>{title}</span>
//             {show ? <ul className='tree-parent'>{children}</ul> : null}
//         </li>
//     )
// }

// class TreeNode extends React.Component {
//     constructor(props){
//         super(props)
//         this.state={
//             show:this.props.show
//         }
//     }
//     render() {
//         const Icon = this.props.icon || (() => null)
//         return (
//             <li>
//                 <span onClick={()=>{this.setState({show:!this.state.show})}}><Icon/></span>
//                 <span>{this.props.title}</span>
//                 {this.state.show ? <ul className='tree-parent'>{this.props.children}</ul> : null}
//             </li>
//         )
//     }
// }
//
// export default class MyTree extends React.Component {
//     state = {
//         selectedKeys: [],
//     }
//     onSelect = (selectedKeys, info) => {
//         this.setState({selectedKeys});
//     }
//     renderTreeNodes = data => data.map((item) => {
//         if (item.children) {
//             return (
//                 <TreeNode {...item} icon={() => <span>+</span>}>
//                     {this.renderTreeNodes(item.children)}
//                 </TreeNode>
//             );
//         }
//         return <TreeNode {...item} />;
//     })
//
//     // render() {
//     //     return (
//     //         <Tree
//     //             showIcon={true}
//     //             onSelect={this.onSelect}
//     //             selectedKeys={this.state.selectedKeys}
//     //         >
//     //             {this.renderTreeNodes(treeData)}
//     //         </Tree>
//     //     );
//     // }
//     render() {
//         return (
//             <ul className='tree'>
//                 {this.renderTreeNodes(treeData)}
//             </ul>
//         )
//     }
// }
export default class Demo extends React.Component {
    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
    }


    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} icon={()=><span>*</span>} />;
    })

    render() {
        return (
            <Tree
                isLeaf={true}
                className="tree"
                showIcon={true}
                switcherIcon={<span className="abc">+</span>}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(treeData)}
            </Tree>
        );
    }
}
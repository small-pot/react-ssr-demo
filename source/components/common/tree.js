import React from 'react';
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
export default class MyTree extends React.Component {
    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
    }


    onSelect = (selectedKeys, info) => {
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
                showLine={true}
                className="tree"
                switcherIcon={<span className="abc">+</span>}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(treeData)}
            </Tree>
        );
    }
}
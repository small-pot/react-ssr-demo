import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Routes from './router/routes';
import {Provider} from 'react-redux';
import 'antd/dist/antd.less';
import './index.less';
import PropTypes from 'prop-types';
import createEntry from './createEntry';
import { loadableReady } from '@loadable/component';
const pathName=location.pathname;
const App=({store})=>{
    return (
        <Provider store={store}>
            <BrowserRouter><Routes /></BrowserRouter>
        </Provider>
    );
};
App.propTypes={
    store:PropTypes.object
};
const Entry=createEntry(pathName,App,window.INITSTATE);
document.cookie='id=12345';
loadableReady(()=>{
    ReactDom.render(
        <Entry />,
        document.getElementById('root')
    );
});
if(module.hot) {
    module.hot.accept();
}
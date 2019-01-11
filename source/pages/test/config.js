import loadable from '@loadable/component';
export default {
    path:'/test',
    Component: loadable(()=>import('./test')),
    model: loadable.lib(()=>import('./testModel'))
};
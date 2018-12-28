const context = require.context('../pages', true, /serverConfig\.js$/);
const config={}
context.keys().forEach(pathname=>{
    const item=context(pathname).default
    config[item.path]=item;
})
export default config;
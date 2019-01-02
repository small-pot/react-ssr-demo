import webpack from 'webpack'
import ora from 'ora'
import clientWebpackConfig from '../webpack/webpack.build'
import serverWebpackConfig from '../webpack/webpack.server'
const spinner = ora('building for production...')
spinner.start()
const clientPromise=()=>new Promise((resolve,reject) => {
    webpack(clientWebpackConfig,(err,stats)=>{
        if(err){
            reject(err)
        }else{
            resolve(stats)
        }
    })
})
const serverPromise=()=>new Promise((resolve,reject) => {
    webpack(serverWebpackConfig,(err,stats)=>{
        if(err){
            reject(err)
        }else{
            resolve(stats)
        }
    })
})
async function build () {
    const clientStats=await clientPromise()
    const serverStats=await serverPromise()
    process.stdout.write(clientStats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
    process.stdout.write(serverStats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
    spinner.stop()
}
build()
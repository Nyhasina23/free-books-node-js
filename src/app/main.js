import {app} from './modules/app.module.js'
const port = 8080 || process.env.PORT
import {AdminRouter} from './routes/app.route.js'
import {load} from './modules/database.module.js'
async function main(){
    load()
    AdminRouter()
    app.listen(port , () => console.log("Server listen on "+port));
}

export {main}
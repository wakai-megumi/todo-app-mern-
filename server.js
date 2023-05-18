import { app } from "./app.js"
import { database } from './data/database.js';





app.listen(process.env.PORT_NUMBER, async () => {
    database();
    console.log(`server is listening on port ${process.env.PORT_NUMBER} in ${process.env.NODE_ENV} mode`)
})
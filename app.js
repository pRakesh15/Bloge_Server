import { app } from "./index.js";

import { dbconnection } from "./data/database.js";

const port=process.env.port;
const hostname="127.0.0.1";
//mongodb connnection
dbconnection()

app.listen(port,()=>
{
    console.log(`server started at http://${hostname}:${port}`)
})
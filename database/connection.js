import "dotenv/config";
import pg from "pg";
const { Pool } = pg;


const connectionString = process.env.CONNECTION_STRING
//Conexion con variable de entorno y connection string
export const pool = new Pool({
    connectionString,
    allowExitOnIdle: true 
});

try {
  await pool.query("SELECT NOW()");
  console.log("Conexion a postgres ok");
} catch (error) {
  console.log(error);
}
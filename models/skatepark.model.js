import { pool } from "../database/connection.js";

const getSkaters = async () =>{
    const {rows} = await pool.query ('SELECT * FROM skaters ORDER BY id')
    return rows
}

const register = async ({email, nombre, password, anos_experiencia, especialidad, foto, estado}) =>{
    const query = {
        text: `
            INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) 
            VALUES ( $1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
            `,
        values: [email, nombre, password, anos_experiencia, especialidad, foto, estado]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}


const getSkaterByEmail = async (email) =>{
    const query = {
        text: 'SELECT * FROM skaters WHERE email = $1',
        values: [email]
    }
    const {rows} = await pool.query(query)
    return rows[0]

}

const update = async ({email, nombre, password, anos_experiencia, especialidad}) => {
    const query = {
        text: 'UPDATE skaters SET nombre = $2 , password = $3 , anos_experiencia = $4, especialidad = $5 WHERE email = $1 RETURNING *',
        values: [email, nombre, password, anos_experiencia, especialidad]
    }
    const {rows} = await pool.query(query)
    return rows[0]   
}

const updateEstado = async ({email, estado}) => {
    const query = {
        text: 'UPDATE skaters SET estado = $2 WHERE email = $1 RETURNING *',
        values: [email, estado]
    }
    const {rows} = await pool.query(query)
    return rows[0]   
}

const remove = async (email) =>{
    const query = {
        text: 'DELETE FROM skaters WHERE email = $1 RETURNING *',
        values: [email]
    }
    const {rows} = await pool.query(query)
    return rows[0]

}


export const skateparkModel = {

    getSkaters,
    register,
    getSkaterByEmail,
    update,
    updateEstado,
    remove
}
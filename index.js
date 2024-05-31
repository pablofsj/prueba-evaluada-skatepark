import 'dotenv/config'
import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'
import cors from 'cors'
import skateparkRoutes from './routes/skatepark.routes.js'
import fileUpload from 'express-fileupload';
import { verifyTokenJWT } from "./middlewares/jwt.middleware.js";



const app = express()
const __dirname = import.meta.dirname

app.use(express.static(path.join(__dirname, '/public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(fileUpload({
    limits: {
        filesize: 1024 * 1024 * 6
    },
    abortOnLimit: true,
    responseOnLimit: 'Archivo subido excede el tamaño limite (6 mb)'
}))

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/', skateparkRoutes)


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


//Rutas de las vistas handlebars

app.get('/', (_, res) => {
    res.render('home');
});

app.get('/registro', (_, res) => {
    res.render('registro');
});

app.get('/login', (_, res) => {
    res.render('login');
});

app.get('/datos', verifyTokenJWT, (_, res) => {
    res.render('datos');
});

app.get('/admin', verifyTokenJWT, (_, res) => {
    res.render('admin');
});

app.use('*', (_, res) => {
    res.status(404).json({ ok: false, msg: 'La ruta ingresada no existe' })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`))
//Import de modulos a utilizar
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();

//Creacion de variables porque estramos trabajando con el type : module desde configuracion
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Definimos la carpeta assets como publica
app.use(express.static('assets'));

//Creamos el arreglo con los usuarios
const usuarios = ['Juan','Jocelyn','Astrid','Maria','Ignacia','Javier','Brian'];

//Ruta para mostrar los usuarios
app.get('/abracadabra/usuarios',(req,res) => {
    res.send(JSON.stringify({'usuarios':usuarios}));
});

//Middleware para validar que el usuario pasado como parametro este en nuestro arreglo
app.use(`/abracadabra/juego/:usuario`,(req,res,next)=>{
    const usuario = req.params.usuario;
    usuarios.includes(usuario) ? next() : res.sendFile(__dirname + '/assets/who.jpeg');
});

app.get('/abracadabra/juego/:usuario',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//Validamos que el enlace seleccionado en el html,tenga como parametro el numero que coincide con la imagen del conejito y dependiendo de eso devolvemos la imagen
//que corresponda
app.get('/abracadabra/conejo/:n',(req,res) => {
    const numeroRandom = Math.round(Math.random() * (4 - 1) + 1);
    const numero = req.params.n
    console.log(numeroRandom);
    numero == numeroRandom ? res.sendFile(__dirname + '/assets/conejito.jpg'): res.sendFile(__dirname + '/assets/voldemort.jpg');
});

//Ruta por default si la ingresada no esta creada o existe
app.get('*',(req,res) => {
    res.send('Esta pagina no existe');
});

//Servidor levantado en el puerto 3000
app.listen(3000,() => {

    console.log('Servidor arriba con express');
    
});


import express from 'express'
import cors from "cors";
import config from './config';
import productRoutes from "./routes/productsroutes";
import coloresroutes from "./routes/coloresroutes";
import diseñosroutes from "./routes/diseñosroutes";
import estilosroutes from "./routes/estilosroutes";
import marcasroutes from "./routes/marcasroutes";
import materialesroutes from "./routes/materialesroutes";
import proovedoresroutes from "./routes/proveedoresroutes";
import promocionesroutes from "./routes/promocionesroutes";
import tallasroutes from "./routes/tallasroutes";
import indexroutes   from "./routes/indexroutes";
import categoriasroutes from './routes/categoriasroutes';
import loginroutes from "./routes/loginroutes";
import bodegasroutes from "./routes/bodegasroutes"
import usuariosroutes from "./routes/usuariosroutes";
import configuracionroutes from "./routes/configuracionroutes"
import articulosroutes from "./routes/articulosroutes"
import morgan from "morgan";
const { generateToken } = require('./touch jwt');
import path from "path";
const {join} = require('path')
//import bodyParser from "body-parser";

const app = express()
// settings
app.set('port', config.port)
//app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//app.use(bodyParser.json());
//app.use(bodyParser.productRoutes({extended:false}));
app.use(express.urlencoded({extended:false}));
//app.use('views', path.join(__dirname, ('views')));
app.use(express.json());
app.use('/static',express.static(join(process.cwd(),"public")));
app.use('/static',express.static(join(process.cwd(),"public/js")));
app.use(express.static('public'));

app.use(express.static('public/js'));
// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });
  
// Routes
//app.use("/api", productRoutes);
app.use(articulosroutes);
app.use(productRoutes);
app.use(categoriasroutes)
app.use(coloresroutes);
app.use(diseñosroutes);
app.use(estilosroutes);
app.use(marcasroutes);
app.use(materialesroutes);
app.use(promocionesroutes);
app.use(tallasroutes);
app.use(indexroutes);
app.use(proovedoresroutes);
app.use(loginroutes);
app.use(usuariosroutes);
app.use(bodegasroutes);
app.use(configuracionroutes)
app.use(express.json());

app.use(express.static('public/images'));
app.use(express.static('public/js'));
export default app

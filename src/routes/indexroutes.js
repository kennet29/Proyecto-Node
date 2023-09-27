import { Router } from "express";
import { getIndex } from "../controllers/indexcontroller";

const router = Router();

router.get("/index", getIndex);

router.get('/', (req, res) => {
  const cssPaths = ['/css/estilos.css', '/css/estilo-footer.css'];
  res.render('index.ejs', { cssPaths });
});

export default router;

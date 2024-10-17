import { Router } from "express";
import { createComic, deleteComic, editComic, getComicByFilters, getComicById} from "../controllers/ComicController.js";
const router = Router();


// Comic Book Management API
router.post('/create', createComic);
router.patch('/edit/:id', editComic);
router.delete('/delete/:id', deleteComic);

// Comic Book List API
router.post('/getComics', getComicByFilters);

//Comic Book Details API
router.get('/getComic/:id', getComicById)






export default router
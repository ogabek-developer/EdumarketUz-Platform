
import {Router} from "express" ;
import categoryController from "../controllers/category.controller.js";


const categoryRouter = Router() ;


categoryRouter.post('/create', categoryController.CREATE) ;
categoryRouter.get('/get/all', categoryController.GET_ALL) ;
categoryRouter.get('/:id', categoryController.GET_BY_ID) ;
categoryRouter.delete('/:id', categoryController.DELETE) ;
categoryRouter.put('/:id', categoryController.UPDATE) ;


export default categoryRouter ;

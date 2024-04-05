import { Router } from "express";
import toolsController from "../controllers/tools.controller";



const router = Router();
router.post('/createTools',toolsController.createTools);
router.get("/gettools",  toolsController.getTools);
// router.get('/getFireExtinguisherById',  toolsController.getF);

router.get(
    '/',
    toolsController.getTools
);

// router.get(
//     '/:id',
//     toolsController.getFireExtinguisherById
// );

// router.put(
//     '/:id',
//     toolsController.updateTools
// );

// router.delete(
//     "/:id", 

//     toolsController.deleteTools
//     );

export default router;
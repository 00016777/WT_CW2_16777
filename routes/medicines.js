import express from "express";
import { getMedicines, deleteMedicine,addMedicineForm,addMedicine,editMedicineForm,getMedicineById,updateMedicine } from "../controllers/medicine-controller.js";

const router = express.Router();


router.get('/add-form',addMedicineForm)

router.post('/edit-form/:id',getMedicineById,editMedicineForm)

router.delete("/:id", deleteMedicine);

router.put('/:id',updateMedicine)

router.get("/", getMedicines);

router.post('/',addMedicine)



export default router;

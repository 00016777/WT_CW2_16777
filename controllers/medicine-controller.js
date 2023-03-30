
import pug from "pug";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
import User from "../public/models/medicineModel.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);


const pathToTemplates = path.resolve(__dirname, "..", "views", "");

export const getMedicines = async (req, res) => {
  const userTemplatePath = path.resolve(pathToTemplates, "medicines.pug");
  const template = pug.compileFile(userTemplatePath);
  const users =  await User.find();
  const renderedTemplate = template({ users: users });
  res.send(renderedTemplate);
};

export const getMedicineById = async (req, res, next) => {

  const id = req.params.id;
  const user = await User.findById(id)

  req.user = user;
  next();
};

export const deleteMedicine =  async (req, res,next) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.status(201).send('success')
};

export const addMedicineForm = (req,res)=>{
  const userTemplatePath = path.resolve(pathToTemplates, "add-medicine.pug");
  const template = pug.compileFile(userTemplatePath);
  const renderedTemplate = template();
  res.send(renderedTemplate)
}

export const addMedicine = async (req, res,next) => {
  const { name, email, address, variety } = req.body;
  const newUser = {
    name,
    email,
    address,
    variety,
  };
  await User.create(newUser)
  res.redirect('/medicines')
};

export const updateMedicine = async (req,res) => {
  const id = req.params.id;

  const { name, email, address, variety } = req.body;
  const  updatedUser = {
    name,
    email,
    address,
    variety
  }
 

  await User.findByIdAndUpdate(id,updatedUser,{
    new:true,
    runValidators:true
  })

  res.status(201).send('success');

  
}

export const editMedicineForm =  (req,res)=>{
  const userTemplatePath = path.resolve(pathToTemplates, "update-medicine.pug");
  const template = pug.compileFile(userTemplatePath);
  const id = req.params.id
  const renderedTemplate = template({ user: req.user });
  res.send(renderedTemplate);
}
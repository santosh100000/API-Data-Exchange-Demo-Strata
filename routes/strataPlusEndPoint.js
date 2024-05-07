//Endpoint for ebix to see update on Strataplus, added new contractor or other updates 
import express from "express";
import getContractorsForEbix from "../controllers/strataPlusEPController.js";

const strataPlusEndPointRoute = express.Router();

strataPlusEndPointRoute.route("/ebix").get(getContractorsForEbix);

export default strataPlusEndPointRoute;

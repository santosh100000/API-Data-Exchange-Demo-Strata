// api to tally contractor details/compliance with ebix db
import express from "express";
import { syncContractorsWithEbix } from "../controllers/ebixApiController.js";

const ebixAPIRoutes = express.Router();

ebixAPIRoutes.route("/syncContractorsWithEbix").post(syncContractorsWithEbix);

export default ebixAPIRoutes;

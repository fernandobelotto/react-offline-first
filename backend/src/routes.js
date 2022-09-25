import express from "express";
import {
    createRecord,
    getLastRecord
} from "./counter.js";

const router = express.Router();

router.route("/")
    .get(getLastRecord)
    .post(createRecord);

export { router };

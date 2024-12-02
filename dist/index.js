"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client("postgresql://neondb_owner:Leo5RbvZNg6z@ep-dawn-star-a538vrj5.us-east-2.aws.neon.tech/neondb?sslmode=require");
pgClient.connect();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;
    try {
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`;
        const addressInsertQuery = `INSERT INTO addresses (city,
      country,
      pincode,
      street,
      user_id) VALUES ($1, $2, $3, $4, $5);`;
        yield pgClient.query("BEGIN;"); //TRANSACTION BEGIN
        const response1 = yield pgClient.query(insertQuery, [
            username,
            email,
            password,
        ]);
        const userId = response1.rows[0].id;
        const response2 = yield pgClient.query(addressInsertQuery, [
            city,
            country,
            pincode,
            street,
            userId,
        ]);
        yield pgClient.query("COMMIT;"); //TRANSACTION END WILL POSSES BOTH QUERY OR NONE OF THEM
        res.json({
            message: "You have signed up",
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            message: "Error while signing up",
        });
    }
}));
app.listen(3000);

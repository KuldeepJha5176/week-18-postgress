import express from "express";
import { Client } from "pg";

const app = express();
app.use(express.json());

const pgClient = new Client(
  "postgresql://neondb_owner:Leo5RbvZNg6z@ep-dawn-star-a538vrj5.us-east-2.aws.neon.tech/neondb?sslmode=require"
);

pgClient.connect();

app.get("/METADATA", async (req, res) => {
  const id = req.query.id;
  const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
                 FROM users u
                 JOIN addresses a ON u.id = a.user_id
                 WHERE u.id = $1;`
    const response =  await pgClient.query(query, [id]);
    res.json({
        response: response.rows
        
    })           

})
app.listen(3000);

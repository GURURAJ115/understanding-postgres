import { Client } from "pg";
import express from "express";

const app = express();
app.use(express.json());

const pgClient = new Client(
    "postgresql://test_owner:CoBLVJb5Oh0e@ep-mute-bread-a5ufmcdh-pooler.us-east-2.aws.neon.tech/test?sslmode=require"
);
//This url also should be hidden in a seperate env file

pgClient.connect();

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // const response = await pgClient.query(`INSERT INTO users (username, email, password) values ('${username}', '${email}', '${password}')`);
    //this will be prone to sql injection

    //rather:

    try {
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`;

        const response = await pgClient.query(insertQuery, [
            username,
            email,
            password,
        ]);

        res.json({
            message: "You have signed up",
        });
    } catch (e) {
        console.log(e);
        res.json({
            message: "You have signed up",
        });
    }
});

app.listen(3000);

import {Client} from "pg";
import express from "express";

const app = express();

const pgClient = new Client("postgresql://test_owner:CoBLVJb5Oh0e@ep-mute-bread-a5ufmcdh-pooler.us-east-2.aws.neon.tech/test?sslmode=require")

async function main(){
    await pgClient.connect();
    const response = await pgClient.query("SELECT * FROM users;")
    console.log(response);
}

main();
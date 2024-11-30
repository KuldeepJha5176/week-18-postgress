import {Client} from 'pg'

const pgClient = new Client("postgresql://neondb_owner:Leo5RbvZNg6z@ep-dawn-star-a538vrj5.us-east-2.aws.neon.tech/neondb?sslmode=require")

async function main() {
    await pgClient.connect();
    const response = await pgClient.query
}
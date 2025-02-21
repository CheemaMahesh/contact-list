import {getServerSideProps} from '../../../../Utils';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    const KEY = "MAHESH";

    const client = await getServerSideProps();
    const { title, contact, token } = await req.json();
    if (!client) {
        return new Response("Database client is not available", { status: 500 });
    }
    try {
        const email = jwt.verify(token, KEY)?.email;
        if(!email) return new Response("Invalid token", { status: 500 });
        
        const currentUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if(currentUser?.rows?.length == 0) return new Response("User not found", { status: 500 });
        await client.query("INSERT INTO contacts (title, contact, userid) VALUES ($1, $2, $3)", [title, contact, currentUser?.rows?.at(0)?.id]);
        await client.end();
        return new Response(JSON.stringify({ message: "Contact created successfully!", success: true }), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};
import {getServerSideProps} from '../../../../Utils';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    const KEY = "MAHESH";

    const client = await getServerSideProps();
    
    const { id, title, contact, token } = await req.json();
    if (!client) {
        return new Response("Database client is not available", { status: 500 });
    }
    try {
console.log("tokentoken", token);
        if (!token) {
            return new Response("Token is required", { status: 401 });
        }
    
        if (!client) {
            return new Response("Database client is not available", { status: 500 });
        }
        const email = jwt.verify(token, KEY)?.email;
        if(!email) return new Response("Invalid token", { status: 500 });
        
        await client.query("UPDATE contacts SET title = $1, contact = $2 WHERE id = $3", [title, contact, id]);
        await client.end();
        return new Response(JSON.stringify({ message: "Contact Updated successfully!", success: true}), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};
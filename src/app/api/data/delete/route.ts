import {getServerSideProps} from '../../../../Utils';
import jwt from 'jsonwebtoken';

export const DELETE = async (req: Request) => {
    const KEY = "MAHESH";

    const client = await getServerSideProps();
    // 
    const token = req.headers.get("authorization");
    const { id } = await req.json();
    if (!client) {
        return new Response("Database client is not available", { status: 500 });
    }
    try {

        if (!token) {
            return new Response("Token is required", { status: 401 });
        }
    
        if (!client) {
            return new Response("Database client is not available", { status: 500 });
        }
        const email = jwt.verify(token, KEY)?.email;
        if(!email) return new Response("Invalid token", { status: 500 });
        
        await client.query("DELETE FROM contacts WHERE id = $1", [id]);
        await client.end();
        return new Response(JSON.stringify({ message: "Contact Updated successfully!", success: true}), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};
import {getServerSideProps} from '../../../../Utils';
import jwt from 'jsonwebtoken';

export const GET = async (req: Request) => {
    const KEY = "MAHESH";

    const client = await getServerSideProps();
    // 
    const token = req.headers.get("authorization");
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
        
        const currentUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        if(currentUser?.rows?.length == 0) return new Response("User not found", { status: 500 });
        const contacts = await client.query("SELECT * FROM contacts WHERE userid = $1", [currentUser?.rows?.at(0)?.id]);
        await client.end();
        return new Response(JSON.stringify({ message: "Contact created successfully!", success: true, contacts: contacts?.rows?.map((contact) => ({ id: contact?.id, title: contact?.title, contact: contact?.contact })), name: currentUser?.rows?.at(0)?.name }), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};
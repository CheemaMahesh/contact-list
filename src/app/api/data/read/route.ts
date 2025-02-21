import { EmailOne } from '@/Utils/types';
import {getServerSideProps} from '../../../../Utils';
import jwt from 'jsonwebtoken';

export const GET = async (req: Request) => {
    const KEY = process.env.NEXT_PUBLIC_JWT_KEYL;

    if (!KEY) {
        throw new Error("JWT key is not defined in the environment variables.");
    }

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
        const decoded = jwt.verify(token, KEY); // Use a different variable name

        if (typeof decoded === 'object' && 'email' in decoded) {
            const email: EmailOne = decoded as EmailOne;
            const currentUser = await client.query("SELECT * FROM users WHERE email = $1", [email.email]);
        } else {
            return new Response("Invalid token", { status: 400 });
        }
        if(!decoded) return new Response("Invalid token", { status: 500 });
        
        const currentUser = await client.query("SELECT * FROM users WHERE email = $1", [decoded?.email]);
        if(currentUser?.rows?.length == 0) return new Response("User not found", { status: 500 });
        const contacts = await client.query("SELECT * FROM contacts WHERE userid = $1", [currentUser?.rows?.at(0)?.id]);
        await client.end();
        return new Response(JSON.stringify({ message: "Contact created successfully!", success: true, contacts: contacts?.rows?.map((contact) => ({ id: contact?.id, title: contact?.title, contact: contact?.contact })), name: currentUser?.rows?.at(0)?.name }), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};
import { EmailOne } from '@/Utils/types';
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
        
        await client.query("UPDATE contacts SET title = $1, contact = $2 WHERE id = $3", [title, contact, id]);
        await client.end();
        return new Response(JSON.stringify({ message: "Contact Updated successfully!", success: true}), { status: 200 });
    } catch (error) {
        console.error("Error inserting user:", error);
        return new Response("Failed to insert user", { status: 500 });
    }
};
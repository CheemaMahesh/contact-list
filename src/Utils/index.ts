import { Client } from "pg";


// interface SomeType {
//     client?: Client;
// }

export async function getServerSideProps() {
    const connectionString = "postgresql://neondb_owner:npg_LVyuIhbJ7W1G@ep-patient-tooth-a8yu4w2b-pooler.eastus2.azure.neon.tech/neondb?sslmode=require";
    const client: Client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        return client
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
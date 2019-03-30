import {createConnection, Connection, getConnectionOptions} from "typeorm";

export async function connect(): Promise<Connection>
{
    const connectionOptions = await getConnectionOptions();
    const databaseUrl = process.env.DATABASE_URL;

    if (databaseUrl === undefined || databaseUrl === null) {
        throw new Error("DATABASE_URL environment variable not exists.");
    }

    Object.assign(connectionOptions, {url: databaseUrl});

    return await createConnection(connectionOptions);
}
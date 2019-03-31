import {createConnection, Connection, getConnectionOptions} from "typeorm";

export async function connect(): Promise<Connection>
{
    return await createConnection();
}
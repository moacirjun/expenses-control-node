import {createConnection, Connection} from "typeorm";

export async function connect(): Promise<Connection>
{
    return await createConnection();
}
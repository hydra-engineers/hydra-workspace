import mysql2, { Pool } from "mysql2/promise";

export default class MySQL {

    readonly pool: Pool;

    constructor({ host = "localhost", user = "root", password = "", database = "" }) {
        this.pool = mysql2.createPool({ host, user, password, database })
    }

    async query(query: string, values?: any[]): Promise<[any, any]> {
        const conn = await this.pool.getConnection();
        if (values) query = conn.format(query, values);
        const [ result, fields ] = await conn.query(query);
        conn.release();
        return [ result, fields ];
    }

    async getPlayers(column: string, value: string | number) {
        const [ result ] = await this.query("SELECT * FROM `players` WHERE ?? LIKE ?", [ column, value ]);
        return result;
    }

    async addGuildMember(id: string, name: string, discriminator: string) {
        const [ result ] = await this.query("INSERT INTO `guild_members` (`id`, `name`, `discriminator`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `id` = ?, `name` = ?, `discriminator` = ?", [
            id,
            name,
            discriminator,
            id,
            name,
            discriminator
        ]);
        return result;
    }

}
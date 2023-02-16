import mysql2, { Pool, PoolOptions } from "mysql2/promise";

export default class MySQL {

    readonly pool: Pool;

    constructor(options: PoolOptions = {}) {
        this.pool = mysql2.createPool(options)
    }

    public async query(query: string, values?: any[]): Promise<[any, any]> {
        const conn = await this.pool.getConnection();
        if (values) query = conn.format(query, values);
        const [ result, fields ] = await conn.query(query);
        conn.release();
        return [ result, fields ];
    }

}
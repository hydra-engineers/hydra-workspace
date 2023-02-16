// import node modules
import { EventEmitter } from "node:events";

// import installed modules
import mysql2, { Pool } from "mysql2/promise";

// import local modules
import Config, { ConfigProperties } from "./core/config";
import Cache from "./core/cache";
import Query from "./core/query";

export function time(start: number, end = performance.now()) {
    const raw_time = (end - start) * 100000
    const round_time = Math.floor(raw_time)
    const final_time = round_time / 100000
    return final_time;
}

export default class ArcticEngine extends EventEmitter {

    // configuration of the engine
    private readonly config: Config;

    // storage for the queries that have been made
    private readonly cache: Cache;

    // sql connection
    private readonly pool: Pool;

    constructor(options?: ConfigProperties) {
        super();
        this.config = new Config(options);
        this.cache = new Cache();
        this.pool = mysql2.createPool(this.config.mysql);
    }

    public async query(query: string, values?: any[]): Promise<[any, any]> {
        const conn = await this.pool.getConnection();
        if (values) query = conn.format(query, values);
        const [ result, fields ] = await conn.query(query);
        conn.release();
        return [ result, fields ];
    }

    public async search(type: string, identifier: string): Promise<Query> {
        const start = performance.now()
        const cquery = this.cache.get(type, identifier);
        if (!cquery) {
            const query = new Query(this);
            await query.search(type, identifier);
            this.cache.store(type, identifier, query);
            query.time = time(start);
            return query;
        } else {
            cquery.time = time(start);
            return cquery;
        }
    }

}
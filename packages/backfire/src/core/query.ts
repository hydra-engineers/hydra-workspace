import ArcticEngine from '../index';

export interface QueryData {
    [key: string]: { [key: string]: number };
    server: { [key: string]: number };
    name: { [key: string]: number };
    ip: { [key: string]: number };
    xbl: { [key: string]: number };
    live: { [key: string]: number };
    fivem: { [key: string]: number };
    steam: { [key: string]: number };
    discord: { [key: string]: number };
    license: { [key: string]: number };
    license2: { [key: string]: number };
}

export default class Query {

    time: number = 0;
    count: number = 0;
    data: QueryData = {
        server: {},
        name: {},
        ip: {},
        xbl: {},
        live: {},
        fivem: {},
        steam: {},
        discord: {},
        license: {},
        license2: {}
    }

    constructor(
        private readonly engine: ArcticEngine
    ) {}

    async search(type: string, identifier: string): Promise<QueryData> {
        const q = "SELECT `p`.*, `s`.`name` AS `server` FROM `players` `p` LEFT JOIN `servers` `s` ON `p`.`server_id`=`s`.`id` WHERE `p`.?? LIKE ?";
        const [ results ] = await this.engine.query(q, [ type, `%${identifier}%` ]);
        this.count = results.length;
        while (results.length > 0) {
            const result = results.pop();
            for (const type in result) {
                const identifier = result[type];
                if (!(type === "id" || type === "server_id") && identifier && !(identifier === "none")) {
                    if (!this.data[type][identifier]) this.data[type][identifier] = 1;
                    else this.data[type][identifier]++;
                }
            }
        }
        return this.data;
    }

}
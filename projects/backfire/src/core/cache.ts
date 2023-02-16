import Query from './query';

export default class Cache {

    constructor(
        private queries: Query[] = [],
        private pointers: CachePointers = {
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
    ) {}

    store(type: string, identifier: string, query: Query): void {
        const pointer = this.queries.length;
        this.queries[pointer] = query;
        this.pointers[type][identifier] = pointer;
    }

    get(type: string, identifier: string): Query | false {
        const pointer = this.pointers[type][identifier];
        return this.queries[pointer] || false;
    }

}

export interface CachePointers {
    [key: string]: { [key: string]: number };
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
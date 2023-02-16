import { PoolOptions } from 'mysql2';

export default class Config implements Configuration {

    mysql: PoolOptions = {};
    debug: boolean = false;

    constructor(options: Configuration = {}) {
        this.mysql = options?.mysql || {};
        this.debug = options?.debug || false;
    }

}

export interface Configuration {
    mysql?: PoolOptions;
    debug?: boolean;
}
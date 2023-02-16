import { PoolOptions } from 'mysql2';

export default class Config implements ConfigProperties {

    mysql: PoolOptions = {};
    debug: boolean = false;

    constructor(options?: ConfigProperties) {
        this.mysql = options?.mysql || {};
        this.debug = options?.debug || false;
    }

}

export interface ConfigProperties {
    mysql: PoolOptions;
    debug: boolean;
}
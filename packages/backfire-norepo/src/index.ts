// import node modules
import { EventEmitter } from "node:events";

// import core
import Config, { Configuration } from "./core/config";
import Cache from "./core/cache";
import MySQL from "./core/mysql";

// import utils
import json, { Json } from "./utils/json";
import Progress from "./utils/progress";

export function time(start: number, end = performance.now()) {
    const raw_time = (end - start) * 100000
    const round_time = Math.floor(raw_time)
    const final_time = round_time / 100000
    return final_time;
}

export default class BackFire extends EventEmitter {

    // core
    readonly config: Config;
    readonly cache: Cache;
    readonly mysql: MySQL;

	// utils
	readonly JSON: Json;
	readonly Progress: typeof Progress;

    constructor(options: Configuration = {}) {
		// initialize event emitter
        super();

		// setup core
        this.config = new Config(options);
        this.cache = new Cache();
        this.mysql = new MySQL(this.config.mysql);

		// setup utils
		this.JSON = json;
		this.Progress = Progress;
    }

}
import { setTimeout as wait } from 'node:timers/promises';
import ArcticEngine, { time } from "./index";

const arctic = new ArcticEngine({
    mysql: {
        host: "localhost",
        user: "root",
        password: "A3#iL0d-1Pxd",
        database: "fivem_global_data"
    },
    debug: false
});

(async () => {
    const query1 = await arctic.search("discord", "280423834740588544")
    console.log(`search query took: ${query1.time}ms`)
    await wait(1000)
    const query2 = await arctic.search("discord", "280423834740588544")
    console.log(`search query took: ${query2.time}ms`)
})()
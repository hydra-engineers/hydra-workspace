import { NotNull, KeyValuePair } from '../types/common';

export default class Cache {

    constructor(
        private bucket: NotNull[] = [],
        private pointers: KeyValuePair<number> = {}
    ) {}

    store(key: string, value: NotNull): void {
        const index: number = this.bucket.length;
        this.bucket[index] = value;
        this.pointers[key] = index;
    }

    get(key: string): NotNull {
        const pointer: number = this.pointers[key];
        return this.bucket[pointer] || false;
    }

}

export default class Progress {

    current: number = 0;

    percent: number = 0;
	previous: number = 0;

	time: number = performance.now();

    constructor(
		private readonly end: number = 0,
		private readonly verbose: boolean = false
	) {}

    print() {
        const ps = this.percent.toString();
        const progress = this.percent < 10000 ?
            this.percent < 1000 ?
                this.percent < 100 ?
                    this.percent < 10 ?
                        `00.0${ps[0]}%`
                    : `00.${ps[0]}${ps[1]}%`
                : `0${ps[0]}.${ps[1]}${ps[2]}%`
            : `${ps[0]}${ps[1]}.${ps[2]}${ps[3]}%`
        : `${ps[0]}${ps[1]}${ps[2]}.${ps[3]}${ps[4]}%`;
        const position = `${this.current}/${this.end}`;
        const elapsed = Math.floor((performance.now() - this.time) / 1000);
        console.log(`⏳ progress: ${progress} (pos: ${position} | time: ${elapsed}s)`);
    }

    make() {
        this.current += 1;
        this.percent = Math.floor((this.current / this.end) * 10000);
        if (this.previous < this.percent && this.verbose) {
            this.previous = this.percent;
            this.print()
        }
    }

}
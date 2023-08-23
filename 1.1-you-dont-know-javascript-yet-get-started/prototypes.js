function randMax(max) {
    return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
    symbols: [
        'X', 'Y', 'Z', 'W', '$', '*', '<', '@'
    ],
    spin() {
        if (this.position == null) {
            this.position = randMax(
                this.symbols.length - 1
            );
        }
        this.position = (
            this.position + 1 // + 100 + randMax(100)
        ) % this.symbols.length;
    },
    display() {
        if (this.position == null) {
            this.position = randMax(
                this.symbols.length - 1
            );
        }
        return this.symbols[this.position];
    }
};

var slotMachine = {
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel),
    ],
    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        });
    },
    display() {
        const grid = [[], [], []];
        let gridIndex = 0;

        this.reels.forEach(function displayReel(reel) {
            const symbolsCount = reel.symbols.length;

            const reelAbove = Object.create(reel);
            reelAbove.position = (reel.position + symbolsCount - 1) % symbolsCount;

            const reelBelow = Object.create(reel);
            reelBelow.position = (reel.position + 1) % symbolsCount;

            grid[gridIndex++ % grid.length].push(reelAbove.display());
            grid[gridIndex++ % grid.length].push(reel.display());
            grid[gridIndex++ % grid.length].push(reelBelow.display());
        });

        return grid.map((row) => {
            return row.join(' | ');
        }).join('\n');
    }
}

slotMachine.spin();
console.log(slotMachine.display());

console.log('---------');

slotMachine.spin();
console.log(slotMachine.display());

console.log('---------');

slotMachine.spin();
console.log(slotMachine.display());

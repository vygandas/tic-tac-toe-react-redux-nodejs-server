function* row(size: number) {
    yield new Array(size).fill(0);
}

export const gridGenerator = (size: number) => {
    const grid = [];
    for( let i = 0; i < size; i++ ) {
        grid.push(row(size).next().value);
    }
    return grid;
};

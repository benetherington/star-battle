const fetchLevel = async (levelNumber) => {
    const url = `./levels/${levelNumber}.txt`;
    const resp = await fetch(url);
    return await resp.text();
};

const displayLevel = (txt) => {
    const {regions} = parseLevelTxt(txt);

    regions.forEach(([label, cells], regionIdx) => {
        cells.forEach(([row, col]) => {
            const cell = document.querySelector(
                `.battle-grid-cell[data-row="${row}"][data-col="${col}"]`,
            );
            try {
                cell.dataset.region = regionIdx;
            } catch {
                console.log(label, col, row);
            }
        });
    });
};

const parseLevelTxt = (txt) => {
    const rows = txt
        .split(/[\r\n]/)
        .filter((s) => s)
        .map((r) => r.replaceAll(/\W/g, '').split(''));

    const regionNames = new Set(rows.flat());

    const regions = [...regionNames].map((regionName) => {
        const addresses = rows
            .map((row, colIdx) =>
                row
                    .map((cell, rowIdx) =>
                        cell === regionName ? [colIdx, rowIdx] : null,
                    )
                    .filter((cell) => cell),
            )
            .filter((row) => row.length)
            .flat();
        return [regionName, addresses];
    });

    return {rows, regions};
};

const onCellRollover = (event) => {
    const grid = document.querySelector('.battle-grid');

    // Set row sliders
    const rowIdx = event.target.dataset.row;
    const colIdx = event.target.dataset.col;
    grid.style.setProperty('--slider-row-idx', rowIdx);
    grid.style.setProperty('--slider-col-idx', colIdx);

    // Set region
    const region = event.target.dataset.region;
    grid.dataset.highlightRegion = region;
};

document.addEventListener('DOMContentLoaded', async () => {
    const txt = await fetchLevel(1);
    displayLevel(txt);

    // Add row/column/region highlighter listener
    document
        .querySelectorAll('.battle-grid-cell')
        .forEach((cell) =>
            cell.addEventListener('pointerenter', onCellRollover),
        );
});

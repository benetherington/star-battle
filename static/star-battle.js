const fetchLevel = async (levelNumber) => {
    const url = `./levels/${levelNumber}.txt`;
    const resp = await fetch(url);
    return await resp.text();
};

const displayLevel = (txt) => {
    const {rows, regions} = parseLevelTxt(txt);

    regions.forEach(([label, cells], regionIdx) => {
        cells.forEach(([colIdx, rowIdx]) => {
            const cellIdx = colIdx * 10 + rowIdx + 1;
            const cell = document.querySelector(
                `.grid-cell:nth-child(${cellIdx})`,
            );
            cell.dataset.region = regionIdx;
        });
    });
};

const parseLevelTxt = (txt) => {
    const rows = txt
        .split('\n')
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

document.addEventListener('DOMContentLoaded', async () => {
    for (let idx = 0; idx < 5 * 5 * 4; idx++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        document.querySelector('.battle-grid').append(cell);
    }
    const txt = await fetchLevel(1);
    displayLevel(txt);
});

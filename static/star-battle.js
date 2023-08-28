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
const onCellClick = (event) => {
    // Cycle icon
    if (event.target.classList.contains('has-star')) {
        event.target.classList.remove('has-star');
        event.target.classList.add('has-question');
    } else if (event.target.classList.contains('has-question')) {
        event.target.classList.remove('has-question');
        event.target.classList.add('no-icon');
    } else {
        event.target.classList.remove('no-icon');
        event.target.classList.add('has-star');
    }

    // Reset animation properties
    event.target.style.animation = 'none';
    setTimeout(() => {
        event.target.style.animation = '';
    }, 0);

    // Update progress
    updateStarCount();

    // Check win
    checkRules();
};

const checkRules = () => {
    // Clear errors
    document
        .querySelectorAll('.battle-grid-cell.has-error')
        .forEach((c) => c.classList.remove('has-error'));

    // Check rows
    const rowStars = [...Array(10).keys()].map((rowIdx) => {
        const thisRowCells = document.querySelectorAll(
            `[data-row="${rowIdx}"]`,
        );

        return countStars(thisRowCells);
    });
    const rowsWin = rowStars.every((r) => r === 2);

    // Check columns
    const colStars = [...Array(10).keys()].map((colIdx) => {
        const thiscolCells = document.querySelectorAll(
            `[data-col="${colIdx}"]`,
        );

        return countStars(thiscolCells);
    });
    const colsWin = colStars.every((r) => r === 2);

    // Check regions
    const regionStars = [...Array(10).keys()].map((regionIdx) => {
        const thisregionCells = document.querySelectorAll(
            `[data-region="${regionIdx}"]`,
        );

        return countStars(thisregionCells);
    });
    const regionsWin = regionStars.every((r) => r === 2);

    if (rowsWin && colsWin && regionsWin) throwParty();
};

const throwParty = () => {
    const end = Date.now() + 1000;
    const colors = ['#DED9FF', '#4A6BAC', '#121926', '#244D28', '#88B970'];

    const doFrame = () => {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: {x: 0},
            colors: colors,
            disableForReducedMotion: true,
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: {x: 1},
            colors: colors,
            disableForReducedMotion: true,
        });
        if (Date.now() < end) {
            requestAnimationFrame(doFrame);
        }
    };

    doFrame();
};

const updateStarCount = () => {
    const allCells = document.querySelectorAll('.battle-grid-cell');
    const starCount = countStars(allCells);
    document.getElementById('star-count').innerText = starCount;
};

const countStars = (cells) => {
    const starred = [...cells].filter((c) => c.classList.contains('has-star'));
    if (starred.length > 2) {
        starred.forEach((cell) => cell.classList.add('has-error'));
    }
    return starred.length;
};

document.addEventListener('DOMContentLoaded', async () => {
    const txt = await fetchLevel(1);
    displayLevel(txt);

    // Add row/column/region highlighter listener
    document.querySelectorAll('.battle-grid-cell').forEach((cell) => {
        cell.addEventListener('pointerenter', onCellRollover);
        cell.addEventListener('click', onCellClick);
    });
});

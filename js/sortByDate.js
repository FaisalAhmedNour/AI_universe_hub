function loadData() {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displaySortedAi(data.data.tools));
}

const displaySortedAi = data => {
    const sortedAi = sortAi(data);
    halfDisplay(data);
    const seeAllBtn = document.getElementById('see-all');
    seeAllBtn.classList.add('d-none');
    const sortBtn = document.getElementById('sort-btn');
    sortBtn.classList.add('d-none');
}

const sortAi = data => {
    for (let i = 1; i < data.length; i++) {
        for (let j = 1; j < data.length; j++) {
            if (Date.parse(data[j].published_in) < Date.parse(data[j-1].published_in)){
                [data[j], data[j-1]] = [data[j-1], data[j]];
            }
        }
    }
    return data;
}
const loadAi = (quantity) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayAi(data.data.tools, quantity));
}

const container = document.getElementById('container');
const displayAi = (tools, quantity) => {
    // console.log(tools)
    firstHalf = tools.slice(0, 6);
    if (quantity === 'half') {
        halfDisplay(firstHalf);
    }
    else {
        halfDisplay(tools);
        const seeAllBtn = document.getElementById('see-all');
        seeAllBtn.classList.add('d-none');
    }
}

const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
}

const displayDetails = element => {
    const description = document.getElementById('description');
    description.innerText = element.description;
    const basic = document.getElementById('basic');
    const pro = document.getElementById('pro');
    const enterprise = document.getElementById('enterprise');
    if (element.pricing !== null) {
        basic.innerHTML = `
        ${element.pricing[0].price === '0' ? "Free of cost/" : element.pricing[0].price}
        Basic
        `;
        pro.innerHTML = `
        ${element.pricing[1].price === 0 ? "Free of cost/" : element.pricing[1].price}
        Pro
        `;
        enterprise.innerHTML = `
        ${element.pricing[2].price}
        Enterprise
        `;
    }
    else {
        basic.innerHTML = `
        Free of cost/
        Basic
        `;
        pro.innerHTML = `
        Free of cost/
        Pro
        `;
        enterprise.innerHTML = `
        Free of cost/
        Enterprise
        `;
    }
    const detailFeatures = document.getElementById('detail-features');
    detailFeatures.innerHTML = '';
    if (element.features !== null) {
        for (const feat in element.features) {
            const li = document.createElement('li');
            li.innerText = element.features[feat].feature_name;
            detailFeatures.appendChild(li);
        }
    }
    else {
        detailFeatures.innerText = 'No data Found';
    }
    const integrations = document.getElementById('integrations');
    integrations.innerHTML = '';
    if (element.integrations != null) {
        for (const feat in element.integrations) {
            const li = document.createElement('li');
            li.innerText = element.integrations[feat];
            integrations.appendChild(li);
        }
    }
    else {
        integrations.innerHTML = 'No data Found';
    }
    document.getElementById('detail-image').src = element.image_link[0];
    if (element.input_output_examples !== null) {
        document.getElementById('example-input').innerHTML = `
            <h5><strong>${element.input_output_examples[0].input}</strong></h5>
            <small>${element.input_output_examples[0].output}</small>
        `;
    }
    else {
        document.getElementById('example-input').innerHTML = `
            <h5><strong>Can you give any example?</strong></h5>
            <small>No! Not Yet! Take a break!!!</small>
        `;
    }
    const accuracyBtn = document.getElementById('accuracy-btn');
    let isVisible = false;
    if (element.accuracy.score !== null) {
        document.getElementById('accuracy').innerText = element.accuracy.score;
        accuracyBtn.classList.remove('d-none');
        isVisible = true;
    }
    else {
        if (isVisible !== true) {
            accuracyBtn.classList.add('d-none');
            isVisible = false;
        }
    }
}

const halfDisplay = (half) => {
    container.innerHTML = '';
    for (const tool of half) {
        // console.log(tool.id);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${tool.image}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <ol id="features${tool.id}">
                    </ol>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title fs-5">${tool.name}</h5>
                        <small class="text-muted"><i class="fa-regular fa-calendar-days"></i></small>
                        <small class="text-muted">${tool.published_in}</small>
                    </div>
                    <div>
                        <a onclick="loadDetails('${tool.id}')" href="#details-btn" class="btn text-muted" data-bs-toggle="modal"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
        const features = document.getElementById(`features${tool.id}`);
        for (const item of tool.features) {
            const li = document.createElement('li')
            li.innerText = item;
            features.appendChild(li);
        }
    }
}

loadAi('half');
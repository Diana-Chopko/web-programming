const API_URL = 'http://localhost:3000/api/cars';
let cars = [];

const viewPage = document.getElementById('view-page');
const formPage = document.getElementById('form-page');
const carListContainer = document.getElementById('car-list-container');
const navSearchContainer = document.getElementById('nav-search-container');

const navViewBtn = document.getElementById('nav-view-btn');
const navCreateBtn = document.getElementById('nav-create-btn');

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const sortToggle = document.getElementById('sort-toggle');
const countBtn = document.getElementById('count-btn');
const totalResult = document.getElementById('total-result');

const carForm = document.getElementById('car-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const errorAlert = document.getElementById('error-alert');
const closeAlertBtn = document.querySelector('.close-alert');


async function fetchCars(searchQuery = '', sortOrder = '', isClear = false) {
    try {
        let url = new URL(API_URL);
        if (searchQuery) url.searchParams.append('search', searchQuery);
        if (sortOrder) url.searchParams.append('sort', sortOrder);
        if (isClear) url.searchParams.append('clear', 'true');

        const response = await fetch(url);
        cars = await response.json();
        renderCars(cars);
    } catch (error) {
        console.error("Помилка підключення до сервера:", error);
        carListContainer.innerHTML = '<p style="padding:20px; color:red;">Не вдалося завантажити дані. Перевірте, чи запущено сервер Node.js.</p>';
    }
}

async function createCar(carData) {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    });
    handleSearch();
}

async function updateCar(id, carData) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    });
    handleSearch();
}

window.removeCar = async function(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    handleSearch();
}

fetchCars();

function renderCars(carsToRender) {
    carListContainer.innerHTML = ''; 
    
    if (carsToRender.length === 0) {
        carListContainer.innerHTML = '<p style="padding:20px;">No cars found.</p>';
        return;
    }

    const htmlString = carsToRender.map(car => `
        <div class="card">
            <div class="card-img-placeholder">235x180</div>
            <div class="card-content">
                <h3>${car.brand}</h3>
                <p>Manufactured in ${car.year}. Max speed is ${car.speed} km/h.</p>
                <div class="last-updated">Last updated just now</div>
            </div>
            <div class="card-actions">
                <button class="btn-edit" onclick="editCar(${car.id})">Edit</button>
                <button class="btn-remove" onclick="removeCar(${car.id})">Remove</button>
            </div>
        </div>
    `).join('');

    carListContainer.insertAdjacentHTML('beforeend', htmlString);
}

function handleSearch() {
    const searchText = searchInput.value.toLowerCase().trim();
    const sortOrder = sortToggle.checked ? 'desc' : 'asc';
    fetchCars(searchText, sortOrder);
}

searchBtn.addEventListener('click', handleSearch);
sortToggle.addEventListener('change', handleSearch);

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    sortToggle.checked = false;
    fetchCars('', '', true);
});

countBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/total-speed`);
        const data = await response.json();
        totalResult.textContent = data.totalSpeed;
    } catch (error) {
        console.error("Помилка підрахунку швидкості:", error);
    }
});

navViewBtn.addEventListener('click', () => {
    viewPage.classList.remove('hidden');
    formPage.classList.add('hidden');
    navSearchContainer.classList.remove('hidden');
    navViewBtn.classList.add('active');
    navCreateBtn.classList.remove('active');
    handleSearch();
});

navCreateBtn.addEventListener('click', () => {
    viewPage.classList.add('hidden');
    formPage.classList.remove('hidden');
    navSearchContainer.classList.add('hidden'); 
    navCreateBtn.classList.add('active');
    navViewBtn.classList.remove('active');
    
    formTitle.textContent = 'Create car';
    submitBtn.textContent = 'Submit';
    carForm.reset();
    document.getElementById('car-id').value = '';
    errorAlert.classList.add('hidden');
});

window.editCar = function(id) {
    const carToEdit = cars.find(car => car.id === id);
    if (!carToEdit) return;

    navCreateBtn.click(); 
    
    formTitle.textContent = 'Edit car';
    submitBtn.textContent = 'Edit';

    document.getElementById('car-id').value = carToEdit.id;
    document.getElementById('car-brand').value = carToEdit.brand;
    document.getElementById('car-desc').value = carToEdit.year;
    document.getElementById('car-speed').value = carToEdit.speed;
}

carForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const idInput = document.getElementById('car-id').value;
    const brand = document.getElementById('car-brand').value.trim();
    const year = parseInt(document.getElementById('car-desc').value);
    const speed = parseInt(document.getElementById('car-speed').value);

    if (brand.length < 2 || isNaN(year) || year < 1886) {
        errorAlert.classList.remove('hidden');
        return;
    }

    const carData = { brand, year, speed };

    if (idInput) {
        await updateCar(idInput, carData);
    } else {
        await createCar(carData);
    }

    errorAlert.classList.add('hidden');
    navViewBtn.click(); 
});

closeAlertBtn.addEventListener('click', () => {
    errorAlert.classList.add('hidden');
});
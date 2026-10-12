let cars = [
    { id: 1, brand: 'Audi A4', year: 2017, speed: 210 },
    { id: 2, brand: 'Mazda 3', year: 2015, speed: 195 },
    { id: 3, brand: 'Kia Stonic', year: 2021, speed: 185 },
];

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

renderCars(cars);


function handleSearch() {
    const searchText = searchInput.value.toLowerCase();
    let filteredCars = cars.filter(car => 
        car.brand.toLowerCase().includes(searchText)
    );
    applySortAndRender(filteredCars);
}
searchBtn.addEventListener('click', handleSearch);

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    applySortAndRender(cars);
});


sortToggle.addEventListener('change', () => {
    handleSearch(); 
});

function applySortAndRender(dataArray) {
    let arrayToRender = [...dataArray];
    if (sortToggle.checked) {
        arrayToRender.sort((a, b) => b.speed - a.speed);
    }
    else{
        arrayToRender.sort((a, b) => a.speed - b.speed);
    }
    renderCars(arrayToRender);
}

countBtn.addEventListener('click', () => {
    const totalSpeed = cars.reduce((acc, car) => acc + Number(car.speed), 0);
    totalResult.textContent = totalSpeed;
});

window.removeCar = function(id) {
    cars = cars.filter(car => car.id !== id);
    handleSearch(); 
}

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

carForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const idInput = document.getElementById('car-id').value;
    const brand = document.getElementById('car-brand').value.trim();
    const year = parseInt(document.getElementById('car-desc').value);
    const speed = parseInt(document.getElementById('car-speed').value);

    if (brand.length < 2 || isNaN(year) || year < 1886) {
        errorAlert.classList.remove('hidden');
        return;
    }

    if (idInput) {
        // Update
        const index = cars.findIndex(car => car.id === parseInt(idInput));
        cars[index] = { id: parseInt(idInput), brand, year, speed };
    } else {
        // Create
        const newId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
        cars.push({ id: newId, brand, year, speed });
    }

    errorAlert.classList.add('hidden');
    navViewBtn.click(); 
});

// Close Alert
closeAlertBtn.addEventListener('click', () => {
    errorAlert.classList.add('hidden');
});
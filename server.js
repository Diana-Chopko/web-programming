const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let cars = [
    { id: 1, brand: 'Audi A4', year: 2017, speed: 210 },
    { id: 2, brand: 'Mazda 3', year: 2015, speed: 195 }
];

// READ, SEARCH, SORT
app.get('/api/cars', (req, res) => {
    const { search, sort } = req.query;
    let result = [...cars];

    if (search) {
        result = result.filter(car => car.brand.toLowerCase().includes(search.toLowerCase()));
        console.log(`[SEARCH] Виконано пошук за: "${search}". Знайдено записів: ${result.length}`);
    }

    if (sort === 'desc') {
        result.sort((a, b) => a.speed - b.speed);
        console.log(`[SORT] Список відсортовано за зростанням швидкості`);
    } else if (sort === 'asc') {
        result.sort((a, b) => b.speed - a.speed);
        console.log(`[SORT] Список відсортовано за спаданням швидкості`);
    }

    if (!search && !sort) {
        console.log(`[READ] Отримано запит на список всіх авто. Відправлено записів: ${result.length}`);
    }

    res.json(result);
});

// COUNT
app.get('/api/cars/total-speed', (req, res) => {
    const totalSpeed = cars.reduce((acc, car) => acc + Number(car.speed), 0);
    console.log(`[COUNT] Підраховано загальну швидкість всіх авто: ${totalSpeed} км/год`);
    res.json({ totalSpeed });
});

// CREATE
app.post('/api/cars', (req, res) => {
    const newCar = {
        id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1,
        ...req.body
    };
    cars.push(newCar);
    console.log(`[CREATE] Додано нове авто: ${newCar.brand}`);
    res.status(201).json(newCar);
});

// UPDATE
app.put('/api/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cars.findIndex(c => c.id === id);
    
    if (index !== -1) {
        cars[index] = { id, ...req.body };
        console.log(`[UPDATE] Оновлено дані авто з ID: ${id}`);
        res.json(cars[index]);
    } else {
        res.status(404).json({ message: "Авто не знайдено" });
    }
});

// DELETE
app.delete('/api/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = cars.length;
    cars = cars.filter(c => c.id !== id);
    
    if (cars.length < initialLength) {
        console.log(`[DELETE] Видалено авто з ID: ${id}`);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Авто не знайдено" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Бекенд запущено на http://localhost:${PORT}`);
    console.log(`Очікування CRUD операцій...`);
});
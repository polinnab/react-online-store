const express = require('express');
const http = require('http');
const cors = require('cors');
const { v4 } = require('uuid');
const bodyParser = require('body-parser');
const multer = require('multer');
const sharp = require('sharp');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./upload/`);
  },
  filename: (req, file, cb) => {
    const index = file.originalname.lastIndexOf('.');
    const resolution = file.originalname.substring(index);
    cb(null, v4() + resolution);
  },
});
const upload = multer({ storage });
const type = upload.array('images');
const path = require('path');
const app = express();
const fs = require('fs');
const brandsFile = './database/categories/brands.json';
const typesFile = './database/categories/types.json';
const colorsFile = './database/categories/colors.json';
const productsFile = './database/products/products.json';
const usersFile = './database/users/users.json';
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5001;
let brands = JSON.parse(fs.readFileSync(brandsFile));
let types = JSON.parse(fs.readFileSync(typesFile));
let colors = JSON.parse(fs.readFileSync(colorsFile));
let users = JSON.parse(fs.readFileSync(usersFile));
let products = JSON.parse(fs.readFileSync(productsFile));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
app.use('/upload', express.static('./upload'));

// GET

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/api/product', (req, res) => {
  const id = req.query.id;
  const product = products.filter((elem) => elem.id === id);
  res.status(200).json(...product);
});

app.get('/api/filter', (req, res) => {
  const filter = req.query;
  const filtredProducts = [];

  for (const elem in filter) {
    const categoryField = elem.substring(0, elem.length - 1) + 'Id';

    const product = products.filter((item) => item[categoryField] === filter[elem]);

    filtredProducts.push(...product);
  }

  const clearArray = filtredProducts.reduce((unique, o) => {
    if (!unique.some((obj) => obj.id === o.id)) {
      unique.push(o);
    }
    return unique;
  }, []);
  res.status(200).json(clearArray);
});

app.get('/api/categories', (req, res) => {
  const cat = { types, brands, colors };
  res.status(200).json(cat);
});

app.get('/api/types', (req, res) => {
  res.status(200).json(types);
});

app.get('/api/brands', (req, res) => {
  res.status(200).json(brands);
});

app.get('/api/colors', (req, res) => {
  res.status(200).json(colors);
});

// POST

app.post('/api/types', (req, res) => {
  const type = { id: v4(), ...req.body };
  types.push(type);
  fs.writeFileSync(typesFile, JSON.stringify(types));
  res.status(201).json(type);
});

app.post('/api/brands', (req, res) => {
  const brand = { id: v4(), ...req.body };
  brands.push(brand);
  fs.writeFileSync(brandsFile, JSON.stringify(brands));
  res.status(201).json(brand);
});

app.post('/api/colors', (req, res) => {
  const color = { id: v4(), ...req.body };
  colors.push(color);
  fs.writeFileSync(colorsFile, JSON.stringify(colors));
  res.status(201).json(color);
});

app.post('/api/products', (req, res) => {
  const product = { ...req.body.product, id: v4() };
  products.push(product);
  fs.writeFileSync(productsFile, JSON.stringify(products));
  res.status(201).json(product);
});

app.post('/api/image', type, (req, res) => {
  const files = req.files.map((elem) => {
    const thumbnail = 'thumbnail-' + elem.filename;
    sharp(elem.path)
      .resize(200, 200)
      .toFile('upload/' + thumbnail);
    return {
      original: elem.filename,
      thumbnail,
    };
  });
  res.status(201).json(files);
});

// DELETE

app.delete('/api/products', (req, res) => {
  products = products.filter((product) => product.id !== req.body.id);
  fs.writeFileSync(productsFile, JSON.stringify(products));
  res.status(200).json({ massage: 'Товар был удален' });
});

app.delete('/api/types', (req, res) => {
  types = types.filter((elem) => elem.id !== req.body.id);
  fs.writeFileSync(typesFile, JSON.stringify(types));
  res.status(200).json({ massage: 'Тип был удален' });
});

app.delete('/api/brands', (req, res) => {
  brands = brands.filter((elem) => elem.id !== req.body.id);
  fs.writeFileSync(brandsFile, JSON.stringify(brands));
  res.status(200).json({ massage: 'Бренд был удален' });
});

app.delete('/api/colors', (req, res) => {
  colors = colors.filter((elem) => elem.id !== req.body.id);
  fs.writeFileSync(colorsFile, JSON.stringify(colors));
  res.status(200).json({ massage: 'Цвет был удален' });
});

// PUT

app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex((product) => product.id === req.params.id);
  products[index] = req.body;
  fs.writeFileSync(productsFile, JSON.stringify(products));
  res.status(200).json(products);
});

// app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

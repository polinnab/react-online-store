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
const socFile = './database/soc.json';
const ordersFile = './database/users/orders.json';
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5001;
let brands = JSON.parse(fs.readFileSync(brandsFile));
let types = JSON.parse(fs.readFileSync(typesFile));
let colors = JSON.parse(fs.readFileSync(colorsFile));
let users = JSON.parse(fs.readFileSync(usersFile));
let socList = JSON.parse(fs.readFileSync(socFile));
let products = JSON.parse(fs.readFileSync(productsFile));
let orders = JSON.parse(fs.readFileSync(ordersFile));
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

function pagination(data, page, limit) {
  if (page === 'NaN' && limit === 'NaN') {
    return {
      products: data,
      totalCount: data.length,
    };
  }
  const offset = page * limit - limit;
  const products = data.slice(offset, offset + limit);
  return {
    products,
    totalCount: data.length,
  };
}

// GET

app.get('/api/products', (req, res) => {
  const { page, limit } = req.query;
  res.status(200).json(pagination(products, page, limit));
});

app.get('/api/product', (req, res) => {
  const id = req.query.id;
  const product = products.filter((elem) => elem.id === id);
  res.status(200).json(...product);
});

app.get('/api/filter', (req, res) => {
  const filter = req.query;
  const { page, limit } = filter;
  delete filter.page;
  delete filter.limit;
  const allProducts = {};
  const checkEmpty = Object.keys(filter).length;

  if (checkEmpty) {
    for (const elem in filter) {
      const categoryField = elem.substring(0, elem.length - 1) + 'Id';
      const product = filter[elem]?.split(',').map((item) => products.filter((elem) => elem[categoryField] === item));
      allProducts[elem] = product.flat();
    }

    const productCat = Object.keys(allProducts)[0];
    const catCount = Object.keys(allProducts).length;

    const filtredProducts = allProducts[productCat]?.filter((elem) => {
      const id = elem.id;
      let count = 0;

      for (const item in allProducts) {
        allProducts[item].forEach((elem) => {
          if (elem.id === id) {
            count++;
          }
        });
      }

      if (count === catCount) {
        return elem;
      }
    });

    res.status(200).json(pagination(filtredProducts, page, limit));
  } else {
    res.status(200).json(pagination(products, page, limit));
  }
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

app.get('/api/cart', (req, res) => {
  let cart = [];
  products.map((product) => {
    const prod = users[0].cart.find((item) => item.id === product.id);
    if (prod) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        image: product.images[0].thumbnail,
        price: product.price,
        count: prod.count,
      };
      cart.push(cartProduct);
    }
  });
  res.status(200).json(cart);
});

app.get('/api/soc', (req, res) => {
  res.status(200).json(socList);
});

app.get('/api/user', (req, res) => {
  const id = req.query.id;
  const user = users.filter((elem) => elem.id === id);
  delete user.password;
  res.status(200).json(...user);
});

app.get('/api/orders', (req, res) => {
  const id = req.query.id;
  const order = orders.filter((elem) => elem.userId === Number(id));
  res.status(200).json(order);
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

app.post('/api/cart/:id', (req, res) => {
  const product = users[0].cart.find((item) => item.id === req.params.id);

  if (users[0].cart.length >= 1 && product) {
    product.count = product.count + 1;
  } else {
    const product = {
      id: req.params.id,
      count: 1,
    };
    users[0].cart.push(product);
  }

  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.status(201).json(users[0].cart);
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

app.delete('/api/cart', (req, res) => {
  users[0].cart = [];
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.status(200).json({ message: 'The cart is empty' });
});

app.delete('/api/cart/:id', (req, res) => {
  const newCart = users[0].cart.filter((item) => item.id !== req.params.id);
  users[0].cart = newCart;
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.status(200).json({ message: 'Product deleted' });
});

// PUT

app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex((product) => product.id === req.params.id);
  products[index] = req.body;
  fs.writeFileSync(productsFile, JSON.stringify(products));
  res.status(200).json(products);
});

app.put('/api/cart/:id', (req, res) => {
  const index = users[0].cart.findIndex((item) => item.id === req.params.id);
  users[0].cart[index].count = req.body.count;
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.status(200).json({ message: 'Product count has changed' });
});

app.put('/api/user/:id', (req, res) => {
  const index = users.findIndex((user) => user.id === req.params.id);
  for (const key in req.body) {
    users[index][key] = req.body[key];
  }
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.status(200).json(users[index]);
});

app.put('/api/order/:id', (req, res) => {
  const index = orders.findIndex((order) => order.id === Number(req.params.id));
  orders[index] = req.body;
  fs.writeFileSync(ordersFile, JSON.stringify(orders));
  res.status(200).json(orders);
});

// app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

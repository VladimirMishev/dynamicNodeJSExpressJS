const path = require('path');

const exspress = require('express');

const defaultRouter = require('./util/default');
const restaurantRouter = require('./util/restaurants');

const app = exspress();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(exspress.static('public'));
app.use(exspress.urlencoded({extended:false}));

app.use('/', defaultRouter);

app.use('/', restaurantRouter);

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/', function(req, res) {
    res.status(404).render('404');
});

app.use(function(error, req, res, next) {
    res.status(500).render('500');
});


app.listen(3000);
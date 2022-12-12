const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const express = require('express');

const functions = require('./functions');

const router = express.Router();


router.get('/recommend', function(req, res) {
    res.render('recommend');
});

router.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const restaurantsArray = functions.getFileData();
    restaurantsArray.push(restaurant);
    functions.addNewList(restaurantsArray);

    res.redirect('confirm');
});

router.get('/restaurants', function(req, res) {
    const restaurantsArray = functions.getFileData(); 
    let orderValue = 'desc';

    const queryValue = req.query.order;
    if(queryValue === 'desc') {
        restaurantsArray.sort(function(resA, resB) {
            if(resB.name > resA.name) {
                return 1
            }

            return -1
        });
        orderValue = 'asc';
    }
    if(queryValue === 'asc') {
        restaurantsArray.sort(function(resA, resB) {
            if(resB.name < resA.name) {
                return 1
            }

            return -1
        });
        orderValue = 'desc';
    }
    
    res.render('restaurants', {restaurantsArray: restaurantsArray, orderValue: orderValue});
});

router.get('/restaurants/:id', function(req, res) {
    const restaurantID = req.params.id;

    const restaurantsArray = functions.getFileData();
    
    for(const restaurant of restaurantsArray) {
        if(restaurant.id === restaurantID) {
            return res.render('restaurant', {restaurant: restaurant});
        }
    }

    res.status(404).render('404');
})

module.exports = router;

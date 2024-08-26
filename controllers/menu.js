const { menuModel } = require('../models/menu');


const menu = {
    getDrink: async function (res) {
        try {
            const drink = await menuModel.find({type: 'drink'});
            
            res.status(200).send(drink);
        } catch (error) {
            res.status(200).send({ message: 'An error occurred while fetching the tables', error: true })
        }
    },
    getFood: async function (res) {
        try {
            const food = await menuModel.find({ type: 'food' });
            res.status(200).send(food);
        } catch (error) {
            console.log(error);
            res.status(200).send({ message: 'An error occurred while fetching the menu', error: true })
        }
    },
    getFood: async function (res) {
        try {
            const food = await menuModel.find({ type: 'food' });
            res.status(200).send(food);
        } catch (error) {
            console.log(error);
            res.status(200).send({ message: 'An error occurred while fetching the menu', error: true })
        }
    },
    getAll: async function (res) {
        try {
            const food = await menuModel.find();
            res.status(200).send(food);
        } catch (error) {
            console.log(error);
            res.status(200).send({ message: 'An error occurred while fetching the menu', error: true })
        }
    },
}


module.exports = { menu }
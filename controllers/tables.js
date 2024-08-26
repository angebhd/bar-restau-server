const { tableModel } = require('../models/tables');




const tables = {
    getTables: async function (req, res) {
        try {
            const tables = await tableModel.find({});
            res.status(200).send(tables);
            
        } catch (error) {
            console.log(error);
            res.status(401).send('An error occurred while fetching the tables')
        }
    }
}


module.exports = { tables }
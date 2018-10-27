const express = require('express');
const router  = express.Router();
const Food = require('../models/food');
var CloudStorage = require("gcs-signed-urls")("./ironhack-220714-fd061baf3535.pem", "server@ironhack-220714.iam.gserviceaccount.com", "ironnutrition")

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/upload_url', (req, res, next)=> {
	var fields = CloudStorage.uploadRequest("example.txt", "ok"+Date.now()+"file");
	console.log(fields);
	res.json(fields);
})

router.get('/foods', (req, res, next) => {
	console.log('liste')
	Food.find()
	.then(foods => {
		console.log('list foods :', foods)
	  res.json({list_food: foods});
	})
	.catch(err => {
		console.log(err)
		res.json({message: 'une erreur est survenue'})
	})
});

router.post('/foods', (req, res, next) => {
	let {name,calories,image,quantity} = req.body;
	let food= new Food({name,calories,image,quantity})
	food.save()
	.then(response => {
		res.json({message: 'ok'})
	})
});

module.exports = router;

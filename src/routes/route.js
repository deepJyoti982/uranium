const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get('/cowin/getDistrictById', CowinController.getDistrictById)
router.get('/weather/city', CowinController.getSortdCityTemp)
router.post('/Create/memes', CowinController.getMeme)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;
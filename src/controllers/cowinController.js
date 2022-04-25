let axios = require("axios");


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


const getDistrictById = async function(req,res) {
    try {

        let distId = req.query.districtId
        let date = req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${distId}&date=${date}`
        }
        let result = await axios(options)
        res.status( 200 ).send({data: result.data})
    }
    catch(error) {
        res.status( 500 ).send({msg: error.message})
    }

}


const getSortdCityTemp = async function (req , res) {
    try {
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let api_id = req.query.appid
        let cityObjArray = []
        for(let i = 0; i < cities.length; i++) {
            
            let obj = {city: cities[i]}
            var options = {
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${api_id}`
            
            }
            let result = await axios(options)
            obj.temp = result.data.main.temp //{city:"London", temp: 280}
            cityObjArray.push(obj)
        }
       cityObjArray.sort( function(a,b) {return a.temp - b.temp} )
       res.status( 200 ).send({status: true, data: cityObjArray})

    }
    catch (error) {
        res.status(500).send({msg: error.message})
    }
}


const getMeme = async function(req,res) {
    try {

        let template = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.query.username
        let password = req.query.password
        console.log(template)
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result = await axios(options)
        res.status( 200 ).send({data: result.data})
    }
    catch(error) {
        res.status( 500 ).send({msg: error.message})
    }

}



module.exports = {
    getStates,
    getDistricts,
    getByPin,
    getOtp,
    getSortdCityTemp,
    getDistrictById,
    getMeme
} 

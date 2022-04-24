const validateHeader = function ( req, res, next) {
    let headers = req.headers
    let appType = headers['isFreeAppUser']
    if(!appType) {
        appType = headers['isfreeappuser']
    }
    if(!appType) {
        return res.send({status: false, msg: "A mandatory header is missing"})
    }
    
    if(appType == 'true') {
        req.appTypeFree = true
    }
    // else {
    //     req.appTypeFree = false
    // }
    next()
}

module.exports = {validateHeader}
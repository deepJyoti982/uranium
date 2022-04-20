const basicode = async function(req,res) {
    let tokenData = req.headers.token
    console.log(tokenData)

    console.log("Header data above")
    res.send("hey , congrats you have reached to the handler")
}
module.exports = {
    basicode   
}
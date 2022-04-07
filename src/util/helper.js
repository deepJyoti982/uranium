let printDate = function () {
     let currentDate = new Date;
     console.log(currentDate.getDate())

} 
let printMonth = function () {
    let currentMonth = new Date;
    console.log(currentMonth.getMonth())
}
let getBatchInfo = function() {
    console.log('Thorium, W3D1, the topic for today is Nodejs module system')
} 
module.exports.date = printDate
module.exports.month = printMonth
module.exports.info = getBatchInfo
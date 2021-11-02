// Your code here
const createEmployeeRecord = (recArray) => {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

const createTimeInEvent = function(rec, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    rec.timeInEvents.push(inEvent)
    
    return rec
}

const createTimeOutEvent = function (rec, dateStamp){
    const arrFromDate = dateStamp.split(" ")
    const date = arrFromDate[0]
    const hour = arrFromDate[1]
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    rec.timeOutEvents.push(outEvent)

    return rec
}

const hoursWorkedOnDate = function(rec, targetDate){
    const inEvent = rec.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = rec.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour)/100
}

const wagesEarnedOnDate = function(rec, targetDate){
    return hoursWorkedOnDate(rec, targetDate) * rec.payPerHour
}

const allWagesFor = function (rec) {
    const eligibleDates = rec.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d){
        return memo + wagesEarnedOnDate(rec, d)
    }.bind(rec), 0)
    return payable
}

const findEmployeeByFirstName = function (srcArray, firstName){
    return srcArray.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function(recsArray){
    return recsArray.reduce((total, rec) => {
        return total + allWagesFor(rec)
    }, 0)
}
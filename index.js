// Create a single employee record and return the new employee record object
function createEmployeeRecord(array){
    // Create empty employee object
    let employeeObj = {}
    // Set the first name in employeeObj 
    employeeObj["firstName"] = array[0]
    // Set last name
    employeeObj["familyName"] = array[1]
    // Set title 
    employeeObj["title"] = array[2]
    // Set perPerHour
    employeeObj["payPerHour"] = array[3]
    // Set timeInEvents 
    employeeObj["timeInEvents"] = []
     // Set timeOutEvents 
    employeeObj["timeOutEvents"] = []
    // return employeeObj 
    return employeeObj
}

// Create multiple employee records
function createEmployeeRecords(array){
    // Create empty employees array
    let employeesArray = []
    // Loop through array 
    for(let i = 0; i < array.length; i++){
        // for each item in array create a new employee object 
        const newEmployeeObj = createEmployeeRecord(array[i])
        // add this new employee object to employeesArray
        employeesArray.push(newEmployeeObj)
    }
    // return employeesArray 
    return employeesArray
}

// createTimeInEvent
//         1) creates the correct type
//         2) extracts the correct date
//         3) extracts the correct hour

function createTimeInEvent(datePassed){
    let [extractedDate, hour] = datePassed.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: extractedDate,
    })
    
    return this;
}

function createTimeOutEvent(datePassed){
    
    let [extractedDate, hour] = datePassed.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: extractedDate,
    })
    
    return this;
}

function hoursWorkedOnDate(datePassed){
    let inDate = this.timeInEvents.find((event)=> {
        return event.date == datePassed;
    })

    let outDate = this.timeOutEvents.find((event) => {
        return event.date == datePassed;
    })

    let workedHours = (outDate.hour - inDate.hour) / 100;

    return workedHours;
}

function wagesEarnedOnDate(datePassed){
    const dailyWage = hoursWorkedOnDate.call(this, datePassed) * this.payPerHour 
    //we have to put this before datePassed, not the other way around or else it loses everything
    return dailyWage;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRecords){
    let total = 0;
    for(let i = 0; i < employeeRecords.length; i++){
        const record = employeeRecords[i]
        total += allWagesFor.call(record);
        //.call can call on a function with a parameter 
    }
    return total;
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(collection => collection.firstName === firstName)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */




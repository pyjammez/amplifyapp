/*
Contents:

function orderArrayByObjectKey(array, orderKey, orderDirection) {
function groupArrayByObjectKey(array, groupKey) {
function createObjectWithDateKeyNameKeyAndArray(itemsFromAPI) {
function sortExercisesByDateNameRepTime(itemsFromAPI) {
function createObjectWithDateKeyAndArray(itemsFromAPI) {
*/

function orderArrayByObjectKey(array, orderKey, orderDirection) {
    if (!array) {
        console.log("array empty");
        return [];
    }

    var newArray = [];

    array.forEach(function (object) {
        if (!object.hasOwnProperty(orderKey) || !object[orderKey]) {
            console.log("key: " + orderKey + " undefined", object);
            return;
        }

        var orderValue = object[orderKey];
        var firstChar = orderValue.charAt(0);

        // could be string or number. if number, remove all non numeric chars
        if (!isNaN(firstChar)) {
            orderValue = orderValue.replace(/\D/g,'')
        }

        newArray.push([orderValue, object]);
    });

    var sortFn;
    if (orderDirection === "desc") {
        sortFn = function(a, b) {return b[0] - a[0];}
    } else {
        sortFn = function(a, b) {return a[0] - b[0];}
    }

    newArray.sort(sortFn);

    return newArray.map(function(a) {return a[1];});
}

function groupArrayByObjectKey(array, groupKey) {
    var groupObject = {};
    if (!array) {
        console.log("array empty");
        return groupObject;
    }

    array.forEach(function(object) {
        if (!object.hasOwnProperty(groupKey)) {
            console.log("key: " + groupKey + " undefined", object);
            return;
        }

        var groupValue = object[groupKey];

        if (typeof groupObject[groupValue] === "undefined") {
            groupObject[groupValue] = [];
        }

        groupObject[groupValue].push(object);
    });

    return groupObject;
}

function createObjectWithDateKeyNameKeyAndArray(itemsFromAPI) {
    // we want to list these by date, then by exercise, then by reps.
    // sort this list into date: exercise: [reps,date]
    // we want the sets performed on each day to be from first to last,
 
    var sets = {};

    itemsFromAPI.forEach(function (arrayItem) {
        let date = arrayItem['datetime'].slice(0,10);
        let name = arrayItem['name'];

        if (typeof sets[date] === "undefined") sets[date] = {};
        if (typeof sets[date][name] === "undefined") sets[date][name] = [];

        sets[date][name].push(arrayItem);
    });

    return sets;
}

function createObjectWithDateKeyAndArray(itemsFromAPI) {
    var obj = {};

    itemsFromAPI.forEach(function (arrayItem) {
        let date = arrayItem['datetime'].slice(0,10);
        if (typeof obj[date] === "undefined") obj[date] = [];
        obj[date].push(arrayItem);
    });

    return obj;
}

function createObjectWithNameKeyAndArray(itemsFromAPI) {
    var obj = {};

    itemsFromAPI.forEach(function (arrayItem) {
        let name = arrayItem['name'];
        if (typeof obj[name] === "undefined") obj[name] = [];
        obj[name].push(arrayItem);
    });

    return obj;
}

/** DO I NEED THIS STILL??? **/
function sortExercisesByDateNameRepTime(itemsFromAPI) {
    itemsFromAPI = orderArrayByObjectKey(itemsFromAPI, 'datetime', 'asc');
    var objectWithDateKey = createObjectWithDateKeyNameKeyAndArray(itemsFromAPI);

    // We want the exercises performed on that day to be from first to last based on
    // the first set's time so if we started the workout with pushups, but finished up
    // with a final set of pushups, pushups will still be at the top because we did them first.
    itemsFromAPI = Object.keys(objectWithDateKey).map(date => {
        /*
         * Object of exercises and sets on that day
         *
         * {
         *   pushups: [1,2,3,4],
         *   squats: [1,2,3],
         *   pullups: [1,2]
         * }
         */
        var objectWithNameAsKey = objectWithDateKey[date];

        var arrayOfObjects = Object.keys(objectWithNameAsKey).map(name => {
            return {
                datetime: objectWithNameAsKey[name][0]['datetime'], // first exericse in set
                name: name,
                sets: objectWithNameAsKey[name]
            }
        });
        
        return {
            date: date,
            exercises: orderArrayByObjectKey(arrayOfObjects, 'datetime', 'asc')
        }
    });

    return SortingHelper.orderArrayByObjectKey(itemsFromAPI, 'date', 'desc');
}

const SortingHelper = {
    orderArrayByObjectKey,
    groupArrayByObjectKey,
    createObjectWithDateKeyNameKeyAndArray,
    createObjectWithDateKeyAndArray,
    createObjectWithNameKeyAndArray,
    sortExercisesByDateNameRepTime,
};
export default SortingHelper;

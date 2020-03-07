           

/**
 * Get athlete list
 * @param {function} callback  function to be called when server responds to request
 */
function fetchAthletes(callback) {
    const endpoint = 'http://exercises.share-your-code.me/athletes';
    fetch(endpoint).then((response) => {
        return response.json();
    }).then((data) => {
        callback.apply({}, [data]);
    });

    // setTimeout(function() {fetchAthletes(callback());}, 5000); 
    // setTimeout(function() {console.log("object");}, 1000); 
    setTime(function () {
        fetchAthletes()
    } );
    
}

function setTime(callback){
    setTimeout(function() {
        callback();
        console.log("object");
        setTime(callback);
    }, 1000)   
}



fetchAthletes(function (data) {
//    escolher a primeira mulher
//    let result = [];
//    for (let athlete of data) {
//        if (athlete.gender === 'F') {
//            result.push(athlete);
//            break;
//        }
//    }

//     Seleccionar atletas séniores
//     let result = [];
//     for (let athlete of data) {
//         let birthdate = new Date(athlete.birthdate);
//         let athleteCategory = category(age(birthdate));
//         if (athlete.gender === 'F' || athleteCategory !== 'Sénior') continue;
//         result.push(athlete);
//     }

    let result = [];
    for (let a of data) {
        result.push(new Athlete(a._id, a.name, a.boat, a.country, a.gender
            , a.weight, a.height, a.picture, new Date(a.birthdate), a.events, new Date(a.lastSessionAt)));
    }
    renderAthletes(result);
});


/**
 *
 * @param {Array<Athlete>} athletes
 */
function renderAthletes(athletes) {
    let html = '';
    for (let athlete of athletes) {
        html += renderAthlete(athlete);
    }
    document.getElementById('ams').innerHTML += html;
}

/**
 *
 * @param {Athlete} athlete
 * @return {string}
 */
function renderAthlete(athlete) {
    let athleteCategory = athlete.category();
    return `
    <div class="athlete-row">
        <div class="athlete-name ${athleteCategory === 'Infantil' || athleteCategory === 'Veterano' ? 'athlete-red' : ''}">
            <img src="${athlete.getPicture()}" alt="Avatar" class="avatar">${athlete.getName()}
        </div>
        <div>${formatDate(athlete.getBirthdate())}</div>
        <div>${athlete.getWeight()}</div>
        <div>${athlete.getHeight()}</div>
        <div>${formatDate(athlete.getLastSessionAt())}</div>
        <div>${athlete.isMale() ? 'Male': 'Female'}</div>
        <div>${athleteCategory}</div>
    </div>
    `
}


function formatDate(date) {
    return date.getFullYear() + '-'
        + ((date.getMonth() + 1) + "").padStart(2, '0') + '-'
        + (date.getDate() + "").padStart(2, '0');
}

function age(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return ageDate.getUTCFullYear() - 1970;
}

function category(age) {
    let category;
    switch (true) {
        case age < 14:
            category = 'Infantil';
            break;
        case age <= 15:
            category = 'Cadete';
            break;
        case age <= 17:
            category = 'Junior';
            break;
        case age <= 35:
            category = 'Sénior';
            break;
        default:
            category = 'Veterano';
    }
    return category;
}

/**
 *
 * @param id
 * @param name
 * @param boat
 * @param country
 * @param gender
 * @param weight
 * @param height
 * @param picture
 * @param birthdate
 * @param events
 * @param lastSessionAt
 * @constructor
 */
function Athlete(id, name, boat, country, gender, weight, height, picture, birthdate, events, lastSessionAt) {
    this._id = id;
    this._name = name;
    this._boat = boat;
    this._country = country;
    this._gender = gender;
    this._weight = weight;
    this._height = height;
    this._picture = picture;
    this._birthdate = birthdate;
    this._events = events;
    this._lastSessionAt = lastSessionAt;
    if (gender !== "M" && gender !== "F") throw 'unknown gender';
    this._gender = gender;
    if (!(this._birthdate instanceof Date)) throw 'birthdate should be an instance of Date'
    if (!(this._lastSessionAt instanceof Date)) throw 'lastSessionAt should be an instance of Date'
}

/**
 * Returns athlete category, calculated using his age;
 * @return {String} Category
 */
Athlete.prototype.category = function () {
    const age = this.age();
    let category;
    switch (true) {
        case age < 14:
            category = 'Infantil';
            break;
        case age <= 15:
            category = 'Cadete';
            break;
        case age <= 17:
            category = 'Junior';
            break;
        case age <= 35:
            category = 'Sénior';
            break;
        default:
            category = 'Veterano';
    }
    return category;
};

/**
 * Returns athlete age
 */
Athlete.prototype.age = function () {
    let ageDifMs = Date.now() - this.getBirthdate().getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return ageDate.getUTCFullYear() - 1970;
};

Athlete.prototype.setId = function (id) {
    this._id = id;
};
Athlete.prototype.getId = function () {
    return this._id;
};
Athlete.prototype.setName = function (name) {
    this._name = name;
};
Athlete.prototype.getName = function () {
    return this._name;
};
Athlete.prototype.setBoat = function (boat) {
    this._boat = boat;
};
Athlete.prototype.getBoat = function () {
    return this._boat;
};
Athlete.prototype.setCountry = function (country) {
    this._country = country;
};
Athlete.prototype.getCountry = function () {
    return this._country;
};
Athlete.prototype.setGender = function (gender) {
    this._gender = gender;
};
Athlete.prototype.getGender = function () {
    return this._gender;
};
Athlete.prototype.setWeight = function (weight) {
    this._weight = weight;
};
Athlete.prototype.getWeight = function () {
    return this._weight;
};
Athlete.prototype.setHeight = function (height) {
    this._height = height;
};
Athlete.prototype.getHeight = function () {
    return this._height;
};
Athlete.prototype.setPicture = function (picture) {
    this._picture = picture;
};
Athlete.prototype.getPicture = function () {
    return this._picture;
};
Athlete.prototype.setBirthdate = function (birthdate) {
    this._birthdate = birthdate;
};
Athlete.prototype.getBirthdate = function () {
    return this._birthdate;
};
Athlete.prototype.setEvents = function (events) {
    this._events = events;
};
Athlete.prototype.getEvents = function () {
    return this._events;
};
Athlete.prototype.setLastSessionAt = function (lastSessionAt) {
    this._lastSessionAt = lastSessionAt;
};
Athlete.prototype.getLastSessionAt = function () {
    return this._lastSessionAt;
};
Athlete.prototype.isMale = function () {
    return this._gender === 'M'
};

Athlete.prototype.isFemale = function () {
    return this._gender === 'F'
};
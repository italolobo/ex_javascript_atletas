function fetchAthletes(callback) {
    const endpoint = "https://exercises.share-your-code.me/athletes";
    fetch(endpoint)
        .then(response => {
            return response.json();
        })
        .then(data => {
            callback.apply({}, [data]);
        });
}

function template(pic, name, bir, wei, hei, cat, las, gen, red) {
    t = `
<div class="athlete-row">
<div>
    <img class="pic" src="${pic}" alt="pic">
    <div class="athlete-name">${name}</div>
    </div>
    <div class="athlete-birthdate">${bir}</div>
    <div>${wei}</div>
    <div>${hei}</div>
    <div class="${red}">${cat}</div>
    <div>${las}</div>
    <div class="athlete-gender">${gen}</div>
</div>
`;
    return t;
}

let atletas = fetchAthletes(function(list) {
    renderAthletesList(list);
});

function Athlete(
    id,
    name,
    boat,
    country,
    gender,
    weight,
    height,
    picture,
    birthdate,
    events,
    lastSessionAt,
    category
) {
    this._id = id;
    this._name = name;
    this._boat = boat;
    this._country = country;
    this._gender = gender;
    this._weight = weight;
    this._height = height;
    this._picture = picture;
    this._birthdate = new Date(birthdate).toLocaleDateString("default", {
                date: "numeric"});
    this._events = events;
    this._lastSessionAt = lastSessionAt;
    if (gender !== "M" && gender !== "F") throw "unknown gender";
    this._gender = gender;
    if (!(new Date (birthdate) instanceof Date))
        throw "birthdate should be an instance of Date";
}

function renderAthletesList(list) {
    let rowList = "";
    let result = [];
    for (const a of list) {
        result.push(new Athlete(
                a._id,
                a.name,
                a.boat,
                a.country,
                a.gender,
                a.weight,
                a.height,
                a.picture,
                a.birthdate,
                a.events,
                a.lastSessionAt,
                a.category                
            )
        );

        
        // for (let i of list) {
        //     let pic = i.picture;
        //     let name = String(i.name);
        //     let bir = new Date(i.birthdate).toLocaleDateString("default", {
        //         date: "numeric"
        //     });
        //     let wei = Number(i.weight).toFixed(1);
        //     let hei = Number(i.height).toFixed(2);
        //     let las = new Date(i.lastSessionAt).toLocaleDateString("default", {
        //         date: "numeric"
        //     });
        //     let gen = gender(i.gender);
        //     let age = idade(new Date(i.birthdate), new Date());
        //     let cat = category(idade(new Date(i.birthdate), new Date()));

        //     if (cat != "Sénior") continue;
        //     if (gen == "male") continue;
        
        rowList += template(a.picture, a.name, a.birthdate, a.weight, a.height, "cat", 
        a.lastSessionAt, a.gender, red("cat"));
        // if (gen == "female") break;
        // }
        // document.getElementsByClassName("rows")[0].innerHTML = rowList;
        console.log(rowList);
    }
    document.getElementsByClassName("rows")[0].innerHTML = rowList;

    render
}

function gender(gender) {
    return gender == "M" ? "male" : "female";
}

function red(category) {
    return category == "infantil" ? "athlete-red" : "athlete";
}

function category(age) {
    let cat = "";
    switch (true) {
        case age < 14:
            cat = "infantil";
            break;
        case age <= 15:
            cat = "Cadete";
            break;
        case age <= 17:
            cat = "Junior";
            break;
        case age <= 35:
            cat = "Sénior";
            break;
        default:
            cat = "Veterano";
            break;
    }
    return cat;
}

function idade(nascimento, hoje) {
    var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
    if (
        new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(
            hoje.getFullYear(),
            nascimento.getMonth(),
            nascimento.getDate()
        )
    )
        diferencaAnos--;
    return diferencaAnos;
}

// class atleta{

//     constructor(){}

//     constructor(nome, idade):this()
//     {
//         this.nome = nome;
//         this.idade = age;
//     }
//     
//      category(){}      
//      age(){}
// }

// let a = new atleta("italo", 31);
// console.log(a.nome);
// console.log(a.idade);




/**
* Returns athlete category, calculated using his age;
* @return {String} Category
*/
Athlete.prototype.category = function () {
    const age = this.age();
    let cat = "";
    switch (true) {
        case age < 14:
            cat = "infantil";
            break;
        case age <= 15:
            cat = "Cadete";
            break;
        case age <= 17:
            cat = "Junior";
            break;
        case age <= 35:
            cat = "Sénior";
            break;
        default:
            cat = "Veterano";
            break;
    }
    return cat;
};

/**
* Returns athlete age
*/
Athlete.prototype.age = function () {
    let nascimento =  this.getBirthdate();
    let hoje = new Date();

    var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
    if (
        new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(
            hoje.getFullYear(),
            nascimento.getMonth(),
            nascimento.getDate()
        )
    )
        diferencaAnos--;
    return diferencaAnos;
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

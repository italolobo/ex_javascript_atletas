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

function renderAthletesList(list) {
    let rowList = "";
    for (let i of list) {
        let pic = i.picture;
        let name = String(i.name);
        let bir = new Date(i.birthdate).toLocaleDateString("default", {
            date: "numeric"
        });
        let wei = Number(i.weight).toFixed(1);
        let hei = Number(i.height).toFixed(2);
        let las = new Date(i.lastSessionAt).toLocaleDateString("default", {
            date: "numeric"
        });
        let gen = gender(i.gender);
        let age = idade(new Date(i.birthdate), new Date());
        let cat = category(idade(new Date(i.birthdate), new Date()));

        if (cat != "Sénior") continue;
        if (gen == "male") continue;

        rowList += template(pic, name, bir, wei, hei, cat, las, gen, red(cat));
        if (gen == "female") break;
    }
    document.getElementsByClassName("rows")[0].innerHTML = rowList;
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


class atleta{
    
    constructor(){}

    constructor(nome, idade):();
    {
        this.nome = nome;
        this.idade = idade;
    }

    
}

let a = new atleta("italo", 31);
console.log(a.nome);
console.log(a.idade);
let athlete = {
    name: "Fernando Pimenta",
    boat: "K",
    country: "Portugal",
    gender: "M",
    weight: 40,
    height: 1.79,
    picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Fernando_Pimenta_ECH_2016.jpg/240px-Fernando_Pimenta_ECH_2016.jpg",
    birthdate: new Date("1989-08-13"),
    events: [
        {
            when: 1581120000000,
            what: "Nelo Winter Challenge",
            result: 1,
            duration: 280000
        },
        {
            when: 1579910400000,
            what: "Controlo Nacional",
            result: 1,
            duration: 456000
        },
        {
            when: 1567468800000,
            what: "Russian President Cup",
            result: 8,
            duration: 90000
        }
    ]
};
document.getElementsByClassName("name")[0].textContent = athlete.name;

if (athlete.boat.toUpperCase() === "K") {
    document.getElementsByClassName("boat")[0].textContent = "KAYAK";
} else if (athlete.boat.toUpperCase() === "C") {
    document.getElementsByClassName("boat")[0].textContent = "CANOE";
} else {
    document.getElementsByClassName("boat")[0].textContent = "BOAT";
}

document.getElementsByTagName("img")[0].src = athlete.picture;

document.getElementById("country").innerText = athlete.country;

if (athlete.gender.toUpperCase() === "M")
    document.getElementById("gender").innerText = "Male";
else if (athlete.gender.toUpperCase() === "F")
    document.getElementById("gender").innerText = "Female";
else document.getElementById("gender").innerText = "Gender";

document.getElementById("weight").innerText = athlete.weight + "kg";

document.getElementById("height").innerText = athlete.height + "m";

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
let birth = athlete.birthdate;
let hoje = new Date();

document.getElementById("age").innerText = idade(birth, hoje);

function setEventTemplate(dayEv, monthEv, yearEv, nameEv, placeEv) {
    let template = `
                    <div class="event">
                        <div class="event-date">
                            <span class="day">${dayEv}</span>
                            <div class="event-month-year">
                                <span class="month">${monthEv}</span>
                                <span class="year">${yearEv}</span>
                            </div>
                        </div>
                        <div class="event-info">
                            <div class="event-name">
                            ${nameEv}
                            </div>
                            <div class="event-finishing-place">${placeEv}º place</div>
                        </div>
                        <div class="btn-event">
                            <button class="btnDelEvent">Delete</button>
                        </div>
                    </div>                   
`;
    return template;
}

let htmlEvents = "";
for (let event of athlete.events) {
    dayEv = new Date(event.when).toLocaleDateString("default", {
        day: "2-digit"
    });
    monthEv = new Date(event.when).toLocaleDateString("default", {
        month: "short"
    });
    yearEv = new Date(event.when).toLocaleDateString("default", {
        year: "numeric"
    });
    nameEv = event.what;
    placeEv = event.result;

    htmlEvents += setEventTemplate(dayEv, monthEv, yearEv, nameEv, placeEv);
}
document.querySelector(".events-list").innerHTML = htmlEvents;

/*Exercicio 3.2
=============*/
/*1. Considere a página de perfil de atleta - para uma leitura mais fácil dos eventos, 
coloque todos os eventos pares com uma cor de fundo de #eaeaea (utlizando javascript, apesar do mesmo efeito poder se atingido via css)*/
function stripedColorEvent(params) {
    let events = document.getElementsByClassName("event");
    for (let i = 0; i < events.length; i++) {
        if (i % 2 == 0) {
            events[i].style.height = "80px";
            events[i].style["background-color"] = "#eaeaea";
        } else {
            events[i].style.height = "80px";
            events[i].style["background-color"] = "white";
        }
    }
}

//LOAD EVENTS -----------------------
function loadEvents() {
    // let bodyHtml = document.getElementsByClassName("content");
    // document.getElementsByTagName("body").innerHTML = bodyHtml;

    stripedColorEvent();
    // removeEvent();
    
}

loadEvents();

/*2. Calcule o IMC do atleta (IMC = Peso[kg]/(altura * altura)[m]), 
e coloque uma cor de fundo no peso de acordo com a seguinte regra:
	abaixo de 18.5: Demasiado magro
	entre 18.6 e 24.9: Peso ideal
	entre 25.0 e 29.9: Um pouco acima do peso
	entre 30.0 e 34.9: Obesidade grau I
	entre 35.0 e 39.9: Obesidade grau II (severa)
	acima de 40: Obesidade grau III (mórbida)*/

let contentClass = document.getElementsByClassName("content");

let divImc = document.createElement("div");
divImc.className = "imc";
contentClass[0].appendChild(divImc);

let imcPath = document.getElementsByClassName("imc");

let imcLabel = document.createElement("label");
let text = document.createTextNode("IMC");
imcLabel.appendChild(text);
imcPath[0].appendChild(imcLabel);

let divImcList = document.createElement("ul");
divImcList.className = "imc-list";
imcPath[0].appendChild(divImcList);

let imcListPath = document.getElementsByClassName("imc-list");

let spanMagro = document.createElement("li");
spanMagro.className = "imcInfo";
spanMagro.id = "magro";
imcListPath[0].appendChild(spanMagro);
spanMagro.appendChild(
    document.createTextNode("abaixo de 18.5: Demasiado magro")
);

let spanIdeal = document.createElement("li");
spanIdeal.className = "imcInfo";
spanIdeal.id = "ideal";
imcListPath[0].appendChild(spanIdeal);
spanIdeal.appendChild(document.createTextNode("entre 18.6 e 24.9: Peso ideal"));

let spanAcima = document.createElement("li");
spanAcima.className = "imcInfo";
spanAcima.id = "acima";
imcListPath[0].appendChild(spanAcima);
spanAcima.appendChild(
    document.createTextNode("entre 25.0 e 29.9: Um pouco acima do peso")
);

let spanGrauI = document.createElement("li");
spanGrauI.className = "imcInfo";
spanGrauI.id = "grauI";
imcListPath[0].appendChild(spanGrauI);
spanGrauI.appendChild(
    document.createTextNode("entre 30.0 e 34.9: Obesidade grau I")
);

let spanGrauII = document.createElement("li");
spanGrauII.className = "imcInfo";
spanGrauII.id = "grauII";
imcListPath[0].appendChild(spanGrauII);
spanGrauII.appendChild(
    document.createTextNode("entre 35.0 e 39.9: Obesidade grau II (severa)")
);

let spanGrauIII = document.createElement("li");
spanGrauIII.className = "imcInfo";
spanGrauIII.id = "grauIII";
imcListPath[0].appendChild(spanGrauIII);
spanGrauIII.appendChild(
    document.createTextNode("acima de 40: Obesidade grau III (mórbida)")
);

// (IMC = Peso[kg]/(altura * altura)[m])
let imc = athlete.weight / (athlete.height * athlete.height);

if (imc >= 40) {
    document.getElementById("grauIII").style["background-color"] = "#FF0000";
    document.getElementById("grauIII").style["boxShadow"] =
        "1px 3px 2px 1px rgba(0, 0, 0, 0.14)";
    document.getElementById("grauIII").style["color"] = "#ffffff";
} else if (imc >= 35) {
    document.getElementById("grauII").style["background-color"] = "#FF4500";
    document.getElementById("grauII").style["boxShadow"] =
        "1px 3px 2px 1px rgba(0, 0, 0, 0.14)";
    document.getElementById("grauII").style["color"] = "#ffffff";
} else if (imc >= 30) {
    document.getElementById("grauI").style["background-color"] = "#FF6714";
    document.getElementById("grauI").style["boxShadow"] =
        "1px 3px 2px 1px rgba(0, 0, 0, 0.14)";
    document.getElementById("grauI").style["color"] = "#ffffff";
} else if (imc >= 25) {
    document.getElementById("acima").style["background-color"] = "#ffcc00";
    document.getElementById("acima").style["boxShadow"] =
        "1px 3px 2px 1px rgba(0, 0, 0, 0.14)";
    document.getElementById("acima").style["color"] = "#ffffff";
} else if (imc >= 18.6) {
    document.getElementById("ideal").style["background-color"] = "#2CB457";
    document.getElementById("ideal").style["boxShadow"] =
        "1px 3px 2px 1px rgba(0, 0, 0, 0.14)";
    document.getElementById("ideal").style["color"] = "#ffffff";
} else {
    document.getElementById("magro").style["background-color"] = "#FF4500";
    document.getElementById("magro").style["boxShadow"] =
        "1px 3px 2px 1px rgba(0, 0, 0, 0.14)";
    document.getElementById("magro").style["color"] = "#ffffff";
}

/*3. Adicione a idade do atleta ao seu perfil*/

// ok

/*4. Substitua as linhas do HTML por linhas geradas via Javascript*/
// function removeEvent() {
//     let btnsDelEvent = document.getElementsByClassName("btn-event");
//     for (const btn of btnsDelEvent) {
//         btn.addEventListener("click", function() {
//             btn.closest(".event").remove();
//             loadEvents();
//         });
//     }
// }

let eventsPath = document.getElementsByClassName("events-list")[0];
eventsPath.addEventListener("click", event => {
    event.target.closest(".event").remove();
    event.stopPropagation();
    event.stopImmediatePropagation()
    loadEvents();
});





function addNewEvent() {
    let events = document.getElementsByClassName("events-list")[0].innerHTML;

    let htmlEvents = "";

    let day = new Date(
        document.getElementById("new-date").value
    ).toLocaleDateString("default", { day: "2-digit" });
    let month = new Date(
        document.getElementById("new-date").value
    ).toLocaleDateString("default", { month: "short" });
    let year = new Date(
        document.getElementById("new-date").value
    ).toLocaleDateString("default", { year: "numeric" });
    let name = document.getElementById("new-name").value;
    let place = document.getElementById("new-place").value;

    events += setEventTemplate(day, month, year, name, place);
    let eventsList = document.querySelector(".events-list");
    eventsList.innerHTML = events;
    loadEvents();
}

/*
// let day = document.getElementById("new-date").value.toLocaleDateString("default", {day: "2-digit"});
//     let month = document.getElementById("new-date").toLocaleDateString("default", {month: "short"}).value;
//     let year = document.getElementById("new-date").toLocaleDateString("default", {year: "numeric"}).value;
*/



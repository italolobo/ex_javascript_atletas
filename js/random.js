let arrayNames = ["Ana", "Ítalo", "Ricardo", "Humberto", "Carlos"];
function getRandomName (min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) +min;
}

var posName = getRandomName(0, arrayNames.length);

//console.log(arrayNames[posName]);

document.getElementById("name").innerText = arrayNames[posName];
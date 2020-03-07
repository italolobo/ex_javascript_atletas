function category(age) {
    let cat = "";
    switch (true) {
        case age < 14:
            cat = 'infantil';
        case age <= 15:
            cat = 'Cadete';
        case age <= 17:
            cat = 'Junior';
        case age <= 35:
            cat = 'Sénior';
        default:
            cat = 'Veterano';
    }
    return cat;
}

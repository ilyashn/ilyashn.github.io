async function getAbility(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json.effect_entries[0].effect;
}

export async function getPokemon() {
    const main = document.getElementById("main");
    main.innerHTML = await getPokemonInfo('psyduck');
    changePokemonCSS();
}

function changePokemonCSS() {
    document.getElementById("pokemonTab").style.cssText = "background-color: white; color: #345;";
    document.getElementById("mainTab").style.cssText = "background-color: #345; color: white;";
    document.getElementById("pokemonInfo").style.cssText = "text-align: center; font-family: Arial, Helvetica, sans-serif; color: #1E1E1E;";
    document.getElementById("name").style.cssText = "font-size: 40px;";

    let names = document.getElementsByClassName("abilityName");
    for (let i = 0; i < names.length;i++) {
        names[i].style.cssText = "font-size: 32px; font-weight: bolder;";
    }
    let texts = document.getElementsByClassName("text");
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.cssText = "font-size: 25px;";
    }
    document.getElementById('abilities').style.cssText = "display: flex; justify-content: space-around;";
    let ability = document.getElementsByClassName('ability');
    for (let i = 0; i < ability.length; i++) {
        ability[i].style.cssText = "border: 2px solid #345; border-radius: 20px; margin: 20px;";
    }
}

const toUpperCaseFirstLetter = (word) => {
    return word[0].toUpperCase() + word.slice(1);
};

async function getPokemonInfo(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    let response = await fetch(url);
    let pokemonInfo = `<section id = "pokemonInfo"> <h2 id = "name">${toUpperCaseFirstLetter(pokemonName)} abilities </h2><div id="abilities">`;
    let json = await response.json();

    for (let i = 0; i < json.abilities.length; i++) {
        let name = json.abilities[i].ability.name;
        let abilityURL = json.abilities[i].ability.url;
        let abilityDescription = await getAbility(abilityURL);
        pokemonInfo += `<div class="ability"><span class="abilityName">${toUpperCaseFirstLetter(name)}</span><br><span class="text">${abilityDescription}</span></div>`;
    }
    pokemonInfo += `</div></section>`;
    return pokemonInfo;
}
import {getAboutMe} from './aboutMe';
import {getPokemon} from './pokemon';

document.getElementById('mainTab').onclick = getAboutMe;
document.getElementById("pokemonTab").onclick = getPokemon;
getAboutMe();
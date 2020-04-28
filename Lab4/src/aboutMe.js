export function getAboutMe() {
    const main = document.getElementById('main');
    main.innerHTML = getMyInfo();
    changeAboutMeCSS();
}

function getMyInfo() {
    return '<section id = "myInfo"> <h2 id = "name">Еликов Илья</h2> <span id = "text">Просто студент ИТМО группы М3307</span> </section>';
}

function changeAboutMeCSS() {
    document.getElementById("myInfo").style.cssText = "text-align: center; font-family: Arial, Helvetica, sans-serif; color: #1E1E1E;";
    document.getElementById("name").style.cssText = "font-size: 40px;";
    document.getElementById("text").style.cssText = "font-size: 25px;";
    document.getElementById("mainTab").style.cssText = "background-color: white; color: #345;";
    document.getElementById("pokemonTab").style.cssText = "background-color: #345; color: white;";
}
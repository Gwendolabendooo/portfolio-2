import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.onscroll = function() {
    scrollBar(); posExp(); colorNav();
};

var c1 = 0;

function scrollBar(){
    var v = window.pageYOffset;
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    if (document.documentElement.scrollTop > document.querySelector("body > header").offsetHeight -78){
        document.getElementById("myBar").style.width = scrolled + "%";
        document.querySelector("div.progress-container").style.width = '100%';
        document.querySelector("div.progress-container").style.top = '0';
        document.querySelector("div.formesPropos").style.animation = 'scaleUp 1s';
        document.querySelector("div.formesPropos").style.transform = 'scale(1)';
        
    }else{
        document.querySelector("div.progress-container").style.top = -6 + "px";
    }
}

function posExp(){
    let htMin = document.querySelector("div.parcours").offsetTop;
    let htExp = document.querySelector("div.experience").offsetTop;
    let htProj = document.querySelector("#projets").offsetTop;
    let widthProj = document.querySelector("#projets").offsetHeight / 4
    let widthExp = document.querySelector("#experience").offsetHeight / 2
    let htActuelle = document.documentElement.scrollTop;
    var opacité = 10 * (1 - htActuelle / htExp);

    if (htActuelle > htExp - widthExp) {
        document.querySelector("div.ctnParcours").style.opacity = opacité;
    }else{
        document.querySelector("div.ctnParcours").style.opacity = 1;
    }
    if (htActuelle > htProj - widthProj) {
        projapp();
    }
    if (htActuelle >= htMin && htExp > htActuelle){
        document.querySelector("div.ctnParcours").style.position = "fixed";
        document.querySelector("div.ctnParcours").style.top = 0 + "px";
        defillement();
    }else if (htMin > htActuelle) {
        document.querySelector("div.ctnParcours").style.position = "relative";
        document.querySelector("div.ctnParcours").style.left = 0 + "px";
    }else if (htExp <= htActuelle) {
        document.querySelector("div.ctnParcours").style.position = "relative";
        document.querySelector("div.ctnParcours").style.top = document.querySelector("div.experience").offsetTop - document.querySelector("body > div.parcours").offsetTop + "px";
        document.querySelector("div.ctnParcours").style.opacity = 0;
    }
}

function projapp() {
    let proj1 = document.querySelector("#projets > div.margProj")
    var proj = [proj1]

    for (let i = 0; i < proj.length; i++) {
        proj[i].classList.add("anim-apparition");
        proj[i].style.opacity = 1;
    }
}

function defillement() {
    let htActuelle = document.documentElement.scrollTop;
    let htExp = document.querySelector("body > div.parcours").offsetTop;

    document.querySelector("#ctnParcours").style.left = 3 * (htExp - htActuelle) + 'px';
  }

function colorNav() {
    var propos = document.querySelector("#propos").offsetTop;
    var experience = document.querySelector("body > div.parcours").offsetTop;
    var competence = document.querySelector("body > div.competences").offsetTop - 200;
    var projet = document.querySelector("body > div.projets").offsetTop;
    var contact = document.querySelector("body > div.contact").offsetTop;
    var footer = document.querySelector("body > footer").offsetTop;

    var listHeight = [propos, experience, competence, projet, contact, footer];

    for(let i = 1; i < 6; i++){
        var j = 2 + i;
        if (document.documentElement.scrollTop > listHeight[i - 1] - 10 && document.documentElement.scrollTop <= listHeight[i] - 10) {
            document.querySelector("div.Alignrubrique > a:nth-child(" + j + ")").style.color = "#33E073";
            if (listHeight[i] == listHeight[3] && c1 < 1) {
                animPadding();
                animPercent();
                c1++;
            }
        }else{
            document.querySelector("div.Alignrubrique > a:nth-child(" + j + ")").style.color = "white";
        }
    }
}

function animPadding() {
    var html = document.querySelector("#competence > div:nth-child(2) > div");
    var css = document.querySelector("#competence > div:nth-child(3) > div");
    var js = document.querySelector("#competence > div:nth-child(4) > div");
    var java = document.querySelector("#competence > div:nth-child(5) > div");
    var react = document.querySelector("#competence > div:nth-child(6) > div");
    var mysql = document.querySelector("#competence > div:nth-child(7) > div");

    var icon = [html, css, js, java, react, mysql];

    html.classList.add("ctnHTML");
    css.classList.add("ctnCSS");
    js.classList.add("ctnJS");
    java.classList.add("ctnJAVA");
    react.classList.add("ctnREACT");
    mysql.classList.add("ctnMYSQL");

    for (let i = 0; i < icon.length; i++) {
        icon[i].animate([
            // keyframes
            { padding: '50px' },
            { padding: '65px' },
            { padding: '50px' }
        ], {
                // timing options
                delay: 350 * i,
                duration: 500,
                iterations: 1
            });
    }
}

function animPercent() {
    var htmlpercent = document.querySelector("#competence > div:nth-child(2) > div > div.pourcentage");
    var csspercent = document.querySelector("#competence > div:nth-child(3) > div > div.pourcentage");
    var jspercent = document.querySelector("#competence > div:nth-child(4) > div > div.pourcentage");
    var javapercent = document.querySelector("#competence > div:nth-child(5) > div > div.pourcentage");
    var reactpercent = document.querySelector("#competence > div:nth-child(6) > div > div.pourcentage");
    var mysqlpercent = document.querySelector("#competence > div:nth-child(7) > div > div.pourcentage");

    var spanNumber = [htmlpercent, csspercent, jspercent, javapercent, reactpercent, mysqlpercent];
    var spanpourcentage = [90, 80, 70, 50, 60, 40];

    for (let i = 0; i < spanNumber.length; i++) {
        countdown(spanNumber[i], spanpourcentage[i])
    }
}

function countdown(elem, size) {
    var cpt = 5; //Initialisation du compteur
    var duree = 4.7; // Durée en seconde
    var delta = Math.ceil((duree * 600) / size); // Durée d'un %
    function setTest() {
        progress();
    }
    function progress() {
        elem.textContent = cpt + "%";
        ++cpt;
        if (cpt <= size) { //relance compteur
            setTimeout(function () {
                setTest()
            }, delta)//delay = delta différent pour chaque i
        }
    }
    progress();
}
// var precedent = 0;
// var tier = window.innerHeight / 3;

// function animation() {
//     if (window.location == "http://localhost:3000/"){
//         if ( document.documentElement.scrollTop > document.querySelector("div.back-exp").offsetTop - tier ){
//             document.querySelector("div.barre").classList.add("barrewidth");
//             document.querySelector("div.explications").classList.add("app-left");
//             document.querySelector("div.title2").classList.add("app-right");
//         }
//     }
// }

// function hiddmenu() {
//     var x = document.scrollTop || document.documentElement.scrollTop;
//     if (( x >  window.innerHeight - 1)  && ( x > precedent ))
//     {
//         document.querySelector("nav").classList.add("hidd");
//         precedent = x - 1;
//     }
//     else{
//         document.querySelector("nav").classList.remove("hidd");
//         precedent = x + 1;
//     }
//     console.log(x);
// }

ReactDOM.render(<App />, document.getElementById('root'));

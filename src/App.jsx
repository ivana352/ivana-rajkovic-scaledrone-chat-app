import React from "react";
import "./App.css";


function randomName() {
    const adjectives = ["sretni", "grbavi", "crni", "skrti", "zlocesti", "lijepi", "pametni", "sramezljiv", "brzi", "plemeniti"];
    const nouns = ["petar", "jura", "pero", "ananas", "kebab", "krumpir", "lisac", "ajvar", "lonac", "oblak"];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    //OVA FUNKCIJA SPAJA ADJECTIVE I NOUN, MOZE SE PISATI NA 2 NACINA
    //return adjective + '' + noun;
    return `${adjective} ${noun}`;
}
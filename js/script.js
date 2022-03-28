const buscarNombre = document.getElementById("button");
const Avanzar = document.getElementById("buttonAvanzar");
const Regresar = document.getElementById("buttonRegresar");
const input = document.getElementById("inputpokedex");
const img = document.getElementById("img");
const pokeName = document.getElementById("pokename");
const pokeType = document.getElementById("tipo");
const pokeId = document.getElementById("id");
const pokeHeight = document.getElementById("height");
const pokeWeight = document.getElementById("weight");
const PokeHp = document.getElementById("hp");
const PokeAtk = document.getElementById("atk");
const PokeDef = document.getElementById("def");
const PokeMove1 = document.getElementById("move1");
const PokeMove2 = document.getElementById("move2");
const PokeMove3 = document.getElementById("move3");
const PokeMove4 = document.getElementById("move4");
var idPokemon =0;

function busqueda(pokeName){
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            PokeImage("img/no.png");

        }

        return res.json();
    }).then((data) => {
        if (pokeName !== "") { 
            console.log(data);
            PokeImage(data.sprites.other.home.front_default);
            PokeFeatures(data);
            PokeStats(data);
            PokeMoves(data);
        }
    });

}

buscarNombre.onclick = () => {
    
    let pokeName = input.value.toLowerCase();
    busqueda(pokeName);
   
}
Regresar.onclick = () => {
    var id=idPokemon;
    if(id<2){
        id=1;
    }else{
        id=id-1;
    }
    busqueda(id);


}
Avanzar.onclick = () => {
    console.log(idPokemon);
    var id=idPokemon+1;
    busqueda(id);
    
}
    

const PokeFeatures = (data) => {
    pokeName.innerText = data.name.toUpperCase();
    document.getElementById("inputpokedex").value=data.name.toUpperCase();
    pokeType.innerText = "";

    for(let i = 0; i < data.types.length; i ++) {
        console.log(data.types[i].type.name);
        const type = document.createElement("tipo");
        type.classList.add("tipos");
        pokeType.appendChild(type);

        type.innerText = data.types[i].type.name;
    }
    idPokemon= data.id;
    pokeId.innerText = data.id;
    pokeHeight.innerText = data.height;
    pokeWeight.innerText = data.weight;
}


const PokeStats = (data) => {
    console.log(data.stats[0].base_stat);
    PokeHp.innerText = data.stats[0].base_stat;
    PokeAtk.innerText = data.stats[1].base_stat;
    PokeDef.innerText = data.stats[2].base_stat;

}

const PokeMoves = (data) => {
    let moves = data.moves;
    PokeMove1.innerHTML = "";
    PokeMove1.innerText = moves[1].move.name;
    PokeMove2.innerText = moves[2].move.name;
    PokeMove3.innerText = moves[3].move.name;
    PokeMove4.innerText = moves[4].move.name;
 
}

const PokeImage = (url) => {
    img.src = url;
}
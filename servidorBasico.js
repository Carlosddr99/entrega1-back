
const http = require('http')
const url = require('url')
const fs = require('fs')


async function obtenerDatos(){
    return new Promise((resolve, reject)=>{
        fs.readFile('pokedex.json','utf8',(err, data)=>{
            if(err != null){
                reject("Error al leer el fichero")
            }else{
                resolve(JSON.parse(data))
            }
        })
    });

}

async function obtenerPokemon(datoURL, datos){
    console.log("Datos" + datoURL)
    for(const pokemon of datos){
        if(pokemon.id == datoURL){
            return pokemon
        }
        if(pokemon.name.english == datoURL){
            return pokemon
        }
        if(pokemon.name.japanese == datoURL){
            return pokemon
        }
        if(pokemon.name.chinese == datoURL){
            return pokemon
        }
        if(pokemon.name.french == datoURL){
            return pokemon
        }
    }
    return null;
}
async function peticionUrl(req, res){
    const urlPaseada = url.parse(req.url, true);
    const datoURL = urlPaseada.pathname.replace("/","");
    const datos = await obtenerDatos();
    let pokemon = await obtenerPokemon(datoURL, datos);
    console.log(pokemon?.name)

    if(pokemon != null){
        const response = {
        'Tipo': pokemon.type,
        'HP' : pokemon.base.HP,
        'Attack' : pokemon.base.Attack,
        'Defense' : pokemon.base.Defense,
        'Sp.Attack' : pokemon.base['Sp. Attack'],
        'Sp.Defense' : pokemon.base['Sp. Defense'],
        'Speed' : pokemon.base.Speed}
        res.writeHead(200,{'Content-Type':'application/json'})
        res.end(JSON.stringify(response, null, 2))
    }
    else{
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end("Importante que para un mismo objeto/pokemon, podemos acceder a sus datos tanto por id como por todos los nombres");
    }
    
}

const server = http.createServer(peticionUrl)

server.listen(3000, ()=>{
    console.log("Servidor abierto en el puerto 3000")
})
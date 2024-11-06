const fetchPokemonCards = async (poke_type, no_card) => {
    const url = `https://pokeapi.co/api/v2/type/${poke_type}`;
    try {
        // Fetch all Pokémon of the specified type
        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();

        // Extract a limited number (no_card)
        const pokemonList = data.pokemon.slice(0, no_card);

        // Clear previous results
        document.querySelector(".pokemonBox").innerHTML = '';

        // Fetch and display details for each Pokémon
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemonUrl = pokemonList[i].pokemon.url;

            // Fetch individual Pokémon details
            const pokemonResponse = await fetch(pokemonUrl);
            const pokemonData = await pokemonResponse.json();

            // Create the HTML for each Pokémon
            const pokemonCard = `
                <div>
                    <img 
                    src="${pokemonData.sprites.other['official-artwork'].front_default}" 
                    alt="${pokemonData.name}" />
                </div>
                <div class="PokemonInfo">
                    <h1>${pokemonData.name}</h1>
                    <p>Weight: ${pokemonData.weight}</p>
                </div>
            `;

            // Append each Pokémon card to the DOM
            document.querySelector(".pokemonBox").innerHTML += pokemonCard;
        }
    } catch (error) {
        console.error(error);
    }
};

function clear_all(){
    document.querySelector("#input1").value="";
    document.querySelector("#input2").value="";
    document.querySelector(".pokemonBox").innerHTML="";

}

document.querySelector("#search").addEventListener("click", () => {
    const poke_type = document.querySelector("#input1").value.toLowerCase();
    const no_of_card = parseInt(document.querySelector('#input2').value, 10);
    
    if (poke_type && no_of_card > 0) {
        fetchPokemonCards(poke_type, no_of_card);
    } else {
        alert("Please enter a valid Pokémon type and number of cards!");
    }
});
 document.querySelector("#clear").addEventListener("click",clear_all);


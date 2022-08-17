let pokemones;
let maestrosPokemon;
let maestroPokemonSelecionado;

const cargarPokemones = async () => {
	const respuesta = await fetch("http://localhost:3002/pokemones", {
		method: "get",
	});
	pokemones = await respuesta.json();
	console.log("Pokemones", pokemones);
};

const cargarMaestrosPokemon = async () => {
	const respuesta = await fetch("http://localhost:3002/pokemon-masters", {
		method: "get",
	});
	maestrosPokemon = (await respuesta.json()).result;
	console.log("Maestros pokemon", maestrosPokemon);
};

const renderizarPokemones = () => {
	document.getElementById("pokemones").innerHTML = "";
	pokemones.forEach((pokemon) => {
		document.getElementById(
			"pokemones"
		).innerHTML += `<div class="card" id="${pokemon._id}">
				<img src="${pokemon.img}" class="card-img-top w-75 mx-auto">
				<div class="card-body">
					<h5 class="card-title">${pokemon.name}</h5>
					<div><span class="small">Tipos:</span><span class="badge text-bg-success">Grass</span></div>
					<div><span class="small">Debilidades:</span> <span class="badge text-bg-danger">Fire</span></div>
					<hr>
					<a href="#" class="btn btn-primary" onclick="capturarPokemon('${pokemon._id}', '${pokemon.name}', '${pokemon.img}')">Catch</a>
				</div>
			</div>`;
	});
};

const renderizarMaestrosPokemon = () => {
	document.getElementById("masters").innerHTML = "";
	maestrosPokemon.forEach((maestro) => {
		document.getElementById(
			"masters"
		).innerHTML += `<div class="card p-2 mb-2 cursor-pointer" onclick="seleccionarMaestro('${maestro._id}')">
						<div class="d-flex align-items-center">
							<img src="${maestro.img}" class="p-3 w-50">
							<div>
								<h5 class="card-title">${maestro.firstName} ${maestro.lastName}</h5>
								<span class="badge text-bg-secondary">${maestro.level}</span>
							</div>
						</div>
					</div>`;
	});
};

cargarPokemones().then(() => {
	renderizarPokemones();
});

cargarMaestrosPokemon().then(() => {
	renderizarMaestrosPokemon();
});

const seleccionarMaestro = (id) => {
	pokemones.forEach((pokemon) => {
		document.getElementById(pokemon._id).classList.remove("border-danger");
	});

	maestroPokemonSelecionado = maestrosPokemon.filter(
		(pokemon) => pokemon._id === id
	)[0];
	maestroPokemonSelecionado.pokemons.forEach((pokemon) => {
		document.getElementById(pokemon._id).classList.add("border-danger");
	});
};

const capturarPokemon = async (idPokemon, name, img) => {
	const respuesta = await fetch(
		`http://localhost:3002/pokemon-masters/${maestroPokemonSelecionado._id}/pokemons`,
		{
			method: "put",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: idPokemon,
				name: name,
				img: img,
			}),
		}
	);

	const resJSON = await respuesta.json();

	console.log('Respuesta de agregar un pokemon',resJSON);
};

// async & await

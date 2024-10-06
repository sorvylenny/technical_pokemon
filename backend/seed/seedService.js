import axios from 'axios';
import models from '../models/associations.js';
import bcrypt from 'bcrypt';

const {Order, User, Pokemon, OrderPokemons} = models;
const seedService = {
  executedSeed: async function () {
    try {
      await Pokemon.sequelize.authenticate ();
      console.log ('Conexión a la base de datos exitosa');

      // Eliminar todas las tablas de la base de datos
      await User.destroy ({truncate: true, cascade: true});
      await Order.destroy ({truncate: true, cascade: true});
      await Pokemon.destroy ({truncate: true, cascade: true});
      await OrderPokemons.destroy ({truncate: true, cascade: true});

      // Sincronizar la tabla con la base de datos
      await Pokemon.sync ({force: true});

      // Obtener la lista de 650 Pokémon de la PokeAPI
      const {data} = await axios.get (
        'https://pokeapi.co/api/v2/pokemon?limit=650'
      );

      // Obtener los detalles de cada Pokémon en la lista
      const pokemonDetailsPromises = data.results.map (async ({name, url}) => {
        const segments = url.split ('/');
        const no = +segments[segments.length - 2];

        // Obtener los detalles de cada Pokémon
        const pokemonDetails = await axios.get (url);

        // Obtener los detalles de la especie para los nombres en español
        const speciesUrl = pokemonDetails.data.species.url;
        const speciesDetails = await axios.get (speciesUrl);
        const spanishName =
          speciesDetails.data.names.find (n => n.language.name === 'es').name ||
          name;

        // Obtener los tipos en español
        const types = await Promise.all (
          pokemonDetails.data.types.map (async typeInfo => {
            const typeUrl = typeInfo.type.url;
            const typeDetails = await axios.get (typeUrl);
            return (
              typeDetails.data.names.find (n => n.language.name === 'es')
                .name || typeInfo.type.name
            );
          })
        );
        const typesString = types.join (', ');

        // Obtener las habilidades en español
        const skills = await Promise.all (
          pokemonDetails.data.abilities.map (async abilityInfo => {
            const abilityUrl = abilityInfo.ability.url;
            const abilityDetails = await axios.get (abilityUrl);
            return (
              abilityDetails.data.names.find (n => n.language.name === 'es')
                .name || abilityInfo.ability.name
            );
          })
        );
        const skillsString = skills.join (', ');

        // Generar un precio aleatorio para cada Pokémon
        const price = Math.random () * 1000;

        // Obtener la URL de la imagen principal (Dream World) y sprite normal
        const imageUrl =
          pokemonDetails.data.sprites.other.dream_world.front_default || '';

        // Modificar el sprite para que sea el sprite animado
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${no}.gif`;

        // Validar que todos los campos requeridos estén presentes
        if (
          !spanishName ||
          !no ||
          !typesString ||
          !skillsString ||
          !price ||
          !imageUrl ||
          !sprite
        ) {
          console.error (
            `Error: Datos incompletos para el Pokémon ${name} con no ${no}`
          );
          return null;
        }

        // Retornar el objeto con los datos del Pokémon en español
        return {
          name: spanishName,
          no,
          type: typesString,
          skill: skillsString,
          price,
          imageUrl,
          sprite, // Usar el sprite animado
        };
      });

      // Esperar a que todas las promesas se resuelvan y filtrar los resultados nulos
      const pokemonToInsert = (await Promise.all (
        pokemonDetailsPromises
      )).filter (p => p !== null);

      // Insertar los Pokémon en la base de datos
      await Pokemon.bulkCreate (pokemonToInsert);
      console.log (
        'Seed ejecutado correctamente con',
        pokemonToInsert.length,
        'Pokémon insertados en español'
      );

      const body = {
        fullName: 'Poke Market Admin',
        email: 'PokeMarketAdmin@pokemarket.com',
        phone: '+573015499363',
        password: await bcrypt.hash ('Pokeadmin123', 10),
        address: '123 Calle Principal',
        role: 'admin',
      };

      const admin = await User.create (body);

      console.log ('PokeMarket Admin creado correctamente:', admin);
    } catch (error) {
      console.error ('Error ejecutando el seed:', error);
    }
  },
};

export default seedService;

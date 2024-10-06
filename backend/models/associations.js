import sequelize from './index.js';
import sales from './sales.js';
import User from './user.js';
import Pokemon from './pokemon.js';
const {Order, OrderPokemons} = sales;

Order.belongsTo (User, {
  foreignKey: 'userId',
});
User.hasMany (Order, {
  foreignKey: 'userId',
});

Order.belongsToMany (Pokemon, {
  through: OrderPokemons,
  foreignKey: 'orderId',
});
Pokemon.belongsToMany (Order, {
  through: OrderPokemons,
  foreignKey: 'pokemonId',
});

export default {Order, User, Pokemon, OrderPokemons};

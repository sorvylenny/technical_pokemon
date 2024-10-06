import {DataTypes} from 'sequelize';
import sequelize from './index.js';

// Definición de la tabla Order
const Order = sequelize.define (
  'Order',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pokemonsIds: {
      type: DataTypes.ARRAY (DataTypes.UUID),
      allowNull: false,
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
  }
);

// Definición de la tabla intermedia OrderPokemons
const OrderPokemons = sequelize.define (
  'OrderPokemons',
  {
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: Order, // Asegúrate de que el modelo Order está definido antes de aquí
        key: 'id',
      },
    },
    pokemonId: {
      type: DataTypes.UUID,
      references: {
        model: 'Pokemons', // Asegúrate de que el nombre del modelo Pokemon coincide con el que has definido
        key: 'id',
      },
    },
  },
  {
    tableName: 'order_pokemons', // Consistente en minúsculas para evitar confusiones
    timestamps: true,
  }
);

// Exportar los modelos
export default {Order, OrderPokemons};

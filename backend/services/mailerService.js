import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {join} from 'path';
import nodemailerHbs from 'nodemailer-express-handlebars';
import models from '../models/associations.js';
const {User, Pokemon} = models;

dotenv.config ();

const transporter = nodemailer.createTransport ({
  host: 'smtp.forwardemail.net',
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: join (process.cwd (), 'views', 'layouts'),
    defaultLayout: false,
    helpers: {
      formatPrice: function (value) {
        return parseFloat (value).toFixed (2);
      },
    },
  },
  viewPath: join (process.cwd (), 'views', 'layouts'),
  extName: '.hbs',
};

transporter.use ('compile', nodemailerHbs (handlebarOptions));

const nodeMailerService = {
  sendEmail: async transaction => {
    const totalAmount = transaction.dataValues.totalAmount;
    const orderNumber = transaction.dataValues.orderNumber;

    let pokemonsCards = [];

    const promises = transaction.dataValues.pokemonsIds.map (element => {
      return Pokemon.findOne ({where: {id: element}}).then (pokemon => {
        pokemonsCards.push (pokemon);
      });
    });

    await Promise.all (promises);

    const user = await User.findOne ({
      where: {id: transaction.dataValues.userId},
      attributes: {exclude: ['password', 'role', 'createAt', 'updateAt']},
    });
    const mailOptions = {
      from: process.env.FROM,
      to: user.email,
      subject: `¡Gracias por tu compra! ${user.fullName}`,
      template: 'purchase',
      context: {
        items: pokemonsCards,
        total: totalAmount.toFixed (2),
        user: user.dataValues,
        orderNumber: orderNumber,
      },
    };
    const mailStoreOptions = {
      from: process.env.FROM,
      to: process.env.FROM,
      subject: `¡Notificacion de Compra!`,
      template: 'store-notify',
      context: {
        items: pokemonsCards,
        total: totalAmount.toFixed (2),
        user: user.dataValues,
        orderNumber: orderNumber,
        storeEmail: process.env.FROM,
      },
    };

    try {
      await transporter.sendMail (mailOptions);
      await transporter.sendMail (mailStoreOptions);
    } catch (error) {
      console.error ('Error al enviar el correo:', error);
      throw new Error ('No se pudo enviar el correo.');
    }
  },
};

export default nodeMailerService;

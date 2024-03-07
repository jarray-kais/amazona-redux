import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
//import * as FormData from 'form-data'
//import Mailgun from 'mailgun.js';

dotenv.config();

export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://yourdomain.com';
      console.log(process.env.BASE_URL)
  
  


export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '2d',
    }
  );
};
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};
export const isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/Seller Token' });
  }
};


/* export const mailgun = () =>

{const mailgun = new Mailgun(formData);
 const mg= mailgun.client({
    username: process.env.MAILGUN_API_KEY,
    key: process.env.MAILGUN_DOMAIN,

   
  })}; console.log(process.env.MAILGUN_API_KEY)
   console.log(process.env.MAILGUN_DOMAIN)
   */
  
  /* const  mailgun  =  new  Mailgun ( FormData ) ; 
  mg = () =>  mailgun.client ( { username : process.env.MAILGUN_DOMAIN ||'api' ,  key : process . env . MAILGUN_API_KEY  ||  'key-yourkeyhere' } ) ; */
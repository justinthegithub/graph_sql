import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import fetch from 'node-fetch';


//self signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const solarSchema = buildSchema(`
  type SolarData {
  name: String 
  }
  type Query {
  getSolarData: SolarData}
  `);


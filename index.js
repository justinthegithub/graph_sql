import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import fetch from 'node-fetch';

const solarDataStore = [];

const solarSchema = buildSchema(`
  type SolarData {
    id: ID!
    name: String
  }

  input SolarDataInput {
    name: String
  }

  type Query {
    getSolarData(id: ID!): SolarData
    listSolarData: [SolarData]
    fetchSolarData: SolarData
  }

  type Mutation {
    createSolarData(input: SolarDataInput): SolarData
  }
`);

const resolvers = {
  getSolarData: ({ id }) => {
    for (let i = 0; i < solarDataStore.length; i++) {
      if (solarDataStore[i].id === id) {
        return solarDataStore[i];
      }
    }
    return null;
  },
  listSolarData: () => {
    return solarDataStore;
  },
  fetchSolarData: async () => {
    const response = await fetch('http://solarprotocol.net/api/v2/opendata.php?systemInfo=name');
    const data = await response.json();
    return {
      id: "external",
      name: data.name
    };
  },
  createSolarData: ({ input }) => {
    const newSolarData = {
      id: `${solarDataStore.length + 1}`,
      name: input.name
    };
    solarDataStore.push(newSolarData);
    return newSolarData;
  }
};

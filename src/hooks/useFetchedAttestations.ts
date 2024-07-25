import { useState, useEffect } from "react";
import fetch from 'cross-fetch'; 
import { ApolloClient, HttpLink, InMemoryCache, gql, useQuery } from '@apollo/client'; 

const API_URL = "https://base.easscan.org/graphql";

const GET_ATTESTATIONS = gql`
  query GetAttestations($ethAddress: String) {
    attestations(where: { recipient: {equals: $ethAddress} }) {
      attester
      expirationTime
      revocationTime
    }
  }
`;

const graphqlClient = new ApolloClient({ 
  link: new HttpLink({ uri: API_URL, fetch }), 
  cache: new InMemoryCache()}
);

const useFetchedAttestations = (ethAddress: string) => {

  const { loading, error, data } = useQuery(GET_ATTESTATIONS, {
    variables: { ethAddress },
    client: graphqlClient,
  });

  return { data, error, loading };
};

export default useFetchedAttestations;
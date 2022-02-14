import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query {
    allFilms {
      films {
        id
        title
        openingCrawl
        director
        producers
        releaseDate
        characterConnection {
          characters {
            id
            name
          }
        }
        starshipConnection {
          starships {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PERSON = gql`
    query getPerson($id: ID!){
        person(id: $id){
        name
        }
    }
`;

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

export const GET_PEOPLE = gql`
  query {
    allPeople {
      people {
        name
        gender
        homeworld {
          name
        }
        starshipConnection {
          starships {
            name
          }
        }
        vehicleConnection {
          vehicles {
            name
          }
        }
      }
    }
  }
`;

export const GET_PLANETS = gql`
  query {
    allPlanets {
      planets {
        id
        name
        residentConnection {
          residents {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PERSON = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      name
      birthYear
      gender
      hairColor
      skinColor
      mass
      homeworld {
        name
      }
    }
  }
`;

export const GET_PLANET = gql`
  query {
    planet(id: "cGVvcGxlOjE=") {
      name
      diameter
      population
      gravity
      rotationPeriod
      orbitalPeriod
      climates
      terrains
    }
  }
`;

export const GET_STAR_SHIP = gql`
  query getStarship($id: ID!) {
    starship(id: $id) {
      name
      length
      crew
      model
      starshipClass
      passengers
      consumables
    }
  }
`;

export const GET_VEHICLE = gql`
  query getVehicle($id: ID!) {
      vehicles(id: $id) {
        id
        model
        length
        crew
        passengers
        maxAtmospheringSpeed
        cargoCapacity
        consumables
      }
    
  }
`;

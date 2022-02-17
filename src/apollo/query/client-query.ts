import { gql } from '@apollo/client';
export const GET_MODAL_DATA = gql`
    query getModalData {
        modal @client
    }
`;
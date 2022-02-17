import { InMemoryCache } from '@apollo/client';
import {modalStateReactive} from "./reactive-variable/modal-data"


export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                modal: {
                    read() {
                        return modalStateReactive();
                    },
                }
            },
        },
    },
});
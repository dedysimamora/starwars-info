import { makeVar } from '@apollo/client';


interface modalStateType {
    visible : boolean,
    dataDetailsId : any
}

const modalStateInitial : modalStateType = {
    visible: false,
    dataDetailsId : null
};

export const modalStateReactive = makeVar(modalStateInitial);


export const modalReactiveAction = {
    turnOnModal: (visibility: boolean, dataDetailsId: any) => {
        modalStateReactive({...modalStateReactive(), visible:visibility,dataDetailsId:dataDetailsId  })
    }
};

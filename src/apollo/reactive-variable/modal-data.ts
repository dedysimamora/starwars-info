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
        console.log(visibility, "<<<< data visibility di reactive")
        console.log(dataDetailsId, "<<<< data dataDetailsId di reactive")
        modalStateReactive({...modalStateReactive(), visible:visibility,dataDetailsId:dataDetailsId  })
    }
};

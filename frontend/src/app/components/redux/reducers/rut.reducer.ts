import { AUTHRUT, RESET, rutAction} from "../actions/rut.actions";

export function rutReducer(state: string, action: rutAction){
    switch(action.type){

        default:
            return state;

        case AUTHRUT:
            return action.payload;

        case RESET:
            return '';
        
        // case SETPUBPEM:
        //     var pubPem;
        //     return pubPem = action.payload;
        
    }
}

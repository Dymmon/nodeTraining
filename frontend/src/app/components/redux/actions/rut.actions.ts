import { Action } from '@ngrx/store'

export const AUTHRUT = '[Rut] Authrut';
export const RESET = '[Rut] Reset';
// export const SETPUBPEM = '[Rut] SetPubPem';

export class AuthRutAction implements Action {
    readonly type = AUTHRUT;
    constructor(public payload: string){}
}

export class ResetAction implements Action {
    readonly type = RESET;
}

// export class SetPubPemAction implements Action{
//     readonly type = SETPUBPEM;
//     constructor(public payload: string){}
// }

export type rutAction = AuthRutAction |
                        ResetAction;
                        // SetPubPemAction;
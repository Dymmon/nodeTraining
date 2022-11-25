export interface AppState{
    rut: string;
    pubPem: string;
    authorized: boolean;
}

export const selectUserRut = (state: AppState) => state.rut['rut'];

export const selectUserPubPem = (state: AppState) => state.rut['pubPem'];

export const selectUserAuthorized = (state: AppState) => state.rut['authorized'];

export const selectRutAndPubPem = (state: AppState) => {return {
    rut:state.rut['rut'],
    pubPem: state.rut['pubPem'],
}};

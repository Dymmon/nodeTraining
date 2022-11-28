export interface AppState{
    rut: string;
    pubPem: string;
    authorized: boolean;
    password: string;
    token: string;
}

export const selectUserRut = (state: AppState) => state.rut['rut'];

export const selectUserPubPem = (state: AppState) => state.rut['pubPem'];

export const selectUserAuthorized = (state: AppState) => state.rut['authorized'];

export const selectUserPass = (state: AppState) => state.rut['password'];

export const selectUserHeaders = (state: AppState) => state.rut['headers'];

export const selectUserToken = (state: AppState) => state.rut['token'];

export const selectRutAndPubPem = (state: AppState) => {return {
    rut:state.rut['rut'],
    pubPem: state.rut['pubPem'],
}};


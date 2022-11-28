import { createReducer, on } from '@ngrx/store';
import { AppState} from 'src/app/components/redux/app.reducers';
import * as rutActions from '../actions/rut.actions'

export const initialState: AppState = {
    rut: null,
    pubPem: null,
    authorized: false,
    password: null,
    token: null
};

export const rutReducer = createReducer(
  initialState,
  on(rutActions.AUTHRUT, (state, {payload}) => ({
    rut: payload.rut,
    pubPem: payload.pubPem,
    authorized:state.authorized,
    password: state.password,
    token: state.token})),
  on(rutActions.REQUIRED, (state, {payload}) => ({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: state.authorized,
    password: payload.password,
    token: state.token})),
  on(rutActions.AUTHTOKEN, (state, {payload}) =>({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: state.authorized,
    password: state.password,
    token: payload.token})),
  on(rutActions.AUTHORIZED,(state)=> ({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: true,
    password: state.password,
    token: state.token})),
  on(rutActions.REGISTER,(state, {payload})=> ({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: state.authorized,
    password: payload.password,
    token: state.token})),
  on(rutActions.RESET, (state)=>(initialState))
);
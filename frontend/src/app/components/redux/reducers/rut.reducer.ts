import { createReducer, on } from '@ngrx/store';
import { AppState} from 'src/app/components/redux/app.reducers';
import { AUTHORIZED, AUTHRUT, AUTHTOKEN, REQUIRED, RESET } from '../actions/rut.actions';

export const initialState: AppState = {
    rut: null,
    pubPem: null,
    authorized: false,
    password: null,
    token: null
};

export const rutReducer = createReducer(
  initialState,
  on(AUTHRUT, (state, {payload}) => ({
    rut: payload.rut,
    pubPem: payload.pubPem,
    authorized:state.authorized,
    password: state.password,
    token: state.token})),
  on(REQUIRED, (state, {payload}) => ({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: state.authorized,
    password: payload.password,
    token: state.token})),
  on(AUTHTOKEN, (state, {payload}) =>({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: state.authorized,
    password: state.password,
    token: payload.token})),
  on(AUTHORIZED,(state)=> ({
    rut: state.rut,
    pubPem: state.pubPem,
    authorized: true,
    password: state.password,
    token: state.token})),
  on(RESET, (state)=>(initialState))
);
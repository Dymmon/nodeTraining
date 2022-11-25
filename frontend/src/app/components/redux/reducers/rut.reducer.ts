import { createReducer, on } from '@ngrx/store';
import { AppState} from 'src/app/app.reducers';
import { AUTHORIZED, AUTHRUT, RESET } from '../actions/rut.actions';

export const initialState: AppState = {
    rut: null,
    pubPem: null,
    authorized: false
};

export const rutReducer = createReducer(
  initialState,
  on(AUTHRUT, (state, {payload}) => ({rut:payload.rut, pubPem: payload.pubPem, authorized:false})),
  on(AUTHORIZED,(state)=> ({rut:state.rut, pubPem: state.pubPem,authorized: true})),
  on(RESET, (state)=>(initialState))
);
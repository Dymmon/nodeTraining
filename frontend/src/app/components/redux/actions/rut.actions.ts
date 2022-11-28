import { createAction, props } from '@ngrx/store';

export const AUTHRUT = createAction(
    '[Rut] AuthRut',
    props<{payload: any}>()
);
export const REQUIRED = createAction(
    '[Rut] Required',
    props<{payload: any}>()
)
export const AUTHTOKEN = createAction(
    '[Rut] AuthToken',
    props<{payload: any}>()
)
export const AUTHORIZED = createAction(
    '[Rut] Authorized',
);
export const RESET = createAction(
    '[Rut] Reset'
);
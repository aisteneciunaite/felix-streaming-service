import * as types from './types';

export const login = token => ({ type: types.LOG_IN, token });
export const logout = () => ({ type: types.LOG_OUT });
import {
    GET_WEATHER_SUCCESSFUL,
    GET_WEATHER_FAILURE
} from '../../actionTypes/weather';

import {initialState} from './initialState';

export default function (state = initialState, {payload, type}) {
    switch (type) {
        case GET_WEATHER_SUCCESSFUL:
            return {
                ...state,
                location: payload.location,
                forecast: payload.forecast,
                loading: false
            };
        case GET_WEATHER_FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
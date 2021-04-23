import { authReducer } from "../../auth/authReducer";
import { types } from '../../types/types'

describe('Pruebas en authReducer', () => {

    test('#01 - Debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false })

        expect( state ).toEqual({ logged: false })
    });

    test('#02 - Debe de autenticar y colocar el nombre del usuario', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Airton'
            }
        };

        const state = authReducer({ logged: false }, action)

        expect( state ).toEqual({ 
            logged: true,
            name: 'Airton' 
        });
    });

    test('#03 - Debe de borrar el nombre del usuario y logged en false', () => {

        const action = {
            type: types.logout,
            payload: {
                name: 'Airton'
            }
        };

        const state = authReducer({ logged: true, name: 'Airton' }, action)

        expect( state ).toEqual({ logged: false })
    });
});
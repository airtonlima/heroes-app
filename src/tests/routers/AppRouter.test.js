import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';
import { MemoryRouter } from 'react-router';

describe('Pruebas en <AppRouter />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    test('#01 - Debe de mostrar el login si no está autenticado', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <AppRouter />

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
    });

    test('#02 - Debe de mostrar el component Marvel si está autenticado', () => {
 
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Airton'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper.find('.navbar').exists() ).toBe(true)
    });
});

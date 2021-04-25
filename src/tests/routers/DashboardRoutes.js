import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext'
import { DashboardRoute } from '../../routers/DashboardRoutes'
import { MemoryRouter } from 'react-router';

describe('Pruebas en <DashboardRoutes />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false,
            name: 'Airton'
        }
    };

    test('#01 - Debe de mostrarse correctamente', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <DashboardRoute />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find('.text-info').text().trim() ).toBe('Airton')
    });
});
import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {
    
    test('#01 - Debe de mostrar el login si no está autenticado', () => {
        
        const wrapper = mount(
            <AuthContext.Provider>
                <AppRouter />
            </AuthContext.Provider>
        );

        console.log( wrapper.html() );
    });
    

});

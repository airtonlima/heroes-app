import React from 'react';
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en <HeroScreen />', () => {
    
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    test('#01 - Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });
    
    test('#02 - Debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/marvel-spider"] }>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
    });

    test('#03 - Debe de retornar a la pantalla anterior con PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/marvel-spider"] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')()

        expect( history.push ).toHaveBeenCalledWith('/');

        expect( history.goBack ).not.toHaveBeenCalledWith();
    });

    test('#04 - Debe de regresar a la pantalla anterior con GOBACK', () => {
        
        const history = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/marvel-spider"] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledTimes(0);

        expect( history.goBack ).toHaveBeenCalledWith();
    });

    test('#05 - Debe de llamar el Redirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/marvel-spider"] }>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
    });

});

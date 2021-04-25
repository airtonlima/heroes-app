import React from 'react';
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {

    test('#01 - Debe de mostrarse correctamente con valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero')
    });

    test('#02 - Debe de mostrar a Batmen y el input con el valor del queryString', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find('input').prop('value') ).toBe('batman')
    });

    test('#03 - Debe de mostrar un error si no se encuentra el Hero', () => {
        

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <Route path='/search' component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find('.alert-danger').text().trim() ).toBe(`There's no a Hero with batman123`)
    });

    test('#04 - Debe de llamar el PUSH del history', () => {
        
        const history = {
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <Route 
                    path='/search' 
                    component={ () => <SearchScreen history={ history } /> } 
                />
            </MemoryRouter>
        ); 

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'

            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault() {}
        })

        expect( history.push ).toHaveBeenCalledWith(`?q=batman`)
    });
      
});

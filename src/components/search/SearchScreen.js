import React, { useMemo } from 'react';
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const { search } = useLocation();

    const { q = '' } = queryString.parse( search )

    const [ formValues, handleInputChange ] = useForm({ 
        searchText: q 
    })

    const { searchText } = formValues;

    const heroesFiltered =  useMemo(() => getHeroesByName(q), [ q ]);

    const handleSearch = e => {
        e.preventDefault()
        history.push(`?q=${ searchText }`)
    }

    return (
        <div>
            <h1> Search Screen </h1>
            <hr/>

            <div className="row">

                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />
                    </form>

                    <button
                        type="button"
                        className="btn m-1 btn-block btn-outline-primary"
                        onClick={ handleSearch }
                    >
                        Search
                    </button>
                </div>

                <div className="col-7">

                    <h4> Results </h4>
                    <hr />
                    
                    { !q && 
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    { (q && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            There's no a Hero with { q }
                        </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={ hero.id }
                                { ... hero }
                            />
                        ))
                    }

                </div>

            </div>
        </div>
    );
}

import {MemoryRouter} from 'react-router'
import React from 'react'
import {create} from 'react-test-renderer'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import * as renderer from 'react-test-renderer'

const footer = create (<Footer />);


test('snapshot', () => {
    expect(footer).toMatchSnapshot();
});

test('snapshot', () => {
    const component = renderer.create(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
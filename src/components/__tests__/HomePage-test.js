import {MemoryRouter} from 'react-router'
import React from 'react'
import {create} from 'react-test-renderer'
import Header from '../Header/Header'
import * as renderer from 'react-test-renderer'
import Tutorial from '../Tutorial/Tutorial'



test('snapshot', () => {
    const tutorial = create(<Tutorial/>);
    expect(tutorial).toMatchSnapshot();
})

test('snapshot', () => {
    const component = renderer.create(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
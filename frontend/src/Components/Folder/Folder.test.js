import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import { Folder } from './Folder'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

test('Renders Post', () => { 
    render(
        <BrowserRouter>
            <Folder key={"test"} name={"does this work"}>
                <h1>Inside folder</h1>
            </Folder>
        </BrowserRouter>
    );

    const text = screen.getByText(/Inside folder/i);
    expect(text).toBeInTheDocument();
})
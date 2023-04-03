import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import { Button } from './Button'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

test('Renders button', () => {
    render(
        <BrowserRouter>
            <Button />
        </BrowserRouter>
    )

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
})
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import { Post } from './Post'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'


test('Renders Post', () => {
    let post = {
        word : "test-post",
        title : "test-title",
        ups : 50,
        upvote_ratio: 0.5,
        subreddit: "news",
        created: 1680051469
    }

    render(
        <BrowserRouter>
            <Post key={0} post={post}/>
        </BrowserRouter>
    )

    const text = screen.getByText(/test-post/i);
    expect(text).toBeInTheDocument();
})
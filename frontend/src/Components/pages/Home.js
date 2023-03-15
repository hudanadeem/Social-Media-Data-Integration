import '../../App.css'
import './Home.css'
import Post from '../../Post';
import { getPosts } from "../.././api/api";
import Folder from '../../Folder';
import React, { useState, useEffect } from 'react';


function Home (){

    const [content, setContent] = useState([]);

    useEffect(() => {
        getPosts().then((posts) => {
        setContent(posts);
        });
    }, []);

    const sortedContent = content.sort((a, b) => {
        if (a.word < b.word) {
        return -1;
        }
        if (a.word > b.word) {
        return 1;
        }
        return 0;
    });

    const groupedContent = sortedContent.reduce((groups, post) => {
        const group = groups[post.word] || [];
        group.push(post);
        groups[post.word] = group;
        return groups;
    }, {});

    return(
        <>
        {Object.entries(groupedContent).map(([word, posts]) => (
        <Folder key={word} name={word}>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </Folder>
        ))}
        </>
    );
}

export default Home;
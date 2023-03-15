// import React from 'react';
import '../../App.css'
import './Home.css'
// import MainSection from '../MainSection'
import Post from '../../Post';
import { getPosts } from "../.././api/api";
import Folder from '../../Folder';
import React, { useState, useEffect } from 'react';
import moment from 'moment';



function Home (){

    const [content, setContent] = useState([]);
    const [postsIn4Hours, setPostsIn4Hours] = useState(0);

    useEffect(() => {
        getPosts().then((posts) => {
        setContent(posts);

        let now = moment().subtract(4, 'hours').unix();
        console.log(now);
        let fourHourCount = posts.filter((post) => {
          if (post.created >= now){
            return true;
          }
          return false;
        })
        setPostsIn4Hours(fourHourCount.length);
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
            {/* <MainSection/> */}
        </>
    );
}

export default Home;
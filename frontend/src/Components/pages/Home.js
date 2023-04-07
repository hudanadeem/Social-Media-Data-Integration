// import React from 'react';
import "../../App.css";
import "./Home.css";
// import MainSection from '../MainSection'
import Post from "../../Post";
import Result from "../../Result";
import { getPosts } from "../.././api/api";
import { getResults } from "../.././api/api";
import Folder from '../../Folder';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Select from "react-select";
import Navbar from "../Navbar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [filterWord, setFilterWord] = useState("None");
  const [postsIn4Hours, setPostsIn4Hours] = useState(0);

  const [isSplit, setIsSplit] = useState(false);

  const toggleSplitScreen = () => {
    setIsSplit(!isSplit);
  };

  const options = [
    { value: "None", label: "None" },
    { value: "Nuke", label: "Nuke" },
    { value: "Nuclear Weapon", label: "Nuclear Weapon" },
    { value: "ICBM", label: "ICBM" },
    { value: "Bio-weapon", label: "Bio-weapon" },
    { value: "Biological Warfare", label: "Biological Warfare" },
    { value: "Anthrax", label: "Anthrax" },
    { value: "Smallpox", label: "Smallpox" },
    { value: "Plague", label: "Plague" },
    { value: "Germ Warfare", label: "Germ Warfare" },
    { value: "Chemical Weapon", label: "Chemical Weapon" },
    { value: "Nerve Weapon", label: "Nerve Weapon" },
    { value: "Asphyxiant Weapon", label: "Asphyxiant Weapon" },
    { value: "Nuclear Bomb", label: "Nuclear Bomb" },
  ];

  useEffect(() => {
    getPosts().then((posts) => {
    setPosts(posts);

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

  useEffect(() => {
    getResults().then((results) => {
      setResults(results);
    });
  }, []);

  function onFilterChange(value) {
    value = value.value;
    setFilterWord(value);
    if (value === "None") {
      getPosts().then((posts) => {
        setPosts(posts);
      });
    } else {
      getPosts().then((posts) => {
        posts = posts.filter((post) =>
          post.word === value
        );
        setPosts(posts);
      });
    }
  }

  const sortedPosts = posts.sort((a, b) => {
    if (a.word < b.word) {
      return -1;
    }
    if (a.word > b.word) {
      return 1;
    }
    return 0;
  });

  // const groupedPosts = sortedPosts.reduce((groups, post) => {
  //   const group = groups[post.word] || [];
  //   group.push(post);
  //   groups[post.word] = group;
  //   return groups;
  // }, {});

  const sortedResults = results.sort((a, b) => {
    if (a.word < b.word) {
      return -1;
    }
    if (a.word > b.word) {
      return 1;
    }
    return 0;
  });

  // const groupedResults = sortedResults.reduce((groups, result) => {
  //   const group = groups[post.word] || [];
  //   group.push(post);
  //   groups[post.word] = group;
  //   return groups;
  // }, {});

  const groupedData = sortedPosts.reduce((groups, post) => {
    const group = groups[post.word] || { posts: [], results: [] };
    const result = sortedResults.find((result) => result.word === post.word);
    group.posts.push(post);
    if (result) {
      group.results.push(result);
    }
    groups[post.word] = group;
    return groups;
  }, {});

  // let sortedData = [];

  // sortedData.forEach((item) => {
  //   const word = item.word;
  //   if (!groupedData[word]) {
  //     groupedData[word] = { results: [], posts: [] };
  //   }
  //   if (item.type === "result") {
  //     groupedData[word].results.push(item);
  //   } else if (item.type === "post") {
  //     groupedData[word].posts.push(item);
  //   }
  // });
  

  // console.log(groupedContent);

  // function onFilterChange(value) {
  //   value = value.value;
  //   console.log(value);
  //   setFilterWord(value);
  //   if (value === "None") {
  //     getPosts().then((posts) => {
  //       setContent(posts);
  //     });
  //     return;
  //   }

  //   getPosts().then((posts) => {
  //     console.log(posts);
  //     posts = posts.filter((post) =>
  //       post.word === value
  //     );
  //     console.log(posts);
  //     setContent(posts);
  //   });
  // }

  // useEffect(() => {
  //   getResults().then((results) => {
  //   setContent(results);

  //   let now = moment().subtract(4, 'hours').unix();
  //   console.log(now);
  //   let fourHourCount = results.filter((results) => {
  //     if (results.created >= now){
  //       return true;
  //     }
  //     return false;
  //   })
  //   setPostsIn4Hours(fourHourCount.length);
  //   });
  // }, []);

  // const sortedNews = content.sort((a, b) => {
  //   if (a.word < b.word) {
  //     return -1;
  //   }
  //   if (a.word > b.word) {
  //     return 1;
  //   }
  //   return 0;
  // });

  // const groupedNews = sortedNews.reduce((groups, result) => {
  //   const group = groups[result.word] || [];
  //   group.push(result);
  //   groups[result.word] = group;
  //   return groups;
  // }, {});

  // console.log(groupedNews);

  return (
  <>
     <div>
      <Navbar isSplit={isSplit} toggleSplitScreen={toggleSplitScreen} />
      {/* rest of the home page content */}
    </div>
      {isSplit ? (
      <>
        <h1>Posts in last 4 hours including weapons of mass destruction: {postsIn4Hours}</h1>
        <br />
        <br />
        <h1>Filter for word: </h1>
        <Select placeholder={filterWord} isSearchable={false} options={options} value={filterWord} onChange={value => onFilterChange(value)}/>
        <h1>Current word: {filterWord}</h1>
        <hr />
        <div className="container">
          <div className="column">
          <h1>Reddit</h1>
          <br />
            {Object.entries(groupedData).map(([word, data]) => (
              <Folder key={word} name={word}>
                {data.posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </Folder>
            ))}
          </div>
          <div className="column">
          <h1>News</h1>
          <br />
            {Object.entries(groupedData).map(([word, data]) => (
              <Folder key={word} name={word}>
                {data.results.map((result) => (
                  <Result key={result._id} result={result} />
                ))}
              </Folder>
            ))}
          </div>
        </div>
      </>
      ) : (

    <div className="single-column">
      <>
      <h1>Posts in last 4 hours including weapons of mass destruction: {postsIn4Hours}</h1>
      <br />
      <br />
      <h1>Filter for word: </h1>
      <Select placeholder={filterWord} isSearchable={false} options={options} value={filterWord} onChange={value => onFilterChange(value)}/>
      <h1>Current word: {filterWord}</h1>
      <hr />
      {Object.entries(groupedData).map(([word, data]) => (
      <Folder key={word} name={word}>
        {data.posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {data.results.map((result) => (
          <Result key={result._id} result={result} />
        ))}
        </Folder>
      ))}
        </>
    </div>
      )}
      </>
  );
}

export default Home;

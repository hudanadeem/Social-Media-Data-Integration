// import React from 'react';
import "../../App.css";
import "./Home.css";
// import MainSection from '../MainSection'
import Post from "../../Post";
import { getPosts } from "../.././api/api";
import Folder from "../../Folder";
import React, { useState, useEffect } from "react";
import Select from "react-select";

function Home() {
  const [content, setContent] = useState([]);
  const [filterWord, setFilterWord] = useState("None");

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
      setContent(posts);
    });
  }, []);

  useEffect(() => {

  }, [content]);

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

  console.log(groupedContent);

  function onFilterChange(value) {
    value = value.value;
    console.log(value);
    setFilterWord(value);
    if (value === "None") {
      getPosts().then((posts) => {
        setContent(posts);
      });
      return;
    }

    getPosts().then((posts) => {
      console.log(posts);
      posts = posts.filter((post) =>
        post.word === value
      );
      console.log(posts);
      setContent(posts);
    });
  }

  return (
    <>
      <h1>Filter for word: </h1>
      <Select placeholder={filterWord} isSearchable={false} options={options} value={filterWord} onChange={value => onFilterChange(value)}/>
      <h1>Current word: {filterWord}</h1>
      <hr />
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

  function Test() {
    if (filterWord == "None") {
      return <></>;
    }
  }
}

export default Home;

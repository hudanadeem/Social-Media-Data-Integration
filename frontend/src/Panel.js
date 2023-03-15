import React, { useEffect, useState } from "react";
import "./App.css";
import { getPosts } from "./api/api";
import Select from 'react-select';

function Panel(props) {
  const [content, setContent] = useState([]);
  const [filterWord, setFilterWord] = useState("None");

  // const options = [
  //   "None",
  //   "Nuke",
  //   "Nuclear Weapon",
  //   "ICBM",
  //   "Bio-weapon",
  //   "Biological Warfare",
  //   "Anthrax",
  //   "Smallpox",
  //   "Plague",
  //   "Germ Warfare",
  //   "Chemical Weapon",
  //   "Nerve Weapon",
  //   "Asphyxiant Weapon",
  //   "Nuclear Bomb",
  // ];

  const options = [
    {value: "None", label: "None"},
    {value: "Nuke", label: "Nuke"},
    {value: "Nuclear Weapon", label: "Nuclear Weapon"},
    {value: "ICBM", label: "ICBM"},
    {value: "Bio-weapon", label: "Bio-weapon"},
    {value: "Biological Warfare", label: "Biological Warfare"},
    {value: "Anthrax", label: "Anthrax"},
    {value: "Smallpox", label: "Smallpox"},
    {value: "Plague", label: "Plague"},
    {value: "Germ Warfare", label: "Germ Warfare"},
    {value: "Chemical Weapon", label: "Chemical Weapon"},
    {value: "Nerve Weapon", label: "Nerve Weapon"},
    {value: "Asphyxiant Weapon", label: "Asphyxiant Weapon"},
    {value: "Nuclear Bomb", label: "Nuclear Bomb"}
  ];

  useEffect(() => {
    getPosts().then((posts) => {
      setContent(posts);
    });
  }, []);

  return (
    <div className="panel">
      <h2>{props.title}</h2>
      <Select isSearchable={false} options={options} value={filterWord} onChange={value => onFilterChange(value)}/>
      <p>{JSON.stringify(content)}</p>
    </div>
  );

  function onFilterChange(value){
    value = value.value;
    console.log(value);
    setFilterWord(value);
    if (value === "None"){
      getPosts().then((posts) => {
        setContent(posts);
      });
      return;
    }

    getPosts().then((posts) => {
      console.log(posts);
      posts = posts.filter(post => post.word.toLowerCase().includes(value.toLowerCase()));
      console.log(posts);
      setContent(posts);
    });
  }
}

export default Panel;

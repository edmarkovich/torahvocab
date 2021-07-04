
import React, { useState, useEffect } from 'react';

import Word from './Word';

function Verse(props) {
  const [text, setText] = useState("");

  useEffect( () => {
		  return fetch('http://localhost:5000/'+props.lang+"?chapter="+props.chapter+"&verse="+props.verse)
		  .then(data => data.json())
		  .then(x => setText(x[0]))
  }, [props.lang, props.verse, props.chapter])

  var arr = text.split(' ')
  console.log("split:", arr)

  return (
    <div className={props.lang}>
      {arr.map((x, idx) => {return <Word key={idx}>{x}</Word>})}
    </div>
  );
}

export default Verse;

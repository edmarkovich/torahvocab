
import React, { useState, useEffect } from 'react';

function Verse(props) {
  const [text, setText] = useState(0);

  useEffect( () => {
		  return fetch('http://localhost:5000/'+props.lang+"?chapter="+props.chapter+"&verse="+props.verse)
		  .then(data => data.json())
		  .then(x => setText(x))
  }, [props.lang, props.verse])

console.log(props.verse)

  return (
    <div class={props.lang}>
      <p>{text}</p>
    </div>
  );
}

export default Verse;

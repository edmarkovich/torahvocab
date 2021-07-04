
import React, { useState, useEffect } from 'react';

function Word(props) {
  const [text, setText] = useState("");

  /*useEffect( () => {
		  return fetch('http://localhost:5000/'+props.lang+"?chapter="+props.chapter+"&verse="+props.verse)
		  .then(data => data.json())
		  .then(x => setText(x[0]))
  }, [props.lang, props.verse, props.chapter])
*/

  return (
    <b>[{props.children}]</b>
  );
}

export default Word;
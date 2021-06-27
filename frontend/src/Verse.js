
import React, { useState, useEffect } from 'react';

function Verse(props) {
  const [text, setText] = useState(0);

  useEffect( () => {
		  return fetch('http://localhost:5000/'+props.lang)
		  .then(data => data.json())
		  .then(x => setText(x))
  }, [props.lang])

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default Verse;

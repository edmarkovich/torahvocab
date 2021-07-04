
import React, { useState, useEffect } from 'react';

function Word(props) {
  const [wordFreqCount, setWordFreqCount] = useState("");


  function defineWord() {
    if (props.setSelectedWord) {
      props.setSelectedWord(props.children)
    }

  }

  useEffect( 
    () => {
        setWordFreqCount( Math.random() > .5?5:0)
    }, [] )

  if (wordFreqCount>0) {
    return <span 
        style={{color: "p1ink", cursor: "pointer"}}
        onClick={defineWord}>
      {props.children} </span>
  } else {
return <span 
        style={{cursor: "pointer"}}
        onClick={defineWord}>
      {props.children} </span>
  }

}

export default Word;
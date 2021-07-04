
import React, { useState, useEffect } from 'react';

function Word(props) {
  const [wordFreqCount, setWordFreqCount] = useState("");



  useEffect( 
    () => {
        setWordFreqCount( Math.random() > .5?5:0)
    }, [] )

  if (wordFreqCount>0) {
    return <span style={{color: "pink", cursor: "pointer"}}>
      {props.children} </span>
  } else {
    return <span>{props.children} </span>
  }

}

export default Word;
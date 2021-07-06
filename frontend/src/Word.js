
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
      if (!props.wordFreqs) return
      setWordFreqCount(props.wordFreqs[props.children])
    }, [props.wordFreqs, props.children] )

  if (wordFreqCount>1) {
    return <span title={"Occurs:" + wordFreqCount}
        style={{color: "black", cursor: "pointer"}}
        onClick={defineWord}>
      {props.children} </span>
  } else {
return <span 
        style={{color: "gray", cursor: "pointer"}}
        onClick={defineWord}>
      {props.children} </span>
  }

}

export default Word;
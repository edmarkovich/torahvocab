
import React, { useState, useEffect } from 'react';
import {remove} from 'hebrew-transliteration'

function Definition(props) {
  const [definition, setDefinition] = useState(null);


 
  useEffect( () => {
    if(!props.word) return;
    var target = remove(props.word, { removeVowels: true, removeShinDot: true, removeSinDot: true })  

    return fetch('http://localhost:5000/word/' +target)
    .then(data => {return data.json()})
    .then(x => {return setDefinition(x)})
}, [props.word])

if (!definition) return <i>wait</i>
console.log(definition)


function getDefs(root) {
  return root.map( x => {
    if (x.senses) {
      return getDefs(x.senses)
    } else {
      return x.definition
    }
  }).flat()
  .filter( x=> x && x.length>0)
  .sort( (a,b) => b.length - a.length)

}

return <ul>
  {getDefs(definition).map((x, index) => <li key={index}>
    <span dangerouslySetInnerHTML={{__html:x}}/> 
    </li>)}
</ul>

}

export default Definition;
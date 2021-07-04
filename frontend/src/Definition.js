
import React, { useState, useEffect } from 'react';
import {remove} from 'hebrew-transliteration'


function Definition(props) {
  const [definition, setDefinition] = useState(null);



  var target = remove(props.word, { removeVowels: true, removeShinDot: true, removeSinDot: true })

  useEffect( () => {
    return fetch('http://localhost:5000/word/') //todo +target
    .then(data => {console.log(data); return data.json()})
    .then(x => setDefinition(x))
}, [target])

if (!definition) return <i>wait</i>
console.log(definition)
return <div>
  {definition.map((x, index) => <p key={index}>
    <span dangerouslySetInnerHTML={{__html:x}}/> </p>)}
</div>

}

export default Definition;
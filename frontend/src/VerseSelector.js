import React, { useState, useEffect } from 'react';


function VerseSelector(props) {

    const [shape, setShape] = useState([]);

    function next() { 
        props.setVerse(props.verse+1) 
        if (props.verse+1 === shape[props.chapter]) {
            props.setChapter(props.chapter+1)
            props.setVerse(0)
        }
    }
    function prev() { props.setVerse(props.verse-1) }


    useEffect( () => {
        return fetch('http://localhost:5000/shape')
        .then(data => data.json())
        .then(x => setShape(x))
    }, [])

    return (
        <div  className="controls" >
        <span onClick={next}>Next</span>&nbsp;📜&nbsp;
        <span onClick={prev}>Previous</span><br/>
        Genesis {props.chapter+1}:{props.verse+1} / {shape[props.chapter]}
        </div>    
    )
}

export default VerseSelector
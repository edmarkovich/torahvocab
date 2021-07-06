import React, { useState, useEffect } from 'react';


function VerseSelector(props) {

    const [shape, setShape] = useState([]); 
    const books = ["Genesis"  ,  "Exodus"  ,  "Leviticus"  ,  "Numbers"  ,  "Deuteronomy"]

    function next() { 
        props.setVerse(props.verse+1) 
        if (props.verse+1 === shape[props.chapter]) {
            props.setChapter(props.chapter+1)
            props.setVerse(0)
        }
    }
    function prev() { props.setVerse(props.verse-1) }

    function nextBook() {
      var idx = books.indexOf(props.book)
      if (idx < books.length-1) {
        props.setBook(books[idx+1])
      }
    }

    function prevBook() {
      var idx = books.indexOf(props.book)
      if (idx > 0) {
        props.setBook(books[idx-1])
      }
    }  

    useEffect( () => {
        return fetch('http://localhost:5000/shape?book='+props.book)
        .then(data => data.json())
        .then(x => setShape(x))
    }, [props.book])

    return (
        <div className="controls" style={{cursor: "pointer"}}>
          <span onClick={nextBook}>←</span>
          {props.book} 
          <span onClick={prevBook}>→</span>

          <br/>

          <span onClick={next}>←</span>
          {props.chapter+1}:{props.verse+1}
          <span onClick={prev}>→</span><br/>
        </div>    
    )
}

export default VerseSelector
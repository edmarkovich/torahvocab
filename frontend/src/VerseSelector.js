import React, { useState, useEffect } from 'react';


function VerseSelector(props) {

    const [shape, setShape] = useState([]);
    const [book, setBook]   = useState("Genesis")
 
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
      var idx = books.indexOf(book)
      if (idx < books.length-1) {
        setBook(books[idx+1])
      }
    }

    function prevBook() {
      var idx = books.indexOf(book)
      if (idx > 0) {
        setBook(books[idx-1])
      }
    }  

    useEffect( () => {
        return fetch('http://localhost:5000/shape?book='+book)
        .then(data => data.json())
        .then(x => setShape(x))
    }, [book])

    return (
        <div className="controls" >
          <span onClick={nextBook}>←</span>
          {book} 
          <span onClick={prevBook}>→</span>

        <br/>

        {props.chapter+1}:{props.verse+1} / {shape[props.chapter]}
        <span onClick={next}>Next</span>&nbsp;📜&nbsp;
        <span onClick={prev}>Previous</span><br/>
        </div>    
    )
}

export default VerseSelector
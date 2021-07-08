import React, { useState, useEffect } from 'react';


function VerseSelector(props) {

    const [shape, setShape] = useState([]); 
    const [bookmarkLoaded, setBookmarkLoaded] = useState(false)
    const books = ["Genesis"  ,  "Exodus"  ,  "Leviticus"  ,  "Numbers"  ,  "Deuteronomy"]

    function nextVerse() { 
        props.setVerse(props.verse+1) 
        if (props.verse+1 === shape[props.chapter]) {
            props.setChapter(props.chapter+1)
            props.setVerse(0)
        }
    }
    function prevVerse() { props.setVerse(props.verse-1) }

    function nextChap() {
      props.setChapter(props.chapter+1)
      props.setVerse(0)
    }

    function prevChap() {
      props.setChapter(props.chapter-1)
      props.setVerse(0)
    }

    function nextBook() {
      var idx = books.indexOf(props.book)
      if (idx < books.length-1) {
        props.setBook(books[idx+1])
      }
      saveBookmark()
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

    useEffect( () => {
      if (bookmarkLoaded) return
      setBookmarkLoaded(true)
      return fetch('http://localhost:5000/user/ed/bookmark')
      .then(data => data.json())
      .then(x => {      
        props.setBook(x.book)
        props.setChapter(x.chapter)
        props.setVerse(x.verse)
      })
    }, [bookmarkLoaded])

    useEffect( () => {
      saveBookmark()
    }, [props.book, props.chapter, props.verse])

    function saveBookmark() {
      fetch('http://localhost:5000/user/ed/bookmark', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({book: props.book, chapter: props.chapter, verse: props.verse, dir:"out"})
      })
    }
    
    

    return (
        <div className="controls" style={{cursor: "pointer"}}>
          <span onClick={nextBook} className="arrow">←</span>
          {props.book} 
          <span onClick={prevBook} className="arrow">→</span>

          <span onClick={nextChap} className="arrow">←</span>
          {props.chapter+1}
          <span onClick={prevChap} className="arrow">→</span>

          :

          <span onClick={nextVerse} className="arrow">←</span>
          {props.verse+1}
          <span onClick={prevVerse} className="arrow">→</span><br/>
        </div>    
    )
}

export default VerseSelector
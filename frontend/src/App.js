import { useState } from 'react';
import './App.css';

import Verse from './Verse';
import VerseSelector from './VerseSelector';
import Definition from './Definition';


function App() {
  const  [verse, setVerse] = useState(0)
  const  [chapter, setChapter] = useState(0)
  const  [book, setBook] = useState("Genesis")
  const  [selectedWord, setSelectedWord] = useState(null)

  return (
    <div>
          <VerseSelector verse={verse} setVerse={setVerse} 
                         chapter={chapter} setChapter={setChapter} 
                         book={book} setBook={setBook}/>

          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <div className="center">
            <Verse lang="heb" chapter={chapter} verse={verse} book={book}
              setSelectedWord={setSelectedWord}/>
            <Verse lang="eng" chapter={chapter} verse={verse} book={book}/>
          </div>

          <br/><br/><br/>
          <Definition word={selectedWord} />
    </div>
  );
}

export default App;

import { useState , useEffect} from 'react';
import './App.css';

import Verse from './Verse';
import VerseSelector from './VerseSelector';
import Definition from './Definition';


function App() {
  const  [verse, setVerse] = useState(0)
  const  [chapter, setChapter] = useState(0)
  const  [book, setBook] = useState("Genesis")
  const  [selectedWord, setSelectedWord] = useState(null)
  const  [wordFreqs, setWordFreqs] = useState(null)

  useEffect( 
    () => {

          return fetch('http://localhost:5000/word_freqs')
          .then(data => data.json())
          .then(x => setWordFreqs(x))
    }, [] )

  if (!wordFreqs) return <b>Hang on..</b>

  return (
    <div>
          <VerseSelector verse={verse} setVerse={setVerse} 
                         chapter={chapter} setChapter={setChapter} 
                         book={book} setBook={setBook}/>

          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <div className="center">
            <Verse lang="heb" chapter={chapter} verse={verse} book={book}
              setSelectedWord={setSelectedWord} wordFreqs={wordFreqs}/>
            <Verse lang="eng" chapter={chapter} verse={verse} book={book}/>
          </div>

          <br/><br/><br/>
          <Definition word={selectedWord} />
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';

import Verse from './Verse';
import VerseSelector from './VerseSelector';
import Definition from './Definition';


function App() {
  const  [verse, setVerse] = useState(0)
  const  [chapter, setChapter] = useState(0)

  return (
    <div>
          <VerseSelector verse={verse} setVerse={setVerse} 
                         chapter={chapter} setChapter={setChapter} />

          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <div className="center">
            <Verse lang="heb" chapter={chapter} verse={verse}/>
            <Verse lang="eng" chapter={chapter} verse={verse}/>
          </div>

          <br/><br/><br/>
          <Definition word="בְּרֵאשִׁית" />
    </div>
  );
}

export default App;

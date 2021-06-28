import { useState } from 'react';
import './App.css';

import Verse from './Verse';
import VerseSelector from './VerseSelector';

function App() {
  const  [verse, setVerse] = useState(0)

  return (
    <div>
          <VerseSelector verse={verse} setVerse={setVerse} />
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <div class="center">
            <Verse lang="heb" verse={verse}/>
            <Verse lang="eng" verse={verse}/>
          </div>
    </div>
  );
}

export default App;

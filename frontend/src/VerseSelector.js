

function VerseSelector(props) {
    function next() { props.setVerse(props.verse+1) }
    function prev() { props.setVerse(props.verse-1) }

    return (
        <div  class="controls" >
        <span onClick={next}>Next</span>&nbsp;📜&nbsp;
        <span onClick={prev}>Previous</span><br/>
        Genesis 1:{props.verse+1}
        </div>    
    )
}

export default VerseSelector
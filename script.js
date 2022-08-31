const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

localStorage.setItem('highscore', 0);

let startFlag = true;
let highScore = 0;
let words =[];
let wordIndex = 0;

let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const highScoreElement = document.getElementById('highscore');


document.getElementById('start').addEventListener('click', () => {
    
    const quoteIndex = Math.floor(Math.random() * quotes.length); /* randomly selects a quote */
    
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(function(word){ return `<span>${word} </span>`}); /* stores each word split from quote as span element into array */
    
    quoteElement.innerHTML = spanWords.join(''); 

    quoteElement.childNodes[0].className = 'highlight';

    messageElement.innerText = '';

    typedValueElement.value = '';

    typedValueElement.focus();

    startTime = new Date().getTime();

    typedValueElement.disabled = false;
    startFlag = true;
});


if (startFlag) {
	typedValueElement.addEventListener('input', function _listener() {
	    const currentWord = words[wordIndex];
	    const typedValue = typedValueElement.value;
	    if (typedValue === currentWord && wordIndex === words.length - 1 ) { /* quote end */
	
	        const elapsedTime = (new Date().getTime() - startTime) / 1000;

            const wpm = (words.length * 60) / elapsedTime;
	
	        const message = `Finished in ${elapsedTime} seconds, with speed of ${wpm} words per minute.`;
	
	        messageElement.innerText = message;
	
	        typedValueElement.disabled = true;
	
	        if (highScore < wpm) {
	            localStorage.setItem('highscore', wpm);
	            highScore = wpm;
	        }
	
	        const highScoreMessage = `Highscore => ${wpm} wpm`;
	        highScoreElement.innerText = highScoreMessage;
	
	        setTimeout(() => {
	                alert('Success!');
	            }, 10);
            
            startFlag = false;
	    
	    } else if (typedValue.endsWith = (' ') && typedValue.trim() === currentWord) { /** new word */
	
	        typedValueElement.value = '';
	
	        wordIndex++;
	        
	        for (const wordElement of quoteElement.childNodes) {  
	            wordElement.className = '';
	        }
	
	        quoteElement.childNodes[wordIndex].className = 'highlight';
	
	    } else if ( currentWord.startsWith(typedValue) ) {
	        typedValueElement.className = '';
	    
	    } else {
	        typedValueElement.className = 'error';
	    
	    }
	}, true);
}
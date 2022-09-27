importScripts('../dictionary.js');
const calculations = {
    dictionaryIndex: null,
    subDictionary: null,
    weakestLetters: null,
    currentLetters: null,
    updateSubDictionaryNeeded: null,
    getNewWordSets: (wordsPerSet, weakestLetters, currentLetters, subDictionary, dictionaryIndex, updateSubDictionaryNeeded) => {
        // Initialize Properties
        calculations.dictionaryIndex = dictionaryIndex;
        calculations.subDictionary = subDictionary;
        calculations.weakestLetters = weakestLetters;
        calculations.currentLetters = currentLetters;
        calculations.updateSubDictionaryNeeded = updateSubDictionaryNeeded;

        if(updateSubDictionaryNeeded) {
          calculations.subDictionary = calculations.updateSubDictionary();
        }
        
        let currentWords = [];
        for (let i = 0; i < wordsPerSet; i++) {
          currentWords.push(calculations.getWordWithLetters());
        }
        
        return {
          key: ["currentWords", "dictionaryIndex", "subDictionary"],
          value: [currentWords, calculations.dictionaryIndex, calculations.subDictionary]
        }
    },
    getWordWithLetters() {
      let letters = calculations.weakestLetters;
      for(const letter of letters) {
        if(!calculations.currentLetters.includes(letter)) {
          letters = [];
          break;
        }
      }
      let word = '';
      let found = false;
      while(!found) {
        found = true;
        word = calculations.getWord();
        if(!word) {
          found = false;
          calculations.weakestLetters = calculations.weakestLetters.slice(0, calculations.weakestLetters.length -1)
          letters = calculations.weakestLetters;
          calculations.dictionaryIndex = 0;
        } else {
          for (const letter of letters) {
            if(!word.includes(letter)) {
              found = false;
            };
          }
        }
      }
      return word;
    },
    getWord() {
      // // determine a random word length
      // let wordLength = Math.floor(Math.random() * (calculations.max - (calculations.min - 1))) + calculations.min;

      // // get word of length wordLength from dictionary
      // return calculations.getWordWithLength(wordLength);
      
      let word = calculations.subDictionary[calculations.dictionaryIndex];
      // word = filter.clean(word);
      // while(!word.trim()) {
      //   calculations.nextDictionaryIndex();
      //   word = filter.clean(calculations.subDictionary[calculations.dictionaryIndex]);
      // }
      calculations.nextDictionaryIndex();
      return word;
    },
    nextDictionaryIndex() {
        calculations.dictionaryIndex == calculations.subDictionary.length ? calculations.dictionaryIndex = 0 : calculations.dictionaryIndex++;
    },
    updateSubDictionary(){
      let letters = calculations.currentLetters;
      // get a subset from dictionary
      // only words made from 'letters'
      let alphabet = 'abcdefghijklmnopqrstuvwxyz';
      while(letters.length) {
        alphabet = alphabet.replace(letters[0], '');
        letters = letters.substring(1);
      }
      // let pattern = '/^['+ alphabet +']*$/';
      // let re = new RegExp(pattern, "g");
      // return dictionary.filter(word => word.match(re, "regex"))
      let subDictionary = dictionary.filter(word => {
        for (const letter of alphabet) {
          if (word.includes(letter)) return false;
        }
        return true;
      })
      
      calculations.shuffleArray(subDictionary);
      return subDictionary;        
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
}

addEventListener("message", (event) => {
    postMessage({ key: "loadingWords", value: true});
    if (Object.keys(calculations).includes(event.data.method)) {
        postMessage(calculations[event.data.method](...event.data.args));
    } else {
        postMessage({
            key: "error",
            value: "No calculation found " + (event.data.method ? 'for type ' + event.data.method : ''),
        });
    }
    postMessage({ key: "loadingWords", value: false });
});

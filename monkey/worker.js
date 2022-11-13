onmessage = (e) => {
    const data = e.data;
    data.word = generateWord(data);
    data.tries++;
    postMessage(data);
}

const generateWord = ({ target, possibilities }) => {
    let word = "";
    for (let index = 0; index < target.length; index++) {
        const rand = Math.floor(Math.random() * possibilities.length);
        word += possibilities[rand];
    }
    return word;
}
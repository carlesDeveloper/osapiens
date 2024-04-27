export function limitSentence(s, K) {
    let orSentenceLength = s.length
    if(orSentenceLength <= K){
        if(s === ""){
            return "..."
        }else{
            return s
        }
    }

    let orSentenceWords = s.split(" ")
    let sentenceLimited = s.substring(0, K-4)
    let sentenceLimitedWords = sentenceLimited.split(" ")

    let nwordsLimited = sentenceLimitedWords.length
    
    if(orSentenceWords[nwordsLimited - 1] !== sentenceLimitedWords[nwordsLimited - 1]){
        sentenceLimitedWords.pop()
    }
    if(sentenceLimitedWords.length === 0){
        return "..."
    }
    let result = sentenceLimitedWords.join(" ")+" ..."
    return result
}


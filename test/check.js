function pronounceWord(word) {
  console.log(word);
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // Japanese
  window.speechSynthesis.speak(utterance);
}

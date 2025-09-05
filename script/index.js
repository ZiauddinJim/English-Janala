const lessonLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};
const displayLesson = (lessons) => {
  // Step: 1 get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // Step: 2 get into every lesson
  lessons.forEach((leesson) => {
    // Step: 3 Create Element
    const levelBtn = document.createElement("div");
    levelBtn.innerHTML = `
    <button  onclick="loadLevelWord(${leesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson -${leesson.level_no}</button>
    `;
    // Step: 4 append into container
    levelContainer.appendChild(levelBtn);
  });
};

// Section: Word
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayLevelWord(json.data));
};
const displayLevelWord = (words) => {
  // Step: 1
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center font-bangla col-span-full my-20 w-fit mx-auto">
                <img src="./assets/alert-error.png" alt="" class="mx-auto mb-5">
                <p class="text-gray-500 mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-3xl font-semibold">নেক্সট Lesson এ যান</p>
             </div>
    `;
    return;
  }
  // Step: 2
  words.forEach((word) => {
    // Step: 3
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="text-center py-10 px-4 h-full bg-white rounded-xl">
        <h1 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h1>
        <p class="text-lg my-3">Meaning /Pronounciation</p>
        <p class="font-bangle font-semibold text-xl text-gray-600">${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } /${word.pronunciation ? word.pronunciation : " পাওয়া যায়নি"}</p>
        <div class="flex justify-between mt-8">
            <button class="btn btn-square btn-outline btn-primary">
                <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn btn-square btn-outline btn-primary">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        </div>
    `;
    // Step: 4
    wordContainer.appendChild(wordCard);
  });
};

lessonLevel();

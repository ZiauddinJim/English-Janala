const lessonLevel = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((response) => response.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

// Section: Function
const displayLesson = (lessons) => {
  // Step: 1 get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // Step: 2 get into every lesson
  lessons.forEach((leesson) => {
    // Step: 3 Create Element
    const levelBtn = document.createElement("div");
    levelBtn.innerHTML = `
    <button id="lesson-btn-${leesson.level_no}" onclick="loadLevelWord(${leesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson -${leesson.level_no}</button>
    `;
    // Step: 4 append into container
    levelContainer.appendChild(levelBtn);
  });
};

// Section:  removeActive function create
const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};

// Section: Word
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class
      displayLevelWord(json.data);
    });
};

// Section:
const displayLevelWord = (words) => {
  // Step: 1
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full my-20 w-fit mx-auto">
                <img src="./assets/alert-error.png" alt="" class="mx-auto mb-5">
                <p class="text-gray-500 mb-3 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-3xl font-semibold font-bangla">নেক্সট Lesson এ যান</p>
             </div>`;
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
            <button onclick="loadWordDetails(${
              word.id
            })" class="btn btn-square btn-outline btn-primary">
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

// Section: Load Word Details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const details = await response.json();
  displayLoadWordDetails(details.data);
};
// Section: Display load word details
const displayLoadWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="p-3 border-1 border-blue-200 rounded-lg">
                    <h3 class="text-xl font-bold">${
                      word.word
                    } (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })</h3>
                    <p class="font-bold mt-6">Meaning</p>
                    <p class="mt-3 font-bangla font-semibold">${
                      word.meaning
                    }</p>
                    <p class="font-bold mt-6">Example</p>
                    <p class="py-3">${word.sentence}</p>
                    <p class="font-bold mt-3 font-bangla">সমার্থক শব্দ গুলো</p>
                    <div class="flex flex-wrap gap-2">
                    ${word.synonyms
                      .map(
                        (synonyms) =>
                          `<div class="badge badge-lg bg-[#EDF7FF]">${synonyms}</div>`
                      )
                      .join("")}
                    </div>                    
                    <div class="modal-action flex justify-start">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary">Complete Learning</button>
                        </form>
                    </div>
                </div>
  `;
  document.getElementById("word_modal").showModal();
};

lessonLevel();

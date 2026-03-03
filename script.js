const loadLevel = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(req=>req.json())
    .then(level=>displaylevel(level.data)
    )
}
const displaylevel = (lessons)=>{
    for(let lesson of lessons){
        const allLessons = document.getElementById('all-lessons')
        const btn = document.createElement('button')
        btn.innerHTML = `
        <button id="btn-${lesson.level_no}" class="lesson-btn btn btn-outline btn-primary" onclick = "word(${lesson.level_no})"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>
        `
        allLessons.appendChild(btn)
    }
    };
const word = (levelNo)=>{
    const url = `https://openapi.programming-hero.com/api/level/${levelNo}`
    fetch(url)
    .then(req=>req.json())
    .then(data=>{
        const allBtn = document.getElementsByClassName('lesson-btn')
        for(let btn of allBtn){  
            btn.classList.remove('active')
        }
        const clickedBtn = document.getElementById(`btn-${levelNo}`)
        clickedBtn.classList.add('active')
        displayWord(data.data) 
    })
    const displayWord=(words)=>{
        const displayWords = document.getElementById('lesson-display')
        displayWords.innerHTML = ''
         if(words.length === 0){
            displayWords.innerHTML = `
            <div class="default-text col-span-full text-center py-16">
            <div class="alertImage flex justify-center"><img src="images/alert-error.png" alt=""></div>

        <p class="text-[13px] hind-siliguri-medium text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-[35px] hind-siliguri-medium">নেক্সট Lesson এ যান</h2>
          </div>
          `
        }
    for(let word of words){
        if(word.meaning === null || word.meaning === undefined){
            word.meaning = 'কোন অর্থ পাওয়া যায়নি'
        }
        if(word.pronunciation === null || word.pronunciation === undefined){
            word.pronunciation = 'কোন উচ্চারণ পাওয়া যায়নি'
        }
        
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="words bg-white  m-4 rounded-xl py-14">
            <div class="text-contents text-center">
            <h1 class="font-bold text-[20px] mb-3">${word.word}</h1>
            <p class="font-medium mb-6">Meaning /Pronounciation</p>
            <p class="font-medium text-2xl hind-siliguri-medium">"${word.meaning} / ${word.pronunciation}"</p>
            </div>
            <div class="btns flex justify-between px-8 mt-6">
              <button class="btn" onclick="showModal(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
    `
        displayWords.appendChild(div)
    }

}
}
  const showModal = (id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(infos=>console.log(infos.data)
    )
    
    const displayDetails = document.getElementById('displaydetails')
    const showModal = document.getElementById('my_modal_1')
    // displayDetails.innerHTML = 
    
    showModal.showModal();
  
}
loadLevel();



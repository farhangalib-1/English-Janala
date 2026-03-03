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
    for(let word of words){
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="words bg-white  m-4 rounded-xl py-14">
            <div class="text-contents text-center">
            <h1 class="font-bold text-[20px] mb-3">${word.word}</h1>
            <p class="font-medium mb-6">Meaning /Pronounciation</p>
            <p class="font-medium text-2xl hind-siliguri-medium">"${word.meaning} / ${word.pronunciation}"</p>
            </div>
            <div class="btns flex justify-between px-8 mt-6">
              <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
              <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
    `
        displayWords.appendChild(div)
    }

}
}

/*
 
{id: 5,
level: 1,
word: 'Eager', 
meaning: 'আগ্রহী', 
: 'ইগার'}
*/

loadLevel();



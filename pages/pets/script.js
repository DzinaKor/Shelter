//  Pets
let pets_array = [];
let pets_page = 0;

async function getJSON() {
    const response = await fetch("../pets.json");
    const json = await response.json();
    return json;
}

window.addEventListener("resize", ()=>{
	setPetsCards();
    setPetsButtons();
})

const getVW = ()=>{
    const vw = document.documentElement.clientWidth;
    let cnt = 8;
    if(Number(vw) <= 1280)  cnt = 8;
    if(Number(vw) <= 800)  cnt = 6;
    if(Number(vw) <= 320)  cnt = 3;
    return cnt;
}

const showPetWindow = (id)=>{
    console.log(" pets "+pets_array[id]["name"]);
}

const setPet = (id)=>{
    const pets_friends_content = document.querySelector(".pets_friends_content");
    const petEl = document.createElement("div");
    petEl.classList.add("pets_list");
    petEl.classList.add("pets_pet");
    petEl.id = "pet_"+id;

    const petImg = document.createElement("div");
    petImg.classList.add("pet_img");
    petImg.style.backgroundImage = ' url("'+pets_array[id]["img"]+'")';
    petEl.appendChild(petImg);

    const petP = document.createElement("p");
    petP.classList.add("pet_text");
    petP.textContent = pets_array[id]["name"];
    petEl.appendChild(petP);

    const petButton = document.createElement("button");
    petButton.classList.add("button_style_white");
    petButton.textContent = "Learn more";
    const i = id;
    petButton.addEventListener("click", (event)=>{
        showPetWindow(i);
    });
    petEl.appendChild(petButton);

    pets_friends_content.appendChild(petEl);
}

const setPetsCards = ()=>{
    const pets_friends_content = document.querySelector(".pets_friends_content");
    let cnt = getVW();
    let i = 0 + pets_page * cnt;
    let i_max = pets_array.length;
    if( i + cnt < i_max  )    i_max = i + cnt;
    //    console.log("---  "+i+"  ----"+i_max+" ");
    if( i < i_max ){
        pets_friends_content.innerHTML = "";
        for( i; i < i_max; i++ ){
            setPet(i);
        }
    }
}

const changePageStart = ()=>{
    pets_page = 0;
    setPetsCards();
    setPetsButtons();
}
const changePageEnd = ()=>{
    const cnt = getVW();
    pets_page = Math.floor(pets_array.length / cnt);
    setPetsCards();
    setPetsButtons();
}
const changePagePast = ()=>{
    const cnt = getVW();
    if(pets_page - 1 >= 0 ){
        pets_page -= 1;
        setPetsCards();
        setPetsButtons();
    }
}
const changePageNext = ()=>{
    const cnt = getVW();
    if(Math.floor(pets_array.length / cnt) >= pets_page + 1 ){
        pets_page += 1;
        setPetsCards();
        setPetsButtons();
    }
}

const setPetsButtons = ()=>{
    const pets_friends_buttons = document.querySelector(".pets_friends_buttons");
    const cnt = getVW();
    const max_page = Math.floor(pets_array.length / cnt);
    let endList = false;
    if(pets_array.length == max_page * cnt) endList = true;

    pets_friends_buttons.innerHTML = "";

    const buttonS = document.createElement("div");
    buttonS.classList.add("button_set_page");
    if(pets_page == 0){
        buttonS.classList.add("button_set_page_inactive");
    }else{
        buttonS.addEventListener("click", (event)=>{
            changePageStart();
        });
    }
    buttonS.textContent = "<<";
    pets_friends_buttons.appendChild(buttonS);

    
    const buttonP = document.createElement("div");
    buttonP.classList.add("button_set_page");
    if(pets_page == 0){
        buttonP.classList.add("button_set_page_inactive");
    }else{
        buttonP.addEventListener("click", (event)=>{
            changePagePast();
        });
    }
    buttonP.textContent = "<";
    pets_friends_buttons.appendChild(buttonP);

    let max_view_page = max_page;
    if(endList) max_view_page -= 1;
    let i = 0;
    for( i; i <= max_view_page; i++){
        const buttonC = document.createElement("div");
        buttonC.classList.add("button_set_page");
        if(pets_page == i){
            buttonC.classList.add("button_set_page_active");
        }
        const thisPage = i;
        buttonC.addEventListener("click", (event)=>{
            pets_page = thisPage;
            setPetsCards();
            setPetsButtons();
        });
        buttonC.textContent = i+1;
        pets_friends_buttons.appendChild(buttonC);
    }


    const buttonN = document.createElement("div");
    buttonN.classList.add("button_set_page");
    if(pets_page == max_page || endList){
        buttonN.classList.add("button_set_page_inactive");
    }else{
        buttonN.addEventListener("click", (event)=>{
            changePageNext();
        });
    }
    buttonN.textContent = ">";
    pets_friends_buttons.appendChild(buttonN);


    const buttonE = document.createElement("div");
    buttonE.classList.add("button_set_page");
    if(pets_page == max_page || endList){
        buttonE.classList.add("button_set_page_inactive");
    }else{
        buttonE.addEventListener("click", (event)=>{
            changePageEnd();
        });
    }
    buttonE.textContent = ">>";
    pets_friends_buttons.appendChild(buttonE);


}

const run = () => {
    getJSON().then().then((json_arr)=>{
        pets_array = json_arr;
        setPetsCards();
        setPetsButtons();
    });
}
run();
//  +Сделать липкий header
//  Main
let pets_array = [];

async function getJSON() {
    const response = await fetch("../pets.json");
    const json = await response.json();
    return json;
}

window.addEventListener("resize", ()=>{
	setPetsCards();
})

const getVW = ()=>{
    const vw = document.documentElement.clientWidth;
    let cnt = 3;
    if(Number(vw) <= 1280)  cnt = 3;
    if(Number(vw) <= 1000)  cnt = 2;
    if(Number(vw) <= 750)  cnt = 1;
    return cnt;
}

const setPet = (id)=>{
    const pets_friends_content = document.querySelector(".pets_list_conteiner");
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
    const pets_friends_content = document.querySelector(".pets_list_conteiner");
    let cnt = getVW();
    let i = 0;
    //	let i_max = pets_array.length;
    //    console.log("---  "+i+"  ----"+i_max+" ");
	pets_friends_content.innerHTML = "";
	for( i; i < cnt; i++ ){
		setPet(i);
	}
}


const run = () => {
    getJSON().then().then((json_arr)=>{
        pets_array = json_arr;
        setPetsCards();
    });
}
run();
//  активный элемент меню
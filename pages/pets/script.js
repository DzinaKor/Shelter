//  Pets
let pets_page = 0;

window.addEventListener("resize", () => {
    setPetsCards();
    setPetsButtons();
    toggleMenu(false);
});

window.addEventListener("scroll", () => {
    toggleMenu(false);
});

const getVW = () => {
    const view = document.documentElement.clientWidth;
    let count = 8;
    if (Number(view) <= 1280) count = 8;
    if (Number(view) <= 1200) count = 6;
    if (Number(view) <= 700) count = 3;
    return count;
}


const setPet = (id) => {
    const pets_friends_content = document.querySelector(".pets_friends_content");
    const petEl = document.createElement("div");
    petEl.classList.add("pets_list");
    petEl.classList.add("pets_pet");
    petEl.id = "pet_" + id;

    const petImg = document.createElement("div");
    petImg.classList.add("pet_img");
    petImg.style.backgroundImage = ' url("' + pets_array[id]["img"] + '")';
    petEl.appendChild(petImg);

    const petP = document.createElement("p");
    petP.classList.add("pet_text");
    petP.textContent = pets_array[id]["name"];
    petEl.appendChild(petP);

    const petButton = document.createElement("button");
    petButton.classList.add("button_style_white");
    petButton.textContent = "Learn more";
    petEl.appendChild(petButton);
    const i = id;
    petEl.addEventListener("click", (event) => {
        showPetWindow(i);
    });

    pets_friends_content.appendChild(petEl);
}

const setPetsCards = () => {
    const pets_friends_content = document.querySelector(".pets_friends_content");
    let cnt = getVW();
    let i = 0 + pets_page * cnt;
    let i_max = pets_array.length;
    if (i + cnt < i_max) i_max = i + cnt;

    if (i < i_max) {
        pets_friends_content.innerHTML = "";
        for (i; i < i_max; i++) {
            setPet(i);
        }
    }
}

const changePageStart = () => {
    pets_page = 0;
    setPetsCards();
    setPetsButtons();
}
const changePageEnd = () => {
    const cnt = getVW();

    pets_page = Math.ceil(pets_array.length / cnt) - 1;
    setPetsCards();
    setPetsButtons();
}
const changePagePast = () => {
    const cnt = getVW();
    if (pets_page - 1 >= 0) {
        pets_page -= 1;
        setPetsCards();
        setPetsButtons();
    }
}
const changePageNext = () => {
    const cnt = getVW();

    if (Math.ceil(pets_array.length / cnt) >= pets_page + 1) {
        pets_page += 1;
        setPetsCards();
        setPetsButtons();
    }
}

const setPetsButtons = () => {
    const pets_friends_buttons = document.querySelector(".pets_friends_buttons");
    const cnt = getVW();
    const max_page = Math.ceil(pets_array.length / cnt);
    let endList = false;
    if ((pets_page + 1) == max_page) endList = true;
    //console.log("pets arr count = "+pets_array.length);

    pets_friends_buttons.innerHTML = "";

    const buttonS = document.createElement("div");
    buttonS.classList.add("button_set_page");
    if (pets_page == 0) {
        buttonS.classList.add("button_set_page_inactive");
    } else {
        buttonS.addEventListener("click", (event) => {
            changePageStart();
        });
    }
    buttonS.textContent = "<<";
    pets_friends_buttons.appendChild(buttonS);


    const buttonP = document.createElement("div");
    buttonP.classList.add("button_set_page");
    if (pets_page == 0) {
        buttonP.classList.add("button_set_page_inactive");
    } else {
        buttonP.addEventListener("click", (event) => {
            changePagePast();
        });
    }
    buttonP.textContent = "<";
    pets_friends_buttons.appendChild(buttonP);

    let max_view_page = 0;
    let i = 0;
    for (i; i <= max_view_page; i++) {
        const buttonC = document.createElement("div");
        buttonC.classList.add("button_set_page");
        if (pets_page == i) {
            buttonC.classList.add("button_set_page_active");
        }
        const thisPage = i;
        buttonC.addEventListener("click", (event) => {
        });
        buttonC.textContent = pets_page + 1;
        pets_friends_buttons.appendChild(buttonC);
    }


    const buttonN = document.createElement("div");
    buttonN.classList.add("button_set_page");
    if (pets_page == max_page || endList) {
        buttonN.classList.add("button_set_page_inactive");
    } else {
        buttonN.addEventListener("click", (event) => {
            changePageNext();
        });
    }
    buttonN.textContent = ">";
    pets_friends_buttons.appendChild(buttonN);


    const buttonE = document.createElement("div");
    buttonE.classList.add("button_set_page");
    if (pets_page == max_page || endList) {
        buttonE.classList.add("button_set_page_inactive");
    } else {
        buttonE.addEventListener("click", (event) => {
            changePageEnd();
        });
    }
    buttonE.textContent = ">>";
    pets_friends_buttons.appendChild(buttonE);

}

const petsCardGenerator = (jsArr) => {
    const newArr = jsArr;
    let item = 5;
    for (item; item > 0; item -= 1) {
        for (let i = 0; i <= 1; i += 1) {
            let addPar1 = 0, addPar2 = 2;
            let id1 = 0, id2 = 0, id3 = 0, id4 = 0;
            if (Math.round(Math.random()) === 0) {
                addPar1 = 2;
                addPar2 = 0;
            }
            if (Math.round(Math.random()) === 0) {
                id1 = 4 * i + addPar1 + 0;
                id2 = 4 * i + addPar1 + 1;
            } else {
                id1 = 4 * i + addPar1 + 1;
                id2 = 4 * i + addPar1 + 0;
            }
            if (Math.round(Math.random()) === 0) {
                id3 = 4 * i + addPar2 + 0;
                id4 = 4 * i + addPar2 + 1;
            } else {
                id3 = 4 * i + addPar2 + 1;
                id4 = 4 * i + addPar2 + 0;
            }
            newArr.push(jsArr[id1]);
            newArr.push(jsArr[id2]);
            newArr.push(jsArr[id3]);
            newArr.push(jsArr[id4]);
            //    console.log("   "+id1 + " " + id2 + " " +id3 + " " + id4);
        }
    }
    return newArr;
}

const run = () => {
    getJSON().then().then((json_arr) => {
        pets_array = petsCardGenerator(json_arr);
        setPetsCards();
        setPetsButtons();
    });
}
run();


// menu
const toggleMenu = (show) => {
    if (show) {
        document.querySelector("body").style.overflowY = "hidden";
        document.querySelector(".navigation_vert").classList.add("navigation_vert_show");
        document.querySelector(".menu_button").classList.add("menu_button_vert");
        document.querySelector(".header_logo").classList.add("header_logo_move");
    } else {
        document.querySelector("body").style.overflowY = "";
        document.querySelector(".navigation_vert").classList.remove("navigation_vert_show");
        document.querySelector(".menu_button").classList.remove("menu_button_vert");
        document.querySelector(".header_logo").classList.remove("header_logo_move");
    }
};


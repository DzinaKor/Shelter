//  main
let pets_source = [];
let pets_page = 0;
let max_page = 0;

window.addEventListener("resize", () => {
    setPetsCards();
    toggleMenu(false);
});

window.addEventListener("scroll", () => {
    toggleMenu(false);
});

document.querySelector(".pets_button_left").addEventListener("click", () => {
    if (pets_page - 1 < 0) {
        addPetsCards(-1);
    }
    pets_page -= 1;
    setPetsCards();
});

document.querySelector(".pets_button_right").addEventListener("click", () => {
    if (max_page <= pets_page + 1) {
        addPetsCards(1);
    }
    pets_page += 1;
    setPetsCards();
});

const getVW = () => {
    const view = document.documentElement.clientWidth;
    let count = 3;
    if (Number(view) <= 1280) count = 3;
    if (Number(view) <= 1200) count = 2;
    if (Number(view) <= 750) count = 1;
    return count;
}

const setPet = (id) => {
    const pets_friends_content = document.querySelector(".pets_list_container");
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
    const pets_friends_content = document.querySelector(".pets_list_container");
    let count = getVW();
    max_page = Math.floor(pets_array.length / count);

    let i = 0 + pets_page * count;
    let i_max = pets_array.length;
    if (i + count < i_max) i_max = i + count;
    if (i < i_max) {
        pets_friends_content.innerHTML = "";
        for (i; i < i_max; i++) {
            setPet(i);
        }
    }
    console.log(" page: " + String(pets_page + 1));
}

const genId = (notArr) => {
    const arr = [];
    for (let i = 0; i < 8; i += 1) {
        if (!notArr.includes(i)) {
            arr.push(i);
        }
    }
    const c = Math.floor(Math.random() * arr.length);
    return arr[c];
}

const addPetsCards = (toRight) => {
    let cnt = getVW();
    if (toRight <= 0) {
        for (let i = 0; i < 6; i += 1) {
            const notArr = [];
            notArr.push(pets_array[0].id);
            notArr.push(pets_array[1].id);
            notArr.push(pets_array[2].id);

            pets_array.unshift(pets_source[genId(notArr)]);
        }

        pets_page += 6 / cnt;
    } else {
        for (let i = 0; i < 6; i += 1) {
            const end = pets_array.length - 1;
            const notArr = [];
            notArr.push(pets_array[end].id);
            notArr.push(pets_array[end - 1].id);
            notArr.push(pets_array[end - 2].id);

            pets_array.push(pets_source[genId(notArr)]);
        }
    }
    max_page = Math.floor(pets_array.length / cnt);
    console.log("now " + max_page + " pages");
};

const petsCardGenerator = (jsArr) => {

    const newArr = [];

    for (let i = 0; i < jsArr.length; i += 1) {
        jsArr[i].id = i;
    }
    pets_source = jsArr;

    newArr.push(jsArr[4]);
    newArr.push(jsArr[0]);
    newArr.push(jsArr[2]);
    newArr.push(jsArr[1]);
    newArr.push(jsArr[3]);
    newArr.push(jsArr[5]);

    return newArr;
};

const run = () => {
    getJSON().then().then((json_arr) => {
        pets_array = petsCardGenerator(json_arr);
        setPetsCards();
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
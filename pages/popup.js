let pets_array = [];

async function getJSON() {
    const response = await fetch("../pets.json");
    const json = await response.json();
    return json;
}

// menu
const menu_button = document.querySelector(".menu_button");
menu_button.addEventListener("click", event => {
    if (menu_button.classList.contains("menu_button_vert")) {
        toggleMenu(false);
    } else {
        toggleMenu(true);
    }
});

const navigation_vert = document.querySelector(".navigation_vert");
navigation_vert.addEventListener("click", event => {
    if (event.target === navigation_vert) {
        toggleMenu(false);
    }
});


//  popup
const pop_cont = document.createElement("div");
pop_cont.classList.add("popup_container");
pop_cont.addEventListener("click", (event) => {
    const close_bt = document.querySelector(".popup_close_container");
    const close_img = document.querySelector(".popup_close_container > img");
    if (event.target === pop_cont || event.target === close_bt || event.target === close_img) {
        popupHide();
    };
});
pop_cont.addEventListener("mouseover", (event) => {
    const close_bt = document.querySelector(".popup_close_container");
    const close_img = document.querySelector(".popup_close_container > img");
    if (close_bt !== undefined) {
        if (event.target === pop_cont || event.target === close_bt || event.target === close_img) {
            close_bt.style.backgroundColor = "#F1CDB3";
        } else {
            close_bt.style.backgroundColor = "transparent";
        }
    };
});
document.querySelector("body").appendChild(pop_cont);

const popNewText = (typeE, classE, textE) => {
    const popText = document.createElement(typeE);
    if (classE.lenght > 0) popText.classList.add(classE);
    popText.textContent = textE;
    return popText;
}
const popNewDot = (title, textE) => {
    const popLine = document.createElement("div");

    const popDot = document.createElement("div");
    popDot.classList.add("dot");
    const popSubDot = document.createElement("div");
    popDot.appendChild(popSubDot);
    popLine.appendChild(popDot);
    const popB = document.createElement("b");
    popB.textContent = title;
    popLine.appendChild(popB);
    popLine.insertAdjacentHTML('beforeend', textE);
    return popLine;
}

const popArr2String = (arr) => {
    //    if(arr.lenght > 0){
    let text = "";
    for (i in arr) {
        if (text === "") {
            text += arr[i];
        } else {
            text += "<br/>" + arr[i];
        }
    }
    return text;
    //    }else{
    //        return "";
    //    }
}

const showPetWindow = (id) => {
    const vw = document.documentElement.clientWidth;
    const pop_win = document.createElement("div");
    pop_win.classList.add("popup_content");

    const popImg = document.createElement("div");
    popImg.classList.add("popup_img");
    popImg.style.backgroundImage = ' url("' + pets_array[id]["img"] + '")';
    pop_win.appendChild(popImg);

    const popText = document.createElement("div");
    popText.classList.add("popup_text_container");
    popText.appendChild(popNewText("h3", "", pets_array[id]["name"]));
    popText.appendChild(popNewText("h4", "", pets_array[id]["type"] + " - " + pets_array[id]["breed"]));
    popText.appendChild(popNewText("p", "", pets_array[id]["description"]));
    popText.appendChild(popNewDot("Age: ", pets_array[id]["age"]));
    popText.appendChild(popNewDot("Inoculations: ", popArr2String(pets_array[id]["inoculations"])));
    popText.appendChild(popNewDot("Diseases: ", popArr2String(pets_array[id]["diseases"])));
    popText.appendChild(popNewDot("Parasites: ", popArr2String(pets_array[id]["parasites"])));

    pop_win.appendChild(popText);

    const popCloseCont = document.createElement("div");
    const popClose = document.createElement("img");
    popClose.src = "../../assets/icons/close.svg";
    popClose.alt = "Close";
    popCloseCont.appendChild(popClose)
    popCloseCont.classList.add("popup_close_container");
    pop_cont.appendChild(popCloseCont);

    pop_cont.appendChild(pop_win);

    //    console.log(" pets "+pets_array[id]["name"]);
    popupShow();
}

const popupShow = () => {
    document.querySelector("body").style.overflowY = "hidden"
    let pos_top = window.scrollY;
    pop_cont.style.top = pos_top + "px";
    pop_cont.classList.add("popup_container_view");
}

const popupHide = () => {
    pop_cont.classList.remove("popup_container_view");
    document.querySelector("body").style.overflowY = "";
    setTimeout(function () {
        pop_cont.style.top = 0;
        pop_cont.innerHTML = "";
    }, 700);
}

// IMPORT FUNCTION
import { listKiss } from "./gameData.js";


// MAIN ----------------------------------------------------------------
const selectEl = document.createElement('select');
selectEl.setAttribute('id', 'listFunc');
const arrFunc = [];
// Create select option

const me = renderOpt('me', 'Maybank Editor');
arrFunc.push(me);
const tg = renderOpt('tg', 'Tips Generator');
arrFunc.push(tg);

// Function for create a new Option
function renderOpt(codeName, optName) {
    // Create option element
    const optionEl = document.createElement('option');
    optionEl.setAttribute('class', 'opt');
    optionEl.setAttribute('value', `${codeName}`);
    optionEl.innerHTML = optName;
    selectEl.appendChild(optionEl);
    return codeName;
}

document.getElementsByTagName("BODY")[0].prepend(selectEl);

var selEl = document.getElementById('listFunc');
function selectOpt(arr) {   
    arr.forEach(function(el) {
        document.getElementById(el).style.display = "none";
    });
    let valOpt = selEl.options[selEl.selectedIndex].value;
    document.getElementById(valOpt).style.display = "block";
}

selEl.addEventListener('click',function() {
    selectOpt(arrFunc);
});

// TIPS-GENERATOR ------------------------------------------------------
const kiss = listKiss();

// Create box for every agent games
renderBox(kiss, '918KISS');
renderBox(kiss, '918KISS');

// function will create a new fieldset box
function renderBox(labels, agentName) {
    const container = document.createElement('fieldset');
    // Create legend element
    let legend = document.createElement('legend');
    legend.setAttribute('class', `legend${agentName}`);
    legend.innerText = `${agentName}`;
    container.appendChild(legend);
    // Create textarea element
    let textArea = document.createElement('textarea');
    textArea.setAttribute('class',`inArea${agentName}`);
    textArea.innerHTML = "";
    container.appendChild(textArea);
    // Create div element
    let divBtn = document.createElement('div');
    divBtn.setAttribute('class', 'btn-bottom');
    // Create input element for inside div class btn-bottom
    let inputElement = document.createElement('input');
    inputElement.setAttribute('class', `tipsGame${agentName}`);
    inputElement.setAttribute('type', 'number');
    divBtn.appendChild(inputElement);
    // Create button element for re-rolling
    let reRoll = document.createElement('button');
    reRoll.setAttribute('class', `reroll ${agentName}`);
    reRoll.innerHTML = 'Reroll';
    divBtn.appendChild(reRoll);
    container.appendChild(divBtn);
    // Add renderBox to HTML class container
    document.getElementById('main').appendChild(container);

    //
    reRoll.addEventListener('click', function() {
        let numInput = inputElement.value;
        let numArray = [];
        let tipsRolled = '';
        // Remove Duplicates and prevent crash
        if (numInput > labels.length || numInput < 0) {
            textArea.innerHTML = "Please input value between 1 \~ " + labels.length + "!";
        } else {
            for (let n = numInput; n > 0;) {
                let numGen = Math.floor(Math.random() * labels.length);
                if (!numArray.includes(numGen)) {
                    numArray.push(numGen);
                    n--;
                }
            }
            numArray.forEach(el => tipsRolled+= `${labels[el]}\n`);
            textArea.innerHTML = tipsRolled;
        }

    });
}

export {renderBox};
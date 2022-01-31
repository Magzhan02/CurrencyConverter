const select = document.querySelectorAll(".sourceCurrency");
const icon = document.querySelector(".icon");

document.addEventListener("DOMContentLoaded", getData);
select[0].addEventListener('change', convert);
select[1].addEventListener('change', convert);

const api = `https://api.frankfurter.app/currencies`;

function getData() {
    fetch(api)
        .then(resp => resp.json())
        .then((json) => {
            display(json)
        });
}

function display(json) {
    const obj = Object.entries(json)
    for (const [key, value] of obj) {
        select[0].innerHTML += `<option value="${key}" class="option">${key}</option>`;
        select[1].innerHTML += `<option value="${key}" class="option">${key}</option>`;
    }
}

function convert() {
    let value1 = select[0].value;
    let value2 = select[1].value;
    let inpt = document.querySelector('#input-value_1').value;
    const inpt2 = document.querySelector('#input-value_2');
    const converter__equal = document.querySelector(".converter__equal");
    if (value1 != value2) {
        const api = 'api.frankfurter.app';
        fetch(`https://${api}/latest?amount=${inpt}&from=${value1}&to=${value2}`)
            .then((resp) => resp.json())
            .then((json) => {
                inpt2.value = Object.values(json.rates)[0];
                converter__equal.textContent = `${inpt} ${value1} = ${inpt2.value} ${value2}`
            });
    }
}

icon.addEventListener('click',function(){
    if(select[0].value != select[1].value){
        let value1 = select[0].value;
        let value2 = select[1].value;
        select[0].value = value2;
        select[1].value = value1;
        convert()
    }
})
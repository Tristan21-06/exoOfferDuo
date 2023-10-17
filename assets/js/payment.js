let params = new URLSearchParams(window.location.search);
let cData = params.get('cart');

if(!cData || !cData.length){
    alert('Aucun panier n\'est sélectionné');
    window.location.replace("/");
}

let slideItem = 0;
let nbItems = $('.carousel-item').length-1;
var instances, jsonObjects, cart, cartIndex;
let form = document.getElementById("payment-form");
form.addEventListener('submit', e => validCart(e));

$.ajax({
    url: "/includes/getData.php",
    data: {},
    success: function(result){
        jsonObjects = JSON.parse(result);
        cart = jsonObjects.carts.objects.find(e => e.id == cData);
        cartIndex = jsonObjects.carts.objects.indexOf(cart);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    instances = M.Carousel.init(elems, {
        fullWidth: true
    });
});

let formInputs = Array.from(document.querySelectorAll("#payment-form input"));

var separator = "/";

$("#expiration-card").keyup(function(e) {
    var textSoFar = $(this).val();
    if (e.keyCode != 191 && e.keyCode != 111 && e.keyCode >= 96 && e.keyCode <= 105) {
        if (e.keyCode != 8) {
            if (textSoFar.length == 2) {
                if(textSoFar > 12){
                    textSoFar = 12;
                }

                $(this).val(textSoFar + separator);
            }
        } else {
            //backspace would skip the slashes and just remove the numbers
            if (textSoFar.length == 5) {
                $(this).val(textSoFar.substring(0, 4));
            } else if (textSoFar.length == 2) {
                $(this).val(textSoFar.substring(0, 1));
            }
        }
    } else {
        //remove slashes to avoid 12//01/2014
        $(this).val(textSoFar.substring(0, textSoFar.length - 1));
    }
});

$(document).ready(function(){
    $('#card-number')[0].addEventListener('keyup', (e) => {
        let value = ('' + e.target.value).split('').map((el, index) => (index+1)%4 == 0 ? el + ' ' : el).join('');

        $('#card-value')[0].innerText = value;

        if(e.target.value.length > 16){
            $('#card-value')[0].innerText = $('#card-value')[0].innerText.slice(0, 19);
            e.target.value = parseInt(('' + e.target.value).slice(0, 16));
        }

    });
    $('#carousel-prev')[0].addEventListener('click', e => prevSlide(e));
    $('#carousel-next')[0].addEventListener('click', e => nextSlide(e));

    formInputs.forEach(input => {
        input.addEventListener('change', validButton());
    });

    instances[0].set(slideItem);
    checkSliderBtns();
});

function nextSlide(e) {
    if (slideItem < nbItems) {
        instances[0].next();
        slideItem++;
    }

    checkSliderBtns();
}
function prevSlide(e) {
    if (slideItem > 0) {
        instances[0].prev();
        slideItem--;
    }

    checkSliderBtns();
}

function checkSliderBtns(){

    if(slideItem == 0){
        $('#carousel-prev')[0].style.opacity = 0;
        $('#carousel-prev')[0].style.cursor = "initial";
        $('#carousel-prev')[0].disabled = "disabled";
    }

    if(slideItem > 0 && slideItem < nbItems){
        $('#carousel-prev')[0].style.opacity = 1;
        $('#carousel-prev')[0].style.cursor = "pointer";
        $('#carousel-prev')[0].removeAttribute("disabled");

        $('#carousel-next')[0].style.opacity = 1;
        $('#carousel-next')[0].style.cursor = "pointer";
        $('#carousel-next')[0].removeAttribute("disabled");
    }

    if(slideItem == nbItems){
        $('#carousel-next')[0].style.opacity = 0;
        $('#carousel-next')[0].style.cursor = "initial";
        $('#carousel-next')[0].disabled = "disabled";
    }
}

function validButton(){
    let emptyInputs = true;

    formInputs.forEach(input => {
        if(!input.value || input.value == ""){
            emptyInputs = emptyInputs && false;
        }
    });

    if(!emptyInputs){
        $('#valid-payment')[0].removeAttribute("disabled");
        document.getElementById('payment-last').querySelector('i').classList.remove("disabled");
    } else {
        $('#valid-payment')[0].disabled = "disabled";
        document.getElementById('payment-last').querySelector('i').classList.add("disabled");
    }
}

const validCart = async (e) => {
    e.preventDefault();

    let inputs = Array.from(e.target.elements);
    inputs = inputs.filter(el => el.name && el.name.length);

    let emptyInputs = false;

    inputs.forEach(input => {
        if(input.value == ""){
            emptyInputs = emptyInputs || true;
        }
    });

    if(!emptyInputs){
        cart.status = "Commande payee";
        let user = cart.userId;
    
        let newInputs = {};
        for (let el of inputs) {
            newInputs[el.name] = el.value;
        }
    
        jsonObjects.addresses.lastId++;
        newInputs.id = jsonObjects.addresses.lastId;
        newInputs.userId = user;
        newInputs.cartId = cart.id;
        
        jsonObjects.addresses.objects.push(newInputs);
    
        writeFile(form);
        M.toast({html: 'Commande validé!', classes: 'green toast'});

        $('#valid-payment')[0].disabled = "disabled";
        document.getElementById('payment-last').querySelector('i').classList.add("disabled");

        await delay(2000);
        window.location.replace("/");
    }else{
        M.toast({html: 'Formulaire non valide!', classes: 'red toast'});
    }
}

function writeFile(){
    $.ajax({
        url: "/includes/writeFile.php",
        data: { jsonString: JSON.stringify(jsonObjects) },
        success: function(){
        }
    });
}

//utils
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}
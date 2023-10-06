$(document).ready(function(){
    $('.sidenav').sidenav();
});

let jsonObjects, currU, currCart;

fetch('/localDB/DB.json')
    .then((response) => response.json())
    .then((json) => {
        jsonObjects = json;
    });

document.getElementById('show-cart').addEventListener('click', buildCart);

let addToCart = Array.from(document.getElementsByClassName('add-to-cart'));
addToCart.forEach(el => {
    el.addEventListener('click', event => addArticle(el.dataset.id, event));
});

// build side div content
function buildCart() {
    if(!currU){
        $('#display-cart').html(userForm());

        $('#user-connect')[0].addEventListener("submit", connectUser);
        
        return;
    }

    if(!currCart || currCart.articles.length == 0){
        
        $('#display-cart').html('<blockquote>Aucun article dans le panier</blockquote>');
        
        return;
    }

    let html = "";
    html += '<div>';

    currCart.articles.forEach(article => {
        html += '<div>';
        html += '<div class="card">';
        html += '<div class="card-image">';
        html += `<img src="${article.image}">`;
        html += `<span class="card-title">${article.name}</span>`;
        html += `<a class="btn-floating halfway-fab waves-effect waves-light red cancel-article-btn" data-id="${article.id}">`;//onclick
        html += '<i class="material-icons">delete</i>';
        html += '</a>';
        html += '</div>';
        html += '<div class="card-content">';
        html += `<p>Quantité </p> <input id="first_name" type="number" class="quantity-article-btn validate" data-id="${article.id}">`;//onchange
        html += '</div>';
        html += '</div>';
    });

    html += '</div>';
    html += '<a href="/pages/payment.php" class="waves-effect waves-light btn">Valider le panier</a>';

    $('#display-cart').html(html);

    let cancelButtons = Array.from(document.getElementsByClassName('cancel-article-btn'));
    cancelButtons.forEach(el => {
        el.addEventListener('click', cancelArticle(el.dataset.id));
    });

    let quantityInputs = Array.from(document.getElementsByClassName('quantity-article-btn'));
    quantityInputs.forEach(el => {
        el.addEventListener('change', editQuantity(el.dataset.id, el.value));
    });
}

// add chosen article
function addArticle(id, e){
    e.preventDefault();
    if(!currU){
        $('#show-cart')[0].click();
        M.toast({html: 'Veuillez vous connecter!', classes: 'red toast'});
        buildCart();
        return;
    }

    currCart.articles.push({id: id, quantity: 1});

    let indexCart = jsonObjects.carts.objects.indexOf(currCart.id);

    jsonObjects.carts.objects[indexCart] = currCart;

    writeFile();

    M.toast({html: 'Article ajouté au panier!', classes: 'green toast'});
}

// cancel chosen article
function cancelArticle(id){
    currCart.articles.filter(el => el.id != id);

    let indexCart = jsonObjects.carts.objects.indexOf(currCart.id);

    jsonObjects.carts.objects[indexCart] = currCart;

    writeFile();

    M.toast({html: 'Article supprimé du panier!', classes: 'red toast'});
}

//edit quantity for chosen article
function editQuantity(id, qty) {
    currCart.articles.find(el => el.id == id).quantity = qty;

    let indexCart = jsonObjects.carts.objects.indexOf(currCart.id);

    jsonObjects.carts.objects[indexCart] = currCart;

    writeFile();
}

// simulates user connection
async function connectUser(e) {
    let divError = $('#error-connect')[0];
    divError.querySelector('blockquote').innerText = "Combinaison utilisateur/mot de passe inconnue. Veuillez réessayer";
    divError.classList.remove("error-active");

    e.preventDefault();

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    currU = jsonObjects.users.objects.find((el) => el.username == inputs.username && el.password == inputs.password);
    if(!currU){
        divError.querySelector('blockquote').innerText = "Combinaison utilisateur/mot de passe inconnue. Veuillez réessayer";
        divError.classList.add("error-active");

        return;
    }

    currCart = jsonObjects.carts.objects.find((el) => el.userId == currU.id && el.status == "Panier");
    if(!currCart){
        jsonObjects.carts.lastId++;

        currCart = {
            id: jsonObjects.carts.lastId,
            articles: [],
            user: currU.id,
            status: "Panier"
        };

        jsonObjects.carts.objects.push(currCart);

        writeFile();
    }

    let loader = "";
    loader += '<div id="loader-container">';
    loader += '<div class="preloader-wrapper big active">';
    
    loader += '<div class="spinner-layer spinner-red-only">';
    loader += '<div class="circle-clipper left">';
    loader += '<div class="circle"></div>';
    loader += '</div>';
    loader += '<div class="gap-patch">';
    loader += '<div class="circle">';
    loader += '</div>';
    loader += '</div>';
    loader += '<div class="circle-clipper right">';
    loader += '<div class="circle"></div>';
    loader += '</div>';

    loader += '</div>';
    loader += '</div>';

    $('#display-cart').html(loader);
    await delay(4000);

    $('#display-cart').html('<h4>Utilisateur connecté!</h4>');
    await delay(4000);

    buildCart();
}

// display user form
function userForm(){
    let html = '';
    html += "<div>";
    html += "<h3>Connectez-vous pour avoir accès à votre panier</h3>";
    html += '<form id="user-connect">';

    html += '<div class="input-field">';
    html += '<input id="first_name" type="text" name="username" class="validate">';
    html += '<label for="first_name">Utilisateur</label>';
    html += '</div>';

    html += '<div class="input-field">';
    html += '<input id="password" type="password" name="password" class="validate">';
    html += '<label for="password">Mot de passe</label>';
    html += '</div>';

    html += '<div class="input-field">';
    html += '<button type="submit" class="waves-effect waves-light btn">Se connecter</button>';
    html += '</div>';
    
    
    html += "<form>";
    html += "<div>";

    return html
}

//write in localDB file
function writeFile(){
    $.ajax({
        url: "/includes/writeFile.php",
        data: { jsonString: JSON.stringify(jsonObjects) },
        success: function(){
            console.log('KACHOWWW');
        }
    });
}

//utils
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}
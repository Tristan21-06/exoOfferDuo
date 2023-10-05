<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

        <link href="/assets/css/style.min.css" rel="stylesheet">

        <title>Accueil</title>
    </head>
    <body>
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo center"><img src="/assets/img/logo_2x_feoygs.webp" alt="Logo ITAkademy"></a>
                <ul id="nav-mobile">
                    <li>
                        <a data-target="slide-out" id="show-cart" class="sidenav-trigger" href="#">
                            <span class="material-icons">
                                shopping_cart
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <section id="slide-out" class="sidenav">
            <a href="#" data-target="slide-out" class="sidenav-close"><i class="material-icons">close</i></a>
            <div id="error-connect">
                <blockquote></blockquote>
            </div>
            <div id="display-cart">
                
            </div>
        </section>
        

        <section id="presentation">
            <div class="content">
                <div id="text">
                    <h2>
                        Nous allons aujourd'hui mettre en valeur un produit dérivé de la série appelée <em>"Cars"</em>
                    </h2>
                    <div>
                        <h3>
                            Tout d'abord, qu'est-ce que c'est <em>"Cars"</em>?
                        </h3>
                        <p>
                            C'est un monde peuplé entièrement de véhicules vivants, Flash McQueen, une voiture de course rouge est un jeune champion avide de succès et promis à une très belle carrière. Un jour, il se retrouve abandonné par accident en plein désert et en essayant de retrouver son chemin, arrive dans la petite ville de Radiator Springs, située sur la mythique Route 66. Loin de ses fans, il va s’y faire de nouveaux amis et découvrir qu'il y a des choses bien plus importantes dans la vie que de franchir en premier la ligne d’arrivée.
                        </p>
                    </div>
                </div>
                <div id="img">
                    <img src="/assets/img/flash_mcqueen_voiture.webp" alt="Flash McQueen">
                    <figcaption>Flash McQueen</figcaption>
                </div>
            </div>
        </section>

        <section id="product">
            
        </section>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="/assets/js/cart.min.js"></script>

        <!-- Compiled and minified JavaScript -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </body>
</html>
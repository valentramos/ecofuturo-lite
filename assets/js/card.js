const initGameCards = () => {
  $(document).ready(function(){
    
    var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
    var idArray = []; //array para guardar los ids de las cartas que tienen click 
    var contador = 0;
    var fin = 0; 
    var fields = document.querySelectorAll(".atras");
    
    
    var images = [
    "assets/images/module-3/card-game/1.png",
    "assets/images/module-3/card-game/2.png",
    "assets/images/module-3/card-game/3.png",
    "assets/images/module-3/card-game/4.png",
    "assets/images/module-3/card-game/5.png",
    "assets/images/module-3/card-game/6.png",
    "assets/images/module-3/card-game/7.png",
    "assets/images/module-3/card-game/8.png",
    "assets/images/module-3/card-game/9.png",
    "assets/images/module-3/card-game/1.png",
    "assets/images/module-3/card-game/2.png",
    "assets/images/module-3/card-game/3.png",
    "assets/images/module-3/card-game/4.png",
    "assets/images/module-3/card-game/5.png",
    "assets/images/module-3/card-game/6.png",
    "assets/images/module-3/card-game/7.png",
    "assets/images/module-3/card-game/8.png",
    "assets/images/module-3/card-game/9.png"
    ];
    // verificacion de los clicks
    function clicked() { 
      if ($(this).find(".inner-wrap").hasClass("flipped")) {
        return;
      }
      $(this).find(".inner-wrap").toggleClass("flipped");
      checkArray.push($(this).find("img").attr("src"));
      idArray.push($(this).attr("id"));
      check();
    }
    
    $(".carta").on("click", clicked);
      
    //reiniciar el juego
    function reiniciar() {
      $(".atras").find("img").remove(); //quitar todas las imagenes actuales
      $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
      checkArray = []; 
      idArray = [];
      contador = 0; 
      fin = 0;
      iniciarJuego();
    }
    //para verificar el fin del juego
    function verificarFin() {
      if (fin === 18) { //si todas las cartas estan volteadas
        alert("Juego finalizado, lo has logrado en " + contador + " intentos");
        reiniciar();
      }
    }
    //para random de las imagenes 
    function shuffleArray(array) { 
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function iniciarJuego() {
    
      
    
      var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
     // append de las imagenes a la clase para la parte de atras de las cartas
      for (var i = 0; i < fields.length; i++) {
        var img = document.createElement("img");
        img.src = arr[i];
        fields[i].appendChild(img);
      }
    
    
    }
    
    function check() {
      //si los fields se  han hecho dos clicks 
      if (checkArray.length === 2) {
        $(".carta").off("click", clicked); 
        setTimeout(function(){
          //si no hay match
          if (checkArray[0] !== checkArray[1]) { 
            //voltear las dos cartas seleccionadas
            $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
            $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
            contador++;
            //vaciar los arrays para la siguiente eleccion
            checkArray = []; 
            idArray = []; 
            //habilitar el click de nuevo
            $(".carta").on("click", clicked);
          } else {
    
            contador++;
            
            fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
            //vaciar los dos arrays
            checkArray = []; 
            idArray = []; 
            verificarFin(); 
            $(".carta").on("click", clicked); 
          }
          document.querySelector(".counter").innerHTML = contador;
        }, 800);	
      }
    }
    
    
    
    iniciarJuego();
    
    });
}

// initGameCards();
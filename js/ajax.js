let valorDolar=1;
let valorEnPesos=1;
let articulosEnPesos;
let dolarizado=false;
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

 $(() => {
$("#dolarizar").click( function() { 
  if (!dolarizado){
    dolarizado=true;
    $.get(URLGET,  (respuesta, estado) => {
          if(estado === "success"){
            let misDatos = respuesta;            
            valorDolar=parseInt(misDatos[0].casa.venta);
            //tome el primer valor del array, donde se encuentra el valor del dolar oficial, precio de venta. 
             articulosEnPesos = document.querySelectorAll(".precioPesos");

             for ( const aDolarizar of articulosEnPesos){
              valorEnPesos=parseInt(aDolarizar.innerText);
              aDolarizar.innerHTML+='<br><p class="precio--dolar"> '+(valorEnPesos/valorDolar).toFixed(2)+'</p>'
           }

          }
    })};   
});
})

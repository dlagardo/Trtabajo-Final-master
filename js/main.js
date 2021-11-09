
//leer localstorage cuando se abre la pagina
let usuariosArr=JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
let usuarioLogueado=JSON.parse(sessionStorage.getItem("usuarioLogueado")) || [];
let serviciosArr=JSON.parse(localStorage.getItem("arrayProductos")) || [];
let carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage")) || []; 
let cantidadProductos = 0;
let timeToExpire=10;
let timer=0;
let buscarClave;
if(JSON.parse(localStorage.getItem("productosEnStorage"))){
    cantidadProductos = JSON.parse(localStorage.getItem("productosEnStorage")).length;
}

// mostrar - ocultar contenido del carrito
cart.addEventListener("click", function(){

if (cart__contenido.style.display!="flex"){
    cart__contenido.style.display="flex"
}
else{
    cart__contenido.style.display="none";
}
});

//vaciar el carrito
function vaciarCarrito(){
    localStorage.removeItem("productosEnStorage");
    renderCarrito();
    cantidadProductos=0;
    carritoEnStorage=[];
    car.classList.add("noShow");
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    serviciosArr=[];
    
    crearCardServicio();
    crearArrayProductos();
}

//agregar el eventListener al boton de limpiar
vaciar__carrito.addEventListener("click", vaciarCarrito);

//crear el array de productos
function crearArrayProductos(){
    if(serviciosArr.length==0){
        serviciosArr.push (new servicios(0, "Wireframe", "Basandonos en tus ideas, creamos una vista previa del sitio mediante programas de diseño.", 6500, "wireframe.svg"));
        serviciosArr.push (new servicios(1, "Wireframe a html", "Si ya dispones de wireframes, convertimos esas ideas en un sitio real.", 9800, "wireframe_to_html.svg"));
        serviciosArr.push (new servicios(2, "Responsive Design", "Adaptamos tu sitio para que se vea perfecto en dispositivos móviles", 12900, "responsive.svg"));
        serviciosArr.push (new servicios(3, "Optimización del sitio", "Mejoramos los tiempos de carga del sitio mediante optimizaciones varias.", 10200, "optimizacion.svg"));
        serviciosArr.push (new servicios(4, "Integración del staff", "Hacemos el puente de integración entre todos los miembros de tu proyecto.", 18200, "staff_integracion.svg"));
        serviciosArr.push (new servicios(5, "Seguridad del sitio", "Agregado de certificado SSL y verificación de vulnerabilidades en scripts.", 14200, "seguridad.svg"));
        localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    }
}

//crear las cards de los servicios
function crearCardServicio(){
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"))||0;
    usuarioLogueado=JSON.parse(sessionStorage.getItem("usuarioLogueado")) || [];
    const padre = document.querySelector(".servicios");
    for (const serv of serviciosArr){
        let articulo = document.createElement("article");
        articulo.innerHTML=
            `<img src="${serv.imagen}" alt="${serv.nombre}"></img>
            <p class="titulo">${serv.nombre}</p>
            <p class="descripcion">${serv.descripcion}</p>
            <p class="precioPesos" id="valorServicio">${serv.precio}</p>
            <p class="comprar" onclick="agregarAlCarrito(${serv.id})">agregar al carrito</p>`
            padre.appendChild(articulo);
            
        }
    if ((cantidadProductos>0) && (usuarioLogueado.length>0)){
        car.classList.remove("noShow");
        car.innerHTML = cantidadProductos;
    }
}

//eliminar un elemento del carrito
function eliminar(idABorrar){
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"));
    carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage"));
    serviciosArr=JSON.parse(localStorage.getItem("arrayProductos"));
    let aBorrar = carritoEnStorage.findIndex((el)=>el.id==idABorrar);
    let aBorrarEnArray = serviciosArr.findIndex((el)=>el.id==idABorrar);
    cantidadProductos -= carritoEnStorage[aBorrar].cantidadComprada;
    carritoEnStorage[aBorrar].cantidadComprada = 0;
    serviciosArr[aBorrarEnArray].cantidadComprada=0;
    carritoEnStorage = carritoEnStorage.filter((el)=>el.id!=idABorrar);
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    car.innerHTML = cantidadProductos;
    if (cantidadProductos<1){
        car.classList.add("noShow");
    }
    renderCarrito();
}

//agrega mas cantidad del producto ya agregado al carrito
function agregar(idAAgregar){
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"));
    carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage"));
    serviciosArr=JSON.parse(localStorage.getItem("arrayProductos"));
    let aGregar = carritoEnStorage.findIndex((el)=>el.id==idAAgregar);
    let agregarEnArray = serviciosArr.findIndex((el)=>el.id==idAAgregar);
    cantidadProductos ++;
    carritoEnStorage[aGregar].cantidadComprada ++;
    serviciosArr[agregarEnArray].cantidadComprada ++;
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    car.innerHTML = cantidadProductos;
    renderCarrito();
}

//resta  cantidad del producto ya agregado al carrito
function restar(idARestar){
    cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"));
    carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage"));
    serviciosArr=JSON.parse(localStorage.getItem("arrayProductos"));
    let aRestar = carritoEnStorage.findIndex((el)=>el.id==idARestar);
    let restarEnArray = serviciosArr.findIndex((el)=>el.id==idARestar);
    if (carritoEnStorage[aRestar].cantidadComprada >1){
        cantidadProductos --;
        carritoEnStorage[aRestar].cantidadComprada --;
        serviciosArr[restarEnArray].cantidadComprada --;
    }
    else
    if (carritoEnStorage[aRestar].cantidadComprada ==1){
        eliminar(idARestar)
    }
    localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
    localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
    localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
    car.innerHTML = cantidadProductos;
    renderCarrito();
}

//renderizar el contenido del carrito
function renderCarrito(){
    let valorTotal=0;
    carritoEnStorage = JSON.parse(localStorage.getItem("productosEnStorage"))||[]; 
    usuarioLogueado=JSON.parse(sessionStorage.getItem("usuarioLogueado")) || [];
    if ((cantidadProductos>0) && (usuarioLogueado.length>0)){
        wraper__cta.style.display="flex";
        wraper__titles.style.display="flex";
        car.classList.remove("noShow");
        car.innerHTML=cantidadProductos;
    }
    else{
        wraper__cta.style.display="none";
        wraper__titles.style.display="none";
    }
    if ((carritoEnStorage.length>0) && (usuarioLogueado.length>0)){
        padreCarrito.innerHTML="";
    for (let i of carritoEnStorage){
        
        let art = document.createElement("article");
        
        let precioParcial = i.precio * i.cantidadComprada;
        valorTotal+=precioParcial;
        art.innerHTML =
        `   
        <img src="${i.imagen}" alt="">  
        <p class="nombre">${i.nombre}</p>
        <p class="precio">${i.precio}</p>
        <p class="cantidad">${i.cantidadComprada}</p>
        <p >${precioParcial}</p>
        <div class="accionesServicios">
        
        <p class="agregar" onclick="agregar(${i.id})">+</p>
        <p class="restar" onclick="restar(${i.id})">-</p>
        <p class="eliminar" onclick="eliminar(${i.id})">X</p>
        </div>
        `
        padreCarrito.appendChild(art);
       
    }
    let artTotal = document.createElement("article");
    artTotal.innerHTML=
    `
    <div class="totales">
    <p >Cantidad de productos: ${cantidadProductos}</p>
    <p >Valor total: ${valorTotal}</p>
    </div>
    `
    padreCarrito.appendChild(artTotal);
    
        }
        else{
            padreCarrito.innerHTML="Carrito Vacio";
            wraper__cta.style.display="none";
            wraper__titles.style.display="none";
            
            setTimeout(()=>cart__contenido.style.display="none",1500);
            
        }
}

//agregar el producto seleccionado al carrito
function agregarAlCarrito(id){
    usuarioLogueado=JSON.parse(sessionStorage.getItem("usuarioLogueado")) || [];
    if(usuarioLogueado.length<1){
        modal.style.display="flex";
        modal.innerText="Para poder agregar productos al carrito, por favor ingresa o registrate";
        setTimeout(()=>modal.style.display="none", 1500);
    }
    else{
        serviciosArr=JSON.parse(localStorage.getItem("arrayProductos"));
        const el = serviciosArr.findIndex(j => j.id == id);
        cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductosComprados"))||0;
        cantidadProductos++;
        if (cantidadProductos==1){
            car.classList.remove("noShow");
        }
        if (cantidadProductos>0){
            wraper__cta.style.display="flex";
            wraper__titles.style.display="flex";
        }
        car.classList.add("animSacudon");
        setTimeout(()=>car.classList.remove("animSacudon"),300);
        let duplicado = carritoEnStorage.find(buscado => buscado.id == serviciosArr[el].id);
        if (!duplicado){
        carritoEnStorage.push(serviciosArr[el]);
        serviciosArr[el].cantidadComprada++;
        }
        else{
            let donde =  carritoEnStorage.findIndex(where => where.id === serviciosArr[el].id);
            serviciosArr[el].cantidadComprada++;
            carritoEnStorage[donde].cantidadComprada++;
        }
        car.innerHTML = cantidadProductos;
        localStorage.setItem("productosEnStorage", JSON.stringify(carritoEnStorage));
        localStorage.setItem("arrayProductos", JSON.stringify(serviciosArr));
        localStorage.setItem("cantidadProductosComprados", JSON.stringify(cantidadProductos));
        renderCarrito();
    }
}


//seccion usuarios
//---------------
function mostrarLogueo(){
    if(logueoToggle.style.display!="flex"){
        logueoToggle.style.display="flex";
    }
    else{
        logueoToggle.style.display="none";
    }
    
}
logueo.addEventListener("click", mostrarLogueo);

//mostrar el menu del usuario logueado
function menuUsuario(){
    if (contenidoMenuUsuario.style.display!="flex"){
        contenidoMenuUsuario.style.display="flex";
    }
    else{
        contenidoMenuUsuario.style.display="none";
    }
}

//mostrar usuario logueado
function mostrarUsuario(){
    usuarioLogueado=JSON.parse(sessionStorage.getItem("usuarioLogueado")) || [];
    if(usuarioLogueado.length>0){
        expireSession();
        logueo.style.display="none";
        usuarioIn.style.display="flex"
        usuarioIn.innerText=usuarioLogueado[0].nombre[0].toUpperCase();
        usuarioIn.addEventListener("click", menuUsuario)  ;
        
        //INICIO JQUERY
        $(() => {
        $( "#bienvenidaLogueado" ).html( `<h5>Hola ${usuarioLogueado[0].nombre}</h5><br>`);
        });
        //FIN JQUERY
    }
}


//loguearse
function loguearse(){
    usuariosArr=JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
    usuarioLogueado=JSON.parse(sessionStorage.getItem("usuarioLogueado")) || [];
    if (usuariosArr.length<1){
        infoLogueo.style.color="#ff0000"; 
        infoLogueo.innerHTML="No hay usuarios registrados";
        setTimeout(()=>infoLogueo.innerHTML="",1500)
    }
    else{
        let buscarUsuario = usuariosArr.findIndex((el)=>el.nombre==nombreLogueo.value);
        if (buscarUsuario>=0){
        buscarClave = usuariosArr[buscarUsuario].clave == claveLogueo.value;
        }
        if (buscarClave){
            usuarioLogueado.push (usuariosArr[buscarUsuario]);
            sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));
            infoLogueo.style.color="#007e00"; 
            infoLogueo.innerHTML="Usuario logueado con exito";
            nombreLogueo.style.border="1px solid #007e00";
            claveLogueo.style.border="1px solid #007e00";
            setTimeout(()=>{    
                renderCarrito();
                mostrarUsuario();
                timeToExpire=10;
                timer = setInterval (expireSession, 1000);
                nombreLogueo.value="";
                claveLogueo.value="";
                infoLogueo.innerHTML="";
                logueoToggle.style.display="none";
                nombreLogueo.style.border="1px solid #666"
                claveLogueo.style.border="1px solid #666"
                buscarClave=false;
            },2000);  
        }
        else if (!buscarUsuario<0 || !buscarClave){
            infoLogueo.style.color="#ff0000";
            infoLogueo.innerHTML="Usuario inexistente o clave incorrecta";
        }
    }
}

//cerrar sesion
function logOut(){
    sessionStorage.removeItem("usuarioLogueado");
    logueo.style.display="flex";
    usuarioIn.style.display="none"
    usuarioIn.innerText="";
    car.classList.add("noShow");
    contenidoMenuUsuario.style.display="none";
    renderCarrito();
    clearInterval(timer);
    timeToExpire=10;
}


//expirar sesion despues de un tiempo de inactividad: 10 segundos

function expireSession(){
    document.onclick = (()=>timeToExpire=10);
    document.onmousemove = (()=>timeToExpire=10);
    document.onscroll = (()=>timeToExpire=10);
        if (timeToExpire>0){
            timeToExpire--;
        } 
        if (timeToExpire==0){
            clearInterval(timer);
            modal.style.display="flex";
            modal.innerText="La sesión ha expirado. Por favor, volvé a ingresar";
            setTimeout(()=>{modal.style.display="none";  logOut();}, 2500);
        }
    
}

//crear usuario
function register(){
    repetirClave.classList.remove("noShow");
    botonLogueo.style.display="none";
    botonRegistro.style.display="none";
    botonConfirmar.style.display="inline-block";
    botonCancelar.style.display="inline-block";
    infoLogueo.innerHTML="";
    }

//validacion del formulario de crear usuario
function verificar(){
    
    let errorEnNombre, errorEnClave, errorEnRepetir, errorComparar = false;
    usuariosArr=JSON.parse(localStorage.getItem("arrayUsuarios")) || [];
    if (nombreLogueo.value.length<2){
        nombreLogueo.style.border="1px solid #ff0000"
        errorNombre.innerHTML="El nombre de usuario tiene que ser mayor a 2 caracteres";
        errorEnNombre=true;
    }
    else{
        nombreLogueo.style.border="1px solid #666"
        errorNombre.innerHTML="";
        errorEnNombre=false;
    }
    if(claveLogueo.value.length<4){
        claveLogueo.style.border="1px solid #ff0000";
        errorClave.innerText="La clave tiene que ser mayor a 4 caracteres";
        errorEnClave=true;
        
    }
    else{
        claveLogueo.style.border="1px solid #666";
        errorClave.innerText="";
        errorEnClave=false;
    }
    if(claveLogueoRepetir.value.length<4){
        claveLogueoRepetir.style.border="1px solid #ff0000";
        errorRepetirClave.innerText="La clave tiene que ser mayor a 4 caracteres";
        errorEnRepetir=true;
        
    }
    else{
        claveLogueoRepetir.style.border="1px solid #666";
        errorRepetirClave.innerText="";
        errorEnRepetir=false;
    }

    if (claveLogueo.value != claveLogueoRepetir.value){
        infoLogueo.style.color="#ff0000";
        infoLogueo.innerHTML="\nLas claves no coinciden\n";
        errorComparar=true;
    }
    else{
        infoLogueo.style.color="";
        infoLogueo.innerHTML="";
        errorComparar=false;
    }
    if (!errorEnNombre && !errorEnClave && !errorEnRepetir && !errorComparar ){
        if (usuariosArr.length==0){
            usuariosArr.push(new usuario(0, nombreLogueo.value, claveLogueo.value, "admin", []))
        }
        else{
           usuariosArr.push(new usuario(usuariosArr.length, nombreLogueo.value, claveLogueo.value, "user", []))
        }
        localStorage.setItem("arrayUsuarios", JSON.stringify(usuariosArr));
        infoLogueo.style.color="#007e00"; 
        infoLogueo.innerHTML="Usuario creado con exito";
        nombreLogueo.style.border="1px solid #007e00"
        claveLogueo.style.border="1px solid #007e00"
        claveLogueoRepetir.style.border="1px solid #007e00"
        loguearse();
        setTimeout(()=>{    
            nombreLogueo.value="";
            claveLogueo.value="";
            claveLogueoRepetir.value="";
            infoLogueo.innerHTML="";
            repetirClave.classList.add("noShow");
            logueoToggle.style.display="none";
            botonLogueo.style.display="inline-block";
            botonRegistro.style.display="inline-block";
            botonConfirmar.style.display="none";
            nombreLogueo.style.border="1px solid #666"
            claveLogueo.style.border="1px solid #666"
            claveLogueoRepetir.style.border="1px solid #666"
            botonCancelar.style.display="none";
            
        },2000);  
    }
}

function cancelarRegistro(){
    repetirClave.classList.add("noShow");  
    botonConfirmar.style.display="none";
    botonLogueo.style.display="inline-block";
    botonRegistro.style.display="inline-block";
    botonCancelar.style.display="none";
    infoLogueo.style.color="";
    infoLogueo.innerHTML="";
    errorNombre.innerHTML="";
    errorClave.innerText="";
    errorRepetirClave.innerText="";
    nombreLogueo.style.border="1px solid #666"
    claveLogueo.style.border="1px solid #666"
    claveLogueoRepetir.style.border="1px solid #666"
}


//evento con JQUERY
$(".cerrarSesion").click(logOut);
//FIN JQUERY



//clase 13: animaciones concatenadas
const animateDom = (id)=>{
    $("#containerModalContacto").css({'display' :'flex'});
    $(id).html('<p>envianos un e-mail a info@test.com</p><br><br><button id="cerrarModal" class="ctaJquerry">cerrar</button>');

    $(id).slideDown(1000);
    $(id).animate({height:'250px',
                    width:'350px',
                    "font-size":"18px"
                    },
                    1000,
                    ()=>{
                            $(id).css({'background-color':'white','color':'green'}); 
                            $("#cerrarModal").fadeIn(500)
                        }
                    
                    )
    $("#cerrarModal").click(()=>{
        $(".modalContacto").slideUp(1000);
        $(".modalContacto").html('');
        $("#containerModalContacto").css({'display' :'none'});
    }) 
}

$(() => {
$('.cta').css({"cursor":"pointer"});
$('.cta').click(()=>{animateDom(".modalContacto")});
});



//fin clase 13

function cerrarCompra(){
    modalCompra.style.display="none";
}

function finalizarCompra(){
    cart__contenido.style.display="none";
    modalCompra.style.display="flex";
    vaciarCarrito();
}

botonLogueo.addEventListener("click", loguearse);
botonRegistro.addEventListener("click", register);
botonConfirmar.addEventListener("click", verificar);
botonCancelar.addEventListener("click", cancelarRegistro);
botonCerrarCompraExitosa.addEventListener("click", cerrarCompra);
comprarCarrito.addEventListener("click", finalizarCompra)



//inicializar
mostrarUsuario();
crearArrayProductos();
crearCardServicio();
renderCarrito();

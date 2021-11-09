class servicios{
    constructor (id, nombre, descripcion, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = "./img/" + imagen;
        this.cantidadComprada = 0;
    }
}

//usuario: rol: admin o usuario comun.
class usuario{
    constructor (id, nombre, clave, rol, compra){
        this.id = id;
        this.nombre = nombre;
        this.clave = clave;
        this.rol = rol;
        this.compra = compra;
    }
}
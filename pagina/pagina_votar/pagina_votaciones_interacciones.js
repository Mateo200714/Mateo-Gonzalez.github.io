window.addEventListener("load", () => {
    sessionStorage.setItem("categoria_actual_votando", 0)
    reiniciar_pagina()
})
function volver_pagina_inicio() {
    window.location.href = "/pagina/pagina_principal/index.html";
}

let voto_selecionado = 1;
function cambiar_numero_voto_seleccionado(numero) {
    voto_selecionado = numero;
    //cambiar estylos
    if (numero === 1) {
        document.getElementById("bt-voto-categoria-2").className = "bt-voto-categoria no-seleccionado"
        document.getElementById("bt-voto-categoria-1").className = "bt-voto-categoria seleccionado"
    }
    else {
        document.getElementById("bt-voto-categoria-1").className = "bt-voto-categoria no-seleccionado"
        document.getElementById("bt-voto-categoria-2").className = "bt-voto-categoria seleccionado"
    }
}
function actualizar_candidato_seleccionado(id_candidato) {
    actualizar_datos_candidato_mostrado(id_candidato)
    actualizar_todos_candidatos(id_candidato)
}
function reiniciar_pagina() {
    document.getElementById("text-categoria-mostrar").innerHTML = `Categoria:<font>${nombres_categorias_votaciones[Number(sessionStorage.getItem("categoria_actual_votando"))]}</font>`
    cambiar_numero_voto_seleccionado(1)
    //actualizar datos candidato selecionado en pantalla
    //obtener si tiene a un candidato votado en el voto selecionado-> no:no hacer cambios, si: mostrar datos del candidato votado

    const id_usuario = Number(localStorage.getItem("id_usuario_votando"))
    const categoria_actual = Number(sessionStorage.getItem("categoria_actual_votando"))
    //recoger votos realizados del usuario desde el servidor
    const foto_predeterminada = "predeterminada.png"
    const descripciones_predetermiandas = ['Difruto de cada segundo', 'Cada instante cuenta', '¡Verano!', 'Cada día mejor que el anterior', '¡Viva la vida!', 'Hola', 'Negreira', 'Soltero', 'Pesadoira', 'Disponible', 'Ocupado', '¡Abajo la escuela!', 'Dinero,Dinero,Dinero...', 'Trabajo 24/7 baby']

    if (historial_votaciones_usuario[id_usuario][categoria_actual][voto_selecionado] != null) {//voto hecho(mostrar datos votado)
        const foto = (datos_presentados_votaciones[id_usuario].foto != null) ? datos_presentados_votaciones[id_usuario].foto : foto_predeterminada;
        const nombre = (datos_presentados_votaciones[id_usuario].nombre != null) ? datos_presentados_votaciones[id_usuario].nombre : 'Anónimo';
        const clase = (datos_presentados_votaciones[id_usuario].clase != null) ? datos_presentados_votaciones[id_usuario].clase : '?';
        const descripcion = (datos_presentados_votaciones[id_usuario].descripcion != '') ? datos_presentados_votaciones[id_usuario].descripcion : descripciones_predetermiandas[Math.floor(Math.random() * (descripciones_predetermiandas.length) + 0)];

        cambiar_datos_mostrados_candidato(foto, nombre, clase, descripcion)
    }
    else {//sin voto hecho (mostrar datos mateo gonzalez)
        const id_mateo = 23
        const foto = datos_presentados_votaciones[id_mateo].foto;
        const nombre = datos_presentados_votaciones[id_mateo].nombre;
        const clase = datos_presentados_votaciones[id_mateo].clase;
        const descripcion = datos_presentados_votaciones[id_mateo].descripcion;

        cambiar_datos_mostrados_candidato(foto, nombre, clase, descripcion)
    }
    actualizar_todos_candidatos()
}
function actualizar_datos_candidato_mostrado(id_candidato) {
    const foto_predeterminada = "predeterminada.png"
    const descripciones_predetermiandas = ['Difruto de cada segundo', 'Cada instante cuenta', '¡Verano!', 'Cada día mejor que el anterior', '¡Viva la vida!', 'Hola', 'Negreira', 'Soltero', 'Pesadoira', 'Disponible', 'Ocupado', '¡Abajo la escuela!', 'Dinero,Dinero,Dinero...', 'Trabajo 24/7 baby']

    const id_usuario = id_candidato
    const foto = (datos_presentados_votaciones[id_usuario].foto != null) ? datos_presentados_votaciones[id_usuario].foto : foto_predeterminada;
    const nombre = (datos_presentados_votaciones[id_usuario].nombre != null) ? datos_presentados_votaciones[id_usuario].nombre : 'Anónimo';
    const clase = (datos_presentados_votaciones[id_usuario].clase != null) ? datos_presentados_votaciones[id_usuario].clase : '?';
    const descripcion = (datos_presentados_votaciones[id_usuario].descripcion != '') ? datos_presentados_votaciones[id_usuario].descripcion : descripciones_predetermiandas[Math.floor(Math.random() * (descripciones_predetermiandas.length) + 0)];


    document.getElementsByClassName("img-datos-candidato-votar")[0].src = `/pagina/imagenes_candidatos/${foto}`;
    document.getElementsByClassName("text-nombre-datos-candidato-votar")[0].innerHTML = nombre;
    document.getElementsByClassName("text-clase-datos-candidato-votar")[0].innerHTML = clase;
    document.getElementsByClassName("text-descripcion-datos-candidato-votar")[0].innerHTML = descripcion;
}

function categoria_anterior() {
    const categoria_actual = Number(sessionStorage.getItem("categoria_actual_votando"))
    if (categoria_actual > 0) {
        sessionStorage.setItem("categoria_actual_votando", categoria_actual - 1)
        reiniciar_pagina()
    }
}
function categoria_siguiente() {
    const categoria_actual = Number(sessionStorage.getItem("categoria_actual_votando"))
    if (categoria_actual < nombres_categorias_votaciones.length - 1) {
        sessionStorage.setItem("categoria_actual_votando", categoria_actual + 1)
        reiniciar_pagina()
    }
}
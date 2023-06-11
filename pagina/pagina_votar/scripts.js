function cambiar_datos_mostrados_candidato(foto, nombre, clase, descripcion) {
    document.getElementsByClassName("img-datos-candidato-votar")[0].src = `/pagina/imagenes_candidatos/${foto}`;
    document.getElementsByClassName("text-nombre-datos-candidato-votar")[0].innerHTML = nombre;
    document.getElementsByClassName("text-clase-datos-candidato-votar")[0].innerHTML = clase;
    document.getElementsByClassName("text-descripcion-datos-candidato-votar")[0].innerHTML = descripcion;
}
function actualizar_todos_candidatos(seleccionado) {
    let codigo = "";
    let clase_actual = ""
    for (let i = 0; i < datos_presentados_votaciones.length; i++) {
        if (clase_actual != datos_presentados_votaciones[i].clase) {
            if (i != 0) {
                codigo += "</div>"
            }
            codigo += '<div class="div-clase-separacion-candidatos"><h3 class="text-clase-candidatos-separacion">'+datos_presentados_votaciones[i].clase+'</h3>'
        }
        if (seleccionado != null && seleccionado == i) {
            codigo += "<div class='div-candidato seleccionado-candidato'onclick='actualizar_candidato_seleccionado(" + i + ")' >";
        }
        else {
            codigo += "<div class='div-candidato no-seleccionado-candidato'onclick='actualizar_candidato_seleccionado(" + i + ")' >";
        }
        if (datos_presentados_votaciones[i].foto != null) {
            codigo += `<img draggable="false" src="/pagina/imagenes_candidatos/${datos_presentados_votaciones[i].foto}" alt="" class="img-candidato">`
        }
        else {
            codigo += `<img draggable="false" src="/pagina/imagenes_candidatos/predeterminada.png" alt="" class="img-candidato">`
        }
        if (datos_presentados_votaciones[i].nombre != null) {
            codigo += `<div class="nombre-candidato">${datos_presentados_votaciones[i].nombre}</div>`
        }
        else {
            codigo += `<div class="nombre-candidato">Anónimo</div>`
        }
        codigo += "</div>"
        if (clase_actual != datos_presentados_votaciones[i].clase) {
            clase_actual = datos_presentados_votaciones[i].clase;
        }
    }
    codigo+="</div>"
    document.getElementById("alinear-div-candidatos-votar").innerHTML = "<h3 class='text-candidatos-todos'>CANDIDATOS</h3>" + codigo
}

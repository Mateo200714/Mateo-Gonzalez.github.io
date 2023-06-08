//preguntas
let preguntas = [false, false]
function abrir_pregunta(numero) {
    if (preguntas[numero]) {
        document.getElementById(`pregunta-${numero}`).style.display = "none"
    }
    else {
        document.getElementById(`pregunta-${numero}`).style.display = "block"

    }
    preguntas[numero] = !preguntas[numero]
}
//temporizador
//!(fecha temporal)
const fecha_final = {
    dia: 25,
    hora: 0,
    minuto: 0,
    segundo: 0,
}
function calcular_cuenta_atras() {
    const milisegundos_final = (1000 * 60 * 60 * 24 * fecha_final.dia) + (fecha_final.hora * 1000 * 60 * 60) + (fecha_final.minuto * 60 * 1000) + (fecha_final.segundo * 1000);
    let time_anterior = {
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0
    }
    setInterval(() => {
        const fecha_actual = new Date()
        const milisegundos_actual = (fecha_actual.getDate() * 24 * 60 * 60 * 1000) + (fecha_actual.getHours() * 60 * 60 * 1000) + (fecha_actual.getMinutes() * 60 * 1000) + (fecha_actual.getSeconds() * 1000)
        let milisegundos_distancia = milisegundos_final - milisegundos_actual
        //calcular distancia dias
        const dias = Math.trunc(milisegundos_distancia / 1000 / 60 / 60 / 24)
        //calcular distancia horas
        milisegundos_distancia -= dias * 24 * 60 * 60 * 1000
        const horas = Math.trunc(milisegundos_distancia / 1000 / 60 / 60)
        //calcular distancia minuto
        milisegundos_distancia -= horas * 1000 * 60 * 60
        const minuto = Math.trunc(milisegundos_distancia / 1000 / 60)
        //calcular distancia segundos
        milisegundos_distancia -= minuto * 1000 * 60
        const segundo = Math.trunc(milisegundos_distancia / 1000)
        let texto = "";
        if (dias != 0) {
            if (time_anterior.dias != dias) {
                if (dias > 9) {
                    texto += "<span>" + dias + "</span>" + " : "
                }
                else {
                    texto += "<span>" + "0" + dias + "</span>" + " : "
                }
                time_anterior.dias = dias;
            }
            else {
                if (dias > 9) {
                    texto += dias + " : "
                }
                else {
                    texto += "0" + dias + " : "
                }
            }
        }
        else {
            if (time_anterior.dias != dias) {
                texto += "<span>" + "00" + "</span>" + " : "
                time_anterior.dias = dias;
            }
            else {
                texto += "00" + " : "
            }
        }
        if (horas != 0) {
            if (time_anterior.horas != horas) {
                if (horas > 9) {
                    texto += "<span>" + horas + "</span>" + " : "
                }
                else {
                    texto += "<span>" + "0" + horas + "</span>" + " : "
                }
                time_anterior.horas = horas;
            }
            else {
                if (horas > 9) {
                    texto += horas + " : "
                }
                else {
                    texto += "0" + horas + " : "
                }
            }
        }
        else {
            if (time_anterior.horas != horas) {
                texto += "<span>" + "00" + "</span>" + " : "
                time_anterior.horas = horas;
            }
            else {
                texto += "00" + " : "
            }
        }
        if (minuto != 0) {
            if (time_anterior.minutos != minuto) {
                if (minuto > 9) {
                    texto += "<span>" + minuto + "</span>" + " : "
                }
                else {
                    texto += "<span>" + "0" + minuto + "</span>" + " : "
                }
                time_anterior.minutos = minuto;
            }
            else {
                if (minuto > 9) {
                    texto += minuto + " : "
                }
                else {
                    texto += "0" + minuto + " : "
                }
            }
        }
        else {
            if (time_anterior.minutos != minuto) {
                texto += "<span>" + "00" + "</span>" + " : "
                time_anterior.minutos = minuto;
            }
            else {
                texto += "00" + " : "
            }
        }
        if (segundo == 0) {
            texto += "<span>" + "0" + segundo + "</span>"
        }
        else {
            if (segundo > 9) {
                texto += "<span>" + segundo + "</span>"
            }
            else {
                texto += "<span>" + "0" + segundo + "</span>"
            }
        }
        document.getElementById("temporizador").innerHTML = texto
        const porcentaje = (milisegundos_actual / milisegundos_final) * 100;
        document.getElementById("barra-progreso-temporizador").style.background = ` conic-gradient(#e6e6e6 ${porcentaje}%,  #8a53d6 0%)`;
    }, 1000)//1 s
}
//abrir datos
let datos_abiertos = false;
function abir_datos() {
    if (!datos_abiertos) {
        document.getElementById("img-flip-flop-datos-votaciones").src = "archivo_abierto.svg"
        document.getElementById("div-datos-votaciones").style.display = "flex";
    }
    else {
        document.getElementById("img-flip-flop-datos-votaciones").src = "archivo_cerrado.svg"
        document.getElementById("div-datos-votaciones").style.display = "none";
    }
    datos_abiertos = !datos_abiertos
}
//introducir codigo
//abrir/cerrar
function abrir_cerra_introducir_codigo(realizar) {
    if (!realizar) {//abrir
        document.getElementById("alinear-div-introducir-codigo").style.display = "flex"
    }
    else {//cerrar
        document.getElementById("alinear-div-introducir-codigo").style.display = "none"
    }
}

//votaciones realizadas historial
function cerrar_historial_votos(){
    document.getElementById("div-alinear-pagina-historial-votaciones").style.display="none"
}
function mostrar_historial_usuario_votaciones(historial_recibido, datos_participantes_recibido, categorias_votaciones_recibido) {
    //cerrar todas las pestañas
    preguntas = [false, false]
    document.getElementById('pregunta-0').style.display = "none"
    document.getElementById('pregunta-1').style.display = "none"
    document.getElementById("div-datos-votaciones").style.display = "none";
    datos_abiertos = false;
    abrir_cerra_introducir_codigo(true)

    document.getElementById("div-alinear-pagina-historial-votaciones").style.display = "flex";
    //actualizar datos en pantalla
    //!null->mostrar categoria y a quien voto (nombre y clase; maximo 2 por categoria)

    //recoger los votos realizados de cada categoria
    let votos_realizados_mostrar = historial_recibido.map(votos_categoria => votos_categoria.filter(voto => voto !== null)).filter(votos_categoria => votos_categoria.length > 0);

    //combertir datos en HTML-> categoria <div></div> , voto <span>Nombre  Clase</span>
    let codigo_resultante = "";
    for (let i = 0; i < votos_realizados_mostrar.length; i++) {
        codigo_resultante += "<div class='div-categoria-historial-votos'><h4 class='text-categoria-historial'>Categoria: " + categorias_votaciones_recibido[i] + "</h4>"
        for (let j = 0; j < votos_realizados_mostrar[i].length; j++) {
            const datos_votado = datos_participantes_recibido.find(e => e.id === votos_realizados_mostrar[i][j])
            codigo_resultante += `<span>${datos_votado.nombre}<font>${datos_votado.clase}</font></span></br>`
        }
        codigo_resultante += "</div>"
    }
    //mostrar resultados
    document.getElementById("div-text-resultados-historial").innerHTML = codigo_resultante
}



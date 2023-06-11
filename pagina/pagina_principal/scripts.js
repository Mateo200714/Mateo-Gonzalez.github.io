

window.addEventListener("load", () => {
    document.getElementById("bt-introducir-codigo").addEventListener("keyup", (e) => {
        e.preventDefault()
        if (e.keyCode === 13) {
            comprobar_codigo_introducido()
        }
    })
    document.getElementsByClassName("bt-comprobar-codigo")[0].addEventListener("click", () => {
        comprobar_codigo_introducido()
    })
})
//introducir codigo (comprobar)
function comprobar_codigo_introducido() {
    let codigo_introducido = document.getElementById("bt-introducir-codigo").value.toLocaleLowerCase();
    //comprobar caracteres
    if (codigo_introducido !== '') {
        if ((codigo_introducido.length == 4) && !isNaN(Number(codigo_introducido[0] + codigo_introducido[1] + codigo_introducido[2])) && (isNaN(Number(codigo_introducido[3])))) {//correcto
            //encontrar codigo e id usuario
            let id_usuario = codigos_participantes_permitidos.find(e => e.codigo.toLowerCase() == codigo_introducido)
            let encontrado = true
            if (id_usuario !== -1) {
                id_usuario = id_usuario.id
                localStorage.setItem("id_usuario_votando", id_usuario)

            }
            else {
                encontrado = false
            }

            if (encontrado) {//codigo encontrado
                encontrado = null
                //comprobar historial usuario votaciones
                let historial_usuario_recibido = [...historial_votaciones_usuario[id_usuario]];

                //mostrar por pantalla?

                /*let mostrar = false;
                for (let i = 0; i < historial_usuario_recibido.length; i++) {
                    for (let j = 0; j < historial_usuario_recibido[i].length; j++) {
                        if (historial_usuario_recibido[i][j] != null) {
                            mostrar = !mostrar;
                        }
                        break;
                    }
                    if (mostrar) {
                        break;
                    }
                }
                */
                const mostrar = (historial_usuario_recibido.some(e => e.some(el => el !== null)))
                if (mostrar) {//algun voto realizado (mostrar historial en pantalla)
                    //recibir los datos de los participantes (nombre y clase) desde el servidor
                    const datos_recibidos = [...datos_presentados_votaciones];
                    let datos_filtrados = []
                    datos_recibidos.forEach((e) => {
                        datos_filtrados.push({ id: e.id, nombre: e.nombre, clase: e.clase })
                    })
                    mostrar_historial_usuario_votaciones([...historial_usuario_recibido], [...datos_filtrados], [...nombres_categorias_votaciones])
                }
                else {//pasar a la pagina de votaciones directamente
                    window.location.href = "/pagina/pagina_votar/pagina_votaciones.html";
                }
            }
            else {//codigo no encontrado
                alert("Código introducido no encontrado. Introduzca un código válido.")
            }
        }
        else {//incorrecto
            alert("Código introducido inválido. Estructura NNNL (Ex. 458M)")
        }
    }
}




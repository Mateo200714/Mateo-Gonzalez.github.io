//introducir codigo (comprobar)
function comprobar_codigo_introducido() {
    let codigo_introducido = document.getElementById("bt-introducir-codigo").value.toLocaleLowerCase();
    //comprobar caracteres
    if (codigo_introducido !== '') {
        if ((codigo_introducido.length == 4) && !isNaN(Number(codigo_introducido[0] + codigo_introducido[1] + codigo_introducido[2])) && (isNaN(Number(codigo_introducido[3])))) {//correcto
            codigo_introducido = null;
            //recibir codigos de participacion permitidos
            const codigos_recibidos = [...codigos_participantes_permitidos]
            let encontrado = false;
            let id_usuario;
            for (let i = 0; i < codigos_recibidos.length; i++) {
                if (codigos_recibidos[i].toLowerCase().find(e => e == codigo_introducido) != -1) {
                    encontrado = true;
                    id_usuario = codigos_recibidos[i].toLowerCase().find(e => e == codigo_introducido);
                    break;
                }
            }
            if (encontrado) {//codigo encontrado
                encontrado = null;
                //comprobar historial usuario votaciones
                //recibir historial (servidor)
                let historial_usuario_recibido;
                //recibir del servidor
                historial_usuario_recibido = [...historial_votaciones_usuario[id_usuario]];
                //guardar de forma local
                sessionStorage.setItem("historial_usuario_recibido", historial_usuario_recibido)
                //mostrar por pantalla?
                let mostrar = false;
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
                if (mostrar) {//algun voto realizado (mostrar historial en pantalla)
                    mostrar_historial_usuario_votaciones(historial_usuario_recibido)
                }
                else {//pasar a la pagina de votaciones directamente

                }
            }
            else {//codigo no encontrado
                alert("Código introducido no encontrado. Introduzca un código válido.")
                //guardar los codigo en local
                sessionStorage.setItem("codigos_participantes_permitidos",)
            }
        }
        else {//incorrecto
            alert("Código introducido inválido. Estructura NNNL (Ex. 458M)")
        }
    }
}



//!(datos provisionales)
const codigos_participantes_permitidos = [
    { codigo: "458M", id_usuario: 0 },
    { codigo: "156Q", id_usuario: 1 }
]//codigos  que se pueden usar para entrar a votar una para cada participante
const historial_votaciones_usuario = [
    [[0, null], [8, 42], [null, null], [null, null], [null, null]],
    [[5, 6], [8, 0], [8, null], [null, null], [null, null]]
]//2 votos por categoria;null:voto no realizado,!null:voto realizado, el numero es el numero de indentificacion del votado,el indice es el id de cada participante
const datos_presentados_votaciones = [
    { id: 0, nombre: 'Mateo González', clase: '4ºC', foto: null, descripcion: 'Sexi, rico, famoso y filántropo.' },
    { id: 0, nombre: 'Sergio Vieites', clase: '4ºB', foto: null, descripcion: 'Padel.' }
]//datos de las personas que se pueden votar
const votos_recibidos_presentados_votaciones = [
    [4, 1, 2, 0, 0],
    [2, 6, 4, 0, 0]
]//votos que tiene cada persona presentada en cada categoria, el numero del indice es el numero de identificacion del presentado
//introducir codigo (comprobar)
function comprobar_codigo_introducido() {
    let codigo_introducido = document.getElementById("bt-introducir-codigo").value.toLocaleLowerCase();
    //comprobar caracteres
    if (codigo_introducido !== '') {
        if ((codigo_introducido.length == 4) && !isNaN(Number(codigo_introducido[0] + codigo_introducido[1] + codigo_introducido[2])) && (isNaN(Number(codigo_introducido[3])))) {//correcto
            //recibir codigos de participacion permitidos
            /*const codigos_recibidos = [...codigos_participantes_permitidos]*/
            let codigos_recibidos;
            try {
                const datos = sessionStorage.getItem("codigos_participantes_permitidos")
                    (datos != null && datos != [] && datos != undefined) ? JSON.parse(sessionStorage.getItem("codigos_participantes_permitidos")) : [...codigos_participantes_permitidos]
            }
            catch {
                codigos_recibidos = [...codigos_participantes_permitidos]
                sessionStorage.setItem("codigos_participantes_permitidos", [])
            }
            //encontrar codigo e id usuario
            let id_usuario = codigos_recibidos.find(e => e.codigo.toLowerCase() == codigo_introducido)
            try {
                id_usuario = id_usuario.id_usuario
            }
            catch {
                id_usuario = -1
            }
            let encontrado = (id_usuario !== -1) ? true : false

            if (encontrado) {//codigo encontrado
                encontrado = null
                codigo_introducido = null

                //comprobar historial usuario votaciones
                //recibir historial (servidor)
                let historial_usuario_recibido = [...historial_votaciones_usuario[id_usuario]];
                //guardar de forma local
                sessionStorage.setItem("historial_usuario_recibido", JSON.stringify(historial_usuario_recibido))

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
                    mostrar_historial_usuario_votaciones([...historial_usuario_recibido], [...datos_filtrados],[...nombres_categorias_votaciones])
                }
                else {//pasar a la pagina de votaciones directamente

                }
            }
            else {//codigo no encontrado
                alert("Código introducido no encontrado. Introduzca un código válido.")
                //guardar los codigo en local
                sessionStorage.setItem("codigos_participantes_permitidos", JSON.stringify(codigos_recibidos))
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
    { codigo: "156Q", id_usuario: 1 },
    { codigo: "325F", id_usuario: 2 },
    { codigo: "824R", id_usuario: 3 }
]//codigos  que se pueden usar para entrar a votar una para cada participante
const historial_votaciones_usuario = [
    [[0, 1], [2, 1], [null, 3], [null, null], [null, null]],
    [[null, 2], [3, 0], [3, null], [null, null], [null, null]],
    [[1, 2], [1, 3], [2, 0], [null, null], [null, null]],
    [[1, 2], [1, 3], [2, 0], [null, null], [null, null]]
]//2 votos por categoria;null:voto no realizado,!null:voto realizado, el numero es el numero de indentificacion del votado,el indice es el id de cada participante
const datos_presentados_votaciones = [
    { id: 0, nombre: 'Mateo González', clase: '4ºC', foto: null, descripcion: 'Sexi, rico, famoso y filántropo.' },
    { id: 1, nombre: 'Sergio Vieites', clase: '4ºB', foto: null, descripcion: 'Padel.' },
    { id: 2, nombre: 'Lara Gabín', clase: '4ºC', foto: null, descripcion: 'Fiesta loca!!' },
    { id: 3, nombre: 'Sara Parajó', clase: '4ºC', foto: null, descripcion: 'Maña Santiago?' }

]//datos de las personas que se pueden votar
const votos_recibidos_presentados_votaciones = [
    [4, 1, 2, 0, 0],
    [2, 6, 4, 0, 0],
    [0, 0, 1, 0, 0],
    [2, 5, 1, 8, 0]
]//votos que tiene cada persona presentada en cada categoria, el numero del indice es el numero de identificacion del presentado
const nombres_categorias_votaciones=[
    "Amable",
    "Compañeirismo",
    "Traballadora",
    "Graciosa",
    "Lista"
]
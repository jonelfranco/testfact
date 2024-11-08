/************************************************************************
Archivo: validacion.js
Finalidad: Maneja funciones globales de validación en la interfaz de usuario antes de enviar los datos al servidor
Autor: JONEL FRANCO
fecha: 2024-11-07
*************************************************************************/

/*
Método: adjuntarValidacion
Finalidad: Adjunta validaciones a los controles input para permitir solo el ingreso de los caracteres indicados
Parámetros: Ninguno
*/
function adjuntarValidacion(){

    // Solo números y letras para el campo código
     $('#txtCodigo').keyup(function () {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g,'');
     });

    // Solo números, letras y espacios para el campo Nombre
     $('#txtNombre').keyup(function () {
        this.value = this.value.replace(/[^a-zA-Z0-9 ]/g,'');
     });

     // Solo números con máximo 2 decimales para el campo Precio
     $('#txtPrecio').on('input', function () {
        this.value = this.value.match(/^\d+\.?\d{0,2}/);
    });
}

/*
Método: valorEsValido
Finalidad: Valida el contenido de un control (input o select) y devuelve el mensaje de error indicado
Parámetros: 
    campoId: Id del control d validar
    campoTitulo: Título del control a validar
*/
function valorEsValido(campoId, campoTitulo) {

    var mensaje = "";

    //if ($("#" + campoId).val() == "") { mensaje = 'Ingrese un valor en el campo "' + campoTitulo + '"'; }

    if ($("#" + campoId).val() == "") { 

        if (campoTitulo.indexOf("p-") == 0) // Tiene mensaje de validación personalizado
        {
            mensaje = campoTitulo.replace("p-", "");
        }else{
            mensaje = 'El ' + campoTitulo + ' no puede estar en blanco'; 
        }
    }

    if (mensaje != "") {
        alert(mensaje);
        return false;
    }

    return true;
}

/*
Método: validarFormulario
Finalidad: Valida el contenido de un formulario y devuelve el mensaje de error indicado o ejecuta el submit si todos los campos indicados son válidos
Parámetros: 
    formularioId: Id del formulario a validar
    campoIdCadena: Lista de ids de los controles a validar
    campoTituloCadena: Lista de Títulos de los controles a validar
    enviarAlValidar: (true, false) Ejecutar el submit del formulario si los campos son válidos
*/
function validarFormulario(formularioId, campoIdCadena, campoTituloCadena, enviarAlValidar) {

    var arregloCampos = campoIdCadena.split(',');
    var arregloTitulos = campoTituloCadena.split(',');

    // Valida cada uno de los controles hasta encontrar uno inválido
    for (var i = 0; i < arregloCampos.length; i++) {
        if (!valorEsValido(arregloCampos[i], arregloTitulos[i])) { return false; }
    }

    // Habilita los controles para ejecutar el POST por si alguno se encuentra deshabilitado
    for (var i = 0; i < arregloCampos.length; i++) {
        $("#" + arregloCampos[i]).prop('disabled', false);
    }

    // Ejecuta el submit
    if (enviarAlValidar) {
        $("#" + formularioId).submit();
    }
    
    return true;
}
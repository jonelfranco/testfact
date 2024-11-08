/************************************************************************
Archivo: principal.js
Finalidad: Maneja la lógica de la aplicación, captura de datos mediante AJAX, y cualquier interacción dinámica en la interfaz de usuario
Autor: JONEL FRANCO
fecha: 2024-11-07
*************************************************************************/

/*
Método: cargarBodega
Finalidad: Carga el dropdown con la lista de Bodegas
Parámetros: Ninguno
*/
function cargarBodega()
{
    $('#ddlBodega').append(
        $('<option></option>').val("").html("")
    );

    var url = "servicios/producto.php?metodo=1";

    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function (respuesta) {

            if (!respuesta.exito) alert(respuesta.error);
            else {

                $.each(respuesta.datos, function (index, item) {
                    $('#ddlBodega').append(
                            $('<option></option>').val(item.CODIGO).html(item.NOMBRE)
                        );
                });

            }
        },
        error: function (xhr) {
            alert('Error no controlado: cargarBodega() - ' + xhr.responseText + " - " + xhr.error);
        },
    });
}

/*
Método: cargarSucursal
Finalidad: Carga el dropdown con la lista de Sucursales
Parámetros: 
    codigoBodega: Código de Bodega para filtrar la lista de Sucursales
*/
function cargarSucursal(codigoBodega)
{
    $('#ddlSucursal').empty();
    $('#ddlSucursal').append(
        $('<option></option>').val("").html("")
    );

    var url = "servicios/producto.php?metodo=2&param1=" + codigoBodega;

    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function (respuesta) {

            if (!respuesta.exito) alert(respuesta.error);
            else {
                
                $.each(respuesta.datos, function (index, item) {
                    $('#ddlSucursal').append(
                            $('<option></option>').val(item.CODIGO).html(item.NOMBRE)
                        );
                });

            }
        },
        error: function (xhr) {
            alert('Error no controlado: cargarSucursal() - ' + xhr.responseText + " - " + xhr.error);
        },
    });
}

/*
Método: cargarMoneda
Finalidad: Carga el dropdown con la lista de Monedas
Parámetros: Ninguno
*/
function cargarMoneda()
{
    $('#ddlMoneda').append(
        $('<option></option>').val("").html("")
    );

    var url = "servicios/producto.php?metodo=3";

    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function (respuesta) {

            if (!respuesta.exito) alert(respuesta.error);
            else {

                $.each(respuesta.datos, function (index, item) {
                    $('#ddlMoneda').append(
                            $('<option></option>').val(item.CODIGO).html(item.NOMBRE)
                        );
                });

            }
        },
        error: function (xhr) {
            alert('Error no controlado: cargarMoneda() - ' + xhr.responseText + " - " + xhr.error);
        },
    });
}

/*
Método: guardarProducto
Finalidad: Realiza validaciones explícitas y envía los datos del formulario al servidor
Parámetros: Ninguno
*/
function guardarProducto(){

    if (validarFormulario("frmProducto"
                            , "txtCodigo,txtNombre,ddlBodega,ddlSucursal,ddlMoneda,txtPrecio,txtDescripcion"
                            , "c\u00f3digo del producto,nombre del producto,p-Debe seleccionar una bodega,p-Debe seleccionar una sucursal para la bodega seleccionada,p-Debe seleccionar una moneda para el producto,precio del producto,descripci\u00f3n del producto"
                            , false
                        ))

    {
        // Inicio validaciones explícitas (Errores personalizados)
        if (($("#txtCodigo").val().length < 5) || $("#txtCodigo").val().length > 15){
            alert("El c\u00f3digo del producto debe tener entre 5 y 15 caracteres.");
            return false;
        }

        if (($("#txtNombre").val().length < 2) || $("#txtNombre").val().length > 50){
            alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
            return false;
        }

        var checkMaterial = $('[id*="chkMaterial"]:checked').map(function() { return $(this).val().toString(); } ).get().join(",");

        if (checkMaterial.indexOf(",") == -1){
            alert("Debe seleccionar al menos dos materiales para el producto.");
            return false;
        }

        if (($("#txtDescripcion").val().length < 10) || $("#txtDescripcion").val().length > 1000){
            alert("La descripci\u00f3n del producto debe tener entre 10 y 1000 caracteres.");
            return false;
        }
        // Fin Validaciones explícitas

        // Envío de los datos del formulario al servidor
        var url = "servicios/producto.php?metodo=4";
        var form = $("#frmProducto").serialize();

        $.ajax({
            type: 'POST',
            url: url,
            data: form,
            dataType: "json",
            success: function (respuesta) {
    
                if (!respuesta.exito) alert(respuesta.error);
                else {
                    alert("Grabado satisfactoriamente");
                }
            },
            error: function (xhr) {
                alert('Error no controlado: guardarProducto() - ' + xhr.responseText + " - " + xhr.error);
            },
        });
    }
}

$(document).ready(function () {

    // Carga de datos de prueba
    /*
    $("#txtCodigo").val("12345");
    $("#txtNombre").val("Producto de prueba 1");
    $("#txtPrecio").val(25);
    $("#txtDescripcion").val("Descripci\u00f3n de prueba");
    */

    // Funciones iniciales al cargar el formulario
    adjuntarValidacion();
    cargarBodega();
    cargarMoneda();
});
<?php

/************************************************************************
Archivo: procesos.php
Finalidad: Realiza la comunicación con la base de datos y maneja las operaciones del servidor
Autor: JONEL FRANCO
fecha: 2024-11-07
*************************************************************************/

/*
Método: ConectarBD
Finalidad: Establecer conexión con la BD
Parámetros: Ninguno
*/
function ConectarBD()
{
    // Aquí deben colocarse las credenciales de acceso a la BD
    $serverName = "[NOMBRE_SERVIDOR],[PUERTO_SEVIDOR]";
    $connectionOptions = array("Database"=>"TEST", "Uid"=>"[USUARIO_BD]", "PWD"=>"[PASSWORD_BD]");
    // Fin

    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if($conn == false)
        $error = CapturarErrores(sqlsrv_errors());

    return $conn;
}

/*
Método: ObtenerBodegas
Finalidad: Listar los registros de la tabla BODEGA y devolverlos en formato JSON
Parámetros: Ninguno
*/
function ObtenerBodegas()
{
    $error = "";
    $rows = array();

    try
    {
        $conn = ConectarBD();
        $tsql = "SELECT CODIGO, NOMBRE FROM BODEGA";
        $listaBodegas = sqlsrv_query($conn, $tsql);
        if ($listaBodegas == FALSE)
        {
            $error = CapturarErrores(sqlsrv_errors());
        }

        while($row = sqlsrv_fetch_array($listaBodegas, SQLSRV_FETCH_ASSOC))
        {
            $rows[] = $row;
        }
        sqlsrv_free_stmt($listaBodegas);
        sqlsrv_close($conn);
    }
    catch(Error $e)
    {
        $error = "Error en el servidor - ObtenerBodegas(): ".$e->getMessage();
    }

    $qryResult = array();

    $qryResult['exito'] = $error == "";
    $qryResult['error'] = $error;
    $qryResult['datos'] = $rows;

    echo json_encode($qryResult);
}

/*
Método: ObtenerSucursales
Finalidad: Listar los registros de la tabla SUCURSAL y devolverlos en formato JSON
Parámetros: 
    $CodBodega: Código de Bodega para filtrar la lista de Sucursales
*/
function ObtenerSucursales($CodBodega)
{
    $error = "";

    try
    {
        $conn = ConectarBD();
        $tsql = "SELECT CODIGO, NOMBRE FROM SUCURSAL WHERE CODIGO_BODEGA = $CodBodega";
        $listaBodegas = sqlsrv_query($conn, $tsql);
        if ($listaBodegas == FALSE)
        {
            $error = CapturarErrores(sqlsrv_errors());
        }

        $rows = array();
        while($row = sqlsrv_fetch_array($listaBodegas, SQLSRV_FETCH_ASSOC))
        {
            $rows[] = $row;
        }
        sqlsrv_free_stmt($listaBodegas);
        sqlsrv_close($conn);
    }
    catch(Error $e)
    {
        $error = "Error en el servidor - ObtenerSucursales(): ".$e->getMessage();
    }

    $qryResult = array();

    $qryResult['exito'] = $error == "";
    $qryResult['error'] = $error;
    $qryResult['datos'] = $rows;

    echo json_encode($qryResult);
}

/*
Método: ObtenerMonedas
Finalidad: Listar los registros de la tabla MONEDA y devolverlos en formato JSON
Parámetros: Ninguno
*/
function ObtenerMonedas()
{
    $error = "";
    $rows = array();

    try
    {
        $conn = ConectarBD();
        $tsql = "SELECT CODIGO, NOMBRE FROM MONEDA ORDER BY NOMBRE";
        $listaBodegas = sqlsrv_query($conn, $tsql);
        if ($listaBodegas == FALSE)
        {
            $error = CapturarErrores(sqlsrv_errors());
        }

        while($row = sqlsrv_fetch_array($listaBodegas, SQLSRV_FETCH_ASSOC))
        {
            $rows[] = $row;
        }
        sqlsrv_free_stmt($listaBodegas);
        sqlsrv_close($conn);
    }
    catch(Error $e)
    {
        $error = "Error en el servidor - ObtenerMonedas(): ".$e->getMessage();
    }

    $qryResult = array();

    $qryResult['exito'] = $error == "";
    $qryResult['error'] = $error;
    $qryResult['datos'] = $rows;

    echo json_encode($qryResult);
}

/*
Método: GrabarProducto
Finalidad: Insertar un nuevo registro en la tabla PRODUCTO
Parámetros:
*/
function GrabarProducto($codigo, $nombre, $bodega, $sucursal, $moneda, $precio, $material, $descripcion)
{
    $error = "";

    try
    {
        $conn = ConectarBD();

        $tsql = "INSERT INTO PRODUCTO (CODIGO, NOMBRE, CODIGO_BODEGA, CODIGO_SUCURSAL, CODIGO_MONEDA, PRECIO, MATERIAL, DESCRIPCION)"
                . " VALUES ('$codigo', '$nombre', $bodega, $sucursal, '$moneda', $precio, '$material', '$descripcion')";
        
        $insertReview = sqlsrv_query($conn, $tsql);
        if($insertReview == FALSE)
        {
            $error = CapturarErrores(sqlsrv_errors());
        }

        sqlsrv_close($conn);
    }
    catch(Error $e)
    {
        $error = "Error en el servidor - GrabarProducto(): ".$e->getMessage();
    }

    if (strpos($error,"PRIMARY KEY",0)){
        $error = "El código del producto ya está registrado.";
    }

    $qryResult = array();

    $qryResult['exito'] = $error == "";
    $qryResult['error'] = $error;

    echo json_encode($qryResult);
}


/*
Método: CapturarErrores
Finalidad: Evaluar un objeto ERROR y devolverlo en formato cadena
Parámetros: objeto ERROR
*/
function CapturarErrores($errors)
{
    $resultado = "Error en el servidor:\n";
    foreach( $errors as $error)  
    {
        $resultado .= "Estado SQL: ".$error[ 'SQLSTATE']."\n"."Codigo: ".$error[ 'code']."\n"."Mensaje: ".$error[ 'message']."\n";  
    }  

    return $resultado;
}

?>

<?php

/*
Carga inicial de la página
*/
$metodo = 0;
$param1 = 0;

// Obtenemos los parámetros enviados
if (isset($_GET['metodo'])) {
    $metodo = $_GET['metodo'];
}

if (isset($_GET['param1'])) {
    $param1 = $_GET['param1'];
}

// Ejecutamos el método solicitado
if ($metodo == 1)
{
    ObtenerBodegas();
}
	
if ($metodo == 2)
{
	ObtenerSucursales($param1);
}

if ($metodo == 3)
{
	ObtenerMonedas($param1);
}

if ($metodo == 4)
{
    $codigo = $_POST['txtCodigo'];
    $nombre = $_POST['txtNombre'];
    $bodega = $_POST['ddlBodega'];
    $sucursal = $_POST['ddlSucursal'];
    $moneda = $_POST['ddlMoneda'];
    $precio = $_POST['txtPrecio'];
    $descripcion = $_POST['txtDescripcion'];

    $material = "";

    // Para el campo materiales se obtiene un arreglo de valores
    foreach($_POST['chkMaterial'] as $check) {
        $material.= $check.",";
    }

	GrabarProducto($codigo, $nombre, $bodega, $sucursal, $moneda, $precio, $material, $descripcion);
}

?>
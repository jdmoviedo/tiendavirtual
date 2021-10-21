var app = angular.module('ingresos', []);
app.controller('ingresosController', ['$http', '$compile', '$scope', controladorIngresos]);

$(document).ready(function () {
    $("#selectCategorias").select2({
        language: "es",
        placeholder: "Seleccione una Categoria",
    });
    $("#selectProductos").select2({
        language: "es",
        placeholder: "Seleccione un Producto",
    });
    $('#dttableIngresos').DataTable({
        columns: [
            {
                title: "ID",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "id_ingreso",
            },
            {
                title: "CATEGORIA",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "nombre_categoria",
            },
            {
                title: "PRODUCTO",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "nombre_producto",
            },
            {
                title: "VALOR<br>VENTA",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "valor_venta",
            },
            {
                title: "CANTIDAD",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "cantidad",
            },
            {
                title: "FECHA<br>CREACION",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "fecha_creacion",
            },
            {
                title: "FECHA<br>ACTUALIZACION",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "fecha_actualizacion",
            },
            {
                title: "",
                className: "text-center text-nowrap action",
                responsivePriority: 1,
                data: "action",
            },
        ], lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "Todos"],
        ],
        responsive: true,
        ordering: false,
        language: {
            url: urlBase + "plugins/datatables.net/language/Spanish.json",
        }, });
    $("#btnActualizar").click();
    $(".numero").inputmask("numero");
});

function controladorIngresos($http, $compile, $scope) {
    var i = this;
    var url = "controller/controller_ingresos.jsp";
    var url1 = "controller/controller_inventario.jsp";

    i.listarIngresos = function () {
        $("#dttableIngresos").DataTable().clear();
        var params = {
            proceso: "listarIngresos"
        };
        $.ajax({
            data: params, //necesario para enviar archivos
            dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
            url: url, //url a donde hacemos la peticion
            type: "POST",
            beforeSend: function () {
                $(".overlayCargue").fadeIn("slow");
            },
            success: function (result) {
                var estado = result.status;
                switch (estado) {
                    case 0:
                        $("dttableIngresos").DataTable().draw();
                        Swal.fire({
                            title: "Error!",
                            text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    case 1:
                        $("#dttableIngresos").DataTable().rows.add(result.datos).draw();

                        break;
                    case 2:
                        Swal.fire({
                            title: "Sin datos!",
                            text: "No existen datos para esta consulta.",
                            icon: "info",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    default:
                        break;
                }
            },
            complete: function () {
                setTimeout(() => {
                    $(".overlayCargue").fadeOut("slow");
                }, 1000);
                setTimeout(() => {
                    $("#dttableIngresos").DataTable().columns.adjust().draw();
                    $compile(angular.element($(".action")))($scope);
                }, 100);
                $('#dttableIngresos').on('page.dt', function () {
                    setTimeout(() => {
                        $(".action").each(function (index) {
                            var template = $(this).html();
                            var compiled = $compile(template)($scope);
                            $(this).html(compiled);
                        });
                    }, 100);
                    ;
                });
            },
            error: function (xhr) {
                console.log(xhr);
                Swal.fire({
                    icon: "error",
                    title: "<strong>Error!</strong>",
                    html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                    showCloseButton: true,
                    showConfirmButton: false,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#dc3545",
                    showCancelButton: true,
                    backdrop: true,
                });
            },
        });
    };
    i.guardarIngreso = function () {
        var params = {
            proceso: "guardarIngreso",
            producto: i.producto,
            valor_venta: i.valor_venta,
            cantidad: i.cantidad,
        };
        var respuestavalidacion = validarcampos("#frmRegistro");
        if (respuestavalidacion) {
            $.ajax({
                data: params, //necesario para enviar archivos
                dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
                url: url, //url a donde hacemos la peticion
                type: "POST",
                beforeSend: function () {
                    $(".overlayCargue").fadeIn("slow");
                },
                success: function (result) {
                    var estado = result.status;
                    switch (estado) {
                        case 0:
                            Swal.fire({
                                title: "Error!",
                                text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                                icon: "error",
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonColor: "#d33",
                                cancelButtonText: "Cerrar!",
                            });
                            break;
                        case 1:
                            Swal.fire({
                                icon: "success",
                                title: "<strong>Ingreso Guardado</strong>",
                                html: "<h5>El ingreso se ha guardado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            i.reset(2);
                            $("#ModalRegistro").modal("hide");
                            i.listarIngresos();
                            break;
                        case 2:
                            Swal.fire({
                                icon: "info",
                                title: "<strong>Limite excedido</strong>",
                                html: "<h5>La cantidad a vender supera el stock.</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            break;
                        default:
                            break;
                    }
                },
                complete: function () {
                    setTimeout(() => {
                        $(".overlayCargue").fadeOut("slow");
                    }, 1000);
                },
                error: function (xhr) {
                    console.log(xhr);
                    Swal.fire({
                        icon: "error",
                        title: "<strong>Error!</strong>",
                        html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                        showCloseButton: true,
                        showConfirmButton: false,
                        cancelButtonText: "Cerrar",
                        cancelButtonColor: "#dc3545",
                        showCancelButton: true,
                        backdrop: true,
                    });
                },
            });

        }
    };
    i.eliminarIngreso = function (id) {
        Swal.fire({
            icon: 'info',
            title: '<strong>Eliminar Ingreso</strong>',
            html: '<h5>Esta seguro de eliminar este ingreso?</h5>',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            backdrop: true,
            width: 600
        }).then((result) => {
            if (result.isConfirmed) {
                var params = {
                    proceso: "eliminarIngreso",
                    id_ingreso: id
                };
                $.ajax({
                    data: params, //necesario para enviar archivos
                    dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
                    url: url, //url a donde hacemos la peticion
                    type: "POST",
                    beforeSend: function () {
                        $(".overlayCargue").fadeIn("slow");
                    },
                    success: function (result) {
                        var estado = result.status;
                        switch (estado) {
                            case 0:
                                Swal.fire({
                                    title: "Error!",
                                    text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                                    icon: "error",
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonColor: "#d33",
                                    cancelButtonText: "Cerrar!",
                                });
                                break;
                            case 1:
                                Swal.fire({
                                    title: "Ingreso Eliminado Satisfactoriamente",
                                    text: "",
                                    icon: "success",
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonColor: "#d33",
                                    cancelButtonText: "Cerrar!",
                                });
                                i.listarIngresos();
                                break;
                            default:
                                break;
                        }
                    },
                    complete: function () {
                        setTimeout(() => {
                            $(".overlayCargue").fadeOut("slow");
                        }, 1000);
                    },
                    error: function (xhr) {
                        console.log(xhr);
                        Swal.fire({
                            icon: "error",
                            title: "<strong>Error!</strong>",
                            html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                            showCloseButton: true,
                            showConfirmButton: false,
                            cancelButtonText: "Cerrar",
                            cancelButtonColor: "#dc3545",
                            showCancelButton: true,
                            backdrop: true,
                        });
                    },
                });
            }
        });

    };
    i.actualizarIngreso = function (cantidad_anterior) {
        var params = {
            proceso: "actualizarIngreso",
            id_ingreso: i.id_ingreso,
            producto: i.producto,
            valor_venta: i.valor_venta,
            cantidad: i.cantidad,
            cantidad_anterior: cantidad_anterior
        };
        var respuestavalidacion = validarcampos("#frmRegistro");
        if (respuestavalidacion) {
            $.ajax({
                data: params, //necesario para enviar archivos
                dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
                url: url, //url a donde hacemos la peticion
                type: "POST",
                beforeSend: function () {
                    $(".overlayCargue").fadeIn("slow");
                },
                success: function (result) {
                    var estado = result.status;
                    switch (estado) {
                        case 0:
                            Swal.fire({
                                title: "Error!",
                                text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                                icon: "error",
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonColor: "#d33",
                                cancelButtonText: "Cerrar!",
                            });
                            break;
                        case 1:
                            Swal.fire({
                                icon: "success",
                                title: "<strong>Ingreso Actualizado</strong>",
                                html: "<h5>El ingreso se ha actualizado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            i.reset(2);
                            $("#ModalRegistro").modal("hide");
                            i.listarIngresos();
                            break;
                        default:
                            break;
                    }
                },
                complete: function () {
                    setTimeout(() => {
                        $(".overlayCargue").fadeOut("slow");
                    }, 1000);
                },
                error: function (xhr) {
                    console.log(xhr);
                    Swal.fire({
                        icon: "error",
                        title: "<strong>Error!</strong>",
                        html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                        showCloseButton: true,
                        showConfirmButton: false,
                        cancelButtonText: "Cerrar",
                        cancelButtonColor: "#dc3545",
                        showCancelButton: true,
                        backdrop: true,
                    });
                },
            });
        }
    };
    i.showModalRegistro = function () {
        $("#ModalRegistro").find("h5.modal-title").html("Crear Ingreso");
        var element = '<button type="button" class="btn btn-success" id="btnRegistro" ng-click="i.guardarIngreso()">Registrar</button>';
        $("#footerBtn").append($compile(angular.element(element))($scope));
        mostrar_modal("ModalRegistro");
    };
    i.verIngreso = function (id, edit) {
        var params = {
            proceso: "verIngreso",
            id_ingreso: id,
        };
        $.ajax({
            data: params, //necesario para enviar archivos
            dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
            url: url, //url a donde hacemos la peticion
            type: "POST",
            beforeSend: function () {
                $(".overlayCargue").fadeIn("slow");
            },
            success: function (result) {
                var estado = result.status;
                switch (estado) {
                    case 0:
                        Swal.fire({
                            title: "Error!",
                            text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    case 1:
                        if (edit == 1) {
                            vercampos("#frmRegistro", 2);
                            $("#ModalRegistro").find("h5.modal-title").html("Ver Ingreso");
                        } else if (edit == 2) {
                            vercampos("#frmRegistro", 1);
                            $("#ModalRegistro").find("h5.modal-title").html("Editar Ingreso");
                            var element = '<button type="button" class="btn btn-success" id="btnRegistro" ng-click="i.actualizarIngreso(' + result.cantidad + ')">Actualizar</button>';
                            $("#footerBtn").append($compile(angular.element(element))($scope));
                        }

                        i.id_ingreso = result.id_ingreso;
                        i.valor_venta = result.valor_venta;
                        i.cantidad = result.cantidad;
                        i.categoria = result.categoria;
                        $scope.$apply();
                        $("#selectCategorias").trigger("change");
                        i.cargarProductos();
                        setTimeout(() => {
                            i.producto = result.producto;
                            $("#selectProductos").trigger("change");
                        }, 100);
                        mostrar_modal("ModalRegistro");
                        break;
                    case 2:
                        $.toast({
                            heading: "No existe!",
                            text: "Este ID no existe",
                            showHideTransition: "slide",
                            icon: "info",
                            position: "top-right",
                        });
                        break;
                    default:
                        break;
                }
            },
            complete: function () {
                setTimeout(() => {
                    $(".overlayCargue").fadeOut("slow");
                }, 1000);
            },
            error: function (xhr) {
                console.log(xhr);
                Swal.fire({
                    icon: "error",
                    title: "<strong>Error!</strong>",
                    html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                    showCloseButton: true,
                    showConfirmButton: false,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#dc3545",
                    showCancelButton: true,
                    backdrop: true,
                });
            },
        });

    };
    i.reset = function (tipo) {
        vercampos("#frmRegistro", 1);
        $("#btnRegistro").remove();
        $("#frmRegistro").trigger("reset");

        i.id_ingreso = "";
        i.valor_venta = "";
        i.cantidad = "";
        i.producto = "";

        switch (tipo) {
            case 1:
                i.categoria = "";
                setTimeout(() => {
                    $("#selectCategorias").val("").trigger("change");
                }, 100);
                break;
            case 2:
                setTimeout(() => {
                    $("#selectCategorias").trigger("change");
                }, 200);
                i.categoria = "";
                setTimeout(() => {
                    $("#selectCategorias").val("").trigger("change");
                }, 400);
                break;
            default:
                break;
        }
    };
    i.cargarCategorias = function () {
        var params = {
            proceso: "cargarCategorias",
        };
        $.ajax({
            data: params, //necesario para enviar archivos
            dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
            url: url1, //url a donde hacemos la peticion
            type: "POST",
            beforeSend: function () {
                $(".overlayCargue").fadeIn("slow");
            },
            success: function (result) {
                var estado = result.status;
                switch (estado) {
                    case 0:
                        Swal.fire({
                            title: "Error!",
                            text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    case 1:
                        i.categorias = result.datos;
                        $scope.$apply();
                        $("#selectCategorias").trigger("change");
                        break;
                    case 2:
                        Swal.fire({
                            title: "Sin datos!",
                            text: "No existen datos para esta consulta.",
                            icon: "info",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    default:
                        break;
                }
            },
            complete: function () {
                setTimeout(() => {
                    $(".overlayCargue").fadeOut("slow");
                }, 1000);
            },
            error: function (xhr) {
                console.log(xhr);
                Swal.fire({
                    icon: "error",
                    title: "<strong>Error!</strong>",
                    html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                    showCloseButton: true,
                    showConfirmButton: false,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#dc3545",
                    showCancelButton: true,
                    backdrop: true,
                });
            },
        });
    };
    i.cargarProductos = function () {
        var params = {
            proceso: "cargarProductos",
            id_categoria: i.categoria
        };
        $.ajax({
            data: params, //necesario para enviar archivos
            dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
            url: url1, //url a donde hacemos la peticion
            type: "POST",
            beforeSend: function () {
                $(".overlayCargue").fadeIn("slow");
            },
            success: function (result) {
                var estado = result.status;
                switch (estado) {
                    case 0:
                        Swal.fire({
                            title: "Error!",
                            text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    case 1:
                        i.productos = result.datos;
                        $scope.$apply();
                        $("#selectProductos").trigger("change");
                        break;
                    case 2:
                        i.productos = "";
                        $scope.$apply();
                        Swal.fire({
                            title: "Sin datos!",
                            text: "No existen datos para esta consulta.",
                            icon: "info",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    default:
                        break;
                }
            },
            complete: function () {
                setTimeout(() => {
                    $(".overlayCargue").fadeOut("slow");
                }, 1000);
            },
            error: function (xhr) {
                console.log(xhr);
                Swal.fire({
                    icon: "error",
                    title: "<strong>Error!</strong>",
                    html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                    showCloseButton: true,
                    showConfirmButton: false,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#dc3545",
                    showCancelButton: true,
                    backdrop: true,
                });
            },
        });
    };
    i.generarExcel = function () {
        var params = {
            proceso: "generarExcel"
        };
        $.ajax({
            data: params, //necesario para enviar archivos
            dataType: "json", //Si no se especifica jQuery automaticamente encontrará el tipo basado en el header del archivo llamado (pero toma mas tiempo en cargar, asi que especificalo)
            url: url, //url a donde hacemos la peticion
            type: "POST",
            beforeSend: function () {
                $(".overlayCargue").fadeIn("slow");
            },
            success: function (result) {
                var estado = result.status;
                switch (estado) {
                    case 0:
                        Swal.fire({
                            title: "Error!",
                            text: "Se ha presentado un error, comuniquese con el area de sistemas.",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    case 1:
                        console.log(result);
                        var $a = $("<a>");
                        $a.attr("href", result.excel);
                        $("body").append($a);
                        $a.attr("download", "Reporte Ingresos");
                        $a[0].click();
                        $a.remove();
                        break;
                    case 2:
                        Swal.fire({
                            title: "Sin datos!",
                            text: "No existen datos para esta consulta.",
                            icon: "info",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        break;
                    default:
                        break;
                }
            },
            complete: function () {
                setTimeout(() => {
                    $(".overlayCargue").fadeOut("slow");
                }, 1000);
            },
            error: function (xhr) {
                console.log(xhr);
                Swal.fire({
                    icon: "error",
                    title: "<strong>Error!</strong>",
                    html: "<h5>Se ha presentado un error, por favor informar al area de Sistemas.</h5>",
                    showCloseButton: true,
                    showConfirmButton: false,
                    cancelButtonText: "Cerrar",
                    cancelButtonColor: "#dc3545",
                    showCancelButton: true,
                    backdrop: true,
                });
            },
        });
    };
}

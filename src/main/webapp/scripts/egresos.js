var app = angular.module('egresos', []);
app.controller('egresosController', ['$http', '$compile', '$scope', controladorEgresos]);

$(document).ready(function () {
    $("#selectCategorias").select2({
        language: "es",
        placeholder: "Seleccione una Categoria",
    });
    $("#selectProductos").select2({
        language: "es",
        placeholder: "Seleccione un Producto",
    });
    $('#dttableEgresos').DataTable({
        columns: [
            {
                title: "ID",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "id_egreso",
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
                title: "VALOR<br>COMPRA",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "valor_compra",
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

function controladorEgresos($http, $compile, $scope) {
    var e = this;
    var url = "controller/controller_egresos.jsp";
    var url1 = "controller/controller_inventario.jsp";

    e.listarEgresos = function () {
        $("#dttableEgresos").DataTable().clear();
        var params = {
            proceso: "listarEgresos"
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
                        $("dttableEgresos").DataTable().draw();
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
                        $("#dttableEgresos").DataTable().rows.add(result.datos).draw();
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
                    $("#dttableEgresos").DataTable().columns.adjust().draw();
                    $compile(angular.element($(".action")))($scope);
                }, 100);
                $('#dttableEgresos').on('page.dt', function () {
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
    e.guardarEgreso = function () {
        var params = {
            proceso: "guardarEgreso",
            producto: e.producto,
            valor_compra: e.valor_compra,
            cantidad: e.cantidad,
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
                                title: "<strong>Egreso Guardado</strong>",
                                html: "<h5>El egreso se ha guardado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            e.reset(2);
                            $("#ModalRegistro").modal("hide");
                            e.listarEgresos();
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
    e.eliminarEgreso = function (id) {
        Swal.fire({
            icon: 'info',
            title: '<strong>Eliminar Egreso</strong>',
            html: '<h5>Esta seguro de eliminar este egreso?</h5>',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            backdrop: true,
            width: 600
        }).then((result) => {
            if (result.isConfirmed) {
                var params = {
                    proceso: "eliminarEgreso",
                    id_egreso: id
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
                                    title: "Egreso Eliminado Satisfactoriamente",
                                    text: "",
                                    icon: "success",
                                    showCancelButton: true,
                                    showConfirmButton: false,
                                    cancelButtonColor: "#d33",
                                    cancelButtonText: "Cerrar!",
                                });
                                e.listarEgresos();
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
    e.actualizarEgreso = function () {
        var params = {
            proceso: "actualizarEgreso",
            id_egreso: e.id_egreso,
            producto: e.producto,
            valor_compra: e.valor_compra,
            cantidad: e.cantidad
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
                                title: "<strong>Egreso Actualizado</strong>",
                                html: "<h5>El egreso se ha actualizado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            e.reset(2);
                            $("#ModalRegistro").modal("hide");
                            e.listarEgresos();
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
    e.showModalRegistro = function () {
        $("#ModalRegistro").find("h5.modal-title").html("Crear Egreso");
        var element = '<button type="button" class="btn btn-success" id="btnRegistro" ng-click="e.guardarEgreso()">Registrar</button>';
        $("#footerBtn").append($compile(angular.element(element))($scope));
        mostrar_modal("ModalRegistro");
    };
    e.verEgreso = function (id, edit) {
        var params = {
            proceso: "verEgreso",
            id_egreso: id,
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
                            $("#ModalRegistro").find("h5.modal-title").html("Ver Egreso");
                        } else if (edit == 2) {
                            vercampos("#frmRegistro", 1);
                            $("#ModalRegistro").find("h5.modal-title").html("Editar Egreso");
                            var element = '<button type="button" class="btn btn-success" id="btnRegistro" ng-click="e.actualizarEgreso()">Actualizar</button>';
                            $("#footerBtn").append($compile(angular.element(element))($scope));
                        }

                        e.id_egreso = result.id_egreso;
                        e.valor_compra = result.valor_compra;
                        e.cantidad = result.cantidad;
                        e.categoria = result.categoria;
                        $scope.$apply();
                        $("#selectCategorias").trigger("change");
                        e.cargarProductos();
                        setTimeout(() => {
                            e.producto = result.producto;
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
    e.reset = function (tipo) {
        vercampos("#frmRegistro", 1);
        $("#btnRegistro").remove();
        $("#frmRegistro").trigger("reset");

        e.id_egreso = "";
        e.valor_compra = "";
        e.cantidad = "";
        e.producto = "";

        switch (tipo) {
            case 1:
                e.categoria = "";
                setTimeout(() => {
                    $("#selectCategorias").val("").trigger("change");
                }, 100);
                break;
            case 2:
                setTimeout(() => {
                    $("#selectCategorias").trigger("change");
                }, 100);
                e.categoria = "";
                setTimeout(() => {
                    $("#selectCategorias").val("").trigger("change");
                }, 100);
                break;
            default:
                break;
        }
    };
    e.cargarCategorias = function () {
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
                        e.categorias = result.datos;
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
    e.cargarProductos = function () {
        var params = {
            proceso: "cargarProductos",
            id_categoria: e.categoria
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
                        e.productos = result.datos;
                        $scope.$apply();
                        $("#selectProductos").trigger("change");
                        break;
                    case 2:
                        e.productos = "";
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
    e.generarExcel = function () {
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
                        $a.attr("download", "Reporte Egresos");
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

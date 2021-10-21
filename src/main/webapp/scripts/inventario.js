var app = angular.module('inventario', []);
app.controller('inventarioController', ['$http', '$compile', '$scope', controladorInventario]);
app.controller('categoriasController', ['$http', '$compile', '$scope', controladorCategorias]);

$(document).ready(function () {
    $("#selectCategorias").select2({
        language: "es",
        placeholder: "Seleccione una Categoria",
    });
    $('#dttableInventario').DataTable({
        columns: [
            {
                title: "ID",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "id_inventario",
            },
            {
                title: "CATEGORIA",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "nombre_categoria",
            },
            {
                title: "DESCRIPCION",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "descripcion",
            },
            {
                title: "PROVEEDOR",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "proveedor",
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
                title: "STOCK",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "stock",
            },
            {
                title: "ESTADO",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "nombre_estado",
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
    $('#dttableCategorias').DataTable({
        columns: [
            {
                title: "ID",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "id_categoria",
            },
            {
                title: "DESCRIPCION",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "descripcion",
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
                title: "ESTADO",
                className: "text-center text-nowrap",
                responsivePriority: 1,
                data: "nombre_estado",
            },
            {
                title: "",
                className: "text-center text-nowrap actionCategorias",
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
});

function controladorInventario($http, $compile, $scope) {
    var i = this;
    var url = "controller/controller_inventario.jsp";

    i.listarInventario = function () {
        $("#dttableInventario").DataTable().clear();
        var params = {
            proceso: "listarInventario"
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
                        $("dttableInventario").DataTable().draw();
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
                        $("#dttableInventario").DataTable().rows.add(result.datos).draw();

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
                    $("#dttableInventario").DataTable().columns.adjust().draw();
                    $compile(angular.element($(".action")))($scope);
                }, 100);
                $('#dttableInventario').on('page.dt', function () {
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
    i.guardarInventario = function () {
        var params = {
            proceso: "guardarInventario",
            descripcion: i.descripcion,
            categoria: i.categoria,
            proveedor: i.proveedor,
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
                                title: "<strong>Producto Guardado</strong>",
                                html: "<h5>El producto se ha guardado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            i.reset();
                            $("#ModalRegistro").modal("hide");
                            i.listarInventario();
                            break;
                        case 2:
                            $.toast({
                                heading: "Duplicado!",
                                text: "Ya existe un Producto con este nombre",
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

        }
    };
    i.cambiarEstado = function (id, estado) {
        var params = {
            proceso: "cambiarEstado",
            id_inventario: id,
            estado: estado
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
                            title: "Cambio de Estado Satisfactorio",
                            text: "",
                            icon: "success",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        i.listarInventario();
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
    i.actualizarInventario = function () {
        var params = {
            proceso: "actualizarInventario",
            id_inventario: i.id_inventario,
            descripcion: i.descripcion,
            categoria: i.categoria,
            proveedor: i.proveedor
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
                                title: "<strong>Producto Actualizado</strong>",
                                html: "<h5>El producto se ha actualizado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            i.reset();
                            $("#ModalRegistro").modal("hide");
                            i.listarInventario();
                            break;
                        case 2:
                            $.toast({
                                heading: "Duplicado!",
                                text: "Ya existe un Producto con este nombre",
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
        }
    };
    i.showModalRegistro = function () {
        $("#ModalRegistro").find("h5.modal-title").html("Crear Producto");
        var element = '<button type="button" class="btn btn-success" id="btnRegistro" ng-click="i.guardarInventario()">Registrar</button>';
        $("#footerBtn").append($compile(angular.element(element))($scope));
        mostrar_modal("ModalRegistro");
    };
    i.verInventario = function (id, edit) {
        var params = {
            proceso: "verInventario",
            id_inventario: id,
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
                            $("#ModalRegistro").find("h5.modal-title").html("Ver Producto");
                        } else if (edit == 2) {
                            vercampos("#frmRegistro", 1);
                            $("#ModalRegistro").find("h5.modal-title").html("Editar Producto");
                            var element = '<button type="button" class="btn btn-success" id="btnRegistro" ng-click="i.actualizarInventario()">Actualizar</button>';
                            $("#footerBtn").append($compile(angular.element(element))($scope));
                        }

                        i.id_inventario = result.id_inventario;
                        i.descripcion = result.descripcion;
                        i.categoria = result.categoria;
                        i.proveedor = result.proveedor;
                        $scope.$apply();
                        $("#selectCategorias").trigger("change");
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
    i.reset = function () {
        vercampos("#frmRegistro", 1);
        $("#btnRegistro").remove();
        $("#frmRegistro").trigger("reset");
        i.id_inventario = "";
        i.descripcion = "";
        i.categoria = "";
        i.proveedor = "";
        setTimeout(() => {
            $("#selectCategorias").val("").trigger("change");
        }, 100);
    };
    i.mostrarPanel = function (value) {
        switch (value) {
            case 1:
                $("#panelCategorias").show();
                $("#panelInventario").hide();
                $scope.$broadcast('eventos', 1);
                break;
            case 2:
                $("#panelInventario").show();
                $("#panelCategorias").hide();
                i.cargarCategorias();
                i.listarInventario();
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
}

function controladorCategorias($http, $compile, $scope) {
    var c = this;
    var url = "controller/controller_categorias.jsp";
    c.listarCategorias = function () {
        $("#dttableCategorias").DataTable().clear();
        var params = {
            proceso: "listarCategorias"
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
                        $("dttableCategorias").DataTable().draw();
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
                        $("#dttableCategorias").DataTable().rows.add(result.datos).draw();
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
                    $("#dttableCategorias").DataTable().columns.adjust().draw();
                    $compile(angular.element($(".actionCategorias")))($scope);
                    $('#dttableCategorias').on('page.dt', function () {
                        setTimeout(() => {
                            $(".actionCategorias").each(function (index) {
                                var template = $(this).html();
                                var compiled = $compile(template)($scope);
                                $(this).html(compiled);
                            });
                        }, 100);
                    });
                }, 100);
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
    c.guardarCategoria = function () {
        var params = {
            proceso: "guardarCategoria",
            descripcion: c.descripcion,
        };
        var respuestavalidacion = validarcampos("#frmRegistroCategorias");
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
                                title: "<strong>Categoria Guardada</strong>",
                                html: "<h5>La categoria se ha guardado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            c.reset();
                            $("#ModalRegistroCategorias").modal("hide");
                            c.listarCategorias();
                            break;
                        case 2:
                            $.toast({
                                heading: "Duplicado!",
                                text: "Ya existe una categoria con este nombre",
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
        }
    };
    c.cambiarEstado = function (id, estado) {
        var params = {
            proceso: "cambiarEstado",
            id_categoria: id,
            estado: estado
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
                            title: "Cambio de Estado Satisfactorio",
                            text: "",
                            icon: "success",
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cerrar!",
                        });
                        c.listarCategorias();
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
    c.actualizarCategoria = function () {
        var params = {
            proceso: "actualizarCategoria",
            id_categoria: c.id_categoria,
            descripcion: c.descripcion,
        };
        var respuestavalidacion = validarcampos("#frmRegistroCategorias");
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
                                title: "<strong>Categoria Actualizada</strong>",
                                html: "<h5>La categoria se ha actualizado exitosamente</h5>",
                                showCloseButton: false,
                                confirmButtonText: "Aceptar",
                                confirmButtonColor: "#64a19d",
                                backdrop: true,
                            });
                            c.reset();
                            $("#ModalRegistroCategorias").modal("hide");
                            c.listarCategorias()();
                            break;
                        case 2:
                            $.toast({
                                heading: "Duplicado!",
                                text: "Ya existe un Producto con este nombre",
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
        }
    };
    c.showModalRegistro = function () {
        $("#ModalRegistroCategorias").find("h5.modal-title").html("Crear Categoria");
        var element = '<button type="button" class="btn btn-success" id="btnRegistroCategorias" ng-click="c.guardarCategoria()">Registrar</button>';
        $("#footerBtnCategorias").append($compile(angular.element(element))($scope));
        mostrar_modal("ModalRegistroCategorias");
    };
    c.verCategoria = function (id, edit) {
        var params = {
            proceso: "verCategoria",
            id_categoria: id,
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
                            vercampos("#frmRegistroCategorias", 2);
                            $("#ModalRegistroCategorias").find("h5.modal-title").html("Ver Categoria");
                        } else if (edit == 2) {
                            vercampos("#frmRegistroCategorias", 1);
                            $("#ModalRegistroCategorias").find("h5.modal-title").html("Editar Categoria");
                            var element = '<button type="button" class="btn btn-success" id="btnRegistroCategorias" ng-click="c.actualizarCategoria()">Actualizar</button>';
                            $("#footerBtnCategorias").append($compile(angular.element(element))($scope));
                        }

                        c.id_categoria = result.id_categoria;
                        c.descripcion = result.descripcion;
                        $scope.$apply();
                        mostrar_modal("ModalRegistroCategorias");
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
    c.reset = function () {
        vercampos("#frmRegistroCategorias", 1);
        $("#btnRegistroCategorias").remove();
        $("#frmRegistroCategorias").trigger("reset");
        c.id_categoria = "";
        c.descripcion = "";
    };
    $scope.$on('eventos', function (event, tipo) {
        switch (tipo) {
            case 1:
                c.listarCategorias();
                break;
            default:
                break;
        }
    });
}
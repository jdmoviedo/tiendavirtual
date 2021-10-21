var app = angular.module('login', []);
app.controller('loginController', ['$http', '$compile', '$scope', controladorLogin]);
$(document).ready(function () {
    $(".numero").inputmask("numero");
    $("#selectDepartamentos").select2({
        placeholder: "Seleccione un Departamento"
    });
    $("#selectMunicipios").select2({
        placeholder: "Seleccione un Municipio"
    });
});
function controladorLogin($http, $compile, $scope) {
    var l = this;
    var url = "controller/controller_login.jsp";
    l.registarse = function () {
        var params = {
            proceso: "Registrarse",
            correo: l.registrarcorreo,
            contrasenia: l.registrarcontrasenia,
            nombre_tienda: l.registrarnombretienda,
            nombre_tendero: l.registrarnombretendero,
            nit: l.registrarnit,
            telefono: l.registrartelefono,
            direccion: l.registrardireccion,
            municipio: l.municipio,
        };
        var respuestavalidacion = validarcampos("#frmRegistrar");
        if (respuestavalidacion) {
            var contrasenias = validarcontrasenias($("#contraseña1"), $("#contraseña2"));
            if (contrasenias) {
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
                                    title: "<strong>Usuario Creado Correctamente!</strong>",
                                    html: "",
                                    showCloseButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: "Cerrar",
                                    cancelButtonColor: "#dc3545",
                                    showCancelButton: true,
                                    backdrop: true,
                                });
                                l.mostrarPanel(1);
                                l.reset(1);
                                break;
                            case 2:
                                Swal.fire({
                                    icon: "info",
                                    title: "<strong>Duplicado!</strong>",
                                    html: "<h5>Ya existe una tienda con este correo.</h5>",
                                    showCloseButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: "Cerrar",
                                    cancelButtonColor: "#dc3545",
                                    showCancelButton: true,
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
        }
    };
    l.login = function () {
        console.log(l);
        var params = {
            proceso: "iniciarSesion",
            correo: l.correo,
            contraseña: l.password,
        };
        var respuestavalidacion = validarcampos("#frmLogin");
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
                            window.location.replace(urlBase + "inventario.jsp");
                            break;
                        case 2:
                            Swal.fire({
                                title: "Contraseña Incorrecta",
                                text: "",
                                icon: "error",
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonColor: "#d33",
                                cancelButtonText: "Cerrar!",
                            });
                            break;
                        case 3:
                            Swal.fire({
                                title: "Usuario no existe",
                                text: "",
                                icon: "error",
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonColor: "#d33",
                                cancelButtonText: "Cerrar!",
                            });
                            break;
                        case 4:
                            Swal.fire({
                                title: "Usuario Inactivo",
                                text: "",
                                icon: "error",
                                showCancelButton: true,
                                showConfirmButton: false,
                                cancelButtonColor: "#d33",
                                cancelButtonText: "Cerrar!",
                            });
                            break;
                        case 4:
                            Swal.fire({
                                title: "Falta validar correo",
                                text: "",
                                icon: "error",
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
        }
    };
    l.mostrarPanel = function (value) {
        switch (value) {
            case 1:
                $("#panelIngresar").show();
                $("#panelRegistrar").hide();
                break;
            case 2:
                $("#panelRegistrar").show();
                $("#panelIngresar").hide();
                break;
            default:
                break;
        }
    };
    l.cargarDepartamentos = function () {
        var params = {
            proceso: "cargarDepartamentos",
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
                        l.departamentos = result.datos;
                        $scope.$apply();
                        $("#selectDepartamentos").trigger("change");
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
    l.cargarMunicipios = function (id) {
        var params = {
            proceso: "cargarMunicipios",
            id_departamento: id,
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
                        l.municipios = result.datos;
                        $scope.$apply();
                        $("#selectMunicipios").trigger("change");
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
    l.pulsaenter = function (e) {
        var esIE = document.all;
        var esNS = document.layers;
        tecla = esIE ? event.keyCode : e.which;
        if (tecla == 13) {
            l.login();
        }
    };
    l.reset = function () {
        $("#frmRegistrar").trigger("reset");
        l.registrarcorreo = "";
        l.registrarcontrasenia = "";
        l.registrarnombretienda = "";
        l.registrarnombretendero = "";
        l.registrarnit = "";
        l.registrartelefono = "";
        l.registrardireccion = "";
        l.municipio = "";
        setTimeout(() => {
            $("#selectDepartamentos").trigger("change");
        }, 100);
    };
}

function logout() {
    var url = "controller/controller_login.jsp";
    var params = {
        proceso: "logout",
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
                    window.location.replace(urlBase + "login.jsp");
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
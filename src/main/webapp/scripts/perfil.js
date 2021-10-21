var app = angular.module('perfil', []);
app.controller('perfilController', ['$http', '$compile', '$scope', controladorPerfil]);

$(document).ready(function () {
    $(".numero").inputmask("numero");
    $("#selectDepartamentos").select2({
        placeholder: "Seleccione un Departamento"
    });
    $("#selectMunicipios").select2({
        placeholder: "Seleccione un Municipio"
    });
});

function controladorPerfil($http, $compile, $scope) {
    var p = this;
    var url = "controller/controller_perfil.jsp";
    var url1 = "controller/controller_login.jsp";

    p.cargarDatos = function () {
        var params = {
            proceso: "cargarDatos"
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
                        p.correo = result.correo;
                        p.nombre_tienda = result.nombre_tienda;
                        p.nombre_tendero = result.nombre_tendero;
                        p.nit = result.nit;
                        p.telefono = result.telefono;
                        p.direccion = result.direccion;
                        p.departamento = result.departamento;
                        p.foto = result.foto;
                        $scope.$apply();
                        $("#selectDepartamentos").trigger("change");
                        p.cargarMunicipios();
                        setTimeout(() => {
                            p.municipio = result.municipio;
                            $("#selectMunicipios").trigger("change");
                        }, 300);
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
    p.actualizarPerfil = function () {
        var params = {
            proceso: "actualizarPerfil",
            nombre_tienda: p.nombre_tienda,
            nombre_tendero: p.nombre_tendero,
            nit: p.nit,
            telefono: p.telefono,
            direccion: p.direccion,
            municipio: p.municipio
        };
        var respuestavalidacion = validarcampos("#frmPerfil");
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
                                title: "<strong>Datos actualizados correctamente!</strong>",
                                html: "",
                                showCloseButton: true,
                                showConfirmButton: false,
                                cancelButtonText: "Cerrar",
                                cancelButtonColor: "#dc3545",
                                showCancelButton: true,
                                backdrop: true,
                            });
                            p.cargarDatos();
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
    p.actualizarContrasenia = function () {
        var params = {
            proceso: "actualizarContraseña",
            contrasenia: p.contrasenia
        };
        var respuestavalidacion = validarcampos("#frmCambioContraseña");
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
                                    title: "<strong>Contraseña actualizada correctamente!</strong>",
                                    html: "",
                                    showCloseButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: "Cerrar",
                                    cancelButtonColor: "#dc3545",
                                    showCancelButton: true,
                                    backdrop: true,
                                });
                                p.contrasenia = "";
                                p.confirmarcontrasenia = "";
                                $("#contraseña1").val("");
                                $("#contraseña2").val("");
                                $scope.$apply();
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
    p.cargarDepartamentos = function () {
        var params = {
            proceso: "cargarDepartamentos",
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
                        p.departamentos = result.datos;
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
    p.cargarMunicipios = function () {
        var params = {
            proceso: "cargarMunicipios",
            id_departamento: p.departamento,
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
                        p.municipios = result.datos;
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
    p.actualizarFoto = async function () {
        var respuestavalidacion = validarcampos("#frmSubirFotos");
        if (respuestavalidacion) {
            var respuestavalidacion = validar_foto("archivo");
            if (respuestavalidacion) {
                var file = document.querySelector('#archivo').files[0];
                var foto = "";
                var toBase64 = file => new Promise((resolve, reject) => {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    });
                foto = await toBase64(file);
                var params = {
                    proceso: "actualizarFoto",
                    foto: foto
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
                                    icon: "success",
                                    title: "<strong>Foto actualizada correctamente!</strong>",
                                    html: "",
                                    showCloseButton: true,
                                    showConfirmButton: false,
                                    cancelButtonText: "Cerrar",
                                    cancelButtonColor: "#dc3545",
                                    showCancelButton: true,
                                    backdrop: true,
                                });
                                p.cargarDatos();
                                p.reset();
                                $("#ModalSubirFoto").modal("hide");
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
    p.reset = function () {
        $("#archivo").val("");
        $(".custom-file-label").html("Subir Foto");
    };
}

$("#archivo").change(function () {
    if ($("#archivo").val() == "") {
        $(".custom-file-label").html("Subir Foto");
    } else {
        var file = $("#archivo")[0].files[0].name;
        $(".custom-file-label").html(file);
    }
});
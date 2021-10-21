function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function ponerPuntosMil(numero) {
    var numeroStr = numero.toString();
    //cuento los digitos del numero
    var digitos = numeroStr.length;
    //establezco cuantos digitos sobran (resto)
    var digitosSobrantes = digitos % 3;
    var cantidadPuntos = 0;
    if (digitos < 4) {
        cantidadPuntos = 0;
    } else {
        if (digitosSobrantes != 0) {
            cantidadPuntos = (digitos - digitosSobrantes) / 3;
        } else {
            cantidadPuntos = (digitos - digitosSobrantes) / 3 - 1;
        }
    }
    var inicioCadena = 0;
    var posicionPunto = digitosSobrantes == 0 ? 3 : digitosSobrantes;
    var numeroFormateado = "";
    for (var i = 0; i < cantidadPuntos; i++) {
        numeroFormateado += numeroStr.substring(inicioCadena, posicionPunto) + ".";
        inicioCadena = posicionPunto;
        posicionPunto = posicionPunto + 3;
    }
    numeroFormateado += numeroStr.substring(inicioCadena, posicionPunto);
    return numeroFormateado;
}
//verificar si es movil
var esMovil = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                esMovil.Android() ||
                esMovil.BlackBerry() ||
                esMovil.iOS() ||
                esMovil.Opera() ||
                esMovil.Windows()
                );
    },
};

// Validacion de campo vacio
function isEmpty(valor) {
    return !$.trim(valor);
}

//desplazarse al id de un elemento
function desplazarseAId(id) {
    $("html,body").animate(
            {
                scrollTop: $("#" + id).offset().top,
            },
            3000
            );
}
//desplazarse a elemento
function desplazarseAElemento(elemento, tiempo) {
    $("html,body").animate(
            {
                scrollTop: $(elemento).offset().top - 30,
            },
            tiempo
            );
}

//funcion para agregar o remover una clase a un elemento
//id del elemento
//clase a alternar
//agregar-true / eliminar-false
function agregarOEliminarClase(id, clase, accion) {
    $("#" + id).toggleClass(clase, accion);
}
//funcion para recibir parametro get javascript basado en la url
function $_GET(param) {
    /* Obtener la url completa */
    url = document.URL;
    /* Buscar a partir del signo de interrogación ? */
    url = String(url.match(/\?+.+/));
    /* limpiar la cadena quitándole el signo ? */
    url = url.replace("?", "");
    /* Crear un array con parametro=valor */
    url = url.split("&");

    /*
     Recorrer el array url
     obtener el valor y dividirlo en dos partes a través del signo =
     0 = parametro
     1 = valor
     Si el parámetro existe devolver su valor
     */
    x = 0;
    while (x < url.length) {
        p = url[x].split("=");
        if (p[0] == param) {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}

function buscar_en_select(select, valorBuscado) {
    var respuesta = false;
    $(select)
            .children("option")
            .each(function (index, el) {
                if (this.value == valorBuscado) {
                    respuesta = true;
                }
            });
    return respuesta;
}

function ocultar_alert(botonCerrar) {
    $(botonCerrar).parent().fadeOut("slow");
}

function abrir_popup_pdf(url, titulo) {
    var objeto_window_referencia = window.open(url, titulo, "fullscreen=yes");
}

function obetenerNumStr(string) {
    var regex = /(\d+)/g;
    return string.match(regex);
}

function in_array(valor, arry) {
    var boolArry = false;
    for (var i = 0; i < arry.length; i++) {
        if (valor == arry[i]) {
            boolArry = true;
        }
    }
    return boolArry;
}

function eliminarespacios(elemento) {
    var input = $(elemento);
    var valor = input.val().replace(" ", "");
    input.val(valor);
}

function limpiarcampos(contenedor) {
    $(contenedor)
            .find(".form-control")
            .filter(":visible")
            .each(function () {
                if ($(this).hasClass("datepicker-readonly")) {
                    // No hacer nada
                    $("#" + $(this).attr("id")).datepicker(
                            "update",
                            moment().locale("es").format("MMMM/D/YYYY")
                            );
                } else {
                    if ($(this).is("select") == true) {
                        $(this).val(0);
                        $(this).trigger("change");
                    } else {
                        $(this).val("");
                    }
                }
            });
}

String.prototype.reverse = function () {
    var str = this,
            newString = new String();
    for (n = str.length; n >= 0; n--) {
        newString += str.charAt(n);
    }
    return newString;
};

function reverse_number(numero) {
    numero = numero + "";
    return numero.split("").reverse().join("");
}

function limpiarhtml(modal) {
    var itemCuenta;
    switch (modal) {
        case "causacion":
            $("#tituloTercero").html("");
            $("#rowRetencion").html("");
            itemCuenta += "<tr>";
            itemCuenta += "<td>";
            itemCuenta +=
                    '<select class="form-control requerido" id="itemCuenta" name="codigoCuenta">';
            itemCuenta += '<option value="">SELECCIONE</option>';
            itemCuenta += "</select>";
            itemCuenta += "</td>";
            itemCuenta += "<td>";
            itemCuenta +=
                    '<input type="text" class="form-control" name="descripcionCuenta" disabled="true">';
            itemCuenta += "</td>";
            itemCuenta += "<td>";
            itemCuenta +=
                    '<input type="text" class="form-control" name="tipoMovimiento" disabled="true">';
            itemCuenta += "</td>";
            itemCuenta += "<td>";
            itemCuenta +=
                    '<input type="text" class="form-control numero" name="valorMovimiento" value="0">';
            itemCuenta += "</td>";
            itemCuenta += "</tr>";
            $("#relacionCuentas").html(itemCuenta);
            $("#itemCuenta").select2({
                language: "es",
                tags: false,
                placeholder: "Seleccione Cuenta",
                allowClear: false,
                dropdownParent: $("#showModalCausacion"),
            });
            break;

        case "pagos":
            // Code
            break;
    }
}

function setIframeLocation(element, value) {
    if (element.contentWindow !== null) {
        element.contentWindow.location.replace(value);
    } else {
        setTimeout(setIframeLocation.bind(this, element, value), 100);
    }
    mostrar_modal("modalPdfGenerado");
}

function mostrar_modal(idModal) {
    if ($(".modal").is(":visible")) {
        $("#modalMostrar").val(idModal);
        $(".modal").modal("hide");
    } else {
        $("#" + idModal).modal("show");
    }
}

$(".modal").on("hidden.bs.modal", function () {
    var modalMostrar = $("#modalMostrar").val();
    if (modalMostrar != "") {
        $("#" + modalMostrar).modal("show");
        $("#modalMostrar").val("");
    } else {
    }
});

// Funcion para hacer el modal-body scrolleable y mantener tamaño de la modal
function setModalScrollBar(element) {
    this.$element = $(element);
    this.$content = this.$element.find(".modal-content");
    var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight = this.$element.find(".modal-header").outerHeight() || 0;
    var footerHeight = this.$element.find(".modal-footer").outerHeight() || 0;
    var maxHeight = contentHeight - (headerHeight + footerHeight);

    this.$content.css({
        overflow: "hidden",
    });

    this.$element.find(".modal-body").css({
        "max-height": maxHeight,
        "overflow-y": "auto",
    });
}

// Funcion para hacer que una modal pueda moverse sobre la ventana
$(".modal-dragable").on("mousedown", function (mousedownEvt) {
    var $draggable = $(this);
    var x = mousedownEvt.pageX - $draggable.offset().left,
            y = mousedownEvt.pageY - $draggable.offset().top;
    $("body").on("mousemove.draggable", function (mousemoveEvt) {
        $draggable.closest(".modal-dialog").offset({
            left: mousemoveEvt.pageX - x,
            top: mousemoveEvt.pageY - y,
        });
    });
    $("body").one("mouseup", function () {
        $("body").off("mousemove.draggable");
    });
    $draggable.closest(".modal").one("bs.modal.hide", function () {
        $("body").off("mousemove.draggable");
    });
});

$(document).ready(function () {
    if (location.pathname.substr(15) == "perfil.jsp") {
    } else {
        $("a[href='" + location.pathname.substr(15) + "']").addClass(
                "active"
                );
        $("a[href='" + location.pathname.substr(15) + "']")
                .parent(".submenu-content")
                .parent(".nav-item")
                .children("a")
                .addClass("active");
        $("a[href='" + location.pathname.substr(15) + "']")
                .parent(".submenu-content")
                .parent(".nav-item")
                .addClass("open");
    }

});

function vercampos(contenedor, tipo) {
    //1 - Desbloquear
    //2 - Bloquear
    $(contenedor)
            .find(".form-control")
            .each(function () {
                if (tipo == 1) {
                    $(this).prop("disabled", false);
                } else if (tipo == 2) {
                    $(this).prop("disabled", true);
                }
            });
}

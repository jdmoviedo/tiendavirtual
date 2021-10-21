var formatos = ["F/d/Y", "l, d de F del Y", "F del Y"];

//obtiene los datos del datedropper
function obtenerfechadatedropper(tipo, idInicial, idFinal, requerido) {
  var fechaRetorno = "";
  switch (tipo) {
    case 1:
      $("#" + idInicial).dateDropper("getDate", function (date) {
        fechaRetorno = date.Y + "-" + date.m + "-" + date.d;
      });
      break;
    case 2:
      $("#" + idInicial).dateDropper("getDate", function (date) {
        fechaInicial = date.Y + "-" + date.m + "-" + date.d;
      });
      $("#" + idFinal).dateDropper("getDate", function (date) {
        fechaFinal = date.Y + "-" + date.m + "-" + date.d;
      });
      fechaRetorno = fechaInicial + "," + fechaFinal;
      break;
    case 3:
      break;
    case 4:
      $("#" + idInicial).dateDropper("getDate", function (date) {
        fechaRetorno = date.Y + "-" + date.m;
      });
      break;
  }

  return fechaRetorno;
}

function initDateDropper(ids, formato = 0, tema = 0, rangos = []) {
  var temas = ["ryanair"];
  for (let index = 0; index < ids.length; index++) {
    $("#" + ids[index]).dateDropper({
      format: formatos[formato],
      lang: "es",
      theme: temas[tema],
      large: true,
      largeDefault: true,
    });
  }
  if (rangos.length == 2) {
    //FECHA INICIAL
    $("#" + ids[rangos[0]]).dateDropper("set", {
      maxDate: moment().format("MM/DD/YYYY"),
    });
    //FECHA FINALIZA_LOOP
    $("#" + ids[rangos[1]]).dateDropper("set", {
      onChange: function (res) {
        $("#" + ids[rangos[0]]).dateDropper("getDate", function (date) {
          if (res.date.U < date.U) {
            $("#" + ids[rangos[0]]).dateDropper("set", {
              maxDate: res.date.m + "/" + res.date.d + "/" + res.date.Y,
              defaultDate: res.date.m + "/" + res.date.d + "/" + res.date.Y,
            });
            $("#" + ids[rangos[0]]).val(
              res.date.l +
                ", " +
                res.date.d +
                " de " +
                res.date.F +
                " del " +
                res.date.Y
            );
          } else {
            $("#" + ids[rangos[0]]).dateDropper("set", {
              maxDate: res.date.m + "/" + res.date.d + "/" + res.date.Y,
              defaultDate: date.m + "/" + date.d + "/" + date.Y,
            });
          }
        });
      },
    });
  }
}

function setDateDropper(id, fecha, formato = 0) {
  $("#" + id).dateDropper("set", {
    defaultDate: moment(fecha).format("MM/DD/YYYY"),
  });
  $("#" + id).dateDropper("getDate", function (date) {
    switch (formato) {
      case 0:
        $("#" + id).val(date.F + "/" + date.d + "/" + date.Y);
        break;
      case 1:
        $("#" + id).val(
          date.l + ", " + date.d + " de " + date.F + " del " + date.Y
        );
        break;
      case 2:
        $("#" + id).val(date.F + " del " + date.Y);
        break;
      default:
        $("#" + id).val(date.F + "/" + date.d + "/" + date.Y);
        break;
    }
  });
}

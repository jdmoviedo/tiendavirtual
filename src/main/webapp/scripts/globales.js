var urlBase = rutaActual();
function rutaActual(){
	var partesrutaactual = window.location.pathname.split('/');
	var rutaactual = "";
	for (i = 0; i < partesrutaactual.length - 1; i++) {
		rutaactual += partesrutaactual[i];
		rutaactual += "/";
	}
	return window.location.protocol+"//"+window.location.hostname+":"+window.location.port+rutaactual;
}//alert(urlBase);
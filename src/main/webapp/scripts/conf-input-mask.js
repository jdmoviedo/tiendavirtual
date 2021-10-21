Inputmask.extendAliases({
	'myDecimal': {
		alias: "numeric",
		digits: 3,
		allowPlus: false,
		allowMinus: false,
		radixPoint: ','
		//min: 30,
		//max: 400
	},
	'numerico': {
		alias: "numeric",
		digits: 0,
		allowPlus: false,
		allowMinus: false,
		rightAlign: false,
		min: 60,
		max: 250
	},
	'cedula': {
		alias: "numeric",
		digits: 0,
		allowPlus: false,
		allowMinus: false,
		rightAlign: false
	},
	'registros': {
		alias: "numeric",
		digits: 0,
		allowPlus: false,
		allowMinus: false,
		rightAlign: false
	},
	'numero': {
		alias: "numeric",
		digits: 0,
		allowPlus: false,
		allowMinus: false,
		rightAlign: false
	},
	'numero': {
		alias: "numeric",
		digits: 0,
		allowPlus: false,
		allowMinus: false,
		rightAlign: false
	},
	'numerodecimal': {
		alias: "numeric",
		digits: 3,
		allowPlus: true,
		allowMinus: false,
		rightAlign: false,
		min: 0.18,
		max: 2000
	}
});

$(".decimal-punto").inputmask("myDecimal");
$('.input-ip').inputmask('ip');
$('.numerico').inputmask('numerico');
$('.cedula').inputmask('cedula');
$('.classRegistros').inputmask('registros');
$('.numero').inputmask('numero');
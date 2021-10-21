<%@page contentType="text/html" pageEncoding="UTF-8" session="true"%>

<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>

        <!-- Google fonts-->
        <link href="dist/img/logo.png" rel="icon" type="image/png">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800" rel="stylesheet">
        <!-- Bootstrap -->
        <link href="plugins/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link href="plugins/fontawesome-free/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="plugins/select2/dist/css/select2.min.css">
        <!-- Css Personalizadas -->
        <link href="dist/css/custom.css" rel="stylesheet">
        <link href="dist/css/tooltips.css" rel="stylesheet">
        <style>
            .select2-container {
                background: transparent;
                border-bottom: 1px solid white;
            }

            .select2-container .select2-selection {
                border: none;
                height: 40px;
                background: rgba(0, 0, 0, 0.0);
            }

            .select2-container .select2-selection span:first-child {
                color: white;
            }

            ::-webkit-scrollbar {
                width: 13px;
                height: 13px;
            }

            ::-webkit-scrollbar-thumb {
                background: #0B2944;
                border-radius: 10px;
            }

        </style>
    </head>

    <body class="loginazul" ng-app="login" ng-controller = "loginController as l" ng-init="l.cargarDepartamentos()">
        <%  String validarIngreso =(String)session.getAttribute("usuario");  
            if(validarIngreso != null){
                response.sendRedirect("inventario.jsp");
            }
            %>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-6 col-md-offset-6" style="margin-top: 40px;" id="panelIngresar">
                    <div class="text-center" style="color:white">
                        <h2><small>BIENVENIDO A</small>
                            <p><strong>TIENDA VIRTUAL</strong></p>
                        </h2>
                        <div style="margin-top:40px;">
                            <a href="index.jsp">
                                <img src="dist/img/logo.png" style="width:60%;">
                            </a>
                        </div>

                        <form id="frmLogin">
                            <div class="form-group" style="margin-top:70px !important;">
                                <a class="tooltips" style="text-decoration:none">
                                    <input type="email" class="form-text form-control requerido" title="Ingresa tu Correo"  minlength="6" maxlength="50" ng-keydown="l.pulsaenter($event)" placeholder="Correo" ng-model="l.correo">
                                    <span class="spanValidacion"></span>
                                </a>
                            </div>
                            <div class="form-group" style="margin-top:70px !important;">
                                <a class="tooltips" style="text-decoration:none">
                                    <input type="password" class="form-text form-control requerido" title="Ingresa tu Contraseña"  minlength="8" maxlength="20" ng-keydown="l.pulsaenter($event)" placeholder="Contraseña" ng-model="l.password" pattern="^[a-zA-Z0-9ñÑ]+$" data-pattern="Solo se permiten numeros y letras" data-pattern-replace="[^a-zA-Z0-9ñÑ]" oninput="limitecaracteres(this);">
                                    <span class="spanValidacion"></span>
                                </a>
                            </div>
                        </form>
                    </div>
                    <div style="background-color: #fff;margin-top:100px;">
                        <div class="botoniniciar">
                            <button type="button" class="btn btniniciarsesion" ng-click="l.login();" id="btnLoginIngresar">INGRESAR</button>
                        </div>
                        <p class="text-center" style="padding-top: 40px;">
                            <a href="javascript:;" onclick="mostrar_modal('ModalRecuperar');" style="color:black;">
                                <h7>Olvidaste tu contraseña?</h7>
                            </a>
                        </p>
                        <p class="text-center" style="padding-bottom: 40px;">
                            No tienes una cuenta? 
                            <a href="javascript:;" ng-click="l.mostrarPanel(2);" style="color:black;">Crear una cuenta</a>
                        </p>
                    </div>
                </div>
                <div class="col-md-6 col-md-offset-6" style="margin-top: 40px;display:none;" id="panelRegistrar">
                    <div class="text-center" style="color:white">
                        <h2><small>BIENVENIDO A</small>
                            <p><strong>TIENDA VIRTUAL</strong></p>
                        </h2>
                        <div style="margin-top:40px;">
                            <a href="index.php">
                                <img src="dist/img/logo.png" style="width:60%;">
                            </a>
                        </div>

                        <form id="frmRegistrar">
                            <div class="row"  style="margin-top:40px !important;">
                                <div class="form-group col-md-6">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="email" class="form-text form-control requerido maxlength-input" title="Ingresa tu Correo" minlength="6" maxlength="50" placeholder="Correo" ng-model="l.registrarcorreo" oninput="limitecaracteres(this);">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="password" class="form-text form-control requerido maxlength-input" id="contraseña1" title="Ingresa tu Contraseña" minlength="8" maxlength="20" placeholder="Contraseña" ng-model="l.registrarcontrasenia" pattern="^[a-zA-Z0-9ñÑ]+$" data-pattern="Solo se permiten numeros y letras" data-pattern-replace="[^a-zA-Z0-9ñÑ]" oninput="limitecaracteres(this);" >
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="password" class="form-text form-control requerido maxlength-input" id="contraseña2" title="Confirme Contraseña" minlength="8" maxlength="20" placeholder="Confirmar Contraseña" ng-model="l.registrarconfirmarcontrasenia" pattern="^[a-zA-Z0-9ñÑ]+$" data-pattern="Solo se permiten numeros y letras" data-pattern-replace="[^a-zA-Z0-9ñÑ]" oninput="limitecaracteres(this);">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="text" class="form-text form-control requerido maxlength-input" title="Nombre Tienda" minlength="5" maxlength="50" placeholder="Nombre Tienda" ng-model="l.registrarnombretienda" pattern="^[a-zA-Z0-9ñÑ\s]+$" data-pattern="Solo se permiten letras y numeros" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="text" class="form-text form-control requerido maxlength-input" title="Nombre Tendero" minlength="5" maxlength="50" placeholder="Nombre Tendero" ng-model="l.registrarnombretendero" pattern="^[a-zA-ZñÑ\s]+$" data-pattern="Solo se permiten letras" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="text" class="form-text form-control requerido numero maxlength-input" title="Nit" minlength="9" maxlength="15" placeholder="Nit" ng-model="l.registrarnit" oninput="limitecaracteres(this);">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="text" class="form-text form-control requerido numero maxlength-input" title="Telefono" minlength="7" maxlength="10" placeholder="Telefono" ng-model="l.registrartelefono" oninput="limitecaracteres(this);">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips" style="text-decoration:none">
                                        <input type="text" class="form-text form-control requerido maxlength-input" title="Dirección" minlength="10" maxlength="50" placeholder="Dirección" ng-model="l.registrardireccion">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips">
                                        <select class="form-control requerido" id="selectDepartamentos" title="Departamento" style="width: 100%;" ng-model="l.departamento" ng-change="l.cargarMunicipios(l.departamento)">
                                            <option ng-repeat="departamento in l.departamentos" value="{{departamento.id}}">{{departamento.descripcion}}</option>
                                        </select>
                                        <span class="spanValidacion" style="left: 50% !important;"></span>
                                    </a>
                                </div>
                                <div class="form-group col-md-6" style="margin-top:20px !important;">
                                    <a class="tooltips">
                                        <select class="form-control requerido" id="selectMunicipios" title="Municipio" style="width: 100%;" ng-model="l.municipio">
                                            <option ng-repeat="municipio in l.municipios" value="{{municipio.id}}">{{municipio.descripcion}}</option>
                                        </select>
                                        <span class="spanValidacion" style="left: 50% !important;"></span>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div style="background-color: #fff;margin-top:50px;">
                        <div class="botoniniciar">
                            <button type="button" class="btn btniniciarsesion" ng-click="l.registarse()">REGISTRAR</button>
                        </div>
                        <p class="text-center" style="padding-top:30px;padding-bottom:30px;">                            
                            <a href="javascript:;" ng-click="l.mostrarPanel(1);" style="color:black;">Desea Iniciar Sesión?</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="ModalRecuperar" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Olvidaste tu Contraseña</h5>
                    </div>
                    <div class="modal-body">
                        <form id="frmRecuperar">
                            <div class="row">
                                <div class="col-xs-12 col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <a class="tooltips">
                                            <label for="correo" style="color:black">Ingrese el correo electronico</label>
                                            <input type="email" class="form-control requerido maxlength-input" name="recuperarcorreo" id="recuperarcorreo" placeholder="Correo" title="Ingrese el Correo">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="limpiarcampos('#frmRecuperar');">Cancelar</button>
                        <button type="button" class="btn btn-success" onclick="recuperar_contrasenia('frmRecuperar');">Recuperar</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="src/js/vendor/jquery-3.3.1.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
        <script src="plugins/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="plugins/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Sweet Alert -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
        <script src="plugins/select2/dist/js/select2.min.js"></script>
        <!-- input-mask -->
        <script src="plugins/input-mask/dist/jquery.inputmask.bundle.js"></script>
        <script src="plugins/jQuery-Mask-Plugin-master/src/jquery.mask.js"></script>
        <!-- Personalizados -->
        <script src="scripts/conf-input-mask.js"></script>
        <script src="scripts/utilidades.js"></script>
        <script src="scripts/validaciones.js"></script>
        <script src="scripts/login.js"></script>
        <script src="scripts/globales.js"></script>
    </body>

</html>
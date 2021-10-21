<%-- 
    Document   : perfil
    Created on : 16/06/2021, 03:18:34 PM
    Author     : JMENDOZA
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" language="java"%>
<!DOCTYPE html>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Perfil"/>
</jsp:include>
<%  String validarIngreso =(String)session.getAttribute("usuario");  
          if(validarIngreso == null){
              response.sendRedirect("login.jsp");
          }
%>
<div class="container-fluid" ng-app = "perfil" ng-controller = "perfilController as p" ng-init="p.cargarDepartamentos();p.cargarDatos();">
    <div class="page-header">
        <div class="row align-items-center">
            <div class="col-lg-12">
                <div class="page-header-title">
                    <i class="far fa-id-card bg-blue"></i>
                    <h3 style="line-height:1.5;">Perfil</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-4 col-md-5">
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <a href="#" id="foto" onclick="mostrar_modal('ModalSubirFoto')">
                            <i class="fas fa-camera-retro fa-3x" id="subirfoto"></i>
                            <img ng-src="{{p.foto}}" class="rounded-circle" width="150">
                        </a>
                        <h4 class="card-title mt-10" id="nombrerecuperar"></h4>
                        <p class="card-subtitle" id="cargorecuperar"></p>
                    </div>
                </div>
                <hr class="mb-0">
                <div class="card-body">
                    <small class="text-muted d-block"><i class="ik ik-mail"></i> Correo Electronico</small>
                    <h6>{{p.correo}}</h6>
                    <small class="text-muted d-block pt-10"><i class="ik ik-phone"></i> Telefono</small>
                    <h6>{{p.telefono}}</h6>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-md-7">
            <div class="card">
                <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#datospersonales" role="tab">Datos Personales</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-cambiar-contraseñ-tab" data-toggle="pill" href="#cambiocontraseña" role="tab">Cambiar Contraseña</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade active show" id="datospersonales" role="tabpanel">
                        <div class="card-body">
                            <form class="form-horizontal" id="frmPerfil">
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="text" class="form-control requerido maxlength-input" title="Nombre Tienda" minlength="5" maxlength="50" placeholder="Nombre Tienda" ng-model="p.nombre_tienda" pattern="^[a-zA-Z0-9ñÑ\s]+$" data-pattern="Solo se permiten letras y numeros" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);" ng-value="{{p.nombre_tienda}}">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="text" class="form-control requerido maxlength-input" title="Nombre Tendero" minlength="5" maxlength="50" placeholder="Nombre Tendero" ng-model="p.nombre_tendero" pattern="^[a-zA-ZñÑ\s]+$" data-pattern="Solo se permiten letras" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);" ng-value="{{p.nombre_tendero}}">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="text" class="form-control requerido numero maxlength-input" title="Nit" minlength="9" maxlength="15" placeholder="Nit" ng-model="p.nit" oninput="limitecaracteres(this);" ng-value="{{p.nit}}">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="text" class="form-control requerido numero maxlength-input" title="Telefono" minlength="7" maxlength="10" placeholder="Telefono" ng-model="p.telefono" oninput="limitecaracteres(this);" ng-value="{{p.telefono}}">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="text" class="form-control requerido maxlength-input" title="Dirección" minlength="10" maxlength="50" placeholder="Dirección" ng-model="p.direccion">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <select class="form-control requerido" id="selectDepartamentos" title="Departamento" style="width: 100%;" ng-model="p.departamento" ng-change="p.cargarMunicipios()">
                                                <option ng-repeat="departamento in p.departamentos" ng-value="{{departamento.id}}" ng-selected="{{departamento.id === p.departamento}}">{{departamento.descripcion}}</option>
                                            </select>
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <select class="form-control requerido" id="selectMunicipios" title="Municipio" style="width: 100%;" ng-model="p.municipio" ng-value="{{p.municipio}}">
                                                <option ng-repeat="municipio in p.municipios" ng-value="{{municipio.id}}" ng-selected="{{municipio.id === p.municipio}}">{{municipio.descripcion}}</option>
                                            </select>
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="col-md-12" style="text-align: right;">
                                        <button class="btn btn-success" type="button" ng-click="p.actualizarPerfil()">Actualizar Perfil</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="cambiocontraseña" role="tabpanel">
                        <div class="card-body">
                            <form class="form-horizontal" id="frmCambioContraseña">
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="password" class="form-control requerido maxlength-input" id="contraseña1" title="Ingresa tu Contraseña" minlength="8" maxlength="20" placeholder="Contraseña" ng-model="p.contrasenia" pattern="^[a-zA-Z0-9ñÑ]+$" data-pattern="Solo se permiten numeros y letras" data-pattern-replace="[^a-zA-Z0-9ñÑ]" oninput="limitecaracteres(this);" >
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <a class="tooltips">
                                            <input type="password" class="form-control requerido maxlength-input" id="contraseña2" title="Confirme Contraseña" minlength="8" maxlength="20" placeholder="Confirmar Contraseña" ng-model="p.confirmarcontrasenia" pattern="^[a-zA-Z0-9ñÑ]+$" data-pattern="Solo se permiten numeros y letras" data-pattern-replace="[^a-zA-Z0-9ñÑ]" oninput="limitecaracteres(this);">
                                            <span class="spanValidacion"></span>
                                        </a>
                                    </div>
                                    <div class="col-md-12" style="text-align: right;">
                                        <button class="btn btn-success" type="button" ng-click="p.actualizarContrasenia()">Actualizar Contraseña</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ModalSubirFoto" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Subir Foto</h5>
                </div>
                <div class="modal-body">
                    <form id="frmSubirFotos">
                        <!-- Foto -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="tooltips">
                                    <input type="file" class="form-control custom-file-input requerido" id="archivo" name="archivo" accept="image/gif, image/jpeg, image/png, image/jpg, image/bmp" title="Subir Foto">
                                    <label class="custom-file-label" for="archivo">Subir Foto</label>
                                    <span class="spanValidacion" style="bottom:65px;"></span>
                                    <p class="text-gray">Tamaño maximo 5 MB</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" ng-click="p.reset();">Cerrar</button>
                    <button type="button" class="btn btn-success" id="btnRegistro" ng-click="p.actualizarFoto()">Subir Foto</button>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="includes/footer.jsp"/>
<script src="scripts/perfil.js"></script>
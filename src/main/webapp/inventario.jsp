<%-- 
    Document   : index
    Created on : 16/06/2021, 03:18:34 PM
    Author     : JMENDOZA
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" language="java"%>
<!DOCTYPE html>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Inventario"/>
</jsp:include>
<%  String validarIngreso =(String)session.getAttribute("usuario");  
          if(validarIngreso == null){
              response.sendRedirect("login.jsp");
          }
%>
<div class="container-fluid" ng-app = "inventario" ng-controller = "inventarioController as i" ng-init="i.cargarCategorias();">
    <div id="panelInventario">
        <div class="page-header">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="fas fa-box-open bg-blue"></i>
                        <h3 style="line-height:1.5;">Inventario</h3>
                    </div>
                </div>
                <div class="col-lg-4" style="text-align:right">
                    <i class="ik ik-settings fa-3x" style="margin-right:10px;cursor: pointer;" ng-click="i.mostrarPanel(1)"></i>
                    <i class="ik ik-plus fa-3x" style="margin-right:10px;cursor: pointer;" ng-click="i.showModalRegistro()"></i>                    
                    <i class="ik ik-refresh-ccw fa-3x" id="btnActualizar" ng-click="i.listarInventario()" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <table id="dttableInventario" class="table" width="100%" style="margin-left:0px;">
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div id="panelCategorias" style="display:none;" ng-controller = "categoriasController as c">
        <div class="page-header">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="fas fa-tag bg-blue"></i>
                        <h3 style="line-height:1.5;">Categorias</h3>
                    </div>
                </div>
                <div class="col-lg-4" style="text-align:right">
                    <i class="ik ik-arrow-left fa-3x" style="margin-right:10px;cursor: pointer;" ng-click="i.mostrarPanel(2)"></i>
                    <i class="ik ik-plus fa-3x" style="margin-right:10px;cursor: pointer;" ng-click="c.showModalRegistro()"></i>
                    <i class="ik ik-refresh-ccw fa-3x" id="btnActualizarCategorias" ng-click="c.listarCategorias()" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <table id="dttableCategorias" class="table" width="100%" style="margin-left:0px;">
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="ModalRegistroCategorias" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel"></h5>
                    </div>
                    <div class="modal-body">
                        <form id="frmRegistroCategorias">
                            <input type="hidden" ng-model="c.id_categoria" ng-value="{{c.id_categoria}}">
                            <!-- Area -->
                            <div class="row">
                                <div class="col-md-12 form-group">
                                    <a class="tooltips">
                                        <label>Descripcion</label>
                                        <input type="text" class="form-control requerido maxlength-input" title="Descripcion" placeholder="Descripcion" minlength="5" maxlength="50" pattern="^[a-zA-Z0-9ñÑ\s]+$" data-pattern="Solo se permiten letras y numeros" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);" ng-model="c.descripcion" ng-value="{{c.descripcion}}">
                                        <span class="spanValidacion"></span>
                                    </a>
                                </div>
                            </div>                                            
                        </form>
                    </div>
                    <div class="modal-footer" id="footerBtnCategorias">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" ng-click="c.reset()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="modal fade" id="ModalRegistro" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel"></h5>
                </div>
                <div class="modal-body">
                    <form id="frmRegistro">
                        <input type="hidden" ng-model="i.id_inventario" ng-value="{{i.id_inventario}}">
                        <!-- Area -->
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <a class="tooltips">
                                    <label for="selectCategorias">Categoria</label>
                                    <select class="form-control requerido" id="selectCategorias" title="Categorias" style="width: 100%;" ng-model="i.categoria">
                                        <option ng-repeat="categoria in i.categorias" ng-value="{{categoria.id}}" ng-selected="{{categoria.id === i.categoria}}">{{categoria.descripcion}}</option>
                                    </select>
                                    <span class="spanValidacion" style="left: 50% !important;"></span>
                                </a>
                            </div>
                            <div class="col-md-12 form-group">
                                <a class="tooltips">
                                    <label>Descripcion</label>
                                    <input type="text" class="form-control requerido maxlength-input" title="Descripcion" placeholder="Descripcion" minlength="5" maxlength="50" pattern="^[a-zA-Z0-9ñÑ\s]+$" data-pattern="Solo se permiten letras y numeros" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);" ng-model="i.descripcion" ng-value="{{i.descripcion}}">
                                    <span class="spanValidacion"></span>
                                </a>
                            </div>
                            <div class="col-md-12 form-group">
                                <a class="tooltips">
                                    <label>Proveedor</label>
                                    <input type="text" class="form-control requerido maxlength-input" title="Proveedor" placeholder="Proveedor" minlength="5" maxlength="50" pattern="^[a-zA-Z0-9ñÑ\s]+$" data-pattern="Solo se permiten letras y numeros" data-pattern-replace="[^a-zA-Z0-9ñÑ\s]" oninput="limitecaracteres(this);" ng-model="i.proveedor" ng-value="{{i.proveedor}}">
                                    <span class="spanValidacion"></span>
                                </a>
                            </div>
                        </div>                                            
                    </form>
                </div>
                <div class="modal-footer" id="footerBtn">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" ng-click="i.reset()">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</div>
<jsp:include page="includes/footer.jsp"/>
<script src="scripts/inventario.js"></script>

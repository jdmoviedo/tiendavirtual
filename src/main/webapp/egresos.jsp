<%-- 
    Document   : index
    Created on : 16/06/2021, 03:18:34 PM
    Author     : JMENDOZA
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" language="java"%>
<!DOCTYPE html>
<jsp:include page="includes/header.jsp">
    <jsp:param name="title" value="Egresos"/>
</jsp:include>
<%  String validarIngreso =(String)session.getAttribute("usuario");  
          if(validarIngreso == null){
              response.sendRedirect("login.jsp");
          }
%>
<div class="container-fluid" ng-app = "egresos" ng-controller = "egresosController as e" ng-init="e.cargarCategorias();">
    <div id="panelInventario">
        <div class="page-header">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="fas fa-shopping-cart bg-blue"></i>
                        <h3 style="line-height:1.5;">Egresos</h3>
                    </div>
                </div>
                <div class="col-lg-4" style="text-align:right">
                    <i class="ik ik-plus fa-3x" style="margin-right:10px;cursor: pointer;" ng-click="e.showModalRegistro()"></i>                    
                    <i class="ik ik-refresh-ccw fa-3x" id="btnActualizar" ng-click="e.listarEgresos()" style="margin-right:10px;cursor: pointer;"></i>
                    <i class="far fa-file-excel  fa-3x" id="btnExcel" ng-click="e.generarExcel()" style="cursor: pointer;"></i>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <table id="dttableEgresos" class="table" width="100%" style="margin-left:0px;">
                        </table>
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
                        <input type="hidden" ng-model="e.id_egreso" ng-value="{{e.id_egreso}}">
                        <!-- Area -->
                        <div class="row">
                            <div class="col-md-12 form-group">
                                <a class="tooltips">
                                    <label for="selectCategorias">Categoria</label>
                                    <select class="form-control requerido" id="selectCategorias" title="Categorias" style="width: 100%;" ng-model="e.categoria" ng-change="e.cargarProductos(e.categoria)">
                                        <option ng-repeat="categoria in e.categorias" ng-value="{{categoria.id}}" ng-selected="{{categoria.id === e.categoria}}">{{categoria.descripcion}}</option>
                                    </select>
                                    <span class="spanValidacion" style="left: 50% !important;"></span>
                                </a>
                            </div>
                            <div class="col-md-12 form-group">
                                <a class="tooltips">
                                    <label for="selectProductos">Producto</label>
                                    <select class="form-control requerido" id="selectProductos" title="Producto" style="width: 100%;" ng-model="e.producto">
                                        <option ng-repeat="producto in e.productos" ng-value="{{producto.id}}" ng-selected="{{producto.id === e.producto}}">{{producto.descripcion}}</option>
                                    </select>
                                    <span class="spanValidacion" style="left: 50% !important;"></span>
                                </a>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="valor_compra">Valor Compra</label>
                                <a class="tooltips">
                                    <input type="text" class="form-control requerido numero maxlength-input" title="Valor Compra" minlength="1" maxlength="9" placeholder="Valor Compra" ng-model="e.valor_compra" ng-value="{{e.valor_compra}}" oninput="limitecaracteres(this);">
                                    <span class="spanValidacion"></span>
                                </a>
                            </div>
                            <div class="form-group col-md-12">
                                <label for="cantidad">Cantidad</label>
                                <a class="tooltips">
                                    <input type="text" class="form-control requerido numero maxlength-input" title="Cantidad" minlength="1" maxlength="2" placeholder="Cantidad" ng-model="e.cantidad" ng-value="{{e.cantidad}}" oninput="limitecaracteres(this);">
                                    <span class="spanValidacion"></span>
                                </a>
                            </div>
                        </div>                                            
                    </form>
                </div>
                <div class="modal-footer" id="footerBtn">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" ng-click="e.reset(1)">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</div>
<jsp:include page="includes/footer.jsp"/>
<script src="scripts/egresos.js"></script>

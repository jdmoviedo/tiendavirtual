<%-- 
    Document   : Archivo de peticiones
    Created on : dd/mm/yyyy, hh:mm: AM/PM
    Author     : nombre autor

--%>


<%@page import="java.util.logging.Logger"%>
<%@page import="java.util.logging.Level"%>
<%@page import="java.sql.SQLException"%>
<%@page import="model.*"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="application/json;charset=iso-8859-1" language="java" pageEncoding="iso-8859-1" session="true"%>

<%    // Iniciando respuesta JSON.
    String respuesta = "{";

    //Lista de procesos o tareas a realizar 
    List<String> tareas = Arrays.asList(new String[]{
        "actualizarIngreso",
        "eliminarIngreso",
        "listarIngresos",
        "guardarIngreso",
        "verIngreso",
        "generarExcel"
    });
    
    String proceso = "" + request.getParameter("proceso");

    if (tareas.contains(proceso)) {
        if (proceso.equals("guardarIngreso")) {
                        
            int producto = Integer.parseInt(request.getParameter("producto"));
            int valor_venta = Integer.parseInt(request.getParameter("valor_venta"));
            int cantidad = Integer.parseInt(request.getParameter("cantidad"));
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            
            
            model_ingresos i= new model_ingresos();
            i.setProducto(producto);
            i.setValor_venta(valor_venta);
            i.setCantidad(cantidad); 
            i.setUsuario(usuario);
             
             
            respuesta += i.guardarIngreso();

        } else if (proceso.equals("eliminarIngreso")) {
            int id_ingreso = Integer.parseInt(request.getParameter("id_ingreso"));
          
            model_ingresos i= new model_ingresos();
            i.setId_ingreso(id_ingreso);
            
            respuesta += i.eliminarIngreso();

        } else if (proceso.equals("verIngreso")) {
            int id_ingreso = Integer.parseInt(request.getParameter("id_ingreso"));
          
            model_ingresos i= new model_ingresos();
            i.setId_ingreso(id_ingreso);
            
            respuesta += i.verIngreso();

        } else if (proceso.equals("listarIngresos")) {
           int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
           model_ingresos i= new model_ingresos();
           i.setUsuario(usuario);
           respuesta += i.listarIngresos();
        } else if (proceso.equals("generarExcel")) {
           int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
           model_ingresos i= new model_ingresos();
           i.setUsuario(usuario);
           respuesta += i.generarExcel();
        } else if (proceso.equals("actualizarIngreso")) {
            
            int id_ingreso = Integer.parseInt(request.getParameter("id_ingreso"));
            int producto = Integer.parseInt(request.getParameter("producto"));
            int valor_venta = Integer.parseInt(request.getParameter("valor_venta"));
            int cantidad = Integer.parseInt(request.getParameter("cantidad"));
            int cantidad_anterior =Integer.parseInt(request.getParameter("cantidad_anterior"));
            
            
            model_ingresos i= new model_ingresos();
            i.setId_ingreso(id_ingreso);
            i.setProducto(producto);
            i.setValor_venta(valor_venta);
            i.setCantidad(cantidad); 
            i.setCantidad_anterior(cantidad_anterior);
            
            respuesta += i.actualizarIngreso();
        }

    } else {
        respuesta += "\"status\": 0";
    }
    
    respuesta += "}";
    response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
%>

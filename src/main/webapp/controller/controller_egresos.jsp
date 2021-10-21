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
        "actualizarEgreso",
        "eliminarEgreso",
        "listarEgresos",
        "guardarEgreso",
        "verEgreso",
        "generarExcel"
    });
    
    String proceso = "" + request.getParameter("proceso");

    if (tareas.contains(proceso)) {
        if (proceso.equals("guardarEgreso")) {
                        
            int producto = Integer.parseInt(request.getParameter("producto"));
            int valor_compra = Integer.parseInt(request.getParameter("valor_compra"));
            int cantidad = Integer.parseInt(request.getParameter("cantidad"));
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            
            
            model_egresos e= new model_egresos();
            e.setProducto(producto);
            e.setValor_compra(valor_compra);
            e.setCantidad(cantidad); 
            e.setUsuario(usuario);
             
             
            respuesta += e.guardarEgreso();

        } else if (proceso.equals("eliminarEgreso")) {
            int id_egreso = Integer.parseInt(request.getParameter("id_egreso"));
          
            model_egresos e= new model_egresos();
            e.setId_egreso(id_egreso);
            
            respuesta += e.eliminarEgreso();

        } else if (proceso.equals("verEgreso")) {
            int id_egreso = Integer.parseInt(request.getParameter("id_egreso"));
          
            model_egresos e= new model_egresos();
            e.setId_egreso(id_egreso);
            
            respuesta += e.verEgreso();

        } else if (proceso.equals("listarEgresos")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            model_egresos e= new model_egresos();
            e.setUsuario(usuario);
            respuesta += e.listarEgresos();
        } else if (proceso.equals("generarExcel")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            model_egresos e= new model_egresos();
            e.setUsuario(usuario);
            respuesta += e.generarExcel();
        } else if (proceso.equals("actualizarEgreso")) {
            
            int id_egreso = Integer.parseInt(request.getParameter("id_egreso"));
            int producto = Integer.parseInt(request.getParameter("producto"));
            int valor_compra = Integer.parseInt(request.getParameter("valor_compra"));
            int cantidad = Integer.parseInt(request.getParameter("cantidad"));
            
            
            model_egresos e= new model_egresos();
            e.setId_egreso(id_egreso);
            e.setProducto(producto);
            e.setValor_compra(valor_compra);
            e.setCantidad(cantidad); 
            
            respuesta += e.actualizarEgreso();
        }

    } else {
        respuesta += "\"status\": 0";
    }
    
    respuesta += "}";
    response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
%>

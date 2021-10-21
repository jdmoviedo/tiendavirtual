<%-- 
    Document   : Archivo de peticiones
    Created on : dd/mm/yyyy, hh:mm: AM/PM
    Author     : nombre autor

--%>


<%@page import="java.util.logging.Logger"%>
<%@page import="java.util.logging.Level"%>
<%@page import="java.sql.SQLException"%>
<%@page import="model.model_categorias"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="application/json;charset=iso-8859-1" language="java" pageEncoding="iso-8859-1" session="true"%>

<%    // Iniciando respuesta JSON.
    String respuesta = "{";

    //Lista de procesos o tareas a realizar 
    List<String> tareas = Arrays.asList(new String[]{
        "actualizarCategoria",
        "cambiarEstado",
        "listarCategorias",
        "guardarCategoria",
        "verCategoria"
    });
    
    String proceso = "" + request.getParameter("proceso");

    if (tareas.contains(proceso)) {
        if (proceso.equals("guardarCategoria")) {
                        
            String descripcion = request.getParameter("descripcion");
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            
            model_categorias c= new model_categorias();
            c.setDescripcion(descripcion);
            c.setUsuario(usuario);
             
            respuesta += c.guardarCategoria();

        } else if (proceso.equals("cambiarEstado")) {
            int id_categoria = Integer.parseInt(request.getParameter("id_categoria"));
            int estado = Integer.parseInt(request.getParameter("estado"));
          
            model_categorias c= new model_categorias();
            c.setId_categoria(id_categoria);
            c.setEstado(estado);
            
            respuesta += c.cambiarEstado();

        } else if (proceso.equals("verCategoria")) {
            int id_categoria = Integer.parseInt(request.getParameter("id_categoria"));
            
            model_categorias c= new model_categorias();
            c.setId_categoria(id_categoria);
            
            respuesta += c.verCategoria();

        } else if (proceso.equals("listarCategorias")) {
           int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
           model_categorias c= new model_categorias();
           c.setUsuario(usuario);
           respuesta += c.listarCategorias();
        } else if (proceso.equals("actualizarCategoria")) {
            
            int id_categoria = Integer.parseInt(request.getParameter("id_categoria"));
            String descripcion = request.getParameter("descripcion");
            
            model_categorias c= new model_categorias();
            c.setId_categoria(id_categoria);
            c.setDescripcion(descripcion);
            
            respuesta += c.actualizarCategoria();
        }

    } else {
        respuesta += "\"status\": 0,";
    }
    
    respuesta += "}";
    response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
%>

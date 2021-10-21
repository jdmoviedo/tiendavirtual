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
        "actualizarInventario",
        "cambiarEstado",
        "listarInventario",
        "guardarInventario",
        "verInventario",
        "cargarCategorias",
        "cargarProductos"
    });
    
    String proceso = "" + request.getParameter("proceso");

    if (tareas.contains(proceso)) {
        if (proceso.equals("guardarInventario")) {
                        
            String descripcion = request.getParameter("descripcion");
            int categoria = Integer.parseInt(request.getParameter("categoria"));
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            String proveedor = request.getParameter("proveedor");
            
            model_inventario i= new model_inventario();
            i.setDescripcion(descripcion);
            i.setCategoria(categoria);
            i.setUsuario(usuario);
            i.setProveedor(proveedor);
             
            respuesta += i.guardarInventario();

        } else if (proceso.equals("cambiarEstado")) {
            int id_inventario = Integer.parseInt(request.getParameter("id_inventario"));
            int estado = Integer.parseInt(request.getParameter("estado"));
          
            model_inventario i= new model_inventario();
            i.setId_inventario(id_inventario);
            i.setEstado(estado);
            
            respuesta += i.cambiarEstado();

        } else if (proceso.equals("verInventario")) {
            int id_inventario = Integer.parseInt(request.getParameter("id_inventario"));
            
            model_inventario i= new model_inventario();
            i.setId_inventario(id_inventario);
            
            respuesta += i.verInventario();

        } else if (proceso.equals("listarInventario")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            model_inventario i= new model_inventario();
            i.setUsuario(usuario);
            respuesta += i.listarInventario();
        } else if (proceso.equals("actualizarInventario")) {
            
            int id_inventario = Integer.parseInt(request.getParameter("id_inventario"));
            String descripcion = request.getParameter("descripcion");
            int categoria = Integer.parseInt(request.getParameter("categoria"));
            String proveedor = request.getParameter("proveedor");
            
            model_inventario i= new model_inventario();
            i.setId_inventario(id_inventario);
            i.setDescripcion(descripcion);
            i.setCategoria(categoria);
            i.setProveedor(proveedor);
            
            respuesta += i.actualizarInventario();
        } else if (proceso.equals("cargarCategorias")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            model_cargar_select cs= new model_cargar_select();
            cs.setUsuario(usuario);
            respuesta += cs.cargarCategorias();
        } else if (proceso.equals("cargarProductos")) {
            int id = Integer.parseInt(request.getParameter("id_categoria"));
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            
            model_cargar_select cs= new model_cargar_select();
            cs.setId(id);
            cs.setUsuario(usuario);
            respuesta += cs.cargarProductos();
        }

    } else {
        respuesta += "\"status\": 0,";
    }
    
    respuesta += "}";
    response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
%>

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
        "cargarDatos",
        "actualizarPerfil",
        "actualizarContraseña",
        "actualizarFoto"
    });
    
    String proceso = "" + request.getParameter("proceso");

    if (tareas.contains(proceso)) {
        if (proceso.equals("cargarDatos")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
          
            model_perfil p= new model_perfil();
            p.setUsuario(usuario);
            
            respuesta += p.cargarDatos();
            
        }else if (proceso.equals("actualizarContraseña")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            String contraseña = request.getParameter("contrasenia");
            
            model_perfil p= new model_perfil();
            p.setUsuario(usuario);
            p.setContraseña(contraseña);
            
            respuesta += p.actualizarContraseña();
            
        }else if (proceso.equals("actualizarPerfil")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            String nombre_tienda = request.getParameter("nombre_tienda");
            String nombre_tendero = request.getParameter("nombre_tendero");
            String direccion = request.getParameter("direccion");
            String nit = request.getParameter("nit");
            String telefono = request.getParameter("telefono");
            int municipio = Integer.parseInt(request.getParameter("municipio"));
          
            model_perfil p= new model_perfil();
            p.setUsuario(usuario);
            p.setTienda(nombre_tienda);
            p.setTendero(nombre_tendero);
            p.setDireccion(direccion);
            p.setNit(nit);
            p.setTelefono(telefono);
            p.setMunicipio(municipio);
            
            respuesta += p.actualizarPerfil();
        }else if (proceso.equals("actualizarFoto")) {
            int usuario = Integer.parseInt((String)session.getAttribute("usuario"));
            String foto = request.getParameter("foto");
            
            foto = foto.substring(foto.indexOf("base64,") + 7);
            
            model_perfil p= new model_perfil();
            p.setUsuario(usuario);
            p.setFoto(foto);
            
            respuesta += p.actualizarFoto();
            
            if(respuesta.contains("\"status\": 1")){
                HttpSession sesion = request.getSession();
                sesion.setAttribute("foto", foto);
            }
            
        }
    } else {
        respuesta += "\"status\": 0";
    }
    
    respuesta += "}";
    response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
%>

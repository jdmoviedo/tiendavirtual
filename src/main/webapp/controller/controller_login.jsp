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
        "iniciarSesion",
        "Registrarse",
        "cargarDepartamentos",
        "cargarMunicipios",
        "recupearContraseña",
        "logout"
    });
    
    String proceso = "" + request.getParameter("proceso");

    if (tareas.contains(proceso)) {
        if (proceso.equals("iniciarSesion")) {
            String correo = request.getParameter("correo");
            String contraseña = request.getParameter("contraseña");
          
            model_login l= new model_login();
            l.setCorreo(correo);
            l.setContraseña(contraseña);
            
            respuesta += l.login();
            
            if(respuesta.contains("\"status\": 1")){
                //HttpSession sesion = request.getSession();
                int posid = respuesta.indexOf("id_usuario\": ");
                int posrol = respuesta.indexOf(",\"rol\": ");
                int postienda = respuesta.indexOf(",\"tienda\": \"");
                int posfoto = respuesta.indexOf("\",\"foto\": \"");
                String id = respuesta.substring(posid+13,posrol);
                String rol = respuesta.substring(posrol+8,postienda);
                String tienda = respuesta.substring(postienda+12,posfoto);
                String foto = respuesta.substring(posfoto+11,respuesta.length()-1);

                HttpSession sesion = request.getSession(true);
                sesion.setAttribute("usuario", id);
                sesion.setAttribute("rol", rol);
                sesion.setAttribute("tienda", tienda);
                sesion.setAttribute("foto", foto);
            }        
        }else if (proceso.equals("cargarDepartamentos")) {
            model_cargar_select cs= new model_cargar_select();
            respuesta += cs.cargarDepartamentos();
        } else if (proceso.equals("cargarMunicipios")) {
            int id = Integer.parseInt(request.getParameter("id_departamento"));
            
            model_cargar_select cs= new model_cargar_select();
            cs.setId(id);
            respuesta += cs.cargarMunicipios();
        }else if (proceso.equals("logout")) {
            session.invalidate();
            respuesta += "\"status\": 1";
        }else if (proceso.equals("Registrarse")) {
            String correo = request.getParameter("correo");
            String contraseña = request.getParameter("contrasenia");
            String nombre_tienda = request.getParameter("nombre_tienda");
            String nombre_tendero = request.getParameter("nombre_tendero");
            String direccion = request.getParameter("direccion");
            String nit = request.getParameter("nit");
            String telefono = request.getParameter("telefono");
            int municipio = Integer.parseInt(request.getParameter("municipio"));
          
            model_login l= new model_login();
            l.setCorreo(correo);
            l.setContraseña(contraseña);
            l.setTienda(nombre_tienda);
            l.setTendero(nombre_tendero);
            l.setDireccion(direccion);
            l.setNit(nit);
            l.setTelefono(telefono);
            l.setMunicipio(municipio);
            
            respuesta += l.registrarse();
        }
    } else {
        respuesta += "\"status\": 0";
    }
    
    respuesta += "}";
    response.setContentType("application/json;charset=iso-8859-1");
    out.print(respuesta);
%>

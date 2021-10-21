/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import persistencia.ConexionBD;

/**
 *
 * @author JDMOV
 */
public class model_categorias {

    private int id_categoria, estado, usuario;
    private String descripcion;
    private String action;
    private String fecha_creacion;
    private String fecha_actualizacion;
    private String nombre_estado;

    public int getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(int id_categoria) {
        this.id_categoria = id_categoria;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public int getUsuario() {
        return usuario;
    }

    public void setUsuario(int usuario) {
        this.usuario = usuario;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion.toUpperCase();
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public String getFecha_actualizacion() {
        return fecha_actualizacion;
    }

    public void setFecha_actualizacion(String fecha_actualizacion) {
        this.fecha_actualizacion = fecha_actualizacion;
    }

    public String getNombre_estado() {
        return nombre_estado;
    }

    public void setNombre_estado(String nombre_estado) {
        this.nombre_estado = nombre_estado;
    }

    public String guardarCategoria() {
        ConexionBD conexion = new ConexionBD();

        String fecha_crea = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

        String validar = "SELECT * from categorias where descripcion = '" + this.descripcion + "'";

        String sentencia = "INSERT INTO categorias(descripcion, estado, fecha_creacion, usuario) "
                + " VALUES ( '" + this.descripcion + "',1,"
                + "'" + fecha_crea + "'," + this.usuario + ");";

        try {
            ResultSet rs = conexion.consultarBD(validar);
            if (rs.next()) {
                return "\"status\": 2";
            } else {
                if (conexion.setAutoCommitBD(false)) {
                    if (conexion.insertarBD(sentencia)) {
                        conexion.commitBD();
                        conexion.cerrarConexion();
                        return "\"status\": 1";
                    } else {
                        conexion.rollbackBD();
                        conexion.cerrarConexion();
                        return "\"status\": 0";
                    }
                } else {
                    conexion.cerrarConexion();
                    return "\"status\": 0";
                }
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String cambiarEstado() {
        int nuevo_estado = 0;

        switch (this.estado) {
            case 1:
                nuevo_estado = 2;
                break;
            case 2:
                nuevo_estado = 1;
                break;
            default:
                break;
        }
        String fecha_actu = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        String Sentencia = "UPDATE `categorias` SET estado = " + nuevo_estado + ",fecha_actualizacion = '" + fecha_actu + "' WHERE `id_categoria`= " + this.id_categoria;
        ConexionBD conexion = new ConexionBD();
        try {
            if (conexion.setAutoCommitBD(false)) {
                if (conexion.actualizarBD(Sentencia)) {
                    conexion.commitBD();
                    conexion.cerrarConexion();
                    return "\"status\": 1";
                } else {
                    conexion.rollbackBD();
                    conexion.cerrarConexion();
                    return "\"status\": 0";
                }
            } else {
                conexion.cerrarConexion();
                return "\"status\": 0";
            }
        } catch (Exception ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String actualizarCategoria() {
        ConexionBD conexion = new ConexionBD();
        String fecha_actu = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        String validar = "SELECT * from categorias where descripcion = '" + this.descripcion + "' and id_categoria != " + this.id_categoria;
        String Sentencia = "UPDATE `categorias` SET descripcion='" + this.descripcion + "',fecha_actualizacion='" + fecha_actu
                + "' WHERE id_categoria=" + this.id_categoria;

        try {
            ResultSet rs = conexion.consultarBD(validar);
            if (rs.next()) {
                return "\"status\": 2";
            } else {
                if (conexion.setAutoCommitBD(false)) {
                    if (conexion.actualizarBD(Sentencia)) {
                        conexion.commitBD();
                        conexion.cerrarConexion();
                        return "\"status\": 1";
                    } else {
                        conexion.rollbackBD();
                        conexion.cerrarConexion();
                        return "\"status\": 0";
                    }
                } else {
                    conexion.cerrarConexion();
                    return "\"status\": 0";
                }
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }

    }

    public String listarCategorias() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_categorias> listarCategorias = new ArrayList<>();
        String sql = "select * from categorias where usuario = " + this.usuario + " order by id_categoria asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_categorias c = new model_categorias();
                    c.setId_categoria(rs.getInt("id_categoria"));
                    c.setDescripcion(rs.getString("descripcion"));
                    c.setFecha_creacion(String.valueOf(rs.getDate("fecha_creacion")));
                    c.setFecha_actualizacion(String.valueOf(rs.getDate("fecha_actualizacion") == null ? "" : rs.getDate("fecha_actualizacion")));
                    if (rs.getInt("estado") == 1) {
                        c.setNombre_estado("<span class=\"badge badge-success\">ACTIVO</span>");
                    } else if (rs.getInt("estado") == 2) {
                        c.setNombre_estado("<span class=\"badge badge-danger\">INACTIIVO</span>");
                    }
                    acciones = "<i class=\"ik ik-eye fa-lg\" style=\"cursor: pointer;\" ng-click=\"c.verCategoria(" + rs.getInt("id_categoria") + ",1);\"  title=\"Ver\"></i>";
                    acciones += "<i class=\"ik ik-edit-2 fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Editar\" ng-click=\"c.verCategoria(" + rs.getInt("id_categoria") + ",2);\"></i>";
                    acciones += "<i class=\"ik ik-repeat fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Activar/Desactivar\" ng-click=\"c.cambiarEstado(" + rs.getInt("id_categoria") + "," + rs.getInt("estado") + ");\"></i>";

                    c.setAction(acciones);
                    listarCategorias.add(c);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarCategorias);

            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String verCategoria() {
        ConexionBD conexion = new ConexionBD();
        String sql = "select * from categorias where id_categoria='" + this.id_categoria + "'";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                model_categorias c = new model_categorias();
                c.setId_categoria(rs.getInt("id_categoria"));
                c.setUsuario(rs.getInt("usuario"));
                c.setDescripcion(rs.getString("descripcion"));
                conexion.cerrarConexion();
                return "\"status\": 1,\"id_categoria\": " + c.getId_categoria() + ",\"descripcion\": \"" + c.getDescripcion() + "\",\"usuario\":" + c.getUsuario();
            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }

    }

}

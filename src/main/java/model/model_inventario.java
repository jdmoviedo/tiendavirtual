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
 * @author Sammy Guergachi <sguergachi at gmail.com>
 */
public class model_inventario {

    private int id_inventario, estado, categoria, usuario,stock;
    private String descripcion;
    private String proveedor;
    private String action;
    private String fecha_creacion;
    private String fecha_actualizacion;
    private String nombre_estado;
    private String nombre_categoria;

    public model_inventario() {
    }

    public int getId_inventario() {
        return id_inventario;
    }

    public void setId_inventario(int id_inventario) {
        this.id_inventario = id_inventario;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public int getCategoria() {
        return categoria;
    }

    public void setCategoria(int categoria) {
        this.categoria = categoria;
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

    public void setAction(String action) {
        this.action = action;
    }

    public void setNombre_estado(String nombre_estado) {
        this.nombre_estado = nombre_estado;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
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

    public void setNombre_categoria(String nombre_categoria) {
        this.nombre_categoria = nombre_categoria;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
    
    public String guardarInventario() {
        ConexionBD conexion = new ConexionBD();

        String fecha_crea = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

        String validar = "SELECT * from inventario where descripcion = '" + this.descripcion + "'";

        String sentencia = "INSERT INTO inventario(descripcion, estado, fecha_creacion, categoria, usuario, proveedor) "
                + " VALUES ( '" + this.descripcion + "',1,"
                + "'" + fecha_crea + "'," + this.categoria + ","
                + this.usuario + ",'" + this.proveedor + "');";

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
        String Sentencia = "UPDATE `inventario` SET estado = " + nuevo_estado + ",fecha_actualizacion = '" + fecha_actu + "' WHERE `id_inventario`= " + this.id_inventario;
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

    public String actualizarInventario() {
        ConexionBD conexion = new ConexionBD();
        String fecha_actu = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        String validar = "SELECT * from inventario where descripcion = '" + this.descripcion + "' and id_inventario != " + this.id_inventario;
        String Sentencia = "UPDATE `inventario` SET descripcion='" + this.descripcion + "',fecha_actualizacion='" + fecha_actu
                + "',categoria=" + this.categoria + ",proveedor='" + this.proveedor
                + "' WHERE id_inventario=" + this.id_inventario;

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

    public String listarInventario() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_inventario> listarInventario = new ArrayList<>();
        String sql = "select I.stock as stock,I.id_inventario as id_inventario,C.descripcion as nombre_categoria,I.descripcion as descripcion,I.proveedor as proveedor,I.fecha_creacion as fecha_creacion,I.fecha_actualizacion as fecha_actualizacion,I.estado as estado from inventario I join categorias C on C.id_categoria = I.categoria where I.usuario = " + this.usuario + " order by I.id_inventario asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_inventario i = new model_inventario();
                    i.setId_inventario(rs.getInt("id_inventario"));
                    i.setStock(rs.getInt("stock"));
                    i.setNombre_categoria(rs.getString("nombre_categoria"));
                    i.setDescripcion(rs.getString("descripcion"));
                    i.setProveedor(rs.getString("proveedor"));
                    i.setFecha_creacion(String.valueOf(rs.getDate("fecha_creacion")));
                    i.setFecha_actualizacion(String.valueOf(rs.getDate("fecha_actualizacion") == null ? "" : rs.getDate("fecha_actualizacion")));
                    if (rs.getInt("estado") == 1) {
                        i.setNombre_estado("<span class=\"badge badge-success\">ACTIVO</span>");
                    } else if (rs.getInt("estado") == 2) {
                        i.setNombre_estado("<span class=\"badge badge-danger\">INACTIIVO</span>");
                    }
                    acciones = "<i class=\"ik ik-eye fa-lg\" style=\"cursor: pointer;\" ng-click=\"i.verInventario(" + rs.getInt("id_inventario") + ",1);\"  title=\"Ver\"></i>";
                    acciones += "<i class=\"ik ik-edit-2 fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Editar\" ng-click=\"i.verInventario(" + rs.getInt("id_inventario") + ",2);\"></i>";
                    acciones += "<i class=\"ik ik-repeat fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Activar/Desactivar\" ng-click=\"i.cambiarEstado(" + rs.getInt("id_inventario") + "," + rs.getInt("estado") + ");\"></i>";

                    i.setAction(acciones);
                    listarInventario.add(i);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarInventario);

            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String verInventario() {
        ConexionBD conexion = new ConexionBD();
        String sql = "select * from inventario where id_inventario='" + this.id_inventario + "'";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                model_inventario i = new model_inventario();
                i.setId_inventario(rs.getInt("id_inventario"));
                i.setUsuario(rs.getInt("usuario"));
                i.setDescripcion(rs.getString("descripcion"));
                i.setCategoria(rs.getInt("categoria"));
                i.setProveedor(rs.getString("proveedor"));
                conexion.cerrarConexion();
                return "\"status\": 1,\"id_inventario\": " + i.getId_inventario() + ",\"descripcion\": \"" + i.getDescripcion() + "\",\"categoria\": " + i.getCategoria()
                        + ",\"proveedor\": \"" + i.getProveedor() + "\",\"usuario\":" + i.getUsuario();
            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }

    }

    public String cargarCategorias() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_inventario> listarCategorias = new ArrayList<>();
        String sql = "select * from categorias order by id_categoria asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_inventario i = new model_inventario();
                    i.setCategoria(rs.getInt("id_categoria"));
                    i.setDescripcion(rs.getString("descripcion"));

                    listarCategorias.add(i);
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
}

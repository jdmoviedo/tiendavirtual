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
public class model_cargar_select {

    private int id, usuario;
    private String descripcion;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getUsuario() {
        return usuario;
    }

    public void setUsuario(int usuario) {
        this.usuario = usuario;
    }

    public String cargarCategorias() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_cargar_select> listarCategorias = new ArrayList<>();
        String sql = "select * from categorias where usuario = " + this.usuario + " order by id_categoria asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_cargar_select cs = new model_cargar_select();
                    cs.setId(rs.getInt("id_categoria"));
                    cs.setDescripcion(rs.getString("descripcion"));

                    listarCategorias.add(cs);
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

    public String cargarDepartamentos() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_cargar_select> listarDepartamentos = new ArrayList<>();
        String sql = "select * from departamentos order by departamento asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_cargar_select cs = new model_cargar_select();
                    cs.setId(rs.getInt("id_departamento"));
                    cs.setDescripcion(rs.getString("departamento"));

                    listarDepartamentos.add(cs);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarDepartamentos);

            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String cargarMunicipios() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_cargar_select> listarMunicipios = new ArrayList<>();
        String sql = "select * from municipios where id_departamento = " + this.id + " order by id_municipio asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_cargar_select cs = new model_cargar_select();
                    cs.setId(rs.getInt("id_municipio"));
                    cs.setDescripcion(rs.getString("municipio"));

                    listarMunicipios.add(cs);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarMunicipios);

            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String cargarProductos() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_cargar_select> listarProductos = new ArrayList<>();
        String sql = "select * from inventario where categoria = " + this.id + " and usuario = " + this.usuario + " order by id_inventario asc;";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {
                    model_cargar_select cs = new model_cargar_select();
                    cs.setId(rs.getInt("id_inventario"));
                    cs.setDescripcion(rs.getString("descripcion"));

                    listarProductos.add(cs);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarProductos);

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

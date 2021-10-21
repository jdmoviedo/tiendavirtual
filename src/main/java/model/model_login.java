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
import org.apache.commons.codec.digest.DigestUtils;
import persistencia.ConexionBD;

/**
 *
 * @author JuanD
 */
public class model_login {

    private int id_usuario, rol, municipio;
    private String correo;
    private String contraseña;
    private String tienda;
    private String tendero;
    private String direccion;
    private String nit;
    private String telefono;
    private String foto;

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public int getRol() {
        return rol;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getTienda() {
        return tienda;
    }

    public void setTienda(String tienda) {
        this.tienda = tienda;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo.toUpperCase();
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public int getMunicipio() {
        return municipio;
    }

    public void setMunicipio(int municipio) {
        this.municipio = municipio;
    }

    public String getTendero() {
        return tendero;
    }

    public void setTendero(String tendero) {
        this.tendero = tendero;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String login() {
        ConexionBD conexion = new ConexionBD();
        String sql = "select * from usuarios where correo='" + this.correo + "'";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                model_login l = new model_login();
                String contraseñaBD = rs.getString("contraseña");
                l.setId_usuario(rs.getInt("id_usuario"));
                l.setRol(rs.getInt("rol"));
                l.setTienda(rs.getString("nombre_tienda"));
                l.setFoto(rs.getString("foto"));
                if (rs.getInt("estado") == 1) {
                    String contraseniaMD5 = DigestUtils.md5Hex(this.contraseña);
                    if (contraseniaMD5.equals(contraseñaBD)) {
                        conexion.cerrarConexion();
                        return "\"status\": 1,\"id_usuario\": " + l.getId_usuario() + ",\"rol\": " + l.getRol() + ",\"tienda\": \"" + l.getTienda() + "\",\"foto\": \"" + l.getFoto() + "\"";
                    } else {
                        conexion.cerrarConexion();
                        return "\"status\": 2";
                    }
                } else {
                    conexion.cerrarConexion();
                    return "\"status\": 4";
                }
            } else {
                conexion.cerrarConexion();
                return "\"status\": 3";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }

    }

    public String registrarse() {
        ConexionBD conexion = new ConexionBD();

        String fecha_crea = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

        String validar = "SELECT * from usuarios where correo = '" + this.correo + "'";

        String contraseniaMD5 = DigestUtils.md5Hex(this.contraseña);

        String sentencia = "INSERT INTO usuarios(correo, contraseña,nombre_tienda,nombre_tendero,nit,telefono,direccion,municipio,estado,rol,fecha_creacion) "
                + " VALUES ( '" + this.correo + "','" + contraseniaMD5 + "','" + this.tienda + "','" + this.tendero + "','" + this.nit + "','" + this.telefono + "','" + this.direccion + "'," + this.municipio + ",1,2,'" + fecha_crea + "');";

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
}

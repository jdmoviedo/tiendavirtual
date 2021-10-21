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
public class model_perfil {

    private int usuario, municipio, departamento;
    private String contraseña;
    private String tienda;
    private String tendero;
    private String direccion;
    private String nit;
    private String telefono;
    private String correo;
    private String foto;

    public int getUsuario() {
        return usuario;
    }

    public void setUsuario(int usuario) {
        this.usuario = usuario;
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

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public int getDepartamento() {
        return departamento;
    }

    public void setDepartamento(int departamento) {
        this.departamento = departamento;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String actualizarPerfil() {
        ConexionBD conexion = new ConexionBD();

        String sentencia = "UPDATE usuarios SET nombre_tienda='" + this.tienda
                + "',nombre_tendero='" + this.tendero + "',nit='" + this.nit
                + "',telefono='" + this.telefono + "',direccion='" + this.direccion + "',municipio=" + this.municipio + " WHERE id_usuario="
                + this.usuario;

        if (conexion.setAutoCommitBD(false)) {
            if (conexion.actualizarBD(sentencia)) {
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

    public String actualizarContraseña() {
        ConexionBD conexion = new ConexionBD();

        String contraseniaMD5 = DigestUtils.md5Hex(this.contraseña);

        String sentencia = "UPDATE usuarios SET contraseña='" + contraseniaMD5
                + "' WHERE id_usuario=" + this.usuario;

        if (conexion.setAutoCommitBD(false)) {
            if (conexion.actualizarBD(sentencia)) {
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

    public String cargarDatos() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        String sql = "select u.correo,u.foto,u.nombre_tienda,u.nombre_tendero,u.nit,u.telefono,u.direccion,u.municipio,m.id_departamento from usuarios u join municipios m on m.id_municipio = u.municipio where u.id_usuario=" + this.usuario;
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                model_perfil p = new model_perfil();
                String fotoValidar = "dist/img/user.svg";
                p.setCorreo(rs.getString("correo"));
                p.setTienda(rs.getString("nombre_tienda"));
                p.setTendero(rs.getString("nombre_tendero"));
                p.setNit(rs.getString("nit"));
                p.setTelefono(rs.getString("telefono"));
                p.setDireccion(rs.getString("direccion"));
                if (rs.getString("foto") == null || rs.getString("foto").equals("")) {
                    fotoValidar = "dist/img/user.svg";
                } else {
                    fotoValidar = "data:image/png;base64," + rs.getString("foto");
                }
                p.setMunicipio(rs.getInt("municipio"));
                p.setDepartamento(rs.getInt("id_departamento"));
                conexion.cerrarConexion();
                return "\"status\": 1,\"correo\": \"" + p.getCorreo() + "\",\"nombre_tienda\": \"" + p.getTienda() + "\",\"nombre_tendero\": \"" + p.getTendero() + "\",\"nit\": \"" + p.getNit() + "\",\"telefono\": \"" + p.getTelefono() + "\",\"direccion\": \"" + p.getDireccion() + "\",\"municipio\": " + p.getMunicipio() + ",\"departamento\": " + p.getDepartamento() + ",\"foto\": \"" + fotoValidar + "\"";
            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String actualizarFoto() {
        ConexionBD conexion = new ConexionBD();

        String sentencia = "UPDATE usuarios SET foto='" + this.foto
                + "' WHERE id_usuario=" + this.usuario;

        if (conexion.setAutoCommitBD(false)) {
            if (conexion.actualizarBD(sentencia)) {
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

}

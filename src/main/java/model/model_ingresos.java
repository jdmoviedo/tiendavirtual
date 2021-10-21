/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import persistencia.ConexionBD;

/**
 *
 * @author elena riano
 */
public class model_ingresos {

    public int id_ingreso, producto, valor_venta, cantidad, usuario, categoriaid, cantidad_anterior, total;
    private String fecha_creacion;
    private String fecha_actualizacion;
    private String nombre_producto;
    private String nombre_categoria;
    private String action;

    public model_ingresos() {
    }

    public int getId_ingreso() {
        return id_ingreso;
    }

    public void setId_ingreso(int id_ingreso) {
        this.id_ingreso = id_ingreso;
    }

    public int getProducto() {
        return producto;
    }

    public void setProducto(int producto) {
        this.producto = producto;
    }

    public int getValor_venta() {
        return valor_venta;
    }

    public void setValor_venta(int valor_venta) {
        this.valor_venta = valor_venta;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getUsuario() {
        return usuario;
    }

    public void setUsuario(int usuario) {
        this.usuario = usuario;
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

    public String getNombre_producto() {
        return nombre_producto;
    }

    public void setNombre_producto(String nombre_producto) {
        this.nombre_producto = nombre_producto;
    }

    public int getCategoriaid() {
        return categoriaid;
    }

    public void setCategoriaid(int categoriaid) {
        this.categoriaid = categoriaid;
    }

    public String getNombre_categoria() {
        return nombre_categoria;
    }

    public void setNombre_categoria(String nombre_categoria) {
        this.nombre_categoria = nombre_categoria;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public int getCantidad_anterior() {
        return cantidad_anterior;
    }

    public void setCantidad_anterior(int cantidad_anterior) {
        this.cantidad_anterior = cantidad_anterior;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String guardarIngreso() {
        ConexionBD conexion = new ConexionBD();

        int total = 0;
        String sql = "select stock from inventario where id_inventario=" + this.producto;
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                total = rs.getInt("stock");

                if (total - this.cantidad >= 0) {
                    String fecha_crea = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

                    String sentencia = "INSERT INTO ingresos (producto, valor_venta, cantidad, fecha_creacion,usuario) "
                            + " VALUES ( " + this.producto + "," + this.valor_venta + ","
                            + this.cantidad + ",'" + fecha_crea + "'," + this.usuario + ");";

                    String update = "UPDATE inventario a\n"
                            + "JOIN inventario b on b.id_inventario = " + this.producto + "\n"
                            + "set a.stock=b.stock-" + this.cantidad + " \n"
                            + "where a.id_inventario = b.id_inventario ";

                    if (conexion.setAutoCommitBD(false)) {
                        if (conexion.insertarBD(sentencia)) {
                            conexion.commitBD();
                            if (conexion.setAutoCommitBD(false)) {
                                if (conexion.actualizarBD(update)) {
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
                        } else {
                            conexion.rollbackBD();
                            conexion.cerrarConexion();
                            return "\"status\": 0";
                        }
                    } else {
                        conexion.cerrarConexion();
                        return "\"status\": 0";
                    }
                } else {
                    return "\"status\": 2";
                }

            } else {
                conexion.cerrarConexion();
                return "\"status\": 0";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String listarIngresos() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_ingresos> listarIngresos = new ArrayList<>();
        String sql = "select \n"
                + "i.id_ingreso,\n"
                + "inv.descripcion as producto,\n"
                + "c.descripcion as categoria, \n"
                + "i.valor_venta as valor_venta, \n"
                + "i.cantidad as cantidad, \n"
                + "i.fecha_creacion as fecha_creacion, \n"
                + "i.fecha_actualizacion as fecha_actualizacion \n"
                + "from ingresos i \n"
                + "join inventario inv on inv.id_inventario=i.producto\n"
                + "join categorias c on c.id_categoria=inv.categoria \n"
                + "where i.usuario = " + this.usuario + " order by i.id_ingreso asc";

        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {

                    model_ingresos i = new model_ingresos();
                    i.setId_ingreso(rs.getInt("id_ingreso"));
                    i.setValor_venta(rs.getInt("valor_venta"));
                    i.setCantidad(rs.getInt("cantidad"));
                    i.setFecha_creacion(String.valueOf(rs.getDate("fecha_creacion")));
                    i.setFecha_actualizacion(String.valueOf(rs.getDate("fecha_actualizacion") == null ? "" : rs.getDate("fecha_actualizacion")));
                    i.setNombre_producto(rs.getString("producto"));
                    i.setNombre_categoria(rs.getString("categoria"));

                    acciones = "<i class=\"ik ik-eye fa-lg\" style=\"cursor: pointer;\" ng-click=\"i.verIngreso(" + rs.getInt("id_ingreso") + ",1);\"  title=\"Ver\"></i>";
                    acciones += "<i class=\"ik ik-edit-2 fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Editar\" ng-click=\"i.verIngreso(" + rs.getInt("id_ingreso") + ",2);\"></i>";
                    acciones += "<i class=\"ik ik-trash fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Eliminar\" ng-click=\"i.eliminarIngreso(" + rs.getInt("id_ingreso") + ");\"></i>";

                    i.setAction(acciones);
                    listarIngresos.add(i);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarIngresos);

            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String actualizarIngreso() {
        ConexionBD conexion = new ConexionBD();

        int total = 0;
        String sql = "select stock from inventario where id_inventario=" + this.producto;
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                total = rs.getInt("stock");

                if (total - this.cantidad >= 0) {

                    String fecha_actu = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
                    String Sentencia = "UPDATE `ingresos` SET producto=" + this.producto
                            + ",valor_venta=" + this.valor_venta + ",cantidad=" + this.cantidad
                            + ",fecha_actualizacion='" + fecha_actu + "' WHERE id_ingreso="
                            + this.id_ingreso;

                    String update = "UPDATE inventario i\n"
                            + "join ingresos ing on ing.id_ingreso = " + this.id_ingreso + "\n"
                            + "set i.stock=i.stock+(" + this.cantidad_anterior + "-" + this.cantidad + ") \n"
                            + "where i.id_inventario = ing.producto ";

                    if (conexion.setAutoCommitBD(false)) {
                        if (conexion.actualizarBD(Sentencia)) {
                            conexion.commitBD();
                            if (conexion.setAutoCommitBD(false)) {
                                if (conexion.actualizarBD(update)) {
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
                        } else {
                            conexion.rollbackBD();
                            conexion.cerrarConexion();
                            return "\"status\": 0";
                        }
                    } else {
                        conexion.cerrarConexion();
                        return "\"status\": 0";
                    }
                } else {
                    return "\"status\": 2";
                }

            } else {
                conexion.cerrarConexion();
                return "\"status\": 0";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }
    //ELIMINAR

    public String eliminarIngreso() {
        ConexionBD conexion = new ConexionBD();
        String Sentencia = "DELETE FROM ingresos WHERE id_ingreso=" + this.id_ingreso;

        String update = "UPDATE inventario i\n"
                + "join ingresos ing on ing.id_ingreso = " + this.id_ingreso + "\n"
                + "set i.stock=i.stock+ing.cantidad \n"
                + "where i.id_inventario = ing.producto ";

        if (conexion.setAutoCommitBD(false)) {
            if (conexion.actualizarBD(update)) {
                conexion.commitBD();
                if (conexion.setAutoCommitBD(false)) {
                    if (conexion.borrarBD(Sentencia)) {
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

    public String verIngreso() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        String sql = "select i.id_ingreso,i.producto,i.valor_venta,i.cantidad,inv.categoria from ingresos i join inventario inv on inv.id_inventario = i.producto where i.id_ingreso=" + this.id_ingreso;
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                model_ingresos i = new model_ingresos();
                i.setId_ingreso(rs.getInt("id_ingreso"));
                i.setProducto(rs.getInt("producto"));
                i.setValor_venta(rs.getInt("valor_venta"));
                i.setCantidad(rs.getInt("cantidad"));
                i.setCategoriaid(rs.getInt("categoria"));
                conexion.cerrarConexion();
                return "\"status\": 1,\"id_ingreso\": " + i.getId_ingreso() + ",\"producto\": " + i.getProducto() + ",\"valor_venta\":" + i.getValor_venta() + ",\"cantidad\":" + i.getCantidad() + ",\"categoria\":" + i.getCategoriaid();
            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String generarExcel() throws FileNotFoundException, IOException {
        ConexionBD conexion = new ConexionBD();
        List<model_ingresos> listarIngresos = new ArrayList<>();
        String sql = "select \n"
                + "i.id_ingreso,\n"
                + "inv.descripcion as producto,\n"
                + "c.descripcion as categoria, \n"
                + "i.valor_venta as valor_venta, \n"
                + "i.cantidad as cantidad, \n"
                + "date(i.fecha_creacion) as fecha_creacion, \n"
                + "date(i.fecha_actualizacion) as fecha_actualizacion \n"
                + "from ingresos i \n"
                + "join inventario inv on inv.id_inventario=i.producto\n"
                + "join categorias c on c.id_categoria=inv.categoria \n"
                + "where i.usuario = " + this.usuario + " order by i.id_ingreso asc";

        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {

                    model_ingresos i = new model_ingresos();
                    i.setId_ingreso(rs.getInt("id_ingreso"));
                    i.setFecha_creacion(String.valueOf(rs.getDate("fecha_creacion")));
                    i.setNombre_categoria(rs.getString("categoria"));
                    i.setNombre_producto(rs.getString("producto"));
                    i.setValor_venta(rs.getInt("valor_venta"));
                    i.setCantidad(rs.getInt("cantidad"));
                    i.setTotal(rs.getInt("valor_venta") * rs.getInt("cantidad"));
                    listarIngresos.add(i);
                }
                conexion.cerrarConexion();
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                XSSFWorkbook workbook = new XSSFWorkbook();
                XSSFSheet sheet = workbook.createSheet("Reporte Ingresos");

                XSSFCellStyle styleTitulos = workbook.createCellStyle();
                styleTitulos.setAlignment(HorizontalAlignment.CENTER);
                styleTitulos.setVerticalAlignment(VerticalAlignment.CENTER);
                XSSFFont fontTitulos = workbook.createFont();
                fontTitulos.setBold(true);
                styleTitulos.setFont(fontTitulos);

                int rownum = 0;
                int cellnum = 0;

                Row row = sheet.createRow(rownum++);
                Cell cell = row.createCell(cellnum++);
                cell.setCellValue("FECHA");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("ID");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("CATEGORIA");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("PRODUCTO");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("VALOR VENTA");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("CANTIDAD");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("TOTAL");
                cell.setCellStyle(styleTitulos);

                for (model_ingresos val : listarIngresos) {
                    row = sheet.createRow(rownum++);
                    cellnum = 0;
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getFecha_creacion());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getId_ingreso());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getNombre_categoria());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getNombre_producto());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getValor_venta());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getCantidad());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getTotal());
                }
                workbook.write(out);
                out.close();
                workbook.close();
                byte[] base64encoded = Base64.getEncoder().encode(out.toByteArray());

                return "\"status\": 1,\"excel\":\"data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + new String(base64encoded) + "\"";

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

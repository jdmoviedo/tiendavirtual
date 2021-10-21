/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import com.google.gson.Gson;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import persistencia.ConexionBD;

/**
 *
 * @author elena riano
 */
public class model_egresos {

    public int id_egreso, producto, valor_compra, cantidad, usuario, categoriaid, cantidad_anterior, total;
    private String fecha_creacion;
    private String fecha_actualizacion;
    private String nombre_producto;
    private String nombre_categoria;
    private String action;

    public model_egresos() {
    }

    public int getId_egreso() {
        return id_egreso;
    }

    public void setId_egreso(int id_egreso) {
        this.id_egreso = id_egreso;
    }

    public int getProducto() {
        return producto;
    }

    public void setProducto(int producto) {
        this.producto = producto;
    }

    public int getValor_compra() {
        return valor_compra;
    }

    public void setValor_compra(int valor_compra) {
        this.valor_compra = valor_compra;
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

    public String guardarEgreso() {
        ConexionBD conexion = new ConexionBD();

        String fecha_crea = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());

        String sentencia = "INSERT INTO egresos (producto, valor_compra, cantidad, fecha_creacion,usuario) "
                + " VALUES ( " + this.producto + "," + this.valor_compra + ","
                + this.cantidad + ",'" + fecha_crea + "'," + this.usuario + ");";

        String update = "UPDATE inventario a\n"
                + "JOIN inventario b on b.id_inventario = " + this.producto + "\n"
                + "set a.stock=" + this.cantidad + "+b.stock \n"
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
    }

    public String listarEgresos() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        List<model_egresos> listarEgresos = new ArrayList<>();
        String sql = "select \n"
                + "e.id_egreso,\n"
                + "inv.descripcion as producto,\n"
                + "c.descripcion as categoria, \n"
                + "e.valor_compra as valor_compra, \n"
                + "e.cantidad as cantidad, \n"
                + "e.fecha_creacion as fecha_creacion, \n"
                + "e.fecha_actualizacion as fecha_actualizacion \n"
                + "from egresos e \n"
                + "join inventario inv on inv.id_inventario=e.producto\n"
                + "join categorias c on c.id_categoria=inv.categoria \n"
                + "where e.usuario = " + this.usuario + " order by e.id_egreso asc";

        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {

                    model_egresos e = new model_egresos();
                    e.setId_egreso(rs.getInt("id_egreso"));
                    e.setValor_compra(rs.getInt("valor_compra"));
                    e.setCantidad(rs.getInt("cantidad"));
                    e.setFecha_creacion(String.valueOf(rs.getDate("fecha_creacion")));
                    e.setFecha_actualizacion(String.valueOf(rs.getDate("fecha_actualizacion") == null ? "" : rs.getDate("fecha_actualizacion")));
                    e.setNombre_producto(rs.getString("producto"));
                    e.setNombre_categoria(rs.getString("categoria"));

                    acciones = "<i class=\"ik ik-eye fa-lg\" style=\"cursor: pointer;\" ng-click=\"e.verEgreso(" + rs.getInt("id_egreso") + ",1);\"  title=\"Ver\"></i>";
                    acciones += "<i class=\"ik ik-edit-2 fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Editar\" ng-click=\"e.verEgreso(" + rs.getInt("id_egreso") + ",2);\"></i>";
                    acciones += "<i class=\"ik ik-trash fa-lg\" style=\"cursor: pointer;margin-left:5px;\" title=\"Eliminar\" ng-click=\"e.eliminarEgreso(" + rs.getInt("id_egreso") + ");\"></i>";

                    e.setAction(acciones);
                    listarEgresos.add(e);
                }

                conexion.cerrarConexion();
                return "\"status\": 1,\"datos\":" + new Gson().toJson(listarEgresos);

            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String actualizarEgreso() {
        ConexionBD conexion = new ConexionBD();
        String fecha_actu = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
        String Sentencia = "UPDATE `egresos` SET producto=" + this.producto
                + ",valor_compra=" + this.valor_compra + ",cantidad=" + this.cantidad
                + ",fecha_actualizacion='" + fecha_actu + "' WHERE id_egreso="
                + this.id_egreso;

        String update = "UPDATE inventario i\n"
                + "join egresos egr on egr.id_egreso = " + this.id_egreso + "\n"
                + "set i.stock=i.stock-(" + this.cantidad_anterior + "-" + this.cantidad + ") \n"
                + "where i.id_inventario = egr.producto ";

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
    }

    //ELIMINAR
    public String eliminarEgreso() {
        ConexionBD conexion = new ConexionBD();
        String Sentencia = "DELETE FROM egresos WHERE id_egreso=" + this.id_egreso;

        String update = "UPDATE inventario i\n"
                + "join egresos egr on egr.id_egreso = " + this.id_egreso + "\n"
                + "set i.stock=i.stock-egr.cantidad \n"
                + "where i.id_inventario = egr.producto ";

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

    public String verEgreso() throws SQLException {
        ConexionBD conexion = new ConexionBD();
        String sql = "select e.id_egreso,e.producto,e.valor_compra,e.cantidad,inv.categoria from egresos e join inventario inv on inv.id_inventario = e.producto where e.id_egreso='" + this.id_egreso + "'";
        try {
            ResultSet rs = conexion.consultarBD(sql);
            if (rs.next()) {
                model_egresos e = new model_egresos();
                e.setId_egreso(rs.getInt("id_egreso"));
                e.setProducto(rs.getInt("producto"));
                e.setValor_compra(rs.getInt("valor_compra"));
                e.setCantidad(rs.getInt("cantidad"));
                e.setCategoriaid(rs.getInt("categoria"));
                conexion.cerrarConexion();
                return "\"status\": 1,\"id_egreso\": " + e.getId_egreso() + ",\"producto\": " + e.getProducto() + ",\"valor_compra\":" + e.getValor_compra() + ",\"cantidad\":" + e.getCantidad() + ",\"categoria\":" + e.getCategoriaid();
            } else {
                conexion.cerrarConexion();
                return "\"status\": 2";
            }
        } catch (SQLException ex) {
            conexion.cerrarConexion();
            return "\"status\": 0";
        }
    }

    public String generarExcel() throws SQLException, IOException {
        ConexionBD conexion = new ConexionBD();
        List<model_egresos> listarEgresos = new ArrayList<>();
        String sql = "select \n"
                + "e.id_egreso,\n"
                + "inv.descripcion as producto,\n"
                + "c.descripcion as categoria, \n"
                + "e.valor_compra as valor_compra, \n"
                + "e.cantidad as cantidad, \n"
                + "e.fecha_creacion as fecha_creacion, \n"
                + "e.fecha_actualizacion as fecha_actualizacion \n"
                + "from egresos e \n"
                + "join inventario inv on inv.id_inventario=e.producto\n"
                + "join categorias c on c.id_categoria=inv.categoria \n"
                + "where e.usuario = " + this.usuario + " order by e.id_egreso asc";

        try {
            ResultSet rs = conexion.consultarBD(sql);
            String acciones = "";
            if (rs.next()) {
                rs.previous();
                while (rs.next()) {

                    model_egresos e = new model_egresos();
                    e.setId_egreso(rs.getInt("id_egreso"));
                    e.setValor_compra(rs.getInt("valor_compra"));
                    e.setCantidad(rs.getInt("cantidad"));
                    e.setFecha_creacion(String.valueOf(rs.getDate("fecha_creacion")));
                    e.setNombre_producto(rs.getString("producto"));
                    e.setNombre_categoria(rs.getString("categoria"));
                    e.setTotal(rs.getInt("valor_compra") * rs.getInt("cantidad"));

                    listarEgresos.add(e);
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
                cell.setCellValue("VALOR COMPRA");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("CANTIDAD");
                cell.setCellStyle(styleTitulos);
                cell = row.createCell(cellnum++);
                cell.setCellValue("TOTAL");
                cell.setCellStyle(styleTitulos);

                for (model_egresos val : listarEgresos) {
                    row = sheet.createRow(rownum++);
                    cellnum = 0;
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getFecha_creacion());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getId_egreso());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getNombre_categoria());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getNombre_producto());
                    cell = row.createCell(cellnum++);
                    cell.setCellValue(val.getValor_compra());
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

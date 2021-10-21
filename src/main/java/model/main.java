/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

import java.sql.SQLException;
import model.model_inventario;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author JDMOV
 */
public class main {

    public static void main(String[] args) throws SQLException {
        System.out.println(DigestUtils.md5Hex("Abc123456"));
    }

    public static void prueba() throws SQLException {
        model_inventario i = new model_inventario();
        System.out.println(i.listarInventario());

    }
}

package com.devrev.flightticketbooking.dao;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectionHandler {
	private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flightfinal";
	private static final String USER = "root";
	private static final String PASSWORD = "20Brunos";

	public static Connection getConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			return DriverManager.getConnection(JDBC_URL, USER, PASSWORD);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			throw new RuntimeException("Failed to establish a database connection.", e);
		}
	}
}
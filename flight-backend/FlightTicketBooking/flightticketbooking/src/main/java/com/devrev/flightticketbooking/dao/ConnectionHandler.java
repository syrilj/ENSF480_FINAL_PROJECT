package com.devrev.flightticketbooking.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionHandler {
	private static final String JDBC_URL = "jdbc:mysql://localhost:3306/flightfinal";
	private static final String USER = "root";
	private static final String PASSWORD = "qwepoiRU019283!";

	private static Connection connection;

	// Private constructor to prevent instantiation from outside
	private ConnectionHandler() {
		// Initialize the connection
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(JDBC_URL, USER, PASSWORD);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
			throw new RuntimeException("Failed to establish a database connection.", e);
		}
	}

	// Public method to get the singleton instance of ConnectionHandler
	public static Connection getConnection() {
		if (connection == null) {
			synchronized (ConnectionHandler.class) {
				if (connection == null) {
					new ConnectionHandler(); // Create the instance
				}
			}
		}
		return connection;
	}
}

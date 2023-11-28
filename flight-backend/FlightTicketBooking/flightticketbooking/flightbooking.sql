-- Create database
CREATE DATABASE IF NOT EXISTS flightfinal;
USE flightfinal;

-- Create admin credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(25),
  password VARCHAR(25),
  email_id VARCHAR(30),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- Insert admin credentials
INSERT INTO admin_credentials (username, password, email_id) VALUES ('admin', 'admin', 'billybob@gmail.com');

-- Create user details table
CREATE TABLE IF NOT EXISTS user_details (
  u_id INT NOT NULL AUTO_INCREMENT,
  u_name VARCHAR(50) NOT NULL,
  u_gender VARCHAR(10) NOT NULL,
  u_address VARCHAR(100) NOT NULL,
  u_email_id VARCHAR(50) NOT NULL,
  u_contact VARCHAR(10) NOT NULL,
  u_username VARCHAR(30) NOT NULL,
  u_password VARCHAR(30) NOT NULL,
  PRIMARY KEY (u_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- Create flight details table with Comfort class
CREATE TABLE IF NOT EXISTS flight_details (
  id INT NOT NULL AUTO_INCREMENT,
  flightno VARCHAR(10) NOT NULL,
  from_city VARCHAR(20) NOT NULL,
  to_city VARCHAR(20) NOT NULL,
  departure_date VARCHAR(20) NOT NULL,
  arrival_date VARCHAR(20) NOT NULL,
  departure_time VARCHAR(20) NOT NULL,
  arrival_time VARCHAR(20) NOT NULL,
  e_seats_left INT NOT NULL DEFAULT 45,
  b_seats_left INT NOT NULL DEFAULT 15,
  c_seats_left INT NOT NULL DEFAULT 20,
  e_price INT NOT NULL,
  b_price INT NOT NULL,
  c_price INT NOT NULL,
  flight_company VARCHAR(40) NOT NULL,
  status VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- Create passenger details table
CREATE TABLE IF NOT EXISTS passenger_details (
  p_id INT NOT NULL,
  p_pnr VARCHAR(25) NOT NULL,
  p_name VARCHAR(50) NOT NULL,
  p_age VARCHAR(3) NOT NULL,
  p_sex VARCHAR(10) NOT NULL,
  p_fno VARCHAR(10) NOT NULL,
  p_from VARCHAR(10) NOT NULL,
  p_to VARCHAR(10) NOT NULL,
  p_dedate DATE DEFAULT NULL,
  p_ardate DATE DEFAULT NULL,
  p_detime VARCHAR(20) NOT NULL,
  p_artime VARCHAR(20) NOT NULL,
  p_status VARCHAR(20) NOT NULL,
  p_class VARCHAR(10) NOT NULL,
  p_seatno INT NOT NULL,
  p_email VARCHAR(30) DEFAULT NULL,
  p_bookingdate DATE DEFAULT NULL,
  PRIMARY KEY (p_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Add primary key to passenger details table
ALTER TABLE passenger_details ADD PRIMARY KEY (p_id);

-- Modify auto-increment for passenger details table
ALTER TABLE passenger_details MODIFY p_id INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

-- Create PNR table
CREATE TABLE IF NOT EXISTS PNR (
  PNR_NO VARCHAR(20),
  TOTAL_AMOUNT DOUBLE
);

package com.flight.airline.service;

import com.flight.airline.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

	@Autowired
	UserDao udao;

	public void addUser(String name, String gender, String address, String email_id, String contact, String username,
			String password) {

		udao.addUser(name, gender, address, email_id, contact, username, password);
	}

	public boolean validateUser(String username, String password) {
		boolean loginstate = udao.validate_User(username, password);
		return loginstate;

	}

	public boolean validateAdmin(String username, String password) {

		boolean loginstate = udao.validateAdmin(username, password);
		return loginstate;
	}

}
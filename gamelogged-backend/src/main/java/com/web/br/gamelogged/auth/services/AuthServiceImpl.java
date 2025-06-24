package com.web.br.gamelogged.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.web.br.gamelogged.user.service.UserService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    public void cadastrarUsuario(String email, String password, String nickname) throws FirebaseAuthException {
        CreateRequest request = new CreateRequest()
                .setEmail(email)
                .setPassword(password);
        
        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
        userService.createUser(userRecord.getUid(), nickname);       
    }

    
}

package com.web.br.gamelogged.auth.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.services.storage.Storage.Projects.HmacKeys.Create;
import com.google.cloud.storage.Acl.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.web.br.gamelogged.user.service.UserService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    @Autowired
    public AuthServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void cadastrarUsuario(String email, String password, String nickname) throws FirebaseAuthException {
        CreateRequest request = new CreateRequest()
                .setEmail(email)
                .setPassword(password);
        
        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
        userService.createUser(userRecord.getUid(), nickname);       
    }

    @Override
    public String validarTokenFirebase(String idToken) throws FirebaseAuthException {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        String uid = decodedToken.getUid();

        return uid;
    }

}

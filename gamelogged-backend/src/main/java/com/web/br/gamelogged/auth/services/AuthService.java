package com.web.br.gamelogged.auth.services;

import com.google.firebase.auth.FirebaseAuthException;

public interface AuthService {

    void cadastrarUsuario(String email, String password, String nickname) throws FirebaseAuthException;
    
}

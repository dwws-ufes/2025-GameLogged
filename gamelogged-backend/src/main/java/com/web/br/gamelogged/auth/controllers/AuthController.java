package com.web.br.gamelogged.auth.controllers;

import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.web.br.gamelogged.auth.dto.AuthRequest;
import com.web.br.gamelogged.auth.services.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/validarLogin")
    public ResponseEntity<Map<String, String>> validateLogin(@Valid @RequestHeader("Authorization") String auth) {
        Map<String, String> response = new HashMap<>();
         String token = auth.replace("Bearer ", "").trim();
        try {
            authService.validarTokenFirebase(token);
            response.put("token", token);
            response.put("message", "Login validado");
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            response.put("error", "Credenciais inválidas.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);

        } catch (Exception e) {
            response.put("error", "Erro inesperado.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Map<String, String>> cadastro(@Valid @RequestBody AuthRequest request) {
        Map<String, String> response = new HashMap<>();

        try {
            authService.cadastrarUsuario(request.getEmail(), request.getPassword(), request.getNickname());
            response.put("message", "Cadastro successful");
            return ResponseEntity.ok(response);
        } catch (FirebaseAuthException e) {
            switch (e.getErrorCode()) {
                case ALREADY_EXISTS:
                    response.put("message", "E-mail já cadastrado");
                default:
                    response.put("message", "Erro inesperado durante cadastro");
            }
            return ResponseEntity.badRequest().body(response);
        }
    }
}

package com.lowres.demo_auth.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lowres.demo_auth.jwtAuth.JwtService;
import com.lowres.demo_auth.model.User;
import com.lowres.demo_auth.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    private Logger logger = LoggerFactory.getLogger(AuthService.class);

    /*
     * Login user or throw exception
     */
    public AuthResponse login(LoginRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        AuthResponse response = new AuthResponse(token);
        return response;
    }

    /*
     * Register new user and encode password
     */
    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        String token = jwtService.getToken(user);
        AuthResponse response = new AuthResponse(token);
        return response;
    }
}

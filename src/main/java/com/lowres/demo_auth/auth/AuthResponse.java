package com.lowres.demo_auth.auth;

public class AuthResponse {

    public String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}

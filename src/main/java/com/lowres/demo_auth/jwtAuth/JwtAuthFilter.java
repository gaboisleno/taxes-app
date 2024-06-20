package com.lowres.demo_auth.jwtAuth;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired JwtService jwtService;
    @Autowired UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
         
            final String token = getTokenFromRequest(request);

            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }
            
            final String username;
            username = jwtService.getUsernameFromToken(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtService.isTokenValid(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);
        }
   
        private String getTokenFromRequest(HttpServletRequest request) {
            final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            
            if (org.springframework.util.StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
                return authHeader.substring(7);
            }

            return null;
        }
    
}

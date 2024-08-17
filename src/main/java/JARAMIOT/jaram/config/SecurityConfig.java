package JARAMIOT.jaram.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/api/users/register").permitAll() // 회원가입 누구나 가능
                        .requestMatchers("/api/users/**").permitAll() // users API 접근 허용
                        .requestMatchers("/api/reservations/**").permitAll() // reservations API 접근 허용
                        .requestMatchers("/api/parking-spaces/**").permitAll() // parking-spaces API 접근 허용
                        .anyRequest().authenticated() // 그 외 요청은 인증이 필요
                );
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
package JARAMIOT.jaram.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 요청에 대해 CORS 허용
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React 앱의 출처
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메소드
                .allowCredentials(true); // 인증 정보 포함 허용
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests(authorize -> authorize
                        .requestMatchers("/").permitAll()
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

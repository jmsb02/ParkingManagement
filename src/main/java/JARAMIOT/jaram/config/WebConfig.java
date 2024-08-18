package JARAMIOT.jaram.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // 모든 API 경로에 대해
                .allowedOrigins("http://localhost:3000") // React 앱의 URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH"); // 허용할 HTTP 메소드
    }
}

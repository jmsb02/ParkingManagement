package JARAMIOT.jaram.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {

    private String username;

    @Email(message = "올바른 이메일 주소 형식이어야 합니다.")
    private String email;

    @Size(min = 8, message = "비밀번호는 최소 8글자 이상이어야 합니다.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!~`*()_+=]).*$",
            message = "정규 표현식을 사용하여 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.")
    private String password;
}

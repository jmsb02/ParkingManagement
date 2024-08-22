package JARAMIOT.jaram.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDTO {

    @NotBlank(message = "사용자 이름은 필수 입력입니다.")
    private String username;

    @NotBlank(message = "이메일은 필수 입력입니다.")
    @Email(message = "올바른 이메일 주소 형식이어야 합니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입니다.")
    @Size(min = 8, message = "비밀번호는 최소 8글자 이상이어야 합니다.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!~`*()_+=]).*$",
            message = "정규 표현식을 사용하여 대문자, 소문자, 숫자, 특수 문자를 포함해야 합니다.")
    private String password;
}

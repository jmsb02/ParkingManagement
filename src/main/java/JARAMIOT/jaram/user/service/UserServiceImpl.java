package JARAMIOT.jaram.user.service;

import JARAMIOT.jaram.user.dto.UserSignInDTO;
import JARAMIOT.jaram.user.dto.UserSignUpDTO;
import JARAMIOT.jaram.user.dto.UserUpdateDTO;
import JARAMIOT.jaram.user.entity.User;
import JARAMIOT.jaram.user.exception.UserNotFoundException;
import JARAMIOT.jaram.user.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Long signUp(@Valid UserSignUpDTO userSignUpDTO) {
        User user = createUserFromDto(userSignUpDTO);
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Override
    public User signIn(UserSignInDTO userSignInDTO) {
        String email = userSignInDTO.getEmail();
        String password = userSignInDTO.getPassword();
        User user = findUserByEmail(email);
        validatePassword(password, user);
        return user;
    }

    @Override
    public User updateUser(Long userId, @Valid UserUpdateDTO userUpdateDTO) {
        User user = findById(userId);

        // 비밀번호 유효성 검사
        if (userUpdateDTO.getPassword() != null && !userUpdateDTO.getPassword().isEmpty()) {
            if (!isValidPassword(userUpdateDTO.getPassword())) {
                throw new IllegalArgumentException("비밀번호 규칙에 맞지 않습니다.");
            }
        }

        return userRepository.save(updateUserFromDto(user, userUpdateDTO));
    }

    // 비밀번호 유효성 검사 메소드 추가
    private boolean isValidPassword(String password) {
        return password.length() >= 8 && password.length() <= 20 &&
                password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!~`*()_+=]).*$");
    }

    @Override
    public void deleteUser(Long userId) {
        User user = findById(userId);
        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("회원이 존재하지 않습니다"));
    }

    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("회원이 존재하지 않습니다"));
    }

    private void validatePassword(String password, User user) {
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    private User createUserFromDto(UserSignUpDTO userSignUpDTO) {
        return User.builder()
                .username(userSignUpDTO.getUsername())
                .email(userSignUpDTO.getEmail())
                .password(passwordEncoder.encode(userSignUpDTO.getPassword()))
                .build();
    }

    // updateUserFromDto 메소드에서 비밀번호 업데이트 부분
    private User updateUserFromDto(User user, UserUpdateDTO userUpdateDTO) {
        User.UserBuilder userBuilder = User.builder()
                .id(user.getId());

        // username 업데이트
        if (userUpdateDTO.getUsername() != null && !userUpdateDTO.getUsername().isEmpty()) {
            userBuilder.username(userUpdateDTO.getUsername());
        } else {
            userBuilder.username(user.getUsername()); // 기존 username 유지
        }

        // email 업데이트
        if (userUpdateDTO.getEmail() != null && !userUpdateDTO.getEmail().isEmpty()) {
            userBuilder.email(userUpdateDTO.getEmail());
        } else {
            userBuilder.email(user.getEmail()); // 기존 email 유지
        }

        // 비밀번호 업데이트 (입력된 경우에만)
        if (userUpdateDTO.getPassword() != null && !userUpdateDTO.getPassword().isEmpty()) {
            if (!isValidPassword(userUpdateDTO.getPassword())) {
                throw new IllegalArgumentException("비밀번호 규칙에 맞지 않습니다.");
            }
            userBuilder.password(passwordEncoder.encode(userUpdateDTO.getPassword()));
        } else {
            userBuilder.password(user.getPassword()); // 기존 비밀번호 유지
        }

        return userBuilder.build();
    }

}

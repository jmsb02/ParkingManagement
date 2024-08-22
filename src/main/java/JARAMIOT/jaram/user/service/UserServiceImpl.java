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
        return userRepository.save(updateUserFromDto(user, userUpdateDTO));
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

    private User updateUserFromDto(User user, UserUpdateDTO userUpdateDTO) {
        return User.builder()
                .id(user.getId())
                .email(userUpdateDTO.getEmail())
                .username(userUpdateDTO.getUsername())
                .password(passwordEncoder.encode(userUpdateDTO.getPassword()))
                .build();
    }
}

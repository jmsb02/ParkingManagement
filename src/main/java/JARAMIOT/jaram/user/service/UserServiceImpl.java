package JARAMIOT.jaram.user.service;

import JARAMIOT.jaram.user.dto.UserDto;
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
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Long signUp(@Valid UserDto userDto) {
        User user = createUserFromDto(userDto);
        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    @Override
    public User signIn(String email, String password) {
        User user = findUserByEmail(email);
        validatePassword(password, user);
        return user;
    }

    @Override
    @Transactional
    public User updateUser(Long userId, @Valid UserDto userDto) {
        User user = findById(userId);
        return userRepository.save(updateUserFromDto(user, userDto));
    }

    @Override
    public void deleteUser(Long userId) {
        User user = findById(userId);
        userRepository.delete(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("회원이 존재하지 않습니다"));
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("회원이 존재하지 않습니다"));
    }

    private void validatePassword(String password, User user) {
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    private User createUserFromDto(UserDto userDto) {
        return User.builder()
                .email(userDto.getEmail())
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
    }

    private User updateUserFromDto(User user, UserDto userDto) {
        return User.builder()
                .id(user.getId())
                .email(userDto.getEmail())
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build();
    }
}

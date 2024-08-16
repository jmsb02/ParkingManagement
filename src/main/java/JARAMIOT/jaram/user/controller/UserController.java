package JARAMIOT.jaram.user.controller;

import JARAMIOT.jaram.user.dto.UserDTO;
import JARAMIOT.jaram.user.entity.User;
import JARAMIOT.jaram.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //회원 가입
    @PostMapping("/signUp")
    public ResponseEntity<Long> signUp(@Valid @RequestBody UserDTO userDto) {
        Long user_id = userService.signUp(userDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(user_id);
    }

    //로그인
    @PostMapping("/signIn")
    public ResponseEntity<User> signIn(@Valid @RequestBody UserDTO userDto) {
        User findUser = userService.signIn(userDto.getEmail(), userDto.getPassword());
        return ResponseEntity.ok(findUser);
    }

    //사용자 정보 수정
    //사용자 삭제
    //전체 사용자 조회
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    //특정 사용자 조회
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User findUser = userService.findById(userId);
        return ResponseEntity.ok(findUser);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @Valid @RequestBody UserDTO userDto) {
        User updateUser = userService.updateUser(userId, userDto);
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

}

package JARAMIOT.jaram.user.service;

import JARAMIOT.jaram.user.dto.UserDto;
import JARAMIOT.jaram.user.entity.User;

import java.util.List;

public interface UserService {

    //회원 가입
    Long signUp(UserDto userDto);
    //로그인
    User signIn(String email, String password);
    //회원 업데이트
    User updateUser(Long userId, UserDto userDto);
    //회원 삭제
    void deleteUser(Long userId);
    //회원 조회
    User findById(Long userId);
    //
    List<User> getAllUsers();

}

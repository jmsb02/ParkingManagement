package JARAMIOT.jaram.user.service;

import JARAMIOT.jaram.user.dto.UserSignInDTO;
import JARAMIOT.jaram.user.dto.UserSignUpDTO;
import JARAMIOT.jaram.user.dto.UserUpdateDTO;
import JARAMIOT.jaram.user.entity.User;

import java.util.List;

public interface UserService {

    //회원 가입
    Long signUp(UserSignUpDTO userSignUpDTO);
    //로그인
    User signIn(UserSignInDTO userSignInDTO);
    //회원 업데이트
    User updateUser(Long userId, UserUpdateDTO userUpdateDTO);
    //회원 삭제
    void deleteUser(Long userId);
    //회원 조회
    User findById(Long userId);
    //
    List<User> getAllUsers();

}

 JARAM WorkShop
# 프로젝트 이름: 스마트 주차 관리 시스템

## 시스템 개요
스마트 주차 관리 시스템은 사용자가 주차를 완료한 후 주차 공간을 예약할 수 있도록 돕는 웹 기반 애플리케이션입니다. 이 시스템은 IoT 장치 대신 소프트웨어 클라이언트(Postman)를 통해 주차 관리 기능을 제공합니다.
주차 후 예약 기능을 통해 사용자는 주차를 마친 후에도 해당 주차 공간을 효율적으로 관리할 수 있습니다.


## 용도
- 사용자 주차 및 예약 관리: 사용자는 주차를 완료한 후, 웹 인터페이스를 통해 주차한 공간을 예약할 수 있습니다. 이때 User ID, Parking ID, 날짜 정보를 입력하여 예약을 완료합니다.
- 예약 기반 주차 관리: 주차 후 예약된 정보는 백엔드 API를 통해 저장 및 관리되며, 이를 기반으로 주차 공간의 사용 현황이 효율적으로 추적됩니다.
- 백엔드 API 관리: 백엔드 API는 주차 후 예약된 정보를 관리하며, 사용자와의 데이터 통신을 담당합니다.
- 사용자 인터페이스: 프론트엔드는 사용자가 주차 후 예약 과정을 직관적으로 진행할 수 있도록 돕는 편리한 인터페이스를 제공합니다.

## 사용 언어, 클라이언트
Frontend - React(ChatGPT)
IoT 디바이스 대체용 클라이언트 - PostMan
HTTP RestAPI Backend - Spring Boot & JPA (RestController)

## 기한
8/14 ~ 8/25

## 시연 스크린샷

### 홈 화면 (회원 가입)
![image](https://github.com/user-attachments/assets/86408da7-5199-4439-9976-bb1c1e2d03d7)

회원 가입 성공시
![image](https://github.com/user-attachments/assets/e0a7ce3f-038b-46cc-a14d-ef7bc6148fef) ![image](https://github.com/user-attachments/assets/7dfb8def-0067-4b7b-8a7f-aba1625285a1)

실패시 - Frontend - console.error, Backend - @Validation로 예외 처리

### 로그인 화면
![image](https://github.com/user-attachments/assets/3516b354-87b4-4c0c-9ada-4a0755315803)


### 로그인 성공 시 - User 조회 화면
![image](https://github.com/user-attachments/assets/81a42019-6969-4565-b2a6-37dc98bc920e)
User 조회 화면으로 이동
실패시 - Frontend - console.error, Backend - @Validation로 예외 처리
이 화면에서 유저 정보 수정 및 삭제 가능

##회원 업데이트
![image](https://github.com/user-attachments/assets/b2c2877b-359b-4357-9434-f3e2666ad278) ![image](https://github.com/user-attachments/assets/fbc24f8e-5e0c-4b87-ab8b-7cab94e7e812)
선택적으로 Username, email, password 수정할 수 있도록 함



### 주차 예약 시스템
![image](https://github.com/user-attachments/assets/d8667974-9c4c-45e6-9412-4810bbebdf95)
화면에서 현재 주차된 공간을 확인할 수 있으며,
주차할 공간을 저장 및 수정할 수 있다.

### 예약 관리 시스템
![image](https://github.com/user-attachments/assets/a5e38ec3-d797-4891-81c0-b444fefd12ac)
User ID, Parking ID를 통해 저장된 주차 공간을 기반으로 주차 공간을 예약할 수 있는 시스템
또한 몇년 몇월 몇일에 예약 하였는지 확인할 수 있다.

주차한 후 예약을 하도록 설계한 이유는, 일부 사용자가 주차를 못하는 특수 상황이나 사전에 예약을 못할 경우, 주차 관리를 유연하게 할 수 있게 하는 등 사용자의 편의성을 향상 시키고 유연한 주차 관리를 위해 이렇게 설계 하였다.

JARAM WorkShop
# 프로젝트 이름: 스마트 주차 관리 시스템

## 목적
스마트 주차 관리 시스템은 사용자가 주차 공간을 쉽게 예약하고 관리할 수 있도록 돕는 웹 기반 애플리케이션입니다. 이 시스템은 IoT 장치 대신 소프트웨어 클라이언트(Postman)를 통해 주차 관리 기능을 제공합니다.

## 용도
- 사용자는 웹 인터페이스를 통해 주차 공간을 검색하고 예약할 수 있습니다.
- 백엔드 API는 예약 정보를 저장하고 관리하며, 클라이언트와의 데이터 통신을 담당합니다.
- Frontend는 사용자에게 직관적이고 편리한 인터페이스를 제공합니다.

## 사용 언어, 클라이언트
Frontend - React(ChatGPT)
IoT 디바이스 대체용 클라이언트 - PostMan
HTTP RestAPI Backend - Spring Boot & JPA (RestController)

## 시연 스크린샷

### 홈 화면 (회원 가입)
![image](https://github.com/user-attachments/assets/86408da7-5199-4439-9976-bb1c1e2d03d7)

회원 가입 성공시
![image](https://github.com/user-attachments/assets/e0a7ce3f-038b-46cc-a14d-ef7bc6148fef) ![image](https://github.com/user-attachments/assets/7dfb8def-0067-4b7b-8a7f-aba1625285a1)

실패시 - Frontend - console.error, Backend - @Validation로 예외 처리

### 로그인 화면
![image](https://github.com/user-attachments/assets/91730ac8-dc9d-4d18-9bde-6b2fa6b85084)

### 로그인 성공 시 - User 조회 화면
![image](https://github.com/user-attachments/assets/81a42019-6969-4565-b2a6-37dc98bc920e)
User 조회 화면으로 이동
실패시 - Frontend - console.error, Backend - @Validation로 예외 처리
이 화면에서 유저 정보 수정 및 삭제 가능

### 주차 예약 시스템
![image](https://github.com/user-attachments/assets/d8667974-9c4c-45e6-9412-4810bbebdf95)
화면에서 현재 주차된 공간을 확인할 수 있으며,
주차할 공간을 저장 및 수정할 수 있다.

### 예약 관리 시스템
![image](https://github.com/user-attachments/assets/a5e38ec3-d797-4891-81c0-b444fefd12ac)
User ID, Parking ID를 통해 저장된 주차 공간을 기반으로 주차 공간을 예약할 수 있는 시스템
또한 몇년 몇월 몇일에 예약 하였는지 확인할 수 있다.

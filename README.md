 JARAM WorkShop
# 프로젝트 이름: 스마트 주차 관리 시스템

## 시스템 개요
스마트 주차 관리 시스템은 사용자가 주차를 완료한 후 주차 공간을 예약할 수 있도록 돕는 웹 기반 애플리케이션입니다. 이 시스템은 IoT 장치 대신 소프트웨어 클라이언트(Postman)를 통해 주차 관리 기능을 제공합니다.
주차 후 예약 기능을 통해 사용자는 주차를 마친 후에도 해당 주차 공간을 효율적으로 관리할 수 있습니다.


## 용도
- 사용자 주차 및 예약 관리: 사용자는 주차를 완료한 후, 웹 인터페이스를 통해 주차한 공간을 예약할 수 있습니다.
- 예약 기반 주차 관리: 주차 후 예약된 정보는 백엔드 API를 통해 저장 및 관리되며, 이를 기반으로 주차 공간의 사용 현황이 효율적으로 추적됩니다.
- 백엔드 API 관리: 백엔드 API는 주차 후 예약된 정보를 관리하며, 사용자와의 데이터 통신을 담당합니다.
- 사용자 인터페이스: 프론트엔드는 사용자가 주차 후 예약 과정을 직관적으로 진행할 수 있도록 돕는 편리한 인터페이스를 제공합니다.

## 사용 언어, 클라이언트
Frontend - **React(ChatGPT)**,
IoT 디바이스 대체용 클라이언트 - **PostMan**,
HTTP RestAPI Backend - **Spring Boot & JPA (RestController)**

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

### 회원 업데이트
![image](https://github.com/user-attachments/assets/b2c2877b-359b-4357-9434-f3e2666ad278) ![image](https://github.com/user-attachments/assets/fbc24f8e-5e0c-4b87-ab8b-7cab94e7e812)
선택적으로 Username, email, password 수정할 수 있도록 함

### 회원 삭제
![image](https://github.com/user-attachments/assets/b9f3cd70-99b5-432e-aa3f-a909a43878a9)


### 주차 예약 시스템
![image](https://github.com/user-attachments/assets/737253af-7106-48ae-8f45-03b9697d1d99)

로그인 한 회원 이름, 예약 날짜, 시작 및 종료 시간, 위치를 넘겨서 에약을 생성한다.

### 예약 생성 완료
![image](https://github.com/user-attachments/assets/3d10ec8f-acb0-4017-97ab-060a0cb6e5ad)

### 예약 수정

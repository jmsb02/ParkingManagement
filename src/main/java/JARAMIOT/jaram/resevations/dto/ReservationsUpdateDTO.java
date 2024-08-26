package JARAMIOT.jaram.resevations.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationsUpdateDTO {

    private String username;

    private LocalDate date;


    private LocalTime startTime; // 주차 시작 시간 추가

    private LocalTime endTime; // 주차 종료 시간 추가

    private String location;

}

package JARAMIOT.jaram.resevations.dto;

import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationsDTO {

    @NotNull
    private String username;
    @NotNull
    private LocalDate date;

    @NotNull
    private LocalTime startTime; // 주차 시작 시간 추가

    @NotNull
    private LocalTime endTime; // 주차 종료 시간 추가

    @NotNull
    private String location;

    @NotNull
    private ParkingSpacesStatus status;



}

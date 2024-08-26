package JARAMIOT.jaram.resevations.service;

import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.dto.ReservationsUpdateDTO;

import java.util.List;

public interface ReservationsService {

    //예약 생성
    Long createReservation(ReservationsDTO reservationsDTO);

    //예약 단권 조회
    ReservationsDTO getReservationById(Long reservationId);

    //예약 모두 조회
    List<ReservationsDTO> getAllReservations();

    //예약 업데이트
    ReservationsUpdateDTO updateReservation(Long userId, ReservationsUpdateDTO updateDTO);

    //예약 취소
    void deleteReservation(Long reservationId);

}

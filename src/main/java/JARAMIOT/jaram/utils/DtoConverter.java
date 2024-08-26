package JARAMIOT.jaram.utils;

import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.dto.ReservationsUpdateDTO;
import JARAMIOT.jaram.resevations.entity.Reservations;

public class DtoConverter {

    public static ReservationsDTO convertToReservationsDTO(Reservations reservation) {
        return new ReservationsDTO(
                reservation.getUser().getUsername(),
                reservation.getDate(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                reservation.getLocation()
        );
    }

    public static ReservationsUpdateDTO convertToReservationsUpdateDTO(Reservations reservation) {
        return new ReservationsUpdateDTO(
                reservation.getUser().getUsername(),
                reservation.getDate(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                reservation.getLocation()
        );
    }

}

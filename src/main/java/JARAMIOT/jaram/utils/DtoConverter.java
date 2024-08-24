package JARAMIOT.jaram.utils;

import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.entity.Reservations;

public class DtoConverter {
    public static ParkingspacesDTO convertToParkingspacesDTO(ParkingSpaces parkingSpaces) {
        return new ParkingspacesDTO(
                parkingSpaces.getId(),
                parkingSpaces.getUser().getId(),
                parkingSpaces.getLocation(),
                ParkingSpacesStatus.valueOf(parkingSpaces.getStatus())
        );
    }


    public static ReservationsDTO convertToReservationsDTO(Reservations reservation) {
        return new ReservationsDTO(
                reservation.getUser().getUsername(),
                reservation.getDate(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                reservation.getLocation()
        );
    }

}

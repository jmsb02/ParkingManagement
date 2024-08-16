package JARAMIOT.jaram.resevations.dto;

import JARAMIOT.jaram.resevations.entity.Reservations;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationsDTO {

    @NotNull
    private Long reservationId;

    @NotNull
    private Long userId;

    @NotNull
    private Long parkingSpaceId;


    public ReservationsDTO(Reservations reservations) {
        this.reservationId = reservations.getId();
        this.userId = reservations.getUser().getId();
        this.parkingSpaceId = reservations.getParkingSpaces().getId();
    }
}

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
    private Long userId;

    @NotNull
    private Long parkingSpaceId;

    public ReservationsDTO(Long userId, Long parkingSpaceId) {
        this.userId = userId;
        this.parkingSpaceId = parkingSpaceId;
    }
}

package JARAMIOT.jaram.resevations.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReservationsDTO {
    private Long reservationId;
    private Long userId;
    private Long parkingSpaceId;
    
}

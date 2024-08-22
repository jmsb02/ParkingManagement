package JARAMIOT.jaram.resevations.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationsDTO {


    @NotNull
    private Long userId;

    @NotNull
    private Long parkingSpaceId;

    @NotNull
    private LocalDate date;


}

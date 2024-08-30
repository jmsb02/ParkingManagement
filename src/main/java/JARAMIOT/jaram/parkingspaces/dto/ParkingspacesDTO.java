package JARAMIOT.jaram.parkingspaces.dto;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ParkingspacesDTO {

    @NotNull
    private String username;

    @NotNull
    private String location;

    private ParkingSpacesStatus status;

}


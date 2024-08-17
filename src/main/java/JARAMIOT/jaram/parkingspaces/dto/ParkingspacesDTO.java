package JARAMIOT.jaram.parkingspaces.dto;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
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
    private Long userId;

    @NotNull
    private String location;

    @NotNull
    private ParkingSpacesStatus status;

    public ParkingspacesDTO(ParkingSpaces parkingSpaces) {
        this.userId = parkingSpaces.getUser().getId();
        this.location = parkingSpaces.getLocation();
        this.status = ParkingSpacesStatus.valueOf(parkingSpaces.getStatus());
    }
}


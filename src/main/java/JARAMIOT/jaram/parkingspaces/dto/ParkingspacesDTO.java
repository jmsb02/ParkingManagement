package JARAMIOT.jaram.parkingspaces.dto;

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

}


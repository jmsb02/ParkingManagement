package JARAMIOT.jaram.parkingspaces.entity;


import JARAMIOT.jaram.resevations.Model.Reservations;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class ParkingSpaces {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "parkingSpaces")
    private List<Reservations> reservations = new ArrayList<>();

    @NotNull
    @Column(nullable = false)
    private String location;

    @NotNull
    @Column(nullable = false)
    private String status;
}

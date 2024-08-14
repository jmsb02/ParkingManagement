package JARAMIOT.jaram.resevations.Model;

import JARAMIOT.jaram.parkingSpaces.Model.ParkingSpaces;
import JARAMIOT.jaram.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Reservations {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_space_id", nullable = false)
    private ParkingSpaces parkingSpaces;
}

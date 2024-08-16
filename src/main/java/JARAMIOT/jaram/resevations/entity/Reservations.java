package JARAMIOT.jaram.resevations.entity;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservations {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_space_id", nullable = false)
    private ParkingSpaces parkingSpaces;

    public Reservations(User user, ParkingSpaces parkingSpaces) {
        this.user = user;
        this.parkingSpaces = parkingSpaces;
    }

    public Reservations(Long id, User user, ParkingSpaces parkingSpaces) {
        this.id = id;
        this.user = user;
        this.parkingSpaces = parkingSpaces;
    }
}

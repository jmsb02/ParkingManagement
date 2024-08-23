package JARAMIOT.jaram.resevations.entity;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import JARAMIOT.jaram.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
public class Reservations {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_space_id", nullable = false)
    private ParkingSpaces parkingSpaces;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @NotNull
    private String location;

    @Enumerated(EnumType.STRING)
    private ParkingSpacesStatus status;

    public Reservations(User user, LocalDate date, LocalTime endTime, LocalTime startTime, String location, ParkingSpacesStatus status) {
        this.user = user;
        this.date = date;
        this.endTime = endTime;
        this.startTime = startTime;
        this.location = location;
        this.status = status;
    }
}

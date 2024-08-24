package JARAMIOT.jaram.resevations.entity;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
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


    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @NotNull
    private String location;

    public Reservations(User user, LocalDate date, LocalTime endTime, LocalTime startTime, String location) {
        this.user = user;
        this.date = date;
        this.endTime = endTime;
        this.startTime = startTime;
        this.location = location;
    }
}

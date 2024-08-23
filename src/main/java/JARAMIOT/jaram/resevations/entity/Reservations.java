package JARAMIOT.jaram.resevations.entity;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

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

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    // 생성자
    public Reservations(User user, ParkingSpaces parkingSpaces, LocalDate date, LocalTime startTime, LocalTime endTime) {
        this.user = user;
        this.parkingSpaces = parkingSpaces;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // 모든 필드를 포함한 생성자
    public Reservations(Long id, User user, ParkingSpaces parkingSpaces, LocalDate date, LocalTime startTime, LocalTime endTime) {
        this.id = id;
        this.user = user;
        this.parkingSpaces = parkingSpaces;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

package JARAMIOT.jaram.parkingspaces.entity;


import JARAMIOT.jaram.resevations.entity.Reservations;
import JARAMIOT.jaram.user.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ParkingSpaces {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    @JoinColumn(name = "parking_space_id") // 외래 키 설정
    private List<Reservations> reservations = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Column(nullable = false)
    private String location;

    @NotNull
    @Enumerated(EnumType.STRING) // Enum으로 설정
    @Column(nullable = false)
    @Setter
    private ParkingSpacesStatus status;

    @Builder
    public ParkingSpaces(Long id, List<Reservations> reservations, User user, String location, ParkingSpacesStatus status) {
        this.id = id;
        this.reservations = reservations;
        this.user = user;
        this.location = location;
        this.status = status;
    }

    public ParkingSpaces(User user, String location) {
        this.user = user;
        this.location = location;
        this.status = ParkingSpacesStatus.AVAILABLE;
    }
}

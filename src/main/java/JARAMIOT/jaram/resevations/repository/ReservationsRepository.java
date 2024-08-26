package JARAMIOT.jaram.resevations.repository;

import JARAMIOT.jaram.resevations.entity.Reservations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationsRepository extends JpaRepository<Reservations, Long> {
    List<Reservations> findByUser_Username(String username);
}

package JARAMIOT.jaram.resevations.repository;

import JARAMIOT.jaram.resevations.entity.Reservations;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationsRepository extends JpaRepository<Reservations, Long> {
}

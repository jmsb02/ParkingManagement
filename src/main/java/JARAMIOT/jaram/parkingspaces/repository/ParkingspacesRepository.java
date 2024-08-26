package JARAMIOT.jaram.parkingspaces.repository;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingspacesRepository extends JpaRepository<ParkingSpaces, Long> {

    ParkingSpaces findByLocation(String location);
}

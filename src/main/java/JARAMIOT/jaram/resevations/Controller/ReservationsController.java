package JARAMIOT.jaram.resevations.Controller;

import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.entity.Reservations;
import JARAMIOT.jaram.resevations.service.ReservationsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationsController {

    private final ReservationsService reservationsService;

    @PostMapping
    public ResponseEntity<Long> createReservation(@Valid @RequestBody ReservationsDTO reservationsDTO) {
        Long reservationId = reservationsService.createReservation(reservationsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(reservationId);
    }

    @GetMapping("/{reservationId}")
    public ResponseEntity<ReservationsDTO> getReservationById(@PathVariable Long reservationId) {
        ReservationsDTO reservationsDTO = reservationsService.getReservationById(reservationId);
        return ResponseEntity.ok(reservationsDTO);
    }

    @GetMapping
    public ResponseEntity<List<ReservationsDTO>> getAllReservations() {
        List<ReservationsDTO> allReservations = reservationsService.getAllReservations();
        return ResponseEntity.ok(allReservations);
    }

    @PatchMapping("/{reservationId}")
    public ResponseEntity<ReservationsDTO> updateReservation(@PathVariable Long reservationId,
                                                             @Valid @RequestBody ReservationsDTO updateReservationsDTO) {
        ReservationsDTO reservationsDTO = reservationsService.updateReservation(reservationId, updateReservationsDTO);
        return ResponseEntity.ok(reservationsDTO);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long reservationId) {
        reservationsService.deleteReservation(reservationId);
        return ResponseEntity.noContent().build();
    }

}
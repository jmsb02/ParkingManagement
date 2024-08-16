package JARAMIOT.jaram.resevations.service;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesNotFoundException;
import JARAMIOT.jaram.parkingspaces.repository.ParkingspacesRepository;
import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.entity.Reservations;
import JARAMIOT.jaram.resevations.exception.ReservationsNotFoundException;
import JARAMIOT.jaram.resevations.repository.ReservationsRepository;
import JARAMIOT.jaram.user.entity.User;
import JARAMIOT.jaram.user.exception.UserNotFoundException;
import JARAMIOT.jaram.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class ReservationsServiceImpl implements ReservationsService {

    private final ReservationsRepository reservationsRepository;
    private final UserRepository userRepository;
    private final ParkingspacesRepository parkingspacesRepository;

    @Override
    public Long createReservation(ReservationsDTO reservationsDTO) {
        User findUser = findUserById(reservationsDTO);
        ParkingSpaces findParkingSpaces = findParkingSpaceById(reservationsDTO);

        Reservations reservations = new Reservations(findUser, findParkingSpaces);
        Reservations savedReservations = reservationsRepository.save(reservations);
        return savedReservations.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public Reservations getReservationById(Long reservationId) {
        return findReservationById(reservationId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reservations> getAllReservations() {
        return reservationsRepository.findAll();
    }

    @Override
    public Reservations updateReservation(Long reservationId, ReservationsDTO reservationsDTO) {
        Reservations findReservations = getReservationById(reservationId);

        User user = findUserById(reservationsDTO);
        ParkingSpaces parkingSpaces = findParkingSpaceById(reservationsDTO);

        Reservations updateReservations = new Reservations(findReservations.getId(), user, parkingSpaces);
        return reservationsRepository.save(updateReservations);

    }

    @Override
    public void deleteReservation(Long reservationId) {
        Reservations reservation = getReservationById(reservationId);
        reservationsRepository.delete(reservation);
    }

    private Reservations findReservationById(Long reservationId) {
        return reservationsRepository.findById(reservationId).orElseThrow(ReservationsNotFoundException::new);
    }

    private ParkingSpaces findParkingSpaceById(ReservationsDTO reservationsDTO) {
        ParkingSpaces findParkingSpaces = parkingspacesRepository.findById(reservationsDTO.getParkingSpaceId()).orElseThrow(ParkingSpacesNotFoundException::new);
        return findParkingSpaces;
    }

    private User findUserById(ReservationsDTO reservationsDTO) {
        return userRepository.findById(reservationsDTO.getUserId()).orElseThrow(UserNotFoundException::new);
    }

}

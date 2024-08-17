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
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationsServiceImpl implements ReservationsService {

    private final ReservationsRepository reservationsRepository;
    private final UserRepository userRepository;
    private final ParkingspacesRepository parkingspacesRepository;

    @Override
    @Transactional
    public Long createReservation(ReservationsDTO reservationsDTO) {
        Reservations reservations = convertToReservationEntity(reservationsDTO);

        Reservations savedReservations = reservationsRepository.save(reservations);
        return savedReservations.getId();
    }

    @Override
    public ReservationsDTO getReservationById(Long reservationId) {
        Reservations reservation = findReservationById(reservationId);
        return new ReservationsDTO(reservation.getUser().getId(), reservation.getParkingSpaces().getId());
    }

    @Override
    public List<ReservationsDTO> getAllReservations() {
        return reservationsRepository.findAll()
                .stream()
                .map(reservation -> new ReservationsDTO(reservation.getUser().getId(), reservation.getParkingSpaces().getId()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReservationsDTO updateReservation(Long reservationId, ReservationsDTO reservationsDTO) {
        Reservations savedReservation = updateAndSaveReservation(reservationId, reservationsDTO);
        return new ReservationsDTO(savedReservation.getUser().getId(), savedReservation.getParkingSpaces().getId());
    }

    @Override
    @Transactional
    public void deleteReservation(Long reservationId) {
        Reservations reservation = findReservationById(reservationId);
        reservationsRepository.delete(reservation);
    }

    private Reservations updateAndSaveReservation(Long reservationId, ReservationsDTO reservationsDTO) {
        Reservations findReservations = findReservationById(reservationId);
        Reservations updateReservations = createUpdatedReservation(reservationsDTO, findReservations);
        Reservations savedReservation = reservationsRepository.save(updateReservations);
        return savedReservation;
    }

    private Reservations findReservationById(Long reservationId) {
        return reservationsRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationsNotFoundException("예약이 존재하지 않습니다. 예약 아이디 : " + reservationId));
    }

    private ParkingSpaces findParkingSpaceById(Long parkingSpaceId) {
        return parkingspacesRepository.findById(parkingSpaceId)
                .orElseThrow(() -> new ParkingSpacesNotFoundException("주차 공간이 존재하지 않습니다. 주차 아이디 : " + parkingSpaceId));
    }


    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("유저가 존재하지 않습니다. 유저 아이디 : " + userId));
    }

    private Reservations convertToReservationEntity(ReservationsDTO reservationsDTO) {
        User findUser = findUserById(reservationsDTO.getUserId());
        ParkingSpaces findParkingSpaces = findParkingSpaceById(reservationsDTO.getParkingSpaceId());
        return new Reservations(findUser, findParkingSpaces);
    }

    private Reservations createUpdatedReservation(ReservationsDTO reservationsDTO, Reservations findReservations) {
        User user = findUserById(reservationsDTO.getUserId());
        ParkingSpaces parkingSpaces = findParkingSpaceById(reservationsDTO.getParkingSpaceId());
        Reservations updateReservations = new Reservations(findReservations.getId(), user, parkingSpaces);
        return updateReservations;
    }

}

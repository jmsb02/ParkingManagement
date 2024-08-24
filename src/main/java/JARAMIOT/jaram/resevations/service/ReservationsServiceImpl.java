package JARAMIOT.jaram.resevations.service;

import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.entity.Reservations;
import JARAMIOT.jaram.resevations.exception.ReservationsNotFoundException;
import JARAMIOT.jaram.resevations.repository.ReservationsRepository;
import JARAMIOT.jaram.user.entity.User;
import JARAMIOT.jaram.user.exception.UserNotFoundException;
import JARAMIOT.jaram.user.repository.UserRepository;
import JARAMIOT.jaram.utils.DtoConverter;
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

    @Override
    @Transactional
    public Long createReservation(ReservationsDTO reservationsDTO) {
        Reservations reservations = convertToReservationEntity(reservationsDTO);
        Reservations savedReservations = reservationsRepository.save(reservations);
        return savedReservations.getId();
    }

    @Override
    public ReservationsDTO getReservationById(Long reservationId) {
        if (reservationId == null) {
            throw new IllegalArgumentException("예약 ID는 null일 수 없습니다.");
        }

        Reservations reservation = findReservationById(reservationId);
        return DtoConverter.convertToReservationsDTO(reservation);
    }

    @Override
    public List<ReservationsDTO> getAllReservations() {
        return reservationsRepository.findAll()
                .stream()
                .map(DtoConverter::convertToReservationsDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReservationsDTO updateReservation(Long reservationId, ReservationsDTO reservationsDTO) {
        Reservations updatedReservation = updateAndSaveReservation(reservationId, reservationsDTO);
        return DtoConverter.convertToReservationsDTO(updatedReservation);
    }

    @Override
    @Transactional
    public void deleteReservation(Long reservationId) {
        Reservations reservation = findReservationById(reservationId);
        reservationsRepository.delete(reservation);
    }

    @Transactional
    public Reservations updateAndSaveReservation(Long reservationId, ReservationsDTO reservationsDTO) {
        Reservations findReservations = findReservationById(reservationId);
        Reservations updateReservations = createUpdatedReservation(reservationsDTO, findReservations);
        return reservationsRepository.save(updateReservations);
    }

    private Reservations findReservationById(Long reservationId) {
        return reservationsRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationsNotFoundException("예약이 존재하지 않습니다. 예약 아이디 : " + reservationId));
    }

    private Reservations convertToReservationEntity(ReservationsDTO reservationsDTO) {
        User findUser = findUserByUsername(reservationsDTO.getUsername());
        return new Reservations(findUser, reservationsDTO.getDate(), reservationsDTO.getStartTime(), reservationsDTO.getEndTime(),
                reservationsDTO.getLocation());
    }

    private Reservations createUpdatedReservation(ReservationsDTO reservationsDTO, Reservations reservations) {
        User user = findUserByUsername(reservationsDTO.getUsername());
        return reservations.toBuilder()
                .user(user)
                .date(reservationsDTO.getDate())
                .startTime(reservationsDTO.getStartTime())
                .endTime(reservationsDTO.getEndTime())
                .location(reservationsDTO.getLocation())
                .build();
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("유저가 존재하지 않습니다. 사용자 이름 : " + username));
    }
}

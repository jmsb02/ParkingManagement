package JARAMIOT.jaram.resevations.service;

import JARAMIOT.jaram.resevations.dto.ReservationsDTO;
import JARAMIOT.jaram.resevations.dto.ReservationsUpdateDTO;
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
    public ReservationsUpdateDTO updateReservation(Long reservationId, ReservationsUpdateDTO updateDTO) {
        // 예약 조회
        Reservations findReservations = findReservationById(reservationId);

        // 업데이트된 예약 객체 생성
        Reservations updateReservations = createUpdatedReservation(updateDTO, findReservations);

        // 예약 저장
        Reservations updatedReservation = reservationsRepository.save(updateReservations);

        // DTO로 변환하여 반환
        return DtoConverter.convertToReservationsUpdateDTO(updatedReservation);
    }


    @Override
    @Transactional
    public void deleteReservation(Long reservationId) {
        Reservations reservation = findReservationById(reservationId);
        reservationsRepository.delete(reservation);
    }

    private Reservations findReservationById(Long reservationId) {
        return reservationsRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationsNotFoundException("예약이 존재하지 않습니다. 예약 아이디 : " + reservationId));
    }

    private User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("유저가 존재하지 않습니다. 사용자 이름 : " + username));
    }

    private Reservations convertToReservationEntity(ReservationsDTO reservationsDTO) {
        User findUser = findUserByUsername(reservationsDTO.getUsername());
        return Reservations.builder()
                .user(findUser)
                .date(reservationsDTO.getDate())
                .startTime(reservationsDTO.getStartTime())
                .endTime(reservationsDTO.getEndTime())
                .location(reservationsDTO.getLocation()).build();
    }

    private Reservations createUpdatedReservation(ReservationsUpdateDTO updateDTO, Reservations reservations) {
        Reservations.ReservationsBuilder builder = Reservations.builder()
                .id(reservations.getId());

        // 날짜 업데이트
        if (updateDTO.getDate() != null) {
            builder.date(updateDTO.getDate());
        }

        // 시작 시간 업데이트
        if (updateDTO.getStartTime() != null) {
            builder.startTime(updateDTO.getStartTime());
        }

        // 종료 시간 업데이트
        if (updateDTO.getEndTime() != null) {
            builder.endTime(updateDTO.getEndTime());
        }

        // 위치 업데이트
        if (updateDTO.getLocation() != null && !updateDTO.getLocation().isEmpty()) {
            builder.location(updateDTO.getLocation());
        }

        return builder.build();
    }
}

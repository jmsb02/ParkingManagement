package JARAMIOT.jaram.parkingspaces.service;

import JARAMIOT.jaram.parkingspaces.dto.ParkingSpacesUpdateDTO;
import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesErrorMessage;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesExistException;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesNotFoundException;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesValidationException;
import JARAMIOT.jaram.parkingspaces.repository.ParkingspacesRepository;
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
@Transactional
public class ParkingSpacesServiceImpl implements ParkingSpacesService {

    private final ParkingspacesRepository parkingspacesRepository;
    private final UserRepository userRepository;
    private final ReservationsRepository reservationsRepository;

    @Override
    public Long saveParkingSpace(ParkingspacesDTO parkingspacesDto) {

        //DTO 검증
        validateParkingSpacesDTO(parkingspacesDto);
        //username -> 예약 정보 조회
        List<Reservations> reservationsList = reservationsRepository.findByUser_Username(parkingspacesDto.getUsername());
        if(reservationsList.isEmpty()) {
            throw new ReservationsNotFoundException("예약한 회원이 없습니다");
        }
        //주차 공간 조회
        ParkingSpaces parkingSpaces = parkingspacesRepository.findByLocation(parkingspacesDto.getLocation());
        if (parkingSpaces == null) {
            throw new ParkingSpacesNotFoundException("해당 주차 공간이 존재하지 않습니다.");
        }

        //주차 공간 상태 확인
        if(parkingSpaces.getStatus() != ParkingSpacesStatus.AVAILABLE) {
            throw new ParkingSpacesExistException("주차 공간이 사용 중입니다.");
        }

        ParkingSpaces savedParkingSpaces = parkingspacesRepository.save(parkingSpaces);
        return savedParkingSpaces.getId();
    }

    //단일 주차 조회
    @Override
    @Transactional(readOnly = true)
    public ParkingspacesDTO getParkingSpaceById(Long parkingId) {
        ParkingSpaces parkingSpaces = parkingspacesRepository.findById(parkingId)
                .orElseThrow(() -> new ParkingSpacesNotFoundException(ParkingSpacesErrorMessage.PARKING_SPACE_NOT_FOUND.getMessage()));
        return new ParkingspacesDTO(parkingSpaces.getUser().getUsername(), parkingSpaces.getLocation());
    }

    //여러개 주차 조회
    @Override
    @Transactional(readOnly = true)
    public List<ParkingspacesDTO> getAllParkingSpaces() {
        return parkingspacesRepository.findAll()
                .stream()
                .map(parkingSpace -> new ParkingspacesDTO(parkingSpace.getUser().getUsername(), parkingSpace.getLocation())) // DTO 변환 로직 추가
                .collect(Collectors.toList());
    }

    //위치로 주차 공간 조회
    @Override
    @Transactional(readOnly = true)
    public ParkingspacesDTO getParkingSpacesByLocation(String location) {
        ParkingSpaces parkingSpaces = parkingspacesRepository.findByLocation(location);

        if (parkingSpaces == null) {
            throw new ParkingSpacesNotFoundException("해당 주차 공간이 존재하지 않습니다.");
        }
        return new ParkingspacesDTO(parkingSpaces.getUser().getUsername(), parkingSpaces.getLocation());
    }

    //주차 공간 업데이트
    @Override
    public ParkingSpacesUpdateDTO updateParkingSpace(Long parkingId, ParkingSpacesUpdateDTO updatedParkingSpaceDTO) {
        validateParkingSpacesUpdateDTO(updatedParkingSpaceDTO);

        ParkingSpaces findParkingSpaces = parkingspacesRepository.findById(parkingId)
                .orElseThrow(() -> new ParkingSpacesNotFoundException(ParkingSpacesErrorMessage.PARKING_SPACE_NOT_FOUND.getMessage()));

        ParkingSpaces updatedParkingSpace = createUpdatedParkingSpace(updatedParkingSpaceDTO, findParkingSpaces);

        return new ParkingSpacesUpdateDTO(updatedParkingSpace.getUser().getUsername(),updatedParkingSpace.getLocation());
    }

    //주차 상태 변경
    @Override
    public ParkingSpaces changeParkingSpaceStatus(Long parkingId, ParkingSpacesStatus status) {
        ParkingSpaces findParkingSpaces = parkingspacesRepository.findById(parkingId)
                .orElseThrow(() -> new ParkingSpacesNotFoundException(ParkingSpacesErrorMessage.PARKING_SPACE_NOT_FOUND.getMessage()));

        findParkingSpaces.setStatus(status);

        return parkingspacesRepository.save(findParkingSpaces);
    }

    //주차 상태 삭제
    @Override
    public void deleteParkingSpace(Long parkingId) {
        ParkingSpaces findParkingSpaces = parkingspacesRepository.findById(parkingId)
                .orElseThrow(() -> new ParkingSpacesNotFoundException(ParkingSpacesErrorMessage.PARKING_SPACE_NOT_FOUND.getMessage()));
        parkingspacesRepository.delete(findParkingSpaces);
    }

    @Override
    public ParkingspacesDTO convertToDTO(ParkingSpaces parkingSpaces) {
        return new ParkingspacesDTO(
                parkingSpaces.getUser().getUsername(),
                parkingSpaces.getLocation()
        );
    }

    //회원은 그대로 위치만 변경
    private ParkingSpaces createUpdatedParkingSpace(ParkingSpacesUpdateDTO updateDTO, ParkingSpaces parkingSpaces) {
        ParkingSpaces.ParkingSpacesBuilder builder = ParkingSpaces.builder()
                .id(parkingSpaces.getId())
                .location(parkingSpaces.getLocation())
                .status(parkingSpaces.getStatus())
                .user(parkingSpaces.getUser()); // 기존 사용자 유지

        // 회원 이름 검증
        if (updateDTO.getUsername() != null) {
            // user 객체가 null이 아닐 경우에만 업데이트
            User findUser = userRepository.findByUsername(updateDTO.getUsername())
                    .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다"));
            builder.user(findUser);
        }

        // 위치 업데이트
        if (updateDTO.getLocation() != null && !updateDTO.getLocation().isEmpty()) {
            builder.location(updateDTO.getLocation());
        }

        return builder.build();
    }

    private void validateParkingSpacesDTO(ParkingspacesDTO parkingspacesDTO) {

        if(parkingspacesDTO.getUsername() == null) {
            throw new UserNotFoundException("회원이 존재하지 않습니다");
        }

        if (parkingspacesDTO.getLocation() == null || parkingspacesDTO.getLocation().isEmpty()) {
            throw new ParkingSpacesValidationException(ParkingSpacesErrorMessage.LOCATION_NULL.getMessage());
        }
    }

    private void validateParkingSpacesUpdateDTO(ParkingSpacesUpdateDTO updateDTO) {

        if(updateDTO.getUsername() == null) {
            throw new UserNotFoundException("회원이 존재하지 않습니다");
        }

        if (updateDTO.getLocation() == null || updateDTO.getLocation().isEmpty()) {
            throw new ParkingSpacesValidationException(ParkingSpacesErrorMessage.LOCATION_NULL.getMessage());
        }
    }

}

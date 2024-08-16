package JARAMIOT.jaram.parkingspaces.service;

import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesErrorMessage;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesNotFoundException;
import JARAMIOT.jaram.parkingspaces.exception.ParkingSpacesValidationException;
import JARAMIOT.jaram.parkingspaces.repository.ParkingspacesRepository;
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
public class ParkingSpacesServiceImpl implements ParkingSpacesService {

    private final ParkingspacesRepository parkingspacesRepository;
    private final UserRepository userRepository;

    @Override
    public Long saveParkingSpace(ParkingspacesDTO parkingspacesDto) {
        validateParkingSpacesDTO(parkingspacesDto);
        ParkingSpaces parkingSpaces = createParkingSpaceDTO(parkingspacesDto);

        ParkingSpaces saveParkingSpaces = parkingspacesRepository.save(parkingSpaces);
        return saveParkingSpaces.getId();

    }

    @Override
    public List<ParkingSpaces> getAllParkingSpaces() {
        return parkingspacesRepository.findAll();
    }

    @Override
    public ParkingSpaces getParkingSpaceById(Long parkingId) {
        return parkingspacesRepository.findById(parkingId)
                .orElseThrow(() -> new ParkingSpacesNotFoundException(ParkingSpacesErrorMessage.PARKING_SPACE_NOT_FOUND.getMessage()));
    }

    @Override
    public List<ParkingspacesDTO> getParkingSpacesByLocation(String location) {
        List<ParkingSpaces> parkingSpacesList = parkingspacesRepository.findByLocation(location);
        return parkingSpacesList.stream()
                .map(spaces -> new ParkingspacesDTO(spaces.getUser().getId(), spaces.getLocation(), ParkingSpacesStatus.valueOf(spaces.getStatus())))
                .toList();
    }

    @Override
    public ParkingSpaces updateParkingSpace(Long parkingId, ParkingspacesDTO updatedParkingSpaceDTO) {
        validateParkingSpacesDTO(updatedParkingSpaceDTO);
        ParkingSpaces findParkingSpaces = getParkingSpaceById(parkingId);
        findParkingSpaces.setLocation(updatedParkingSpaceDTO.getLocation());
        findParkingSpaces.setStatus(updatedParkingSpaceDTO.getStatus().name());
        return parkingspacesRepository.save(findParkingSpaces);
    }

    @Override
    public ParkingSpaces changeParkingSpaceStatus(Long parkingId, ParkingSpacesStatus status) {
        ParkingSpaces findParkingSpaces = getParkingSpaceById(parkingId);
        findParkingSpaces.setStatus(status.name());
        return parkingspacesRepository.save(findParkingSpaces);
    }

    @Override
    public void deleteParkingSpace(Long parkingId) {
        ParkingSpaces findParkingSpaces = getParkingSpaceById(parkingId);
        parkingspacesRepository.delete(findParkingSpaces);

    }

    private ParkingSpaces createParkingSpaceDTO(ParkingspacesDTO parkingspacesDto) {
        User user = userRepository.findById(parkingspacesDto.getUserId()).orElseThrow(UserNotFoundException::new);
        return ParkingSpaces.builder()
                .user(user)
                .location(parkingspacesDto.getLocation())
                .status(parkingspacesDto.getStatus().name())
                .build();
    }

    private void validateParkingSpacesDTO(ParkingspacesDTO parkingspacesDTO) {
        if (parkingspacesDTO == null) {
            throw new ParkingSpacesValidationException(ParkingSpacesErrorMessage.DTO_NULL.getMessage());
        }
        if (parkingspacesDTO.getLocation() == null || parkingspacesDTO.getLocation().isEmpty()) {
            throw new ParkingSpacesValidationException(ParkingSpacesErrorMessage.LOCATION_NULL.getMessage());
        }
        if (parkingspacesDTO.getStatus() == null) {
            throw new ParkingSpacesValidationException(ParkingSpacesErrorMessage.STATUS_NULL.getMessage());
        }
    }
}

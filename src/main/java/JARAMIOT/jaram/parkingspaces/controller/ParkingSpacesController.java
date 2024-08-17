package JARAMIOT.jaram.parkingspaces.controller;

import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;
import JARAMIOT.jaram.parkingspaces.service.ParkingSpacesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-spaces")
@RequiredArgsConstructor
public class ParkingSpacesController {

    private final ParkingSpacesService parkingSpacesService;

    //주차
    @PostMapping
    public ResponseEntity<Long> saveParkingSpace(@Valid @RequestBody ParkingspacesDTO parkingspacesDto) {
        Long savedParkingSpaceId = parkingSpacesService.saveParkingSpace(parkingspacesDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedParkingSpaceId);
    }

    //단 건 조회
    @GetMapping("/{parkingId}")
    public ResponseEntity<ParkingspacesDTO> getParkingSpaceById(@PathVariable Long parkingId) {
        ParkingspacesDTO parkingspacesDTO = parkingSpacesService.getParkingSpaceById(parkingId);
        return ResponseEntity.ok(parkingspacesDTO);
    }

    //전체 조회
    @GetMapping
    public ResponseEntity<List<ParkingspacesDTO>> getAllParkingSpaces() {
        List<ParkingspacesDTO> allParkingSpaces = parkingSpacesService.getAllParkingSpaces();
        return ResponseEntity.ok(allParkingSpaces);
    }

    //위치 조회
    @GetMapping("/location/{location}")
    public ResponseEntity<List<ParkingspacesDTO>> getParkingSpacesByLocation(@PathVariable String location) {
        List<ParkingspacesDTO> parkingSpaces = parkingSpacesService.getParkingSpacesByLocation(location);
        return ResponseEntity.ok(parkingSpaces);
    }

    //주차 자리 업데이트
    @PatchMapping("/{parkingId}")
    public ResponseEntity<ParkingspacesDTO> updateParkingSpace(@PathVariable Long parkingId,
                                                            @Valid @RequestBody ParkingspacesDTO updatedParkingSpaceDTO) {
        ParkingspacesDTO parkingspacesDTO = parkingSpacesService.updateParkingSpace(parkingId, updatedParkingSpaceDTO);
        return ResponseEntity.ok(parkingspacesDTO);
    }

    //주차 상태 변경
    @PatchMapping("/{parkingId}/status")
    public ResponseEntity<ParkingspacesDTO> changeParkingSpaceStatus(@PathVariable Long parkingId,@RequestBody ParkingSpacesStatus status) {
        ParkingspacesDTO parkingspacesDTO = parkingSpacesService.changeParkingSpaceStatus(parkingId, status);
        return ResponseEntity.ok(parkingspacesDTO);
    }

    @DeleteMapping("/{parkingId}")
    public ResponseEntity<Void> deleteParkingSpace(@PathVariable Long parkingId) {
        parkingSpacesService.deleteParkingSpace(parkingId);
        return ResponseEntity.noContent().build();
    }


}

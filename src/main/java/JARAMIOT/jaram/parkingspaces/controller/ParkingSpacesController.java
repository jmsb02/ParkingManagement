package JARAMIOT.jaram.parkingspaces.controller;

import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
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
    public ResponseEntity<ParkingSpaces> getParkingSpaceById(@PathVariable Long parkingId) {
        ParkingSpaces findParkingSpaces = parkingSpacesService.getParkingSpaceById(parkingId);
        return ResponseEntity.ok(findParkingSpaces);
    }

    //전체 조회
    @GetMapping
    public ResponseEntity<List<ParkingSpaces>> getAllParkingSpaces() {
        List<ParkingSpaces> allParkingSpaces = parkingSpacesService.getAllParkingSpaces();
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
    public ResponseEntity<ParkingSpaces> updateParkingSpace(@PathVariable Long parkingId,
                                                            @Valid @RequestBody ParkingspacesDTO updatedParkingSpaceDTO) {
        ParkingSpaces parkingSpaces = parkingSpacesService.updateParkingSpace(parkingId, updatedParkingSpaceDTO);
        return ResponseEntity.ok(parkingSpaces);
    }

    //주차 상태 변경
    @PatchMapping("/{parkingId}/status")
    public ResponseEntity<ParkingSpaces> changeParkingSpaceStatus(@PathVariable Long parkingId,@RequestBody ParkingSpacesStatus status) {
        ParkingSpaces parkingSpaces = parkingSpacesService.changeParkingSpaceStatus(parkingId, status);
        return ResponseEntity.ok(parkingSpaces);
    }

    @DeleteMapping("/{parkingId}")
    public ResponseEntity<Void> deleteParkingSpace(@PathVariable Long parkingId) {
        parkingSpacesService.deleteParkingSpace(parkingId);
        return ResponseEntity.noContent().build();
    }


}

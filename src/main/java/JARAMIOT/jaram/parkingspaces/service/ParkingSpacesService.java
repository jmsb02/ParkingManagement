package JARAMIOT.jaram.parkingspaces.service;

import JARAMIOT.jaram.parkingspaces.dto.ParkingspacesDTO;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;

import java.util.List;

public interface ParkingSpacesService {

    //주차 공간 생성
    Long saveParkingSpace(ParkingspacesDTO parkingspacesDto);

    //전체 주차 공간 조회
    List<ParkingspacesDTO> getAllParkingSpaces();

    //특정 주차 공간 조회
    ParkingspacesDTO getParkingSpaceById(Long id);


    //특정 위치의 주차 공간 조회
    List<ParkingspacesDTO> getParkingSpacesByLocation(String location);

    //주차 공간 업데이트
    ParkingspacesDTO updateParkingSpace(Long id, ParkingspacesDTO updatedParkingSpaceDTO);


    //주차 공간 상태 변경
    ParkingspacesDTO changeParkingSpaceStatus(Long id, ParkingSpacesStatus status);

    //주차 공간 삭제
    void deleteParkingSpace(Long id);


}

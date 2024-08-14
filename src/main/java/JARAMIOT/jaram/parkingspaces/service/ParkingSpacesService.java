package JARAMIOT.jaram.parkingspaces.service;

import JARAMIOT.jaram.parkingspaces.entity.ParkingSpaces;
import JARAMIOT.jaram.parkingspaces.entity.ParkingSpacesStatus;

import java.util.List;

public interface ParkingSpacesService {

    //주차 공간 생성
    ParkingSpaces createParkingSpace(ParkingSpaces parkingSpaces);

    //전체 주차 공간 조회
    List<ParkingSpaces> getAllParkingSpaces();

    //특정 주차 공간 조회
    ParkingSpaces getParkingSpaceById(Long id);


    //특정 위치의 주차 공간 조회
    List<ParkingSpaces> getParkingSpacesByLocation(String location);

    //주차 공간 업데이트
    ParkingSpaces updateParkingSpace(Long id, ParkingSpaces updatedParkingSpace);


    //주차 공간 상태 변경
    ParkingSpaces changeParkingSpaceStatus(Long id, ParkingSpacesStatus status);

    //주차 공간 삭제
    void deleteParkingSpace(Long id);


}

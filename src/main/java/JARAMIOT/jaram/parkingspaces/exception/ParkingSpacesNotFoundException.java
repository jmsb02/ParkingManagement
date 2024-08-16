package JARAMIOT.jaram.parkingspaces.exception;

public class ParkingSpacesNotFoundException extends RuntimeException{

    private static final String PARKING_SPACE_NOT_FOUND_MESSAGE = "주차 자리가 존재하지 않습니다.";

    public ParkingSpacesNotFoundException() {
        super(PARKING_SPACE_NOT_FOUND_MESSAGE);
    }

    public ParkingSpacesNotFoundException(String message) {
        super(message);
    }
}

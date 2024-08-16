package JARAMIOT.jaram.parkingspaces.exception;

public enum ParkingSpacesErrorMessage {
    DTO_NULL("주차 공간 DTO가 null입니다."),
    LOCATION_NULL("주차 공간의 위치가 제공되지 않았습니다."),
    STATUS_NULL("주차 공간의 상태가 제공되지 않았습니다."),
    PARKING_SPACE_NOT_FOUND("주차 자리가 존재하지 않습니다.");

    private final String message;

    ParkingSpacesErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

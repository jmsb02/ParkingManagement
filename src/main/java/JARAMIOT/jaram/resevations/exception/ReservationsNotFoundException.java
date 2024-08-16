package JARAMIOT.jaram.resevations.exception;

public class ReservationsNotFoundException extends RuntimeException
{
    public ReservationsNotFoundException() {
    }

    public ReservationsNotFoundException(String message) {
        super(message);
    }
}

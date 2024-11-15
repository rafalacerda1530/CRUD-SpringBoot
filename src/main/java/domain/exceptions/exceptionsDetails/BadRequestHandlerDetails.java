package domain.exceptions.exceptionsDetails;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class BadRequestHandlerDetails {

    private String title;
    private int status;
    private String details;
    private String developerMessage;
    private LocalDateTime timeStamp;

}

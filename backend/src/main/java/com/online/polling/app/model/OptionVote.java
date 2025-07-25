package com.online.polling.app.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

//In Spring Boot (JPA/Hibernate), @Embeddable marks a value object whose fields are stored in the parent entity’s table (no separate table, no own ID).
@Embeddable
@Data
@NoArgsConstructor
public class OptionVote {
    private String voteOption;
    private Long voteCount = 0L;
}

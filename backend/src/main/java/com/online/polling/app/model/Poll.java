package com.online.polling.app.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Poll {
    @Id
    // AUTO_INCREMENT = MySQL setting on the column.
    //“MySQL, please give the next number automatically when I insert a row.”
    //@GeneratedValue(strategy = IDENTITY) = JPA/Hibernate instruction.
    //“Hibernate, don’t try to make the id yourself—let the database do it (use that AUTO_INCREMENT thing).
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;

    // Here the element collection will create a separate table to hold id of the poll and options automatically.So no separate entity or id is needed to manage options.
    // creates poll_options
    @ElementCollection
    private List<OptionVote> options = new ArrayList<>();

//    //the below one creates poll_votes
//    @ElementCollection
//    private List<Long> votes = new ArrayList<>();

}

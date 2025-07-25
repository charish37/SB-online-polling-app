package com.online.polling.app.services;

import com.online.polling.app.model.OptionVote;
import com.online.polling.app.model.Poll;
import com.online.polling.app.repositories.PollRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository){
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll){
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls(){
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex){
        // Get poll from db
        //Get all options
        // if index for vote is not valid, throw error


        Poll poll = pollRepository.findById(pollId).orElseThrow(() -> new RuntimeException("Poll not found"));
        List<OptionVote> options = poll.getOptions();
        if(optionIndex < 0 || optionIndex >= options.size()){
            throw new IllegalArgumentException("Invalid option index");
        }

        // get selected option using list.get()
        OptionVote selectedOption = options.get(optionIndex);

        // increment vote for selected option
         selectedOption.setVoteCount(selectedOption.getVoteCount() + 1);

        // save incremented vote option into db
        pollRepository.save(poll);
    }
}

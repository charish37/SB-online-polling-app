import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {
  newPoll: Poll = {
    id: 0,
    question: ' ',
    options: [
      {voteOption: '', voteCount: 0},
      {voteOption: '', voteCount: 0},
    ]
  }
  polls: Poll[] = [];

 constructor(private pollService: PollService){}

 ngOnInit(): void {
     this.loadPolls(); //loads the data on comp initialised
 }

 //subscribe in the poll component file is a method used to handle RxJS observables - which are used for asynchronous operations in angular.
//  subscribe is a method allows to listen to data streams from HTTP requests.
// Handles the response when it successfully arrives using next
//  Manage errors if something goes wrong using error.

 loadPolls() { //to fetch all polls from backend
   this.pollService.getPolls().subscribe({
      next: (data) => {
        console.log("polls received", data);
        this.polls = data;
      },
      error: (error) => {
        console.error("Error fetching polls: ", error);
      }
   });
 }

 addOption(){
  this.newPoll.options.push({voteOption: '', voteCount: 0});
 }

 createPoll(){
  this.pollService.createPoll(this.newPoll).subscribe({
    next: (createdPoll) => {
      this.polls.push(createdPoll);
    },
    error: (error) => {
      console.error("Error creating poll");
    }
  })
 }

 resetPoll(){
   this.newPoll = {
    id: 0,
    question: ' ',
    options: [
      {voteOption: '', voteCount: 0},
      {voteOption: '', voteCount: 0},
    ]
  }
 }

 vote(pollId: number, optionIndex: number){
   this.pollService.vote(pollId, optionIndex).subscribe({
    next:() => {
      const poll = this.polls.find(p => p.id == pollId);
      if(poll){
        poll.options[optionIndex].voteCount++;
      }
    },
    error: (error) => {console.error("error voting on a poll")}
   });
 }

//  Angular uses the trackBy function to determine which items in a list have changed, deleted, been added or removed when the list is updated.
 trackByIndex(index: number): number {
  return index;
 }


// 1.  Without tracking angular tracks by object reference.
// <div *ngFor="let option of newPoll.options">
//  In the above angular compare object by reference. So, if the array changes, angular recreates all DOM elements.
// This cause performance issue -- expensive for larger lists.

// 2. With trackBy: trackByIndex
//  <div *ngFor="let option of newPoll.options; let i = index; trackBy: trackByIndex ">
// Angular uses index to track items
// Only DOM elements at changed positions are updated
// Performance is better

// trackByIndex(index: number, item: any): number{
//   return item.id || indexedDB;
// }

// Before: ['Option 1', 'Option 2', 'Option 3']
// After:  ['Option 1', 'Option 3']

// With trackByIndex:
// - Index 0 (Option 1): No change - DOM element reused
// - Index 1 (Option 3): Content changed - DOM element updated
// - Index 2: Removed - DOM element destroyed
}

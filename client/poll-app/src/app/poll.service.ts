import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poll } from './poll.models';

//injectable - an angular decorator make this class available for dependency injection
// HttpClient - Angular's HTTP client for making API requests
// Observable -- RxJS type for handling asynchronous data streams
// Poll - Custom model/interface defining the structure of a poll object
@Injectable({ // this decorator marks this as a service
  providedIn: 'root' // this makes it a singleton service available through out the app
})
export class PollService {
  private baseUrl = 'http://localhost:8080/api/polls'; // baseurl for api endpoint

  constructor(private http: HttpClient) { } // injects HttpClient as a private dependency for making http requests

  createPoll(poll: Poll): Observable<Poll> { // create a poll by taking poll as parameter and returns an Observable<poll> which is an async response.
    return this.http.post<Poll>(this.baseUrl, poll); // makes a POST request to the backend API with the poll data
  }

  getPolls(): Observable<Poll[]> { // getting array of polls
    return this.http.get<Poll[]>(this.baseUrl);
  }
}

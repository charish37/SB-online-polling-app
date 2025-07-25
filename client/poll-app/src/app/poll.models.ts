export interface OptionVote{
  voteOption: string,
  voteCount: number
}

export interface Poll {
  id: number;
  question: String;
  options: OptionVote[];
}

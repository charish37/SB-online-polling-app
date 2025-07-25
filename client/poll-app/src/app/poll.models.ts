export interface OptionVote{
  optionText: string,
  votes: number
}

export interface Poll {
  id: number;
  question: String;
  options: OptionVote[];
}

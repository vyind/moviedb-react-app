export interface CreditDetails {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: boolean | undefined;
  id: number;
  name: string;
  order: number;
  profile_path: string | undefined;
}

export interface Crew {
  credit_id: number;
  department: string;
  gender: boolean | undefined;
  id: number;
  job: string;
  name: string;
  profile_path: string | undefined;
}

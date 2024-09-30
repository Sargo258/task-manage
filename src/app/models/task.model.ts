export interface Task {
    id?: number;
    nameTask: string;
    limitDate: string;
    completed: boolean;
    people: Person[];
  }

  export interface Person {
    namePerson: string;
    age: number;
    habilities: string[];
  }
export default class User {
    id: number;
    name: string;
    email: string;
    token: string;
    updateState: number;
    programAccepted: boolean;
    cohort: string;
    notes: string;
    ecosystemMember: boolean;
    moved: boolean;
    courseRun: number;

    constructor(
        id: number,
        name: string,
        email: string,
        token: string,
        updateState: number,
        programAccepted: boolean,
        cohort: string,
        notes: string,
        ecosystemMember: boolean,
        moved: boolean,
        courseRun: number
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.token = token;
        this.updateState = updateState;
        this.programAccepted = programAccepted;
        this.cohort = cohort;
        this.notes = notes;
        this.ecosystemMember = ecosystemMember;
        this.courseRun = courseRun;
        this.moved = moved;
    }
}

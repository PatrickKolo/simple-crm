export class Note {
    title: string;
    description: string;
    date: number;
    notesId: string;
   


    constructor(obj?: any){
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.date = obj ? obj.date : '';
        this.notesId = obj ? obj.note : '';
    }


    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            date: this.date,
            notesId: this.notesId  
        };
    }
}


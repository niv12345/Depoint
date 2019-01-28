export interface Validator {
    name: string;
    validator: any;
    message: string;
  }
  export class QuestionBase<T> {
      value: T;    
      id: string;
      qntname: string;
      question: string;
      qntlabel:string;
      qtype: string;
      multichoice: number;
      aws:{};
      resultdata: any[];
      options: any[];
      files:FileList;
      validations?: Validator[];
      constructor(options: {
          value?: T,
          id?: string,
          qntname?: string,   
          question?: string,    
          qntlabel?: string, 
          qtype?: string,
          multichoice?: number;
          aws?:{}
          resultdata?: any[];
          options?:any[];
          files?:FileList;
          validations?: Validator[];
        } = {}) {
        this.value = options.value;
        this.id = options.id || '';
        this.qntname = options.qntname || ''; 
        this.question = options.question || '';    
        this.qntlabel = options.qntlabel || '';   
        this.qtype = options.qtype || '';
        this.multichoice = options.multichoice || 0;
        this.aws = options.aws || '';
        this.resultdata = options.resultdata || [];
        this.options = options.options || [];
        this.files = options.files || null;
        this.validations = options.validations;
      }
    }
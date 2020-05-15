import { Component } from '@angular/core';
import {Quizmodel} from './quiz/quizmodel';

import { Answermodel } from './quiz/quizmodel';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
status:boolean=false;
resultstatus:boolean=false;
myarray: String[] = [];
i: number = 0;
languages: String[] = ["work and wages", "Time and Distance"];
 newstr: String
  
  quizlist: Quizmodel[] = [
    {
      ID: 1, language: "work and wages", question: "Two friends A and B were employed to do a work. Initial deadline was fixed at 24 days. Both started working together but after 20 days, A left the work and the whole work took 30 days to complete. In how much time can B alone can do the work?", anslistobj: ["40", "50", "60", "70"], answer: "60"
    },
    {
      ID: 2, language: "work and wages", question: "A and B took a job to be completed in 20 days. They started working together and after 12 days, C joined them and the whole job finished in 15 days. How much time would C require to complete the job if only C was hired?", anslistobj: ["15", "12", "10", "8"], answer: "12"
    },
    {
      ID: 3, language: "work and wages", question: "Three people A, B and C working individually can finish a job in 10, 12 and 20 days respectively. They decided to work together but after 2 days, A left the work and after another one day, B also left work. If they got two lacs collectively for the entire work, find the difference of the highest and lowest share?", anslistobj: ["70000", "60000", "10000", "20000"], answer: "70000"
    },
    {
      ID: 4, language: "work and wages", question: "A alone and B alone can do a work in respectively 18 and 8 days more than both working together. Find the number of days required if both work together?", anslistobj: ["12", "8", "16", "36"], answer: "12"
    } ,
    {
      ID: 5, language: "Time and Distance", question: "Samuel covers the distance from his home to his office at a speed of 25 km/hr and comes back at a speed of 4 km/hr. He completes the whole journey within 5 hours 48 minutes. Find out the distance from his home to office?", anslistobj: ["20", "18", "15", "25"], answer: "20"
    },
    {
      ID: 6, language: "Time and Distance", question: "If John walks at the speed of 5 km/h, he reaches his office 7 minutes late. However, if he walks at the speed of 6 km/h, he reaches his office 5 minutes early. How far is his office from his home?", anslistobj: ["9", "8", "10", "6"], answer: "6"
    },
    {
      ID: 7, language: "Time and Distance", question: "Paul has to travel 24 km. After walking for 1 hour 40 minutes he sees that he has covered 5/7 of the distance left to cover. Find out Paul’s speed in meters per second?", anslistobj: ["5/3 m/s", "7/5 m/s", "2/3 m/s", "8/5 m/s"], answer: "5/3 m/s"
    },
    {
      ID: 8, language: "Time and Distance", question: "The ratio of the speed of two trains is 7:8. If the second train covers 400 km in 4 h, find out the speed of the first train?", anslistobj: ["69.4 km/h", "78.6 km/h", "87.5 km/h", "40.5 km/h"], answer: "87.5 km/h"
    }
  ];

  /******************************************************* */
quizlength: number;
selectedlanguage: Quizmodel[] = [];
question: String;
selectedvalue: String;
option: any[];
selectedlanques: any[];
gettinglanguage() {
this.selectedlanques =  this.quizlist.filter(d => (d.language == this.selectedvalue));
console.log(this.selectedlanques);
this.question = this.selectedlanques[0].question;
this.option = this.selectedlanques[0].anslistobj;
this.i = 0;
this.quizlength = this.selectedlanques.length;
this.status=true;
  }

  /******************************************************** */
  next() {   
    ++this.i;
    this.question = this.selectedlanques[this.i].question;
    this.option = this.selectedlanques[this.i].anslistobj;
  }
  previous() {
    --this.i;
    this.question = this.selectedlanques[this.i].question;
    this.option = this.selectedlanques[this.i].anslistobj;
  }

/********************************************************* */
  
  answerkey: AnswerKey[] = [];

  check(e, str: String, answer: String) {
    if (e.target.checked) {
   //   console.log("..................."+str + " " + answer);
      this.answerkey.push(new AnswerKey(str, answer));
    }
    else {

      this.answerkey.splice(0, 1);
    }
  //  console.log(this.answerkey);
    this.recursivecheck();
  }
  ///////////////////////////////////

  marks: number = 0;
  generatemark() {
    for (var i = 0; i < this.answerkey.length; i++) {
     // console.log(this.answerkey[i].choosen,this.quizlist[i].answer);
      if (this.answerkey[i].choosen == this.quizlist[i+4].answer) this.marks++;
    }
    this.resultstatus=true;
    console.log(this.resultstatus,this.marks);
    // alert("your score is "+JSON.stringify(this.marks));
  //  document.writeln("your score is " + this.marks);
  }

  ///////////////////////////////////

  recursivecheck() {
    var result1 = this.quizlist;
    var result2 = this.answerkey;

    var props = ['id', 'answer'];

    var result = result1.filter(function (o1) {
      // filter out (!) items in result2
      return result2.some(function (o2) {
        return o1.answer === o2.answer;
        // assumes unique id
      });

    }).map(function (o) {

      // use reduce to make objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce(function (newo, ans) {
        newo[ans] = o[ans];
        return newo;
      }, {});
    });
    console.log("result:" + JSON.stringify(result));
  }


}

export class AnswerKey {
  choosen: String;
  answer: String;
  constructor(choosen: String, answer: String) {
    this.choosen = choosen;
    this.answer = answer;
  }



}
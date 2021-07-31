import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { DataServiceService } from './services/data-service.service';

// TypeScript declaration for annyang
declare var annyang: any;
// declare var tts:any = window.speechSynthesis;

@Injectable()
export class SpeechService {
  errors$ = new Subject<{[key: string]: any}>();
  textField$ = new Subject<{[key: string]: any}>();
  publicationNumber$ = new Subject<string>();
  dwpiNumber$ = new BehaviorSubject('');
  submit$ = new BehaviorSubject(false);
  listening = false;
  readTheRecords$ = new BehaviorSubject(false);
  stopReading$ = new BehaviorSubject(false);
  selectRecord$ = new BehaviorSubject({recordNumber:0,checkedValue:false});
  clickOnExport$  = new BehaviorSubject(false);
  voice = speechSynthesis.getVoices()[4];

  numbers = {
    one : 1,
    two : 2,
    three:3,
    four : 4,
    five :5 ,
    six: 6,
    seven: 7,
    eight : 8,
    nine : 9,
    ten: 10,
    for:4,
    to:2,
    too:2,
    tree:3,
    file:5,
    date:8,
    name:9,
    night:9
    
  }

  constructor(private zone: NgZone, private dataService: DataServiceService) {}

  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'enter text (field) *field': (field) => {
        this.zone.run(() => {
          this.textField$.next({'textField': field});
        });
      },
      'enter publication (number) *field': (field) => {
        this.zone.run(() => {
          this.publicationNumber$.next(field);
        });
      },
      'enter custom (field) *field': (field) => {
        debugger
        this.zone.run(() => {
          this.dwpiNumber$.next(field);
        });
      },
      'search': () => {
        this.zone.run(() => {
          this.submit$.next(true);
        });
      },
      'yes': () => {
        this.zone.run(() => {
          this.readTheRecords$.next(true);
        });
      },
      'stop': () => {
        this.zone.run(() => {
          this.stopReading$.next(true);
        });
      },
      'select record (number) *field' : (field) => {
        var inputNumber = isNaN(Number(field)) ? this.numbers[field] : Number(field);
        if(inputNumber>0){
        this.zone.run(() => {
          this.selectRecord$.next({recordNumber:inputNumber,checkedValue:true});
        });
      }
      },
      'deselect record (number) *field' : (field) => {
        var inputNumber = isNaN(Number(field)) ? this.numbers[field] : Number(field);
        if(inputNumber>0){
        this.zone.run(() => {
          this.selectRecord$.next({recordNumber:inputNumber,checkedValue:false});
        });
      }
      },
      'export' : () => {
        this.zone.run(() => {
          this.clickOnExport$.next(true);
        });
     
      }
    
    };
    annyang.addCommands(commands);
   

    // Log anything the user says and what speech recognition thinks it might be
    // annyang.addCallback('result', (userSaid) => {
    //   console.log('User may have said:', userSaid);
    // });
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "Enter text Covid". OR "Enter Publication Number 1234". OR "Search" OR "Select Record 1" OR "Export"',
        { results: userSaid });
    });
  }

  public synthesizeSpeechFromText(
		// voice: SpeechSynthesisVoice,
		// rate: number,
		text: string
		) : void {

		var utterance = new SpeechSynthesisUtterance( text );
		utterance.voice = this.voice;
		utterance.rate = 1;

		speechSynthesis.speak( utterance );

	}

  public stopSynthesize() : void {

		if ( speechSynthesis.speaking ) {

			speechSynthesis.cancel();

		}
  }

  private _handleError(error, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

}

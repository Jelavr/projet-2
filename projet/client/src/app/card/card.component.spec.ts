import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {Card, CardInfo, HighScore} from "../../../../common/communication/card";
import { GameType } from "../../../../common/communication/messages";
import { MATRIX_LOGO } from "../constantes";
import { CardComponent } from "./card.component";

describe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const soloExemple: HighScore[] = [
    {name: "Mathieu", time: {minutes: 6, seconds: 51}  },
    {name: "Camille", time: {minutes: 7, seconds: 43}   },
    {name: "jean-mathieu", time: {minutes: 8, seconds: 54}  },
];

  const pVpExemple: HighScore[] = [
  {name: "Hello World", time: {minutes: 5, seconds: 9} },
  {name: "Batman", time: {minutes: 7, seconds: 46}  },
  {name: "Harambe", time: {minutes: 7, seconds: 56}   },
];

  beforeEach(async(() => { void
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    })
    .compileComponents();
   }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card.name = "bob";
    component.card.logo = MATRIX_LOGO;
    component.card.solo =  soloExemple;
    component.card.PVP =  pVpExemple;
    fixture.detectChanges();
  });

  it("should create", () => {
     expect(component).toBeTruthy();
   });

  it("display the selected title when clicked", () => {
     const comp: CardComponent = new CardComponent();
     const card: Card = {gameID: "1", name: "titre1", gameType: GameType.Simple, logo: "",
                         solo: Array<HighScore>(), PVP: Array<HighScore>(), joining: false};
     comp.card = card;

     comp.jouer.subscribe((selectedcard: CardInfo) => expect(selectedcard.name).toBe(card.name));
     comp.clickJouer();
   });

  it("lorsque les secondes sont moi de 9 la fonction formatNumber() affiche un 0 en avant du chiffre", () => {
      expect(component.formatNumber(pVpExemple[0].time.seconds)).toBe("09");
   });

  });

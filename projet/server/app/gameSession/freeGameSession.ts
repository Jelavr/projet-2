import * as THREE from "three";
import { JSON3DWrapper, TYPE_MODIFICATION } from "../../../common/communication/scene";
import { NB_DIFF_MULTI, NB_DIFF_SOLO } from "../constantes";
import { FreeGame, Game } from "../game-generation/game";
import { GameSession } from "./gameSession";

export class FreeGameSession extends GameSession {

    protected objectsOriginal: JSON3DWrapper[];
    protected objectsModified: JSON3DWrapper[];
    protected lights: THREE.DirectionalLight[];

    public constructor(users: string[], game: Game, isMulti: boolean) {
        super(users, game, isMulti);
        const freeGame: FreeGame = game as FreeGame;

        this.objectsOriginal = freeGame.objets.objectsOriginal;
        this.objectsModified = freeGame.objets.objectsModified;
    }

    public getObjectsOriginal(): JSON3DWrapper[] {
        return this.objectsOriginal;
    }

    public getObjectsModified(): JSON3DWrapper[] {
        return this.objectsModified;
    }

    public checkDifferences(id: string, user: string): boolean {
        let isDiff: boolean = false;
        this.objectsOriginal.forEach( (obj: JSON3DWrapper) => {
            if (obj.id === id && obj.modificationType !== TYPE_MODIFICATION.NoModif) {
                isDiff = true;
                obj.modificationType = TYPE_MODIFICATION.NoModif;
            }
        });

        this.objectsModified.forEach( (obj: JSON3DWrapper) => {
            if (obj.id === id && obj.modificationType !== TYPE_MODIFICATION.NoModif) {
                isDiff = true;
                obj.modificationType = TYPE_MODIFICATION.NoModif;
            }
        });

        if (isDiff) {
            this.nbDiffFound[user]++;
            if ((this.isMulti && this.nbDiffFound[user] === NB_DIFF_MULTI) ||
                (!this.isMulti && this.nbDiffFound[user] === NB_DIFF_SOLO)) {
                this.finished = true;
            }
        }

        return isDiff;
    }
}

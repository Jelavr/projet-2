import { GameMessage } from "../../../../common/communication/gameMessage";
const TEN: number = 10;
const HOURS: number = 24;

export class MessageManager {

    public static createDifferenceFoundMessage(messageType: string, nbPlayers: number, playerName: string): GameMessage {
        const text: string = nbPlayers === 1 ? "Différence trouvée."
                               : "Différence trouvée par " + playerName;

        return {message: this.getTime() + text, messageType};
    }

    public static createErrorMessage(messageType: string, nbPlayers: number, playerName: string): GameMessage {
        const text: string = nbPlayers === 1 ? "Erreur."
                               : "Erreur par " + playerName + ".";

        return {message: this.getTime() + text, messageType};
    }

    public static createBestTimeMessage(messageType: string,
                                        playerName: string,
                                        position: string,
                                        gameName: string,
                                        nbPlayers: string): GameMessage {
        const text: string = playerName + " obtient la " + position +
        "e place dans les meilleurs temps du jeu " + gameName + " en " + nbPlayers + ".";

        return {message: this.getTime() + text, messageType};
    }

    public static createConnexionMessage(messageType: string, playerName: string): GameMessage {
        const text: string = playerName + " vient de se connecter.";

        return {message: this.getTime() + text, messageType};
    }

    public static createDeconnexionMessage(messageType: string, playerName: string): GameMessage {
        const text: string = playerName + " vient de se déconnecter.";

        return {message: this.getTime() + text, messageType};
    }

    private static getTime(): string {
        const date: Date = new Date();
        const hour: string = MessageManager.formatNumber((date.getHours() + 1) % HOURS);
        const minutes: string = MessageManager.formatNumber(date.getMinutes());
        const seconds: string = MessageManager.formatNumber(date.getSeconds());

        return hour + ":" + minutes + ":" + seconds + " - ";
    }
    private static formatNumber(time: Number): string {
        return time < TEN ? "0" + time.toString() : time.toString();
    }
}

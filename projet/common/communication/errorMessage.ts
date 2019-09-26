import {CheckDifferencesMessage, GameCreationMessage, GameSessionCreationMessage } from "./messages";


export const not7diff: GameCreationMessage = {
    gameCreated: false,
    errorMessage: "Les deux images n'ont pas 7 différences!\n",
};

export const invalidRequest : GameCreationMessage = {
    gameCreated: false,
    errorMessage: "Les fichiers rentrés ne sont pas du bon format.\n",
}

export const invalidFiles : GameCreationMessage = {
    gameCreated: false,
    errorMessage: "Les fichiers sont invalides.\n",
}

export const noGameSessionID : CheckDifferencesMessage = {
    differenceFound: false,
    errorMessage: "The game session ID is invalid!",
};

export const notADiff : CheckDifferencesMessage = {
    differenceFound: false,
    errorMessage: "This is not a difference!",
    
}
export const gameCouldNotBeFound: GameSessionCreationMessage = {
    gameSessionCreated: false,
    simpleGameSession: {
        name: "",
        id: "",
        originalImage: "",
        modifiedImage: "",
    },
    errorMessage: "The game you are looking for could not be found.",
}
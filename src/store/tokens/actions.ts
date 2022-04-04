export type Action = {type: "ADD_TOKEN"; payload: string}; // serve para armazena o token EX: type: "ADD_TOKEN" ela vai exportar um token
                                                           // o que é um toquem?  payload: string token é uma string
export const addToken = (token: string): Action =>({
    type: "ADD_TOKEN",
    payload: token,
});
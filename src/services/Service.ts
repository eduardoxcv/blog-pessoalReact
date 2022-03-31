import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://reliquiasvw.herokuapp.com'
})
  export const cadastroUsuario = async(url: any,dados: any,setDado: any) => { 
    const resposta = await api.post(url,dados)
    setDado(resposta.data) /*SERVICE RESPONSAVEL PELO CADASTRO*/
    
  }
    export const login = async(url: any,dados: any,setDado: any) => { 
      const resposta = await api.post(url,dados)
      setDado(resposta.data.token) /*SERVICE RESPONSAVEL PELO LOGIN*/
      
    }
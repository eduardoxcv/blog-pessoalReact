import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://reliquiasvw.herokuapp.com'
})
    export const cadastroUsuario = async (url: any, dados: any, setDado: any) => {
      const resposta = await api.post(url, dados)
      setDado(resposta.data) /*SERVICE RESPONSAVEL PELO CADASTRO*/

    }
    export const login = async (url: any, dados: any, setDado: any) => {
      const resposta = await api.post(url, dados)
      setDado(resposta.data.token) /*SERVICE RESPONSAVEL PELO LOGIN*/

    }
    export const busca = async (url: any, setDado: any, header: any) => {
      const resposta = await api.get(url, header) // AQUI ESTAMOS PASSANDO A URL + TOKEN (SÓ VAI PODER LISTAR AS POSTAGENS SE ESTIVER LOGADO)
      setDado(resposta.data) /* SERVICE RESPONSAVEL POR BUSCAR OS TEMAS E POSTAGENS*/
    }
    export const buscaId = async (url: any, setDado: any, header: any) => {
      const resposta = await api.get(url, header)
      setDado(resposta.data)
    }

    export const post = async (url: any, dados: any, setDado: any, header: any) => {
      const resposta = await api.post(url, dados, header) // CADASTRO DE INFORMAÇÕES NA API
      setDado(resposta.data)
    }

    export const put = async (url: any, dados: any, setDado: any, header: any) => {
      const resposta = await api.put(url, dados, header) // ATUALIZAR INFORMAÇÕES NA API
      setDado(resposta.data)
    }

    export const deleteId = async (url: any, header: any) => {
      await api.delete(url, header) // DELETAR INFORMAÇÕES NA API
}
import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import {useHistory, useParams } from 'react-router-dom'
import './CadastroTema.css';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';


function CadastroTema() {

    let history = useHistory(); // UTILIZADO PARA FAZER O REDIRECIONAMENTO DE PAGINAS 
    const { id } = useParams<{id: string}>(); // useParams = SERVE PARA CAPTURAR OS PARAMETROS DE UMA URL, ELE VAI CAPTURAR O ID QUANDO FOI ATUALIZAR UM TEMA POR EX
    const [token, setToken] = useLocalStorage('token'); // useLocalStorage = SERVE PARA CAPTURAR O TOKEN ARMAZENADO NO NAVEGADOR E GUARDAR
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => { // useEffect = SERVE PARA VER O CICLO DE VIDA 
        if (token == "") { // ENTÃO SE O TOKEN ESTIVER VAZIO ELE PRECISA RETORNAR 
            alert("Você precisa estar logado") // ESSE ALERTA
            history.push("/login") // E DIRECIONAR PARA PAGINA DE LOGIN 
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/tema/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function updatedTema(e: ChangeEvent<HTMLInputElement>) {

            setTema({
                ...tema,
                [e.target.name]: e.target.value,
            })
    
        }
        
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            console.log("tema " + JSON.stringify(tema))
    
            if (id !== undefined) {                    //ESSE IF SIGNIFICA QUE CASO O USUARIO QYEURA ALTERAR UM ID EXISTENTE ELE VAI CAR NESSE IF
                console.log(tema)
                put(`/tema`, tema, setTema, {         // CAINDO NO IF ELE VAI PRA ROTA PUT QUE É ALTERAR 
                    headers: {
                        'Authorization': token       // APOS ISSO ELE CAI NO TOKEN PARA VER SE O USUARIO TEM AUTORIZAÇÃO - CASO POSITIVO ALTERA
                    }
                })
                alert('Tema atualizado com sucesso'); // ALERTA DE SUCESSO 
            } else {                                   // ESSE ELSE SIGINIFICA QUE CASO O USUARIO PASSE UM ID QUE NÃO EXISTE ELE VAI CAIR AQUI 
                post(`/tema`, tema, setTema, {         // CAINDO NO ELSE ELE VAI PRA ROTA POST QUE É CRIAR UM TEMA   
                    headers: {
                        'Authorization': token         // APOS ISSO ELE VAI NO TOKEN E AUTENTICA A POSTAGEM,
                    }
                })
                alert('Tema cadastrado com sucesso'); // ALERTA DE SUCESSO
            }
            back()
    
        }
    
        function back() {
            history.push('/temas') // APÓS TODO O PROCESSO DE CIMA TANTO DE ATUALIZAÇÃO QUANTO DE POSTAGEM 
        }                          // O USUARIO É DIRECIONADO PARA A PAGINA TEMAS ONDE TEM A LISTA 

  
        return (
            <Container maxWidth="sm" className="topo">
                <form onSubmit={onSubmit}>
                    <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                    <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </form>
            </Container>
        )
    }
    
    export default CadastroTema;
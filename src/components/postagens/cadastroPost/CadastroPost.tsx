import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroPost.css';
import { useHistory, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
                            /* ESSE COMPONENTE VAI SERVIR PARA CADASTRAR UM POST E ATUALIZAR TB*/
function CadastroPost() {
    let history = useHistory(); // RESPONSAVEL PELOS DIRECIONAMENTOS
    const { id } = useParams<{ id: string }>(); // VAI CAPTURAR O ID DA ROTA CASO PRECISE ATUALIZAR
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token'); // SERVE PARA ARMAZENAR O TOKEN

    useEffect(() => { // AQUI SE O USUARIO ESTIVER LOGADO ELE CONSEGUI SEGUIR COM A POSTAGEM OU ATUALIZAÇÃO 
        if (token == "") {
            alert("Você precisa estar logado")
            history.push("/login") // CASO CONTRARIO É DIRECIONADO PARA O LOGIN

        }
    }, [token])

    const [tema, setTema] = useState<Tema>( // AQUI VAI MOSTRAR OS TEMAS QUE JÁ ESTÃO CADASTRADOS 
        {
            id: 0,
            descricao: ''
        })
    const [postagem, setPostagem] = useState<Postagem>({ // AQUI VAI DAR INICIO A UMA POSTAGEM
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })

    useEffect(() => { // ESSE useEffect SERVE PARA ALTERAR O TEMA... ELE JUNTA TODAS AS POSTAGENS DE DETERMINADO TEMA 
        setPostagem({
            ...postagem,// E TROCA PELO NOVO TEMA.. 
            tema: tema // PRIMEIRO TEMA: TEMA ANTIGO / SEGUNDO TEMA: NOVO TEMA QUE VAI SOFRER ALTERAÇÃO
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem atualizada com sucesso');
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem cadastrada com sucesso');
        }
        back()

    }

    function back() {
        history.push('/posts')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;
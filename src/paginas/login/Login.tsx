import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { useDispatch } from 'react-redux';
import { addToken } from "../../store/tokens/actions";

function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [token, setToken] = useState(''); /*Essa const vai fazer o controle do token*/
    const [userLogin, setUserLogin] = useState<UserLogin>( /* userLogin = estado do componente //  setUserLogin=  pode alterar estado do componente*/
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }

    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) { /* Esse metodo vai servir para fazer a atualização da model com as infos do usuario*/

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value /* [e.target.name] = está identificando o nome de propriedade ex: nome/senha/usuario*/
        })                                  /*e.target.value = está pegando o que o usuario digita ex: nome:Eduardo/senha12345678/*/
    }

    useEffect(() => { /* aqui o usuario é direcionado a pg home caso seja logado com sucesso*/
        if (token != '') {
            dispatch(addToken(token));
            history.push('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault(); /* preventDefault = previne o comportamento padrão do botão //Não vai permitir que o botão atualize a tela*/
        try { /*Try Catch = tentativa de execução e caso não dê certo um erro é retornado. */
            await login(`/usuarios/logar`, userLogin, setToken) /* aqui vamos para rota de tentativa de login do backend*/


            alert('Usuário logado com sucesso!');
        } catch (error) { /* aqui o erro é relatado caso der ERRO */
            alert('Dados do usuário inconsistentes. Erro ao logar!');
        }
    }

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>

                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className="imagem">

            </Grid>
        </Grid>
    );
}

export default Login;
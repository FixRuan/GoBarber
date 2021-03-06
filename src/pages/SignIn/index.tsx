import React, { useCallback, useRef } from 'react';
import Logo from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import getValidateErrors from '../../utils/getValidateErrors';

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
  

    const handleSubmit = useCallback(async (data: object) => {

        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória')
            })


            await schema.validate(data, {
                abortEarly: false,
            });
            
           
        } catch (error) {

           console.log(error)
           const eerros = getValidateErrors(error);
           formRef.current?.setErrors(eerros);
            
        }


    }, []);



    return(
    <Container>
        <Content>
            <img src={Logo} alt="Logo" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu Login</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
                <Button type="submit">Entrar</Button>
                <a href="forgot">Esqueci minha senha</a>
            </Form>
            <a href="#">
                <FiLogIn />
                Criar Conta
            </a>
        </Content>


        <Background />
    </Container>
    )
    
};

export default SignIn;
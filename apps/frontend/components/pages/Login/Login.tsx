import { Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Input, PasswordInput } from 'components/atoms';
import { useAuth } from 'context/auth';
import { login, LoginData } from 'services/api/auth/login';

import style from './Login.module.css';

export const Login: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();
  const redirect = router.query.redirect as string | undefined;

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      void router.push(redirect as string);
    }
  }, [user, redirect, router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      await login(data);
    } catch {
      setError('email', {
        type: 'server',
        message: 'Username or password is incorrect',
      });
    }
  };

  return (
    <main>
      <Head>
        <meta name="description" content="login" />
        <title>Login | NCDM - DMP</title>
      </Head>
      <div className={style.container}>
        <h1>
          <FormattedMessage id="login.title" />
        </h1>
        <form
          className={style.form}
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              id="login.email"
              type="email"
              autoComplete="email"
              label={intl.formatMessage({
                id: 'login.email.label',
              })}
              placeholder={intl.formatMessage({
                id: 'login.email.placeholder',
              })}
              {...register('email', {
                required: intl.formatMessage({
                  id: 'login.email.error.required',
                }),
                pattern: {
                  value: /^\S+@\S+\.\S+$/, // basic email regex
                  message: intl.formatMessage({
                    id: 'login.email.error.invalid',
                  }),
                },
              })}
            />
          </div>
          <div>
            <PasswordInput
              id="login.password"
              autoComplete="current-password"
              label={intl.formatMessage({
                id: 'login.password.label',
              })}
              placeholder={intl.formatMessage({
                id: 'login.password.placeholder',
              })}
              {...register('password', {
                required: intl.formatMessage({
                  id: 'login.password.error.required',
                }),
              })}
            />
          </div>
          {errors.email?.message != null && (
            <Typography color="red">{errors.email.message}</Typography>
          )}
          <button type="submit" className={style.submit}>
            <FormattedMessage id="login.submit" />
          </button>
        </form>
      </div>
    </main>
  );
};

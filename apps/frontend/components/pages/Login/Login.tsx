import EmailIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import SelectLanguage from 'components/SelectLanguage';
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
      void router.push(redirect ?? '/');
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
    <main className={style.main}>
      <Head>
        <meta name="description" content="login" />
        <title>Login | NCDM - DMP</title>
      </Head>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <Image
            src="/logo.svg"
            alt="Logo"
            className={style.logo}
            width={100}
            height={100}
          />
        </div>
        <h1 className={style.khSubtitle}>
          ប្រព័ន្ធព័ត៌មានទាន់ហេតុការណ៍ និងអង្កេតតាមដានស្ថានការណ៍គ្រោះមហន្តរាយ
        </h1>
        <Typography variant="h6" className={style.enSubtitle}>
          Disaster Information and Monitoring System
        </Typography>
        <h1 className={style.title}>
          <FormattedMessage id="login.title" />
        </h1>
        <form
          className={style.form}
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.inputContainer}>
            <Input
              id="login.email"
              startIcon={<EmailIcon />}
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
          <div className={style.inputContainer}>
            <PasswordInput
              startIcon={<LockIcon />}
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
            {/* <a href="/forgot-password" className={style.forgotPassword}>
              <FormattedMessage id="login.forgotPassword" />
            </a> */}
          </div>
          {errors.email?.message != null && (
            <Typography color="red">{errors.email.message}</Typography>
          )}
          <button type="submit" className={style.submit}>
            <FormattedMessage id="login.submit" />
          </button>
        </form>
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            paddingTop: '1rem',
          }}
        >
          <SelectLanguage />
        </div>
      </div>
    </main>
  );
};

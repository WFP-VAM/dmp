import { DroughtDto, FloodDto, IncidentDto } from '@wfp-dmp/interfaces';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';

import { ApiRoutes } from 'services/api/apiRoutes';
import { useGetMe } from 'services/api/user/useUser';

import style from './Home.module.css';

export const Home = (): JSX.Element => {
  const user = useGetMe();
  const { data: lastForms } = useSWR<(FloodDto | DroughtDto | IncidentDto)[]>(
    ApiRoutes.lastForms,
  );

  return (
    <div>
      <Head>
        <title>Bifrost</title>
        <meta name="description" content="Generated with bifrost" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={style.main}>
        {user && (
          <>
            <h1>
              Welcome {user.name} to <a href="https://nextjs.org">Next.js!</a>
            </h1>
            <Link href="/profile">
              <h2>Update your profile</h2>
            </Link>
          </>
        )}
        <div>{JSON.stringify(lastForms)}</div>
      </main>
    </div>
  );
};

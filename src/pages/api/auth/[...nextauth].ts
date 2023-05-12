import { mockUser } from '$logic/models/user';
import { appMockEmails, emailToRole } from '$logic/_mock/roles';
import { omit } from '$modules/object-fns';
import { routes } from '$routes';
import chalk from 'chalk';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const nextAuthOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: routes.auth.login().link,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (
          !appMockEmails.includes(credentials.email) ||
          credentials.password !== '12345678'
        )
          return null;

        try {
          const role = emailToRole[credentials.email as keyof typeof emailToRole];

          const user = mockUser({
            email: credentials.email,
            role: omit(role)('rules'),
          });

          return {
            // next auth
            id: user.id,
            email: user.email,
            name: user.name,

            // our
            user,
            accessToken: 'pizza',
            rules: role.rules,
          };
        } catch (err) {
          console.error(chalk.redBright('Error with login request'));
          console.error(chalk.redBright(err));
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: authorizeResponse, account }) {
      if (account?.type === 'credentials') {
        authorizeResponse?.user && (token.user = authorizeResponse.user);
        authorizeResponse?.accessToken &&
          (token.accessToken = authorizeResponse.accessToken);
        authorizeResponse?.rules && (token.rules = authorizeResponse.rules);
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.rules = token.rules;
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);

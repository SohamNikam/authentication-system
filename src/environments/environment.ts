// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// ValidPublicKey: Read more at - https://github.com/udchalo/uc-client/blob/develop/docs/PUSHNOTIFICATION.md

export const environment = {
    loginApiBase: 'http://localhost:3000/api/auth/login',
    signupApiBase: 'http://localhost:3000/api/auth/signup',
};

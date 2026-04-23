import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import { useState, type FormEventHandler } from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

// Inline SVG icons for SSO providers
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.07l3.66-2.84v-.14z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function getProviderIcon(providerId: string) {
  switch (providerId) {
    case "google":
      return <GoogleIcon />;
    case "github":
      return <GitHubIcon />;
    default:
      return null;
  }
}

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();
    setIsLoginButtonDisabled(true);
    const formElement = e.target as HTMLFormElement;
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");
    formElement.submit();
  });

  const hasSocialProviders =
    realm.password && social.providers !== undefined && social.providers.length > 0;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      displayWide={false}
      headerNode={msg("doLogIn")}
      infoNode={
        <span>
          {msg("noAccount")}
          <a href={url.registrationUrl}>{msg("doRegister")}</a>
        </span>
      }
    >
      <div id="kc-form">
        {/* SSO Providers — displayed first */}
        {hasSocialProviders && (
          <>
            <ul className="am-sso-list">
              {social.providers!.map((p) => (
                <li key={p.providerId}>
                  <a href={p.loginUrl} className="am-sso-link">
                    {getProviderIcon(p.providerId)}
                    <span>Continue with {p.displayName}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="am-separator">
              <span>or continue with email</span>
            </div>
          </>
        )}

        {/* Email/Password Form */}
        {realm.password && (
          <form
            id="kc-form-login"
            onSubmit={onSubmit}
            action={url.loginAction}
            method="post"
          >
            {!usernameHidden && (() => {
              const label = !realm.loginWithEmailAllowed
                ? "username"
                : realm.registrationEmailAsUsername
                ? "email"
                : "usernameOrEmail";

              const autoCompleteHelper: typeof label =
                label === "usernameOrEmail" ? "username" : label;

              return (
                <div className="am-form-group">
                  <label htmlFor={autoCompleteHelper} className="am-label">
                    {msg(label)}
                  </label>
                  <input
                    tabIndex={1}
                    id={autoCompleteHelper}
                    className="am-input"
                    name={autoCompleteHelper}
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus
                    autoComplete="off"
                    placeholder={msgStr(label)}
                  />
                </div>
              );
            })()}

            <div className="am-form-group">
              <label htmlFor="password" className="am-label">
                {msg("password")}
              </label>
              <input
                tabIndex={2}
                id="password"
                className="am-input"
                name="password"
                type="password"
                autoComplete="off"
                placeholder={msgStr("password")}
              />
            </div>

            <div className="am-form-options">
              <div>
                {realm.rememberMe && !usernameHidden && (
                  <label className="am-checkbox">
                    <input
                      tabIndex={3}
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      {...(login.rememberMe === "on" ? { checked: true } : {})}
                    />
                    {msg("rememberMe")}
                  </label>
                )}
              </div>
              <div>
                {realm.resetPasswordAllowed && (
                  <a
                    tabIndex={5}
                    href={url.loginResetCredentialsUrl}
                    className="am-link"
                  >
                    {msg("doForgotPassword")}
                  </a>
                )}
              </div>
            </div>

            <input type="hidden" id="id-hidden-input" name="credentialId"
              {...(auth?.selectedCredential !== undefined
                ? { value: auth.selectedCredential }
                : {})}
            />

            <input
              tabIndex={4}
              className="am-btn-primary"
              name="login"
              id="kc-login"
              type="submit"
              value={msgStr("doLogIn")}
              disabled={isLoginButtonDisabled}
            />
          </form>
        )}
      </div>
    </Template>
  );
}

import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, realm, auth } = kcContext;
  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={msg("emailForgotTitle")}
    >
      <p className="am-subtitle">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form
        id="kc-reset-password-form"
        action={url.loginAction}
        method="post"
      >
        <div className="am-form-group">
          <label htmlFor="username" className="am-label">
            {!realm.loginWithEmailAllowed
              ? msg("username")
              : !realm.registrationEmailAsUsername
              ? msg("usernameOrEmail")
              : msg("email")}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="am-input"
            autoFocus
            defaultValue={
              auth !== undefined && auth.showUsername
                ? auth.attemptedUsername
                : undefined
            }
          />
        </div>

        <div className="am-form-group" style={{ marginTop: "0.5rem" }}>
          <input
            className="am-btn-primary"
            type="submit"
            value={msgStr("doSubmit")}
          />
        </div>

        <div className="am-footer">
          <a href={url.loginUrl}>{msg("backToLogin")}</a>
        </div>
      </form>
    </Template>
  );
}

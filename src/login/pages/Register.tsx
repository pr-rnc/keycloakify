import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const {
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("registerTitle")}
    >
      <p className="am-subtitle">Create your account to get started</p>

      <form
        id="kc-register-form"
        action={url.registrationAction}
        method="post"
      >
        {/* First name + Last name side by side */}
        <div className="am-form-row">
          <div className="am-form-group">
            <label htmlFor="firstName" className="am-label">
              {msg("firstName")}
            </label>
            <input
              type="text"
              id="firstName"
              className={clsx(
                "am-input",
                messagesPerField.printIfExists("firstName", "am-input-error")
              )}
              name="firstName"
              defaultValue={register.formData.firstName ?? ""}
              autoFocus
            />
          </div>

          <div className="am-form-group">
            <label htmlFor="lastName" className="am-label">
              {msg("lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              className={clsx(
                "am-input",
                messagesPerField.printIfExists("lastName", "am-input-error")
              )}
              name="lastName"
              defaultValue={register.formData.lastName ?? ""}
            />
          </div>
        </div>

        {/* Email */}
        <div className="am-form-group">
          <label htmlFor="email" className="am-label">
            {msg("email")}
          </label>
          <input
            type="text"
            id="email"
            className={clsx(
              "am-input",
              messagesPerField.printIfExists("email", "am-input-error")
            )}
            name="email"
            defaultValue={register.formData.email ?? ""}
            autoComplete="email"
          />
        </div>

        {/* Username (if not using email as username) */}
        {!realm.registrationEmailAsUsername && (
          <div className="am-form-group">
            <label htmlFor="username" className="am-label">
              {msg("username")}
            </label>
            <input
              type="text"
              id="username"
              className={clsx(
                "am-input",
                messagesPerField.printIfExists("username", "am-input-error")
              )}
              name="username"
              defaultValue={register.formData.username ?? ""}
              autoComplete="username"
            />
          </div>
        )}

        {/* Password fields */}
        {passwordRequired && (
          <>
            <div className="am-form-group">
              <label htmlFor="password" className="am-label">
                {msg("password")}
              </label>
              <input
                type="password"
                id="password"
                className={clsx(
                  "am-input",
                  messagesPerField.printIfExists("password", "am-input-error")
                )}
                name="password"
                autoComplete="new-password"
              />
            </div>

            <div className="am-form-group">
              <label htmlFor="password-confirm" className="am-label">
                {msg("passwordConfirm")}
              </label>
              <input
                type="password"
                id="password-confirm"
                className={clsx(
                  "am-input",
                  messagesPerField.printIfExists(
                    "password-confirm",
                    "am-input-error"
                  )
                )}
                name="password-confirm"
              />
            </div>
          </>
        )}

        {/* Recaptcha */}
        {recaptchaRequired && (
          <div className="am-form-group">
            <div
              className="g-recaptcha"
              data-size="compact"
              data-sitekey={recaptchaSiteKey}
            />
          </div>
        )}

        {/* Submit */}
        <div className="am-form-group" style={{ marginTop: "0.5rem" }}>
          <input
            className="am-btn-primary"
            type="submit"
            value={msgStr("doRegister")}
          />
        </div>

        {/* Back to login */}
        <div className="am-footer">
          <span>
            Already have an account?
            <a href={url.loginUrl}>{msg("backToLogin")}</a>
          </span>
        </div>
      </form>
    </Template>
  );
}

import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { clsx } from "keycloakify/tools/clsx";
import { useState } from "react";
import type { I18n } from "./i18n";
import type { KcContext } from "./kcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields: _displayRequiredFields = false,
    showAnotherWayIfPresent = true,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss: _doUseDefaultCss,
    classes: _classes,
    children,
  } = props;

  const { msg } = i18n;
  const { auth, url, message, isAppInitiatedAction } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: false,
    styles: [],
    htmlClassName: "am-root",
    bodyClassName: undefined,
  });

  useState(() => {
    document.title = `${i18n.msgStr("loginTitle", kcContext.realm.displayName)} | VYDON`;
  });

  if (!isReady) {
    return null;
  }

  return (
    <div className="am-page">
      <div className="am-card">
        {/* Logo */}
        <div className="am-logo">
          <svg
            width="48"
            height="48"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="logoGrad"
                x1="0"
                y1="0"
                x2="120"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="120" height="120" rx="28" fill="url(#logoGrad)" />
            <circle cx="35" cy="35" r="6" fill="white" opacity="0.95" />
            <circle cx="35" cy="60" r="6" fill="white" opacity="0.95" />
            <circle cx="35" cy="85" r="6" fill="white" opacity="0.95" />
            <circle cx="60" cy="42" r="6" fill="white" opacity="0.95" />
            <circle cx="60" cy="72" r="6" fill="white" opacity="0.9" />
            <line x1="41" y1="35" x2="54" y2="42" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="41" y1="60" x2="54" y2="42" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="41" y1="60" x2="54" y2="72" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="41" y1="85" x2="54" y2="72" stroke="white" strokeWidth="2" opacity="0.6" />
            <line x1="66" y1="42" x2="78" y2="50" stroke="white" strokeWidth="2" opacity="0.4" />
            <line x1="66" y1="72" x2="78" y2="65" stroke="white" strokeWidth="2" opacity="0.3" />
            <circle cx="82" cy="50" r="5" fill="white" opacity="0.7" />
            <circle cx="82" cy="65" r="5" fill="white" opacity="0.5" />
            <circle cx="95" cy="38" r="3" fill="white" opacity="0.5" />
            <circle cx="100" cy="52" r="2.5" fill="white" opacity="0.35" />
            <circle cx="93" cy="60" r="2" fill="white" opacity="0.4" />
            <circle cx="102" cy="70" r="2" fill="white" opacity="0.25" />
            <circle cx="97" cy="45" r="1.5" fill="white" opacity="0.3" />
            <circle cx="105" cy="58" r="1.5" fill="white" opacity="0.15" />
            <circle cx="99" cy="78" r="1.5" fill="white" opacity="0.15" />
          </svg>
          <span className="am-wordmark">VYDON</span>
        </div>

        {/* Content */}
        <div>
          {/* Alerts */}
          {displayMessage &&
            message !== undefined &&
            (message.type !== "warning" || !isAppInitiatedAction) && (
              <div className={clsx("am-alert", `am-alert-${message.type}`)}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: message.summary,
                  }}
                />
              </div>
            )}

          {/* Page content */}
          {children}

          {/* Try another way */}
          {auth !== undefined &&
            auth.showTryAnotherWayLink &&
            showAnotherWayIfPresent && (
              <form
                id="kc-select-try-another-way-form"
                action={url.loginAction}
                method="post"
              >
                <div className="am-try-another-way">
                  <input type="hidden" name="tryAnotherWay" value="on" />
                  <a
                    href="#"
                    onClick={() => {
                      document.forms[
                        "kc-select-try-another-way-form" as never
                      ].submit();
                      return false;
                    }}
                  >
                    {msg("doTryAnotherWay")}
                  </a>
                </div>
              </form>
            )}

          {/* Info / Registration link */}
          {displayInfo && (
            <div className="am-footer">{infoNode}</div>
          )}
        </div>
      </div>
    </div>
  );
}

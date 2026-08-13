"use client";

import { Download, RefreshCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import { isIosSafari, isStandaloneMode, pwaCopy } from "@/lib/pwa";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const IOS_DISMISS_KEY = "dialog-ios-install-dismissed";

export function PwaManager({ locale }: { locale: Locale }) {
  const copy = pwaCopy[locale];
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const waitingWorker = useRef<ServiceWorker | null>(null);
  const refreshing = useRef(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (!window.isSecureContext && !["localhost", "127.0.0.1"].includes(window.location.hostname)) return;

    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((registration) => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        waitingWorker.current = registration.waiting;
        setUpdateReady(true);
      }

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            waitingWorker.current = worker;
            setUpdateReady(true);
          }
        });
      });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing.current) return;
      refreshing.current = true;
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (!isStandaloneMode()) {
        setInstallPrompt(event as BeforeInstallPromptEvent);
      }
    };

    const onAppInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    const dismissed = window.localStorage.getItem(IOS_DISMISS_KEY) === "true";
    if (!dismissed && isIosSafari() && !isStandaloneMode()) {
      window.setTimeout(() => setShowIosHint(true), 0);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome !== "dismissed") {
      setInstallPrompt(null);
    }
  }

  function applyUpdate() {
    waitingWorker.current?.postMessage({ type: "SKIP_WAITING" });
  }

  function dismissIosHint() {
    window.localStorage.setItem(IOS_DISMISS_KEY, "true");
    setShowIosHint(false);
  }

  if (updateReady) {
    return (
      <aside className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] z-50 mx-auto max-w-sm rounded-[1.4rem] border border-[var(--border-soft)] bg-[var(--surface-paper)]/95 p-3 text-[var(--foreground)] shadow-[0_20px_60px_rgb(49_25_13_/_18%)] backdrop-blur-xl md:bottom-5" role="status">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-white">
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="flex-1 text-sm font-bold">{copy.updateTitle}</p>
          <button type="button" onClick={applyUpdate} className="rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            {copy.updateAction}
          </button>
        </div>
      </aside>
    );
  }

  if (installPrompt) {
    return (
      <aside className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] z-50 mx-auto max-w-sm rounded-[1.4rem] border border-[var(--border-soft)] bg-[var(--surface-paper)]/95 p-3 text-[var(--foreground)] shadow-[0_20px_60px_rgb(49_25_13_/_18%)] backdrop-blur-xl md:bottom-5" role="region" aria-label={copy.installTitle}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--primary)]">
            <Download className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{copy.installTitle}</p>
            <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">{copy.installBody}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={installApp} className="rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                {copy.installAction}
              </button>
              <button type="button" onClick={() => setInstallPrompt(null)} className="rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-xs font-bold text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                {copy.dismiss}
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (showIosHint) {
    return (
      <aside className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] z-50 mx-auto max-w-sm rounded-[1.4rem] border border-[var(--border-soft)] bg-[var(--surface-paper)]/95 p-3 text-[var(--foreground)] shadow-[0_20px_60px_rgb(49_25_13_/_18%)] backdrop-blur-xl md:bottom-5" role="region" aria-label={copy.iosTitle}>
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--primary)]">
            <Download className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{copy.iosTitle}</p>
            <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">{copy.iosBody}</p>
          </div>
          <button type="button" onClick={dismissIosHint} aria-label={copy.dismiss} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--border-soft)] bg-white/70 text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </aside>
    );
  }

  return null;
}

/**
 * ASK — AI Terminal Interface
 * Brutalist, functional, machine-like
 */
(() => {
  const toggle = document.getElementById("ask-toggle");
  const container = document.getElementById("ask-container");
  const field = document.getElementById("ask-field");
  const closeBtn = document.getElementById("ask-close");
  const statusEl = document.getElementById("ask-status");
  const hintEl = document.getElementById("ask-hint");

  if (!toggle || !container || !field) return;

  // Configuration
  const apiMeta = document.querySelector('meta[name="ask-api"]');
  const API = (apiMeta?.content?.trim()) || "/api/ask";
  const TIMEOUT_MS = 30000;
  const TYPEWRITER_SPEED = 12; // ms per character

  // State
  let busy = false;
  let pushedState = false;
  let abortController = null;
  let questionIndex = 0;
  let dotsInterval = null;
  let typewriterTimeout = null;
  const conversationHistory = [];

  // Localized content
  const L10N = {
    en: {
      boot: [
        "AI assistant based on materials from Jonas Hertner.",
        "This is not legal advice. No attorney-client relationship.",
        "",
        "Type your question below."
      ],
      hint: "ENTER send · ESC close",
      hintMobile: "Send · Close ×",
      thinking: "Processing",
      ready: "Ready",
      error: "Error",
      timeout: "Request timed out"
    },
    de: {
      boot: [
        "KI-Assistent basierend auf Materialien von Jonas Hertner.",
        "Keine Rechtsberatung. Kein Mandatsverhältnis.",
        "",
        "Geben Sie Ihre Frage unten ein."
      ],
      hint: "ENTER senden · ESC schliessen",
      hintMobile: "Senden · Schliessen ×",
      thinking: "Verarbeitung",
      ready: "Bereit",
      error: "Fehler",
      timeout: "Zeitüberschreitung"
    },
    fr: {
      boot: [
        "Assistant IA basé sur des documents de Jonas Hertner.",
        "Pas de conseil juridique. Pas de relation avocat-client.",
        "",
        "Tapez votre question ci-dessous."
      ],
      hint: "ENTRÉE envoyer · ESC fermer",
      hintMobile: "Envoyer · Fermer ×",
      thinking: "Traitement",
      ready: "Prêt",
      error: "Erreur",
      timeout: "Délai dépassé"
    }
  };

  function currentLang() {
    const active = document.querySelector(".lang-btn.active");
    const id = active?.id || "";
    if (id === "lang-de") return "de";
    if (id === "lang-fr") return "fr";
    const htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (htmlLang.startsWith("de")) return "de";
    if (htmlLang.startsWith("fr")) return "fr";
    return "en";
  }

  function t(key) {
    const lang = currentLang();
    return L10N[lang]?.[key] || L10N.en[key] || key;
  }

  function isMobile() {
    return window.innerWidth <= 600;
  }

  // Animated dots for loading status
  function startLoadingDots() {
    let dotCount = 0;
    const baseText = t("thinking");

    function updateDots() {
      dotCount = (dotCount + 1) % 4;
      const dots = "·".repeat(dotCount || 1);
      if (statusEl) statusEl.textContent = baseText + " " + dots;
    }

    updateDots();
    dotsInterval = setInterval(updateDots, 400);
    document.body.classList.add("ask-loading");
  }

  function stopLoadingDots() {
    if (dotsInterval) {
      clearInterval(dotsInterval);
      dotsInterval = null;
    }
    document.body.classList.remove("ask-loading");
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function setHint() {
    if (hintEl) hintEl.textContent = isMobile() ? t("hintMobile") : t("hint");
  }

  function bootIfEmpty() {
    if (field.value.trim()) return;
    field.value = t("boot").join("\n") + "\n\n> ";
    questionIndex = field.value.length;
    conversationHistory.length = 0;
  }

  function focusEnd() {
    field.focus();
    const n = field.value.length;
    field.setSelectionRange(n, n);
    field.scrollTop = field.scrollHeight;
  }

  function scrollToBottom() {
    field.scrollTop = field.scrollHeight;
  }

  // Typewriter effect
  function typewriterAppend(text, callback) {
    let i = 0;

    function typeNext() {
      if (i < text.length) {
        field.value += text[i];
        i++;
        scrollToBottom();
        typewriterTimeout = setTimeout(typeNext, TYPEWRITER_SPEED);
      } else {
        typewriterTimeout = null;
        if (callback) callback();
      }
    }

    typeNext();
  }

  function cancelTypewriter() {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
  }

  function enterAskMode() {
    if (document.body.classList.contains("ask-mode")) return;

    document.body.classList.add("ask-mode");
    container.hidden = false;
    toggle.setAttribute("aria-expanded", "true");

    bootIfEmpty();
    setHint();
    setStatus(t("ready"));
    focusEnd();

    try {
      history.pushState({ ask: true }, "");
      pushedState = true;
    } catch {
      pushedState = false;
    }
  }

  function exitAskMode(fromPopstate = false) {
    if (!document.body.classList.contains("ask-mode")) return;

    // Cancel any pending operations
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    stopLoadingDots();
    cancelTypewriter();

    document.body.classList.remove("ask-mode", "ask-loading");
    container.hidden = true;
    toggle.setAttribute("aria-expanded", "false");

    if (!fromPopstate && pushedState) {
      try { history.back(); } catch { /* ignore */ }
    }
  }

  function extractQuestion() {
    const text = field.value.slice(questionIndex).trim();
    return text;
  }

  async function send() {
    if (busy) return;

    const q = extractQuestion();
    if (!q) return;

    busy = true;
    field.readOnly = true;
    startLoadingDots();

    // Ensure clean line ending
    if (!field.value.endsWith("\n")) field.value += "\n";
    field.value += "\n";
    scrollToBottom();

    // Add to history
    conversationHistory.push({ role: "user", content: q });

    // Setup abort controller with timeout
    abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), TIMEOUT_MS);

    let answerText = "";

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
        body: JSON.stringify({
          q,
          lang: currentLang(),
          page: location.pathname,
          history: conversationHistory.slice(-10)
        })
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.error || data?.message || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      answerText = typeof data?.answer === "string" ? data.answer : "";
      if (!answerText.trim()) answerText = "No response.";

      conversationHistory.push({ role: "assistant", content: answerText });

    } catch (err) {
      if (err.name === "AbortError") {
        answerText = `[${t("timeout")}]`;
      } else {
        answerText = `[${t("error")}: ${err.message || "Unknown error"}]`;
      }
    } finally {
      clearTimeout(timeoutId);
      abortController = null;
      stopLoadingDots();

      // Typewriter effect for response
      typewriterAppend(answerText, () => {
        field.value += "\n\n> ";
        questionIndex = field.value.length;
        busy = false;
        field.readOnly = false;
        setStatus(t("ready"));
        focusEnd();
      });
    }
  }

  // Event listeners
  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("ask-mode")) exitAskMode(false);
    else enterAskMode();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => exitAskMode(false));
  }

  window.addEventListener("popstate", () => {
    if (document.body.classList.contains("ask-mode")) exitAskMode(true);
  });

  window.addEventListener("resize", () => {
    if (document.body.classList.contains("ask-mode")) setHint();
  });

  field.addEventListener("keydown", (e) => {
    if (!document.body.classList.contains("ask-mode")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      exitAskMode(false);
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });

  // Prevent editing before the current prompt
  field.addEventListener("beforeinput", (e) => {
    if (busy) {
      e.preventDefault();
      return;
    }
    const start = field.selectionStart;
    if (start < questionIndex) {
      if (e.inputType.startsWith("delete") || e.inputType.startsWith("insert")) {
        e.preventDefault();
      }
    }
  });

  // Deep link support
  if (location.hash === "#ask") enterAskMode();
})();

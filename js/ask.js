(() => {
  const toggle = document.getElementById("ask-toggle");
  const container = document.getElementById("ask-container");
  const field = document.getElementById("ask-field");
  if (!toggle || !container || !field) return;

  const apiMeta = document.querySelector('meta[name="ask-api"]');
  const API = (apiMeta && (apiMeta.content || "").trim()) || "/api/ask";

  function isMobile() {
    return window.innerWidth <= 600;
  }

  const BOOT = {
    en: {
      desktop: [
        "ASK (AI)",
        "Ask about Jonas Hertner and his legal practice.",
        "AI answers—not legal advice—no confidential info.",
        "Include all context in one question (no memory).",
        "No data retained here. OpenAI store=false (exceptions: openai.com/enterprise-privacy).",
        "For representation: jh@jonashertner.com",
        "Enter to send. Esc to exit.",
        "",
        "> "
      ].join("\n"),
      mobile: [
        "ASK (AI)",
        "Ask about Jonas Hertner and his legal practice.",
        "AI answers—not legal advice—no confidential info.",
        "Include all context in one question (no memory).",
        "No data retained here. OpenAI store=false (exceptions: openai.com/enterprise-privacy).",
        "For representation: jh@jonashertner.com",
        "Enter to send. Back to exit.",
        "",
        "> "
      ].join("\n")
    },
    de: {
      desktop: [
        "ASK (AI)",
        "Fragen zu Jonas Hertner und seiner Anwaltspraxis.",
        "KI-Antworten—keine Rechtsberatung—keine vertraulichen Infos.",
        "Gesamten Kontext in einer Frage angeben (kein Gedächtnis).",
        "Keine Daten hier gespeichert. OpenAI store=false (Ausnahmen: openai.com/enterprise-privacy).",
        "Für Mandate: jh@jonashertner.com",
        "Enter zum Senden. Esc zum Schließen.",
        "",
        "> "
      ].join("\n"),
      mobile: [
        "ASK (AI)",
        "Fragen zu Jonas Hertner und seiner Anwaltspraxis.",
        "KI-Antworten—keine Rechtsberatung—keine vertraulichen Infos.",
        "Gesamten Kontext in einer Frage angeben (kein Gedächtnis).",
        "Keine Daten hier gespeichert. OpenAI store=false (Ausnahmen: openai.com/enterprise-privacy).",
        "Für Mandate: jh@jonashertner.com",
        "Enter zum Senden. Zurück zum Schließen.",
        "",
        "> "
      ].join("\n")
    },
    fr: {
      desktop: [
        "ASK (AI)",
        "Questions sur Jonas Hertner et sa pratique juridique.",
        "Réponses IA—pas de conseil juridique—pas d'infos confidentielles.",
        "Inclure tout le contexte en une question (pas de mémoire).",
        "Aucune donnée conservée ici. OpenAI store=false (exceptions: openai.com/enterprise-privacy).",
        "Pour un mandat: jh@jonashertner.com",
        "Entrée pour envoyer. Esc pour quitter.",
        "",
        "> "
      ].join("\n"),
      mobile: [
        "ASK (AI)",
        "Questions sur Jonas Hertner et sa pratique juridique.",
        "Réponses IA—pas de conseil juridique—pas d'infos confidentielles.",
        "Inclure tout le contexte en une question (pas de mémoire).",
        "Aucune donnée conservée ici. OpenAI store=false (exceptions: openai.com/enterprise-privacy).",
        "Pour un mandat: jh@jonashertner.com",
        "Entrée pour envoyer. Retour pour quitter.",
        "",
        "> "
      ].join("\n")
    }
  };

  const PROMPT = "\n> ";
  let busy = false;
  let pushedState = false;
  let dotsInterval = null;
  let dotsBase = "";

  function currentLang() {
    const active = document.querySelector(".lang-btn.active");
    const id = active ? active.id : "";
    if (id === "lang-de") return "de";
    if (id === "lang-fr") return "fr";
    const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (htmlLang.startsWith("de")) return "de";
    if (htmlLang.startsWith("fr")) return "fr";
    return "en";
  }

  function bootIfEmpty() {
    if ((field.value || "").trim().length) return;
    const lang = currentLang();
    const device = isMobile() ? "mobile" : "desktop";
    const boot = BOOT[lang] || BOOT.en;
    field.value = boot[device] || boot.desktop;
  }

  function startLoadingDots() {
    dotsBase = field.value;
    let dotCount = 0;

    function updateDots() {
      dotCount = (dotCount % 3) + 1;
      field.value = dotsBase + ".".repeat(dotCount);
      field.scrollTop = field.scrollHeight;
    }

    updateDots();
    dotsInterval = setInterval(updateDots, 400);
  }

  function stopLoadingDots() {
    if (dotsInterval) {
      clearInterval(dotsInterval);
      dotsInterval = null;
    }
    field.value = dotsBase;
  }

  function focusEnd() {
    field.focus();
    const n = field.value.length;
    field.setSelectionRange(n, n);
  }

  function enterAskMode() {
    if (document.body.classList.contains("ask-mode")) return;

    document.body.classList.add("ask-mode");
    container.hidden = false;
    toggle.setAttribute("aria-expanded", "true");

    bootIfEmpty();
    focusEnd();

    // Back button exits on mobile.
    try {
      history.pushState({ ask: true }, "");
      pushedState = true;
    } catch {
      pushedState = false;
    }
  }

  function exitAskMode(fromPopstate = false) {
    if (!document.body.classList.contains("ask-mode")) return;

    document.body.classList.remove("ask-mode");
    container.hidden = true;
    toggle.setAttribute("aria-expanded", "false");

    // Reset horizontal scroll to prevent iOS wiggle
    window.scrollTo(0, window.scrollY);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;

    if (!fromPopstate && pushedState) {
      try { history.back(); } catch { /* ignore */ }
    }
  }

  function extractQuestion() {
    const v = field.value || "";
    const idx = v.lastIndexOf(PROMPT);
    const q = (idx >= 0 ? v.slice(idx + PROMPT.length) : v).trim();
    return q;
  }

  async function send() {
    if (busy) return;

    const q = extractQuestion();
    if (!q) return;

    busy = true;
    field.readOnly = true;

    // Ensure the question is terminated (so responses append cleanly)
    if (!field.value.endsWith("\n")) field.value += "\n";
    field.value += "\n";
    field.scrollTop = field.scrollHeight;

    // Start animated dots
    startLoadingDots();

    let answerText = "";
    let sourcesLine = "";

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q,
          lang: currentLang(),
          page: location.pathname
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          (data && (data.error || data.message))
            ? String(data.error || data.message)
            : `Request failed (${res.status}).`;
        throw new Error(msg);
      }

      answerText = (data && typeof data.answer === "string") ? data.answer : "";
      if (!answerText.trim()) answerText = "No answer.";

      if (data && Array.isArray(data.sources) && data.sources.length) {
        sourcesLine = "Sources: " + data.sources.join(", ");
      }
    } catch (err) {
      const msg = (err && err.message) ? err.message : "Request failed.";
      answerText = "Error: " + msg;
    } finally {
      stopLoadingDots();

      const block = sourcesLine ? (answerText + "\n\n" + sourcesLine) : answerText;
      field.value += block + "\n\n> ";

      busy = false;
      field.readOnly = false;
      focusEnd();
    }
  }

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("ask-mode")) exitAskMode(false);
    else enterAskMode();
  });

  window.addEventListener("popstate", () => {
    if (document.body.classList.contains("ask-mode")) exitAskMode(true);
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

  if (location.hash === "#ask") enterAskMode();
})();

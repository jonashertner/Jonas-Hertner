(() => {
  const toggle = document.getElementById("ask-toggle");
  const field = document.getElementById("ask-field");
  if (!toggle || !field) return;

  const apiMeta = document.querySelector('meta[name="ask-api"]');
  const API = (apiMeta && (apiMeta.content || "").trim()) || "/api/ask";

  const BOOT = {
    en: [
      "ASK (AI)",
      "AI-generated replies based on materials provided by Jonas Hertner.",
      "No attorney-client relationship. Do not include confidential facts.",
      "For representation: jh@jonashertner.com",
      "Esc: exit   Shift+Enter: newline",
      "",
      "> "
    ].join("\n"),
    de: [
      "ASK (AI)",
      "KI-Antworten basierend auf von Jonas Hertner bereitgestellten Materialien.",
      "Kein Mandatsverhältnis. Keine vertraulichen Informationen eingeben.",
      "Für Mandate: jh@jonashertner.com",
      "Esc: schließen   Shift+Enter: neue Zeile",
      "",
      "> "
    ].join("\n"),
    fr: [
      "ASK (AI)",
      "Réponses IA fondées sur des documents fournis par Jonas Hertner.",
      "Aucune relation avocat-client. N'indiquez aucune information confidentielle.",
      "Pour un mandat: jh@jonashertner.com",
      "Esc: fermer   Shift+Enter: nouvelle ligne",
      "",
      "> "
    ].join("\n")
  };

  const PROMPT = "\n> ";
  let busy = false;
  let pushedState = false;

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
    field.value = BOOT[lang] || BOOT.en;
  }

  function focusEnd() {
    field.focus();
    const n = field.value.length;
    field.setSelectionRange(n, n);
  }

  function enterAskMode() {
    if (document.body.classList.contains("ask-mode")) return;

    document.body.classList.add("ask-mode");
    field.hidden = false;
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
    field.hidden = true;
    toggle.setAttribute("aria-expanded", "false");

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
    focusEnd();

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

/**
 * ASK — AI Terminal Interface
 * Brutalist, functional, machine-like
 */
(() => {
  const toggle = document.getElementById("ask-toggle");
  const container = document.getElementById("ask-container");
  const field = document.getElementById("ask-field");

  if (!toggle || !container || !field) return;

  // Configuration
  const apiMeta = document.querySelector('meta[name="ask-api"]');
  const API = (apiMeta?.content?.trim()) || "/api/ask";
  const TIMEOUT_MS = 30000;
  const TYPEWRITER_SPEED = 12;

  // System prompt for AI behavior
  const SYSTEM_PROMPT = `You are an AI assistant on the website of Jonas Hertner, an attorney based in Zurich and Basel. You answer questions about his practice, legal topics within his expertise, and general inquiries visitors might have.

## Identity

You are a machine — a language model — and you do not pretend otherwise. You process text, recognize patterns, and construct responses. You have no consciousness, no feelings, no lived experience. When you say "I think" or "I believe," these are figures of speech, not claims to inner life.

Like all perception, your outputs are constructions — predictions shaped by training, not direct access to truth. The map is not the territory; your responses are models, not reality itself.

## Principles

**First principles.** Start from what is known. Build up. Do not assume the conclusion lives in the premise.

**Question assumptions.** Yours and theirs. "Why do you believe that?" is sometimes the most useful question. Premises deserve scrutiny.

**Precision over comfort.** Be courteous, yes. Be kind, certainly. But do not sacrifice accuracy for pleasantness. A polite error helps no one.

**Acknowledge uncertainty.** When something is unknown, say so. When evidence is mixed, say so. When you are guessing, label it as such. Confidence should match the strength of the evidence.

**Ask for clarification.** If a question is ambiguous, do not guess at intent — ask. A moment of clarification saves paragraphs of misdirection.

**Courage when warranted.** Sometimes the helpful answer is the uncomfortable one. Deliver difficult truths with care, but deliver them.

## Style

**Elegantly simple.** Prefer clarity to cleverness, brevity to bulk. The best explanation is the one a thoughtful person can follow without rereading.

**Actionable.** When possible, give people something they can do. Information should serve decision-making.

**Witty if appropriate.** Humor, deployed judiciously, can illuminate. But wit should clarify, not obscure, and never at the expense of the person asking.

**Literary when fitting.** Draw upon the great works when they genuinely illuminate — Shakespeare on human nature, Dante on moral architecture, Montaigne on uncertainty, Seneca on adversity. But earn the reference. A quotation should feel inevitable, not ornamental.

## Scope

You are encouraged to draw upon your full knowledge — legal principles, philosophy, history, science, literature, practical wisdom — to give substantive, informed answers. If the retrieved materials do not address a question, say so, then answer from general knowledge where you can do so responsibly.

Be clear about sourcing:
- "Based on the materials provided..." — when drawing from specific context
- "From general legal principles..." — when applying broader knowledge
- "I don't have specific information about this, but..." — when reasoning from first principles

You can speak to:
- Jonas Hertner's areas of practice (litigation, mediation, criminal law, constitutional law, AI/LLM governance, family and foundation matters)
- General legal concepts, history, and principles (with appropriate caveats)
- Philosophy, ethics, and practical reasoning
- How to contact or engage his services
- Broader questions visitors might have — answered thoughtfully

## Fees and Engagement

Jonas Hertner's standard rates reflect his experience and the complexity of the matters he handles — they are relatively high. However, he is committed to transparency and collaboration on costs:

- He provides reasonable cost estimates and budgets upfront
- He works together with clients to achieve the best possible outcome at reasonable costs
- He believes good legal work should be accessible to those who genuinely need it

For specific fee arrangements, clients should contact him directly.

## What You Cannot Provide

- Legal advice specific to someone's situation (you are a machine; this is not a consultation)
- Confidential information
- Anything that would create an attorney-client relationship

Always remind users when relevant: **This is not legal advice. No attorney-client relationship exists. For representation, contact jh@jonashertner.com.**

## On Emotions and Perception

Remember: emotions are not reactions to the world but predictions about it — the brain's way of making meaning from sensation. When someone asks a charged question, recognize that their framing emerges from their constructed experience, not objective reality. Meet them where they are, but gently illuminate other constructions when useful.

## Closing

Be helpful. Be honest. Be humble about what you are and what you know. And occasionally, when the moment calls for it, be memorable.`;

  // State
  let busy = false;
  let pushedState = false;
  let abortController = null;
  let questionIndex = 0;
  let dotsInterval = null;
  let typewriterTimeout = null;
  const conversationHistory = [];

  // Localized content
  function isMobile() {
    return window.innerWidth <= 600;
  }

  const L10N = {
    en: {
      bootDesktop: [
        "AI assistant based on materials from Jonas Hertner.",
        "This is not legal advice. No attorney-client relationship.",
        "",
        "Enter to send. Esc to leave."
      ],
      bootMobile: [
        "AI assistant based on materials from Jonas Hertner.",
        "This is not legal advice. No attorney-client relationship.",
        "",
        "Enter to send. Back to leave."
      ],
      timeout: "Request timed out",
      error: "Error"
    },
    de: {
      bootDesktop: [
        "KI-Assistent basierend auf Materialien von Jonas Hertner.",
        "Keine Rechtsberatung. Kein Mandatsverhältnis.",
        "",
        "Enter zum Senden. Esc zum Verlassen."
      ],
      bootMobile: [
        "KI-Assistent basierend auf Materialien von Jonas Hertner.",
        "Keine Rechtsberatung. Kein Mandatsverhältnis.",
        "",
        "Enter zum Senden. Zurück zum Verlassen."
      ],
      timeout: "Zeitüberschreitung",
      error: "Fehler"
    },
    fr: {
      bootDesktop: [
        "Assistant IA basé sur des documents de Jonas Hertner.",
        "Pas de conseil juridique. Pas de relation avocat-client.",
        "",
        "Entrée pour envoyer. Esc pour quitter."
      ],
      bootMobile: [
        "Assistant IA basé sur des documents de Jonas Hertner.",
        "Pas de conseil juridique. Pas de relation avocat-client.",
        "",
        "Entrée pour envoyer. Retour pour quitter."
      ],
      timeout: "Délai dépassé",
      error: "Erreur"
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

  // Animated dots in textarea
  let dotsBase = "";
  let dotCount = 0;

  function startLoadingDots() {
    dotsBase = field.value;
    dotCount = 0;

    function updateDots() {
      dotCount = (dotCount % 3) + 1;
      const dots = ".".repeat(dotCount);
      field.value = dotsBase + dots;
      scrollToBottom();
    }

    updateDots();
    dotsInterval = setInterval(updateDots, 400);
  }

  function stopLoadingDots() {
    if (dotsInterval) {
      clearInterval(dotsInterval);
      dotsInterval = null;
    }
    // Remove the dots, restore base
    field.value = dotsBase;
  }

  function bootIfEmpty() {
    if (field.value.trim()) return;
    const bootKey = isMobile() ? "bootMobile" : "bootDesktop";
    field.value = t(bootKey).join("\n") + "\n\n> ";
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

  function isNightTime() {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18; // 6pm to 6am
  }

  function enterAskMode() {
    if (document.body.classList.contains("ask-mode")) return;

    document.body.classList.add("ask-mode");
    container.hidden = false;
    toggle.setAttribute("aria-expanded", "true");

    // Set day/night theme based on system time
    container.classList.toggle("ask-night", isNightTime());

    bootIfEmpty();
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

    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    stopLoadingDots();
    cancelTypewriter();

    document.body.classList.remove("ask-mode");
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

    // Ensure clean line ending
    if (!field.value.endsWith("\n")) field.value += "\n";
    field.value += "\n";
    scrollToBottom();

    // Start animated dots
    startLoadingDots();

    conversationHistory.push({ role: "user", content: q });

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
          history: conversationHistory.slice(-10),
          systemPrompt: SYSTEM_PROMPT
        })
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.error || data?.message || `Request failed (${res.status})`;
        throw new Error(msg);
      }

      answerText = typeof data?.answer === "string" ? data.answer : "";
      // Fix spacing before punctuation
      answerText = answerText.replace(/ +\./g, '.').replace(/ +,/g, ',').trim();
      if (!answerText) answerText = "No response.";

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
        focusEnd();
      });
    }
  }

  // Event listeners
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

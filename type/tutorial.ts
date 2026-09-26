const page = document.body;
const course = page.dataset.course;

if (course) {
  const storageKey = `ts-lab-progress-${course}`;
  const lessons = [...document.querySelectorAll<HTMLElement>('[data-lesson]')];
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-lesson-link]')];
  const bar = document.querySelector<HTMLElement>('[data-progress-bar]');
  const label = document.querySelector<HTMLElement>('[data-progress-label]');

  const readProgress = (): Set<string> => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]') as unknown;
      return new Set(Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : []);
    } catch {
      return new Set<string>();
    }
  };

  const progress = readProgress();

  const renderProgress = (): void => {
    const total = lessons.length;
    const done = lessons.filter((lesson) => {
      const id = lesson.dataset.lesson;
      return id ? progress.has(id) : false;
    }).length;
    const percentage = total ? Math.round((done / total) * 100) : 0;

    if (bar) bar.style.width = `${percentage}%`;
    if (label) {
      const unit = course === 'practice' ? 'desafíos completados' : 'módulos completados';
      label.textContent = `${done} de ${total} ${unit} · ${percentage}%`;
    }

    lessons.forEach((lesson) => {
      const id = lesson.dataset.lesson;
      if (!id) return;

      const button = lesson.querySelector<HTMLButtonElement>('[data-complete]');
      const link = navLinks.find((item) => item.dataset.lessonLink === id);
      const complete = progress.has(id);

      button?.classList.toggle('is-complete', complete);
      if (button) button.textContent = complete ? 'Módulo completado' : 'Marcar como completado';
      link?.classList.toggle('is-complete', complete);
    });
  };

  document.querySelectorAll<HTMLButtonElement>('[data-complete]').forEach((button) => {
    button.addEventListener('click', () => {
      const lesson = button.closest<HTMLElement>('[data-lesson]');
      const id = lesson?.dataset.lesson;
      if (!id) return;

      progress.has(id) ? progress.delete(id) : progress.add(id);
      localStorage.setItem(storageKey, JSON.stringify([...progress]));
      renderProgress();
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const block = button.closest('.code-block')?.querySelector<HTMLElement>('code');
      if (!block) return;

      try {
        await navigator.clipboard.writeText(block.textContent || '');
        const original = button.textContent;
        button.textContent = 'Copiado';
        window.setTimeout(() => { button.textContent = original; }, 1200);
      } catch {
        button.textContent = 'Seleccioná y copiá';
      }
    });
  });

  document.querySelectorAll<HTMLElement>('[data-quiz]').forEach((quiz) => {
    const feedback = quiz.querySelector<HTMLElement>('[data-feedback]');

    quiz.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach((option) => {
      option.addEventListener('click', () => {
        quiz.querySelectorAll<HTMLElement>('[data-answer]').forEach((item) => {
          item.classList.remove('is-correct', 'is-wrong');
        });

        const correct = option.dataset.answer === 'true';
        option.classList.add(correct ? 'is-correct' : 'is-wrong');
        if (feedback) {
          feedback.textContent = correct
            ? 'Correcto. Podés continuar.'
            : 'Todavía no. Revisá el concepto y probá otra opción.';
        }
      });
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!(visible?.target instanceof HTMLElement)) return;
      const activeId = visible.target.dataset.lesson;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.lessonLink === activeId);
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, .2, .5]
    });

    lessons.forEach((lesson) => observer.observe(lesson));
  }

  renderProgress();
}

"use strict";
const page = document.body;
const course = page.dataset.course;
if (course) {
    const storageKey = `ts-lab-progress-${course}`;
    const lessons = [...document.querySelectorAll('[data-lesson]')];
    const navLinks = [...document.querySelectorAll('[data-lesson-link]')];
    const bar = document.querySelector('[data-progress-bar]');
    const label = document.querySelector('[data-progress-label]');
    const readProgress = () => {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
            return new Set(Array.isArray(stored) ? stored.filter((item) => typeof item === 'string') : []);
        }
        catch {
            return new Set();
        }
    };
    const progress = readProgress();
    const renderProgress = () => {
        const total = lessons.length;
        const done = lessons.filter((lesson) => {
            const id = lesson.dataset.lesson;
            return id ? progress.has(id) : false;
        }).length;
        const percentage = total ? Math.round((done / total) * 100) : 0;
        if (bar)
            bar.style.width = `${percentage}%`;
        if (label)
            label.textContent = `${done} de ${total} módulos completados · ${percentage}%`;
        lessons.forEach((lesson) => {
            const id = lesson.dataset.lesson;
            if (!id)
                return;
            const button = lesson.querySelector('[data-complete]');
            const link = navLinks.find((item) => item.dataset.lessonLink === id);
            const complete = progress.has(id);
            button?.classList.toggle('is-complete', complete);
            if (button)
                button.textContent = complete ? 'Módulo completado' : 'Marcar como completado';
            link?.classList.toggle('is-complete', complete);
        });
    };
    document.querySelectorAll('[data-complete]').forEach((button) => {
        button.addEventListener('click', () => {
            const lesson = button.closest('[data-lesson]');
            const id = lesson?.dataset.lesson;
            if (!id)
                return;
            progress.has(id) ? progress.delete(id) : progress.add(id);
            localStorage.setItem(storageKey, JSON.stringify([...progress]));
            renderProgress();
        });
    });
    document.querySelectorAll('[data-copy]').forEach((button) => {
        button.addEventListener('click', async () => {
            const block = button.closest('.code-block')?.querySelector('code');
            if (!block)
                return;
            try {
                await navigator.clipboard.writeText(block.textContent || '');
                const original = button.textContent;
                button.textContent = 'Copiado';
                window.setTimeout(() => { button.textContent = original; }, 1200);
            }
            catch {
                button.textContent = 'Seleccioná y copiá';
            }
        });
    });
    document.querySelectorAll('[data-quiz]').forEach((quiz) => {
        const feedback = quiz.querySelector('[data-feedback]');
        quiz.querySelectorAll('[data-answer]').forEach((option) => {
            option.addEventListener('click', () => {
                quiz.querySelectorAll('[data-answer]').forEach((item) => {
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
            if (!(visible?.target instanceof HTMLElement))
                return;
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

import { courses, glossary, practiceMeta, totalLearningUnits } from "./learning/catalog.js";
const storageKeys = {
    typescript: "ts-lab-progress-typescript",
    sass: "ts-lab-progress-sass",
    practice: "ts-lab-progress-practice"
};
const readStringArray = (key) => {
    try {
        const parsed = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
    }
    catch {
        return [];
    }
};
const readProgress = () => ({
    typescript: readStringArray(storageKeys.typescript),
    sass: readStringArray(storageKeys.sass),
    practice: readStringArray(storageKeys.practice)
});
const getCourse = (id) => courses.find((course) => course.id === id);
const percent = (done, total) => total ? Math.round((done / total) * 100) : 0;
const updateProgressBars = () => {
    const progress = readProgress();
    const tsDone = progress.typescript.length;
    const sassDone = progress.sass.length;
    const practiceDone = progress.practice.length;
    const globalDone = tsDone + sassDone + practiceDone;
    const globalPercent = percent(globalDone, totalLearningUnits);
    document.querySelectorAll("[data-global-progress]").forEach((element) => {
        element.textContent = `${globalPercent}%`;
    });
    document.querySelectorAll("[data-global-progress-bar]").forEach((element) => {
        element.style.width = `${globalPercent}%`;
    });
    document.querySelectorAll("[data-global-completed]").forEach((element) => {
        element.textContent = `${globalDone} / ${totalLearningUnits}`;
    });
    ["typescript", "sass", "practice"].forEach((id) => {
        const total = id === "practice" ? practiceMeta.total : getCourse(id)?.lessons.length ?? 0;
        const done = progress[id].length;
        const value = percent(done, total);
        document.querySelectorAll(`[data-course-progress="${id}"]`).forEach((element) => {
            element.textContent = `${value}%`;
        });
        document.querySelectorAll(`[data-course-progress-bar="${id}"]`).forEach((element) => {
            element.style.width = `${value}%`;
        });
        document.querySelectorAll(`[data-course-completed="${id}"]`).forEach((element) => {
            element.textContent = `${done} de ${total}`;
        });
    });
};
const getContinueHref = (id) => {
    if (id === "practice") {
        const last = localStorage.getItem("ats-lab-last-practice") || "p-01";
        return `./practice.html#${last}`;
    }
    const course = getCourse(id);
    if (!course)
        return "./index.html";
    const last = localStorage.getItem(`ats-lab-last-${id}`) || course.lessons[0]?.id;
    return `${course.href}#${last}`;
};
const renderContinueLinks = () => {
    ["typescript", "sass", "practice"].forEach((id) => {
        document.querySelectorAll(`[data-continue="${id}"]`).forEach((link) => {
            link.href = getContinueHref(id);
        });
    });
};
const bookmarkKey = "ats-lab-bookmarks";
const getBookmarks = () => readStringArray(bookmarkKey);
const setBookmarks = (bookmarks) => {
    localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
};
const findLesson = (id) => {
    for (const course of courses) {
        const lesson = course.lessons.find((item) => item.id === id);
        if (lesson)
            return { courseId: course.id, lesson };
    }
    return null;
};
const renderBookmarks = () => {
    const container = document.querySelector("[data-bookmarks]");
    if (!container)
        return;
    const bookmarks = getBookmarks()
        .map(findLesson)
        .filter((item) => Boolean(item));
    if (!bookmarks.length) {
        container.innerHTML = '<p class="platform-empty">Todavía no guardaste módulos. Usá “Guardar” dentro de una lección para armar tu lista de repaso.</p>';
        return;
    }
    container.innerHTML = bookmarks.map(({ courseId, lesson }) => {
        const course = getCourse(courseId);
        return `<a class="bookmark-card" href="${course?.href ?? "./index.html"}#${lesson.id}">
      <span>${lesson.level}</span>
      <strong>${lesson.title}</strong>
      <small>${course?.shortTitle ?? courseId} · ${lesson.minutes} min</small>
    </a>`;
    }).join("");
};
const injectLessonEnhancements = () => {
    const courseId = document.body.dataset.course;
    const course = getCourse(courseId);
    if (!course)
        return;
    const bookmarks = new Set(getBookmarks());
    document.querySelectorAll("[data-lesson]").forEach((section) => {
        const id = section.dataset.lesson;
        const meta = course.lessons.find((lesson) => lesson.id === id);
        if (!id || !meta || section.querySelector(".lesson-overview"))
            return;
        const heading = section.querySelector("h2");
        if (!heading)
            return;
        const overview = document.createElement("div");
        overview.className = "lesson-overview";
        overview.innerHTML = `
      <div class="lesson-overview__meta">
        <span class="level-pill">${meta.level}</span>
        <span>${meta.minutes} min</span>
      </div>
      <div class="lesson-overview__objectives">
        <strong>Al terminar vas a poder</strong>
        <ul>${meta.objectives.map((objective) => `<li>${objective}</li>`).join("")}</ul>
      </div>
      <div class="lesson-overview__actions">
        <button class="bookmark-button ${bookmarks.has(id) ? "is-bookmarked" : ""}" type="button" data-bookmark="${id}">
          ${bookmarks.has(id) ? "Guardado" : "Guardar"}
        </button>
        ${meta.labHref ? `<a class="lesson-lab-link" href="${meta.labHref}">Ver en laboratorio →</a>` : ""}
      </div>`;
        heading.insertAdjacentElement("afterend", overview);
    });
    document.querySelectorAll("[data-bookmark]").forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.bookmark;
            if (!id)
                return;
            const next = new Set(getBookmarks());
            next.has(id) ? next.delete(id) : next.add(id);
            setBookmarks([...next]);
            const active = next.has(id);
            button.classList.toggle("is-bookmarked", active);
            button.textContent = active ? "Guardado" : "Guardar";
            renderBookmarks();
        });
    });
};
const trackLastLesson = () => {
    const courseId = document.body.dataset.course;
    if (!courseId || !["typescript", "sass", "practice"].includes(courseId))
        return;
    const lessons = [...document.querySelectorAll("[data-lesson]")];
    if (!lessons.length || !("IntersectionObserver" in window))
        return;
    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!(visible?.target instanceof HTMLElement))
            return;
        const id = visible.target.dataset.lesson;
        if (id)
            localStorage.setItem(`ats-lab-last-${courseId}`, id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .25, .5] });
    lessons.forEach((lesson) => observer.observe(lesson));
};
const buildSearchIndex = () => [
    ...courses.flatMap((course) => course.lessons.map((lesson) => ({
        kind: "Módulo",
        title: lesson.title,
        meta: `${course.shortTitle} · ${lesson.level} · ${lesson.minutes} min`,
        text: [lesson.title, lesson.level, ...lesson.keywords, ...lesson.objectives].join(" ").toLowerCase(),
        href: `${course.href}#${lesson.id}`
    }))),
    ...glossary.map((item) => ({
        kind: "Glosario",
        title: item.term,
        meta: item.course,
        text: `${item.term} ${item.course} ${item.definition}`.toLowerCase(),
        href: "#",
        definition: item.definition
    }))
];
const initSearch = () => {
    const inputs = [...document.querySelectorAll("[data-learning-search]")];
    if (!inputs.length)
        return;
    const index = buildSearchIndex();
    inputs.forEach((input) => {
        const results = input.parentElement?.querySelector("[data-search-results]")
            ?? document.querySelector("[data-search-results]");
        const render = () => {
            if (!results)
                return;
            const query = input.value.trim().toLowerCase();
            if (query.length < 2) {
                results.innerHTML = '<p class="platform-empty">Buscá “unknown”, “mixins”, “DOM”, “tokens”, “async”…</p>';
                return;
            }
            const matches = index.filter((item) => item.text.includes(query)).slice(0, 8);
            results.innerHTML = matches.length ? matches.map((item) => {
                if ("definition" in item && item.definition) {
                    return `<article class="search-result"><span>${item.kind} · ${item.meta}</span><strong>${item.title}</strong><p>${item.definition}</p></article>`;
                }
                return `<a class="search-result" href="${item.href}"><span>${item.kind} · ${item.meta}</span><strong>${item.title}</strong></a>`;
            }).join("") : '<p class="platform-empty">No encontré coincidencias en el campus.</p>';
        };
        input.addEventListener("input", render);
        render();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
            return;
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)
            return;
        const first = inputs[0];
        if (!first)
            return;
        event.preventDefault();
        first.focus();
    });
};
const renderCourseRoadmap = () => {
    const course = getCourse(document.body.dataset.course);
    const sidebar = document.querySelector(".lesson-sidebar");
    if (!course || !sidebar)
        return;
    const existing = sidebar.querySelector(".course-roadmap");
    existing?.remove();
    const completed = new Set(readStringArray(storageKeys[course.id]));
    const levels = ["Fundamentos", "Intermedio", "Avanzado", "Profesional"];
    const roadmap = document.createElement("div");
    roadmap.className = "course-roadmap";
    roadmap.innerHTML = levels.map((level) => {
        const lessons = course.lessons.filter((lesson) => lesson.level === level);
        const done = lessons.filter((lesson) => completed.has(lesson.id)).length;
        const first = lessons[0];
        return `<a href="#${first?.id ?? ""}">
      <span>${level}</span>
      <strong>${done}/${lessons.length}</strong>
    </a>`;
    }).join("");
    const title = sidebar.querySelector(".lesson-sidebar__title");
    title?.insertAdjacentElement("afterend", roadmap);
};
const initCourseSidebarSearch = () => {
    const sidebar = document.querySelector(".lesson-sidebar");
    const nav = sidebar?.querySelector(".lesson-nav");
    const course = getCourse(document.body.dataset.course);
    if (!sidebar || !nav || !course || sidebar.querySelector(".lesson-filter"))
        return;
    const wrapper = document.createElement("div");
    wrapper.className = "lesson-filter";
    wrapper.innerHTML = '<label for="lesson-filter-input">Buscar en esta ruta</label><input id="lesson-filter-input" type="search" placeholder="Ej. generics, DOM, async…">';
    nav.insertAdjacentElement("beforebegin", wrapper);
    const input = wrapper.querySelector("input");
    input?.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        nav.querySelectorAll("[data-lesson-link]").forEach((link) => {
            const meta = course.lessons.find((lesson) => lesson.id === link.dataset.lessonLink);
            const haystack = meta ? [meta.title, meta.level, ...meta.keywords].join(" ").toLowerCase() : link.textContent?.toLowerCase() ?? "";
            link.hidden = Boolean(query) && !haystack.includes(query);
        });
    });
};
const renderDashboard = () => {
    updateProgressBars();
    renderContinueLinks();
    renderBookmarks();
};
const initPlatform = () => {
    renderDashboard();
    renderCourseRoadmap();
    injectLessonEnhancements();
    trackLastLesson();
    initSearch();
    initCourseSidebarSearch();
    window.addEventListener("storage", () => renderDashboard());
    document.addEventListener("ats:learning-progress", () => {
        renderDashboard();
        renderCourseRoadmap();
    });
};
document.addEventListener("DOMContentLoaded", initPlatform);
//# sourceMappingURL=platform.js.map
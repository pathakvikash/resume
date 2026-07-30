import {
  profileData,
  sectionsData,
  aboutData,
  workData,
  projectsData,
  experiencesData,
  skillsData,
  notesData,
  educationData,
  certificationsData,
  courseworkData,
} from './data.js';

/*=============== UTILITY FUNCTIONS ===============*/

function createElement(tag, className, content = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.textContent = content;
  return element;
}

function appendChildren(parent, ...children) {
  children.filter(Boolean).forEach((child) => parent.appendChild(child));
}

function createList(items, className = '') {
  const ul = createElement('ul', className);
  items.forEach((item) => ul.appendChild(createElement('li', '', item)));
  return ul;
}

function createLink(href, className, text, external = true) {
  const link = createElement('a', className, text);
  link.href = href;
  if (external) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  return link;
}

function createParagraphs(texts, className = '') {
  const fragment = document.createDocumentFragment();
  texts.forEach((text) =>
    fragment.appendChild(createElement('p', className, text))
  );
  return fragment;
}

function mount(id, node) {
  const container = document.getElementById(id);
  if (!container) return;
  container.appendChild(node);
}

/* The system tints tags from the ramps; `tone` picks which ramp. */
function createTag(tag) {
  return createElement('span', `tag tag-${tag.tone || 'neutral'}`, tag.label);
}

function revealable(element) {
  element.dataset.reveal = '';
  return element;
}

/*=============== COMPONENT HELPERS ===============*/

function createMasthead() {
  const title = document.getElementById('masthead-title');
  profileData.headline.forEach((line) =>
    title.appendChild(createElement('span', 'line', line))
  );
  document.getElementById('masthead-lede').textContent = profileData.lede;

  const mail = document.getElementById('masthead-mail');
  mail.href = `mailto:${profileData.email}`;
}

function createNavLinks() {
  const nav = document.getElementById('nav-links');
  sectionsData
    .filter((section) => section.nav)
    .forEach((section) =>
      nav.appendChild(createLink(`#${section.id}`, '', section.nav, false))
    );
}

function createDateline() {
  const dateline = document.getElementById('dateline');
  profileData.dateline.forEach((item) =>
    dateline.appendChild(createElement('span', '', item))
  );
  if (profileData.available) {
    dateline.appendChild(createElement('span', 'available', 'Open to roles'));
  }
  dateline.appendChild(createElement('span', '', profileData.edition));
}

const folio = (index) => String(index + 1).padStart(2, '0');

function createContents() {
  const contents = document.getElementById('contents');
  sectionsData.forEach((section) => {
    const row = createElement('p', 'contents-row');
    row.appendChild(createLink(`#${section.id}`, '', section.label, false));
    contents.appendChild(row);
  });
}

/* The kicker names its section — no folio: the deck no longer numbers itself. */
function createKickers() {
  sectionsData.forEach((section) => {
    const kicker = document.querySelector(`.kicker[data-section="${section.id}"]`);
    if (kicker) kicker.textContent = section.label;
  });
}

function createAbout() {
  document.getElementById('about-heading').textContent = aboutData.heading;
  mount('about-body', createParagraphs(aboutData.paragraphs));
}

function createWorkItem(work) {
  const item = revealable(createElement('article', 'work-item'));
  const body = createElement('div', 'work-body');
  body.appendChild(createParagraphs(work.body));

  const tags = createElement('div', 'tag-row');
  work.tags.forEach((tag) => tags.appendChild(createTag(tag)));
  if (work.repo) {
    tags.appendChild(
      createLink(work.repo, 'work-repo', 'Read the code on GitHub')
    );
  }

  appendChildren(
    item,
    createElement('h3', 'work-title', work.title),
    createElement('p', 'work-subtitle', work.subtitle),
    body,
    tags
  );
  return item;
}

function createProjectCard(project) {
  const card = revealable(createElement('article', 'card'));
  const meta = createElement('div', 'card-meta');

  /* Not everything worth showing is deployed — a card with no live link prints
     the repo alone rather than a dead "Live". */
  if (project.link) {
    const separator = createElement('span', '', '·');
    separator.setAttribute('aria-hidden', 'true');
    appendChildren(meta, createLink(project.link, '', 'Live'), separator);
  }
  meta.appendChild(createLink(project.gitrepo, '', 'Repo'));

  appendChildren(
    card,
    createElement('h4', 'card-title', project.title),
    createElement('p', 'card-body', project.description),
    meta
  );
  return card;
}

/* One branch of the tree: the marker draws the rule and dot back to the spine,
   then the role hangs off it. The role held today prints a solid dot. */
function createTimelineItem(experience, index) {
  const item = revealable(
    createElement('article', index === 0 ? 'exp-item is-current' : 'exp-item')
  );
  const marker = createElement('span', 'exp-marker');
  marker.setAttribute('aria-hidden', 'true');

  appendChildren(
    item,
    marker,
    createElement('p', 'exp-period', experience.period),
    createElement('h3', 'exp-role', experience.title),
    createElement('p', 'exp-org', experience.org),
    createList(experience.description, 'exp-points')
  );
  return item;
}

/*=============== THE LEAVES ===============*/

/* A panel is one leaf of the deck: it takes the screen, and the next takes its
   place. `nav` is the section it belongs to — several leaves can share one, so
   the header keeps a section lit across all of its panels. */
function createPanel(nav, ...children) {
  const panel = createElement('section', 'panel');
  panel.dataset.nav = nav;
  const wrap = createElement('div', 'wrap');
  appendChildren(wrap, ...children);
  panel.appendChild(wrap);
  return panel;
}

/* The kicker at the head of a leaf. It repeats on every leaf of a section —
   four leaves of Experience all say 03 — Experience — so the reader always
   knows which part of the paper they are in. */
function sectionKicker(id) {
  const section = sectionsData.find((entry) => entry.id === id);
  return revealable(createElement('span', 'kicker', section.label));
}

/* Selected work: one system to a leaf, then the shipped index. Only the first
   carries the section's headline. */
function createWorkPanels() {
  const host = document.getElementById('work-panels');

  workData.forEach((work, index) => {
    const head = [sectionKicker('work')];
    if (index === 0) {
      const title = revealable(
        createElement(
          'h2',
          'section-title section-title-lead',
          'Three systems, built end to end.'
        )
      );
      head.push(title);
    }
    const panel = createPanel('work', ...head, createWorkItem(work));
    if (index === 0) panel.id = 'work';
    host.appendChild(panel);
  });

  const shipped = createElement('div', 'also-grid');
  projectsData.forEach((project) => shipped.appendChild(createProjectCard(project)));
  host.appendChild(
    createPanel(
      'work',
      sectionKicker('work'),
      revealable(createElement('h3', 'subhead', 'Also shipped')),
      shipped
    )
  );
}

/* Experience: the whole run on one leaf, the rail carrying all four roles.

   It was one role to a leaf, and it read badly — a couple of lines marooned
   in the middle of a screen, with the next role a gesture away. The tree only
   works as a tree when you can see the chronology at once, so the four roles
   sit close together on a single leaf. On a screen too short to hold them the
   leaf is marked tall and scrolls under the reader's own hand, which is the
   smoother of the two readings anyway. */
function createExperiencePanels() {
  const host = document.getElementById('experience-panels');

  const timeline = createElement('div', 'timeline');
  experiencesData.forEach((experience, index) =>
    timeline.appendChild(createTimelineItem(experience, index))
  );

  const panel = createPanel(
    'experience',
    sectionKicker('experience'),
    revealable(
      createElement(
        'h2',
        'section-title section-title-lead',
        'From product surfaces to the model layer.'
      )
    ),
    timeline
  );
  panel.classList.add('panel-experience');
  panel.id = 'experience';
  host.appendChild(panel);
}

function createSkillItem(skillCategory) {
  const group = revealable(createElement('div', 'stack-group'));
  const heading = createElement(
    'h4',
    skillCategory.tone === 'accent-2' ? 'subhead subhead-accent-2' : 'subhead',
    skillCategory.title
  );
  appendChildren(
    group,
    heading,
    createElement('p', '', skillCategory.description)
  );
  return group;
}

function createNoteItem(note) {
  const article = revealable(createElement('article'));
  appendChildren(
    article,
    createElement('h3', 'note-title', note.title),
    createElement('p', '', note.body)
  );
  return article;
}

function createEducationItem(eduItem) {
  const line = createElement('p');
  line.appendChild(createElement('strong', '', eduItem.degree));
  line.appendChild(document.createTextNode(' — '));
  line.appendChild(
    eduItem.link
      ? createLink(eduItem.link, '', eduItem.name)
      : document.createTextNode(eduItem.name)
  );
  const trailing = [eduItem.date, eduItem.score && `aggregate ${eduItem.score}`]
    .filter(Boolean)
    .join(', ');
  if (trailing) line.appendChild(document.createTextNode(` (${trailing})`));
  return line;
}

function createCertificationItem(cert) {
  const line = createElement('p');
  line.appendChild(createLink(cert.url, '', `${cert.title} — ${cert.org}`));
  return line;
}

function createCourseItem(courseCategory) {
  const group = createElement('div', 'course-group');
  appendChildren(
    group,
    createElement('h5', 'subhead', courseCategory.title),
    createList(courseCategory.courses)
  );
  return group;
}

function createContactActions() {
  const row = document.getElementById('contact-actions');
  const actions = [
    {
      label: profileData.email,
      href: `mailto:${profileData.email}`,
      primary: true,
    },
    {
      label: profileData.phone,
      href: `tel:${profileData.phone.replace(/\s/g, '')}`,
    },
    { label: 'GitHub', href: 'https://github.com/pathakvikash', external: true },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vikash-pathak-298a01183/',
      external: true,
    },
    { label: 'Download résumé', href: profileData.resume, external: true },
  ];

  actions.forEach((action) =>
    row.appendChild(
      createLink(
        action.href,
        `btn ${action.primary ? 'btn-primary' : 'btn-secondary'}`,
        action.label,
        Boolean(action.external)
      )
    )
  );
}

function createColophon() {
  const colophon = document.getElementById('colophon');
  [profileData.name, profileData.location, profileData.updated].forEach((item) =>
    colophon.appendChild(createElement('span', '', item))
  );
}

/*=============== COMPONENT GENERATORS ===============*/

function generateComponents(containerId, data, itemCreator) {
  const container = document.getElementById(containerId);
  if (!container) return;
  data.forEach((item, index) => container.appendChild(itemCreator(item, index)));
}

/*=============== THEME ===============*/

/* Two editions of the same sheet: paper and ink. The choice follows the system
   preference until the reader overrides it, and the override is remembered.
   The ground itself is set by the inline script in the head, before paint —
   this only wires the switch. */
const THEME_KEY = 'selected-theme';

const THEME_ICONS = {
  // shown while the light edition is on: press the switch for the dark one
  light: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.6A8.5 8.5 0 1 1 9.4 3.5a6.8 6.8 0 0 0 11.1 11.1Z"/></svg>`,
  dark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4 7 7M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/></svg>`,
};

function initTheme() {
  const button = document.getElementById('theme-button');
  if (!button) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    button.innerHTML = THEME_ICONS[theme];
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to the light edition' : 'Switch to the dark edition'
    );
    button.title = button.getAttribute('aria-label');
  };

  apply(
    localStorage.getItem(THEME_KEY) || (media.matches ? 'dark' : 'light')
  );

  button.addEventListener('click', () => {
    const next =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    apply(next);
  });

  // follow the system until the reader has picked a side
  media.addEventListener('change', (event) => {
    if (localStorage.getItem(THEME_KEY)) return;
    apply(event.matches ? 'dark' : 'light');
  });
}

/*=============== THE PRESS LEAN ===============*/

/* The plate numerals read --press-nx/--press-ny as a bare -1..1 factor and
   scale it to their own misregistration, so the process plates drift a breath
   toward the cursor while the cyan plate holds — a press bed shifting under
   the hand. Absent (or under reduced motion) the factors default to 0 and the
   numerals sit square, which is why this is the whole of it. */
function initPressLean() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const root = document.documentElement;
  let frame = null;
  let x = 0;
  let y = 0;

  const publish = () => {
    frame = null;
    root.style.setProperty('--press-nx', x.toFixed(3));
    root.style.setProperty('--press-ny', y.toFixed(3));
  };

  addEventListener(
    'pointermove',
    (event) => {
      x = (2 * event.clientX) / window.innerWidth - 1;
      y = (2 * event.clientY) / window.innerHeight - 1;
      if (frame === null) frame = requestAnimationFrame(publish);
    },
    { passive: true }
  );
}

/*=============== THE SNAP OFFSET ===============*/

/* The scroll settles a section's top under the sticky header rather than
   behind it. The CSS carries a sensible fallback; this keeps it exact as the
   bar reflows — the nav loses its links on a narrow screen, so its height is
   not a constant. */
function initSnapOffset() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const measure = () =>
    document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);

  measure();
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(nav);
  else addEventListener('resize', measure, { passive: true });
}

/*=============== SCROLL EFFECTS ===============*/

/* Reveal — items lift in as they reach the viewport rather than all at once,
   staggered when several arrive together. Because a leaf lands whole, its run
   comes due in the same frame and the stagger reads as the panel printing
   itself: kicker, then headline a beat behind, then the body. Whatever is on
   the first screen at load is never armed (the masthead should not fade in),
   and with JavaScript off nothing is ever hidden.

   This is a position sweep rather than an IntersectionObserver on purpose: an
   observer reports only when the intersection ratio changes, so an element
   that goes from below the fold to above it inside one frame — a fling, a
   scrollbar drag, an anchor jump — is never reported and would stay invisible
   for good. */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  let pending = Array.from(document.querySelectorAll('[data-reveal]')).filter(
    (element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.6) {
        return false;
      }
      element.classList.add('is-armed');
      return true;
    }
  );

  return () => {
    if (!pending.length) return;
    const due = pending.filter(
      (element) =>
        element.getBoundingClientRect().top < window.innerHeight * 0.9
    );
    due.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`);
      element.classList.add('is-revealed');
    });
    if (due.length) pending = pending.filter((element) => !due.includes(element));
  };
}

/*=============== THE DECK ===============*/

/* Which leaf is being read, and how many there are: the folio bottom right,
   the lit link in the header (several leaves can share one section), and the
   scroll cue, which is spent the moment the reader leaves the first leaf. */
function initDeck() {
  const panels = Array.from(document.querySelectorAll('.panel'));
  const folioLabel = document.getElementById('folio');
  const cue = document.getElementById('scroll-cue');
  const links = new Map(
    Array.from(document.querySelectorAll('#nav-links a')).map((link) => [
      link.getAttribute('href').slice(1),
      link,
    ])
  );
  if (!panels.length) return () => {};

  if (folioLabel) {
    folioLabel.append(
      createElement('span', 'folio-now', '01'),
      createElement('span', 'folio-of', ` / ${folio(panels.length - 1)}`)
    );
  }
  const folioNow = folioLabel?.querySelector('.folio-now');
  let current = -1;

  return () => {
    /* the leaf holding the top third of the screen is the one being read */
    const mark = window.innerHeight / 3;
    let index = 0;
    for (let i = 0; i < panels.length; i += 1) {
      if (panels[i].getBoundingClientRect().top <= mark) index = i;
    }
    if (index === current) return;
    current = index;

    if (folioNow) folioNow.textContent = folio(index);
    if (cue) cue.classList.toggle('is-spent', index > 0);

    const nav = panels[index].dataset.nav;
    links.forEach((link, id) => {
      if (id === nav) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
}

/* Which leaves fit the screen, one by one.

   A leaf taller than the viewport cannot be turned like the others — the
   reader needs their own scroll to reach its tail — so it is marked .is-tall
   and the wheel driver leaves it alone. The judgement is per leaf, not for
   the deck as a whole: a single overflowing panel used to relax every other
   one, which on a short window turned the whole deck back into a plain page.
   Now only the tall leaf gives way, and the fourteen that fit still turn. */
function initDeckFit() {
  const panels = Array.from(document.querySelectorAll('.panel'));
  if (!panels.length) return;

  const measure = () => {
    panels.forEach((panel) =>
      panel.classList.toggle(
        'is-tall',
        panel.scrollHeight > window.innerHeight + 4
      )
    );
  };

  measure();
  addEventListener('resize', measure, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(measure);
}

/* One gesture, one leaf.

   Snapping alone does not deliver that on a mouse. The browser snaps to
   whichever point is nearest when the scroll ends, so a wheel notch — a
   little over a hundred pixels against a panel of nine hundred — lands
   nowhere near the next leaf and springs straight back to the one it left.
   Measured before this was written: notches of 120, 240 and 400 all returned
   to the leaf they started on, and only 600 got through. The deck read as
   stuck to anyone without a trackpad.

   So in strict mode the wheel is taken over: any notch turns the leaf, and
   the momentum tail that follows a trackpad flick is held off until the
   stream goes quiet, or one flick would run three leaves. In loose mode —
   where a panel is taller than the screen and the reader needs their scroll
   to reach its tail — this stands down entirely and the browser keeps the
   wheel. Keys are never intercepted for their own sake: Arrow and Page keys
   already move a snap point at a time, and Space is left alone so it can
   still press a focused button. */
function initDeckDrive() {
  const panels = Array.from(document.querySelectorAll('.panel'));
  if (!panels.length) return;

  /* A turn takes about four hundred milliseconds to fly; the rest of the
     window swallows the momentum tail of a flick so one flick is one leaf.
     It is a deadline, never extended by the events it swallows — an earlier
     cut reset the timer on every event it ignored, so a steady stream (a
     trackpad, or a wheel simply held) kept pushing the release into the
     future and the deck stopped dead while the reader went on scrolling. */
  const TURN_MS = 560;
  let lockUntil = 0;

  const currentLeaf = () => {
    const mark = window.innerHeight / 3;
    let index = 0;
    panels.forEach((panel, i) => {
      if (panel.getBoundingClientRect().top <= mark) index = i;
    });
    return index;
  };

  const turn = (from, direction) => {
    const next = Math.min(panels.length - 1, Math.max(0, from + direction));
    if (next === from) return false;
    const top = panels[next].getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
    return true;
  };

  addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey) return; // a pinch-zoom, not a scroll
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      /* A leaf too tall for the screen keeps its own scroll: the reader needs
         it to reach the tail, and taking the wheel there would strand the
         bottom of the panel. Only leaves that fit are turned. */
      const from = currentLeaf();
      if (panels[from].classList.contains('is-tall')) return;

      event.preventDefault();

      const now = performance.now();
      if (now < lockUntil) return;

      const direction = Math.sign(event.deltaY);
      if (!direction) return;
      if (turn(from, direction)) lockUntil = now + TURN_MS;
    },
    { passive: false }
  );
}

/* One rAF-throttled pass drives everything that rides the scroll. */
/* The tree fills in behind the reader: the accent overlay grows down the spine
   to where they have got to, and each role's dot takes the accent as it is
   passed. On a screen that holds the whole run this settles at once; on a
   shorter one it draws as the leaf is scrolled. */
function initTimeline() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return () => {};
  const items = Array.from(timeline.querySelectorAll('.exp-item'));

  return () => {
    const box = timeline.getBoundingClientRect();
    const mark = window.innerHeight * 0.55;
    const progress = (mark - box.top) / box.height;
    timeline.style.setProperty(
      '--timeline-progress',
      Math.min(1, Math.max(0, progress)).toFixed(4)
    );
    items.forEach((item) =>
      item.classList.toggle('is-reached', item.getBoundingClientRect().top < mark)
    );
  };
}

function initScrollEffects() {
  const passes = [initReveal(), initDeck(), initTimeline()];
  let frame = null;

  const update = () => {
    frame = null;
    passes.forEach((pass) => pass());
  };

  const schedule = () => {
    if (frame === null) frame = requestAnimationFrame(update);
  };

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  update();
}

/*=============== MAIN ===============*/

document.addEventListener('DOMContentLoaded', () => {
  createMasthead();
  createNavLinks();
  createDateline();
  createContents();
  createKickers();
  createAbout();

  createWorkPanels();
  createExperiencePanels();
  generateComponents('stack-container', skillsData, createSkillItem);
  generateComponents('notes-container', notesData, createNoteItem);
  generateComponents('education-container', educationData, createEducationItem);
  generateComponents(
    'certifications-container',
    certificationsData,
    createCertificationItem
  );
  generateComponents('courses-container', courseworkData, createCourseItem);

  createContactActions();
  createColophon();

  initTheme();
  initPressLean();
  initSnapOffset();
  initDeckFit();
  initDeckDrive();
  initScrollEffects();
});

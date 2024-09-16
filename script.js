import {
  projectsData,
  skillsData,
  experiencesData,
  educationData,
  courseworkData,
  AboutMe,
} from './data.js';

document.addEventListener('DOMContentLoaded', function () {
  /*=============== UTILITY FUNCTIONS ===============*/

  function createElement(tag, className, content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }

  function appendChildren(parent, ...children) {
    children.forEach((child) => parent.appendChild(child));
  }

  function createList(items, className = '') {
    const ul = createElement('ul', className);
    items.forEach((item) => ul.appendChild(createElement('li', '', item)));
    return ul;
  }

  function createLink(href, className, text) {
    const link = createElement('a', className, text);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  /*=============== COMPONENT HELPERS ===============*/

  function createProjectCard(project) {
    const projectCard = createElement(
      'div',
      'bg-white p-6 rounded-lg shadow-md'
    );
    const title = createElement(
      'h3',
      'text-xl font-semibold mb-4',
      project.title
    );
    const image = createElement('img', 'mb-4 rounded-lg');
    image.src = project.image;
    image.alt = 'Project Image';
    const description = createElement(
      'p',
      'text-gray-600',
      project.description
    );
    const projectLink = createElement(
      'div',
      'mt-4 flex justify-between project-repo-link'
    );

    appendChildren(
      projectLink,
      createLink(project.link, 'text-blue-600 hover:underline', 'View Project'),
      createLink(project.gitrepo, 'text-blue-600 hover:underline', 'View Repo')
    );

    appendChildren(projectCard, title, image, description, projectLink);
    return projectCard;
  }

  function createTimelineItem(experience) {
    const timelineItem = createElement(
      'div',
      'timeline-item flex flex-col md:flex-row mb-8'
    );
    const timelineDot = createElement(
      'div',
      'timeline-dot flex items-center justify-center'
    );
    const timelineContent = createElement('div', 'timeline-content');
    const title = createElement(
      'h3',
      'timeline-title text-xl font-semibold',
      experience.title
    );
    const date = createElement('p', 'text-gray-600', experience.date);
    const descriptionList = createList(
      experience.description,
      'list-disc list-inside'
    );

    appendChildren(timelineContent, title, date, descriptionList);
    appendChildren(timelineItem, timelineDot, timelineContent);
    return timelineItem;
  }

  function createSkillItem(skillCategory) {
    const skillItem = createElement('div', 'mb-6');
    const skillTitle = createElement(
      'h3',
      'text-xl font-semibold',
      skillCategory.title
    );
    const skillDescription = createElement(
      'p',
      'text-gray-600',
      skillCategory.description
    );
    appendChildren(skillItem, skillTitle, skillDescription);
    return skillItem;
  }

  function createEducationItem(eduItem) {
    const eduDiv = createElement('div', 'mb-6');
    const eduLink = createLink(
      eduItem.link,
      'text-xl font-semibold',
      `${eduItem.name} - ${eduItem.degree}`
    );
    const eduDescription = createElement(
      'p',
      'text-gray-600',
      `${eduItem.field} | ${eduItem.date} | Aggregate Score: ${eduItem.score}`
    );
    appendChildren(eduDiv, eduLink, eduDescription);
    return eduDiv;
  }

  function createCourseItem(courseCategory) {
    const courseItem = createElement('div', 'mb-6');
    const courseTitle = createElement(
      'h3',
      'text-xl font-semibold p-3',
      courseCategory.title
    );
    const courseList = createList(
      courseCategory.courses,
      'list-disc list-inside'
    );
    appendChildren(courseItem, courseTitle, courseList);
    return courseItem;
  }

  /*=============== COMPONENT GENERATORS ===============*/

  function generateComponents(containerId, data, itemCreator) {
    const container = document.getElementById(containerId);
    data.forEach((item) => container.appendChild(itemCreator(item)));
  }

  function generateComponentsByClass(className, data, itemCreator) {
    const container = document.querySelector(className);
    if (!container) {
      throw new Error(`Container not found: ${className}`);
    }
    data.forEach((item) => container.appendChild(itemCreator(item)));
  }

  /*=============== MAIN ===============*/

  generateComponents('project-container', projectsData, createProjectCard);
  generateComponents(
    'experience-timeline',
    experiencesData,
    createTimelineItem
  );
  generateComponentsByClass('.grid', skillsData, createSkillItem);
  generateComponentsByClass('.education', educationData, createEducationItem);
  generateComponents('courses-container', courseworkData, createCourseItem);

  /*=============== LIGHT DARK THEME ===============*/
  const themeButton = document.getElementById('theme-button');
  const lightTheme = 'light-theme';
  const iconTheme = 'bx-sun';

  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');

  const getCurrentTheme = () =>
    document.body.classList.contains(lightTheme) ? 'dark' : 'light';
  const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
      lightTheme
    );
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](
      iconTheme
    );
  }

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const blobContent = document.getElementById('blob-content');
  const responseContainer = document.getElementById('response-container');
  const question = document.getElementById('question');
  const audioVisualizer = document.getElementById('audio-visualizer');

  let isPlaying = false;
  let responseBuffer = '';
  let speechInProgress = false;

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(
      text.toLowerCase().replace(/[?!-]/g, '').replace(/,/, '...')
    );

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(
      (voice) => voice.lang === 'en-US' && voice.name.includes('Google')
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = 'en-US';
    utterance.pitch = 1.0;
    utterance.rate = 1.05;
    utterance.volume = 0.9;

    utterance.onstart = () => {
      isPlaying = true;
      updateAudioVisualizer();
    };
    utterance.onend = () => {
      isPlaying = false;
      updateAudioVisualizer();
      speechInProgress = false;
    };

    speechSynthesis.speak(utterance);
  }

  function updateAudioVisualizer() {
    audioVisualizer.innerHTML = isPlaying
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#4a4a4a"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v-4h-2v4z" fill="#4a4a4a"/></svg>';
  }

  blobContent.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'phi3.5',
          prompt: `${question.value}`,
          system: `You are a helpful personal assistant of Vikash Pathak. About me: ${JSON.stringify(
            AboutMe
          )}. Answer the question as best as you can in 30 words or less.`,
          temperature: 0.3,
          max_tokens: 30,
          stop: ['\n'],
        }),
      });
      question.value = '';
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get reader from response');
      }

      const decoder = new TextDecoder('utf-8');
      let serverResponse = '';
      responseContainer.style.display = 'none';
      audioVisualizer.style.display = 'block';

      const processStream = async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const decodedValue = decoder.decode(value, { stream: true });
          serverResponse += decodedValue;

          try {
            const chunks = serverResponse
              .split('\n')
              .filter((chunk) => chunk.trim() !== '');
            const lastChunk = chunks[chunks.length - 1];

            if (lastChunk) {
              const data = JSON.parse(lastChunk);
              if (data.response) {
                responseBuffer += data.response;

                if (responseBuffer.length > 50 && !speechInProgress) {
                  speechInProgress = true;
                  speak(responseBuffer);
                  responseBuffer = '';
                }
              }
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }

        if (responseBuffer.length > 0) {
          speak(responseBuffer);
        }
      };

      processStream();
    } catch (error) {
      console.error('Error:', error);
    }
  });

  updateAudioVisualizer();
});

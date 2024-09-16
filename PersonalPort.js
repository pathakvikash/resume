class PersonalWebsite {
  constructor(container) {
    this.container = container;
    this.aboutMeSection = null;
    this.blobContent = null;
  }

  renderAboutMeSection() {
    const aboutMeSection = document.createElement('section');
    aboutMeSection.id = 'about-me';
    aboutMeSection.className = 'py-16 bg-gray-200';

    const container = document.createElement('div');
    container.className = 'container mx-auto px-4 sm:px-8';

    const heading = document.createElement('h2');
    heading.textContent = 'About Me';
    heading.className = 'text-3xl font-bold text-gray-800 mb-4';

    const paragraph = document.createElement('p');
    paragraph.textContent =
      'Skilled software engineer with 2+ years of experience in full-stack development. Proven ability to deliver impactful solutions using JavaScript, Node.js, TypeScript, and Solidity. Expertise in Next.js front-end and UI development, with a keen understanding of responsive design and software engineering.';
    paragraph.className = 'text-2xl text-gray-600 mb-8';

    container.appendChild(heading);
    container.appendChild(paragraph);
    aboutMeSection.appendChild(container);

    this.aboutMeSection = aboutMeSection;
  }

  renderBlobContent() {
    const blobContent = document.createElement('div');
    blobContent.className = 'blob-content sm:block hidden xl:block';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.className = 'blob-motion';
    svg.id = 'visual';
    svg.setAttribute('viewBox', '30 60 960 540');
    svg.setAttribute('width', '360');
    svg.setAttribute('height', '540');

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute(
      'transform',
      'translate(450.7256843113689 283.4942824330989)'
    );

    svg.appendChild(g);
    blobContent.appendChild(svg);

    this.blobContent = blobContent;
  }
  generateExperienceTimeline(experiences) {
    const timelineContainer = document.getElementById('experience-timeline');

    experiences.forEach((experience, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item flex flex-col md:flex-row mb-8';

      const timelineDot = document.createElement('div');
      timelineDot.className = 'timeline-dot flex items-center justify-center';
      timelineDot.innerHTML = `<i class="fas fa-circle"></i>`;

      const timelineContent = document.createElement('div');
      timelineContent.className = 'timeline-content';

      const title = document.createElement('h3');
      title.className = 'timeline-title text-xl font-semibold';
      title.textContent = experience.title;

      const date = document.createElement('p');
      date.className = 'text-gray-600';
      date.textContent = experience.date;

      const descriptionList = document.createElement('ul');
      descriptionList.className = 'list-disc list-inside';

      experience.description.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        descriptionList.appendChild(listItem);
      });

      timelineContent.appendChild(title);
      timelineContent.appendChild(date);
      timelineContent.appendChild(descriptionList);

      timelineItem.appendChild(timelineDot);
      timelineItem.appendChild(timelineContent);

      timelineContainer.appendChild(timelineItem);
    });
  }

  appendToContainer() {
    this.container.appendChild(this.aboutMeSection);
    this.container.appendChild(this.blobContent);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const blobContent = document.getElementById('blob-content');
  const responseContainer = document.getElementById('response-container');
  const question = document.getElementById('question');

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
      question.innerText = '';
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get reader from response');
      }

      const decoder = new TextDecoder('utf-8');
      let serverResponse = '';
      responseContainer.style.display = 'block';

      // Function to process each chunk of data
      const processStream = async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const decodedValue = decoder.decode(value, { stream: true });
          serverResponse += decodedValue;

          // Optionally update the UI with partial response
          if (responseContainer) {
            // Try to parse the accumulated data to display it incrementally
            try {
              // Parse each chunk and update the response
              const chunks = serverResponse
                .split('\n')
                .filter((chunk) => chunk.trim() !== '');
              const lastChunk = chunks[chunks.length - 1];

              if (lastChunk) {
                const data = JSON.parse(lastChunk);
                if (data.response) {
                  responseContainer.textContent += data.response;
                }
              }

              // Optionally clear serverResponse if the last chunk indicates completion
              if (data.done) {
                serverResponse = '';
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      };

      // Start processing the stream
      processStream();
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

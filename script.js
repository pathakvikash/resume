document.addEventListener('DOMContentLoaded', function () {
  // Function to generate project cards dynamically
  function generateProjectsComponent(projects) {
    const projectContainer = document.getElementById('project-container');

    projects.forEach((project) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'bg-white p-6 rounded-lg shadow-md';

      const title = document.createElement('h3');
      title.className = 'text-xl font-semibold mb-4';
      title.textContent = project.title;

      const image = document.createElement('img');
      image.src = project.image;
      image.alt = 'Project Image';
      image.className = 'mb-4 rounded-lg';

      const description = document.createElement('p');
      description.className = 'text-gray-600';
      description.textContent = project.description;

      const projectLink = document.createElement('div');
      projectLink.className = 'mt-4';
      const link = document.createElement('a');
      link.href = project.link;
      link.className = 'text-blue-600 hover:underline';
      link.textContent = 'View Project';

      projectLink.appendChild(link);

      projectCard.appendChild(title);
      projectCard.appendChild(image);
      projectCard.appendChild(description);
      projectCard.appendChild(projectLink);

      projectContainer.appendChild(projectCard);
    });
  }

  // Function to generate experience timeline dynamically
  function generateExperienceTimeline(experiences) {
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

  // Function to generate skills grid dynamically
  function generateSkillsGrid(skills) {
    const skillsGrid = document.querySelector('.grid');

    skills.forEach((skillCategory) => {
      const skillItem = document.createElement('div');
      skillItem.className = 'mb-6';

      const skillTitle = document.createElement('h3');
      skillTitle.className = 'text-xl font-semibold';
      skillTitle.textContent = skillCategory.title;

      const skillDescription = document.createElement('p');
      skillDescription.className = 'text-gray-600';
      skillDescription.textContent = skillCategory.description;

      skillItem.appendChild(skillTitle);
      skillItem.appendChild(skillDescription);

      skillsGrid.appendChild(skillItem);
    });
  }

  // Sample data for projects
  const projectsData = [
    {
      title: 'Full-Stack Shopping Service',
      image:
        'https://media.istockphoto.com/id/1597475039/photo/abstract-colorful-glass-background.webp?b=1&s=170667a&w=0&k=20&c=G6-on4l4zg7I-HIDJrVS5vSYm-laN6BEkiaaKn8P0LU=',
      description:
        'Implemented a comprehensive full-stack shopping service using React, Redux, Express, and MongoDB.',
      link: 'https://a-zone.vercel.app/',
    },
    {
      title: 'Medium clone',
      image:
        'https://img.freepik.com/free-vector/overlapping-forms-wallpaper_23-2148650920.jpg',
      description: 'Blogging platform.',
      link: 'https://medium-clone-virid-theta.vercel.app/',
    },
    {
      title: 'API Service to Fetch Github Users',
      image:
        'https://img.freepik.com/free-vector/colorful-abstract-background-theme_23-2148449982.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1700784000&semt=ais',
      description:
        'Developed an API service to fetch users, leveraging the GitHub platform API.',
      link: 'https://cithub.vercel.app/',
    },
    // Add more project data as needed
  ];

  // Sample data for experiences
  const experiencesData = [
    {
      title: 'NimbleBox.ai - Software Engineer',
      date: 'Feb 2023 - Aug 2023',
      description: [
        'Worked on Admin panel - creating new features',
        'Implemented Redux and RTK Query functionalities',
        'Collaborated with the frontend team for a smooth user experience',
      ],
    },
    {
      title: 'The Tan Man Gaadi - FullStack Development',
      date: '16 Nov 2022 - 21 Jan 2023',
      description: [
        'Led the development of a full-stack application for vehicle management',
        'Integrated payment gateways for online transactions',
        'Implemented responsive UI for a seamless user experience',
      ],
    },
    {
      title: 'BlockC School - Blockchain Development',
      date: 'Jan 2022 - May 2022',
      description: [
        'Contributed to blockchain development projects',
        'Implemented smart contracts using Solidity and testing',
        'Explored and tested decentralized finance solutions',
      ],
    },
    // Add more experience data as needed
  ];

  // Sample data for skills
  const skillsData = [
    {
      title: 'Programming',
      description: 'Python • JavaScript • TypeScript • Java • Solidity',
    },
    { title: 'Framework', description: 'Next.js • React • Redux • Django' },
    {
      title: 'Web Technologies',
      description: 'HTML • CSS • JavaScript • Tailwind',
    },
    { title: 'Database', description: 'SQL • MongoDB' },
    { title: 'Others', description: 'Node.js • Hardhat • Shell Script' },
    // Add more skills data as needed
  ];

  // Sample data for awards
  const awardsData = ['SIH 2022'];

  // Generate project cards
  generateProjectsComponent(projectsData);

  // Generate experience timeline
  generateExperienceTimeline(experiencesData);

  // Generate skills grid
  generateSkillsGrid(skillsData);
});

document.addEventListener('DOMContentLoaded', function () {
  // Function to generate education section dynamically
  function generateEducationSection(educationData) {
    const educationContainer = document.querySelector('.education');

    educationData.forEach((eduItem) => {
      const eduDiv = document.createElement('div');
      eduDiv.className = 'mb-6';

      const eduLink = document.createElement('a');
      eduLink.className = 'text-xl font-semibold';
      eduLink.href = eduItem.link;
      eduLink.target = '_blank';
      eduLink.rel = 'noopener noreferrer';
      eduLink.textContent = `${eduItem.name} - ${eduItem.degree}`;

      const eduDescription = document.createElement('p');
      eduDescription.className = 'text-gray-600';
      eduDescription.textContent = `${eduItem.field} | ${eduItem.date} | Aggregate Score: ${eduItem.score}`;

      eduDiv.appendChild(eduLink);
      eduDiv.appendChild(eduDescription);

      educationContainer.appendChild(eduDiv);
    });
  }

  // Function to generate links section dynamically
  function generateLinksSection(linksData) {
    const linksContainer = document.querySelector('.links');

    const linksDiv = document.createElement('div');
    linksDiv.className =
      'container flex flex-col md:flex-col m-6 mx-auto justify-between bg-red';

    const linksHeading = document.createElement('h2');
    linksHeading.className = 'text-3xl font-bold mb-8';
    linksHeading.textContent = 'Links';

    linksDiv.appendChild(linksHeading);

    linksData.forEach((linkItem) => {
      const linkDiv = document.createElement('div');
      linkDiv.className = 'mb-6';

      const linkTitle = document.createElement('h3');
      linkTitle.className = 'text-xl font-semibold';
      linkTitle.textContent = linkItem.title;

      const linkAnchor = document.createElement('a');
      linkAnchor.href = linkItem.url;
      linkAnchor.className = 'text-blue-600 hover:underline';
      linkAnchor.target = '_blank';
      linkAnchor.rel = 'noopener noreferrer';
      linkAnchor.textContent = linkItem.url;

      linkDiv.appendChild(linkTitle);
      linkDiv.appendChild(linkAnchor);

      linksDiv.appendChild(linkDiv);
    });

    linksContainer.appendChild(linksDiv);
  }

  // Sample data for education
  const educationData = [
    {
      name: 'RCET',
      link: 'https://rcet.rungta.ac.in/',
      degree: 'B.Tech in Information and Technology',
      field: 'Software Engineering/ Data Science',
      date: '2020-24',
      score: '75%',
    },
    {
      name: 'A.N College, Bihar, Patna',
      degree: 'PCM',
      field: 'Science & Math',
      date: '2017-19',
      score: '71%',
    },
    // Add more education data as needed
  ];

  // Sample data for links
  const linksData = [
    { title: 'Github', url: 'https://github.com/pathakvikash' },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vikash-pathak-298a01183/',
    },
    { title: 'Leetcode', url: 'https://leetcode.com/pathakvikash821/' },
    // Add more links data as needed
  ];

  // Generate education section
  generateEducationSection(educationData);

  // Generate links section
  generateLinksSection(linksData);
});
document.addEventListener('DOMContentLoaded', function () {
  // Function to generate coursework dynamically
  function generateCoursework(courses) {
    const coursesContainer = document.getElementById('courses-container');

    courses.forEach((courseCategory) => {
      const courseItem = document.createElement('div');
      courseItem.className = 'mb-6';

      const courseTitle = document.createElement('h3');
      courseTitle.className = 'text-xl font-semibold';
      courseTitle.textContent = courseCategory.title;

      const courseList = document.createElement('ul');
      courseList.className = 'list-disc list-inside';

      courseCategory.courses.forEach((course) => {
        const listItem = document.createElement('li');
        listItem.textContent = course;
        courseList.appendChild(listItem);
      });

      courseItem.appendChild(courseTitle);
      courseItem.appendChild(courseList);

      coursesContainer.appendChild(courseItem);
    });
  }

  // Sample data for coursework
  const courseworkData = [
    {
      title: 'COURSERA',
      courses: [
        'Introduction to Generative AI',
        'Python for Data Science',
        'Data Science Toolkit',
      ],
    },
    {
      title: 'UNDERGRADUATE',
      courses: [
        'Data Structures and Algorithms',
        'Operating Systems',
        'Database Management System',
        'Software Design & Engineering',
        'Object Oriented Programming',
        'Linux Programming',
      ],
    },
    {
      title: 'MOOCS CERTIFICATION',
      courses: [
        'Data Science Methodology by IBM',
        'Data Structure and Algorithm',
      ],
    },
    // Add more coursework data as needed
  ];

  // Generate coursework
  generateCoursework(courseworkData);
});

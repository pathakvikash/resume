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

const projectsData = [
  {
    title: 'Full-Stack Shopping Service',
    image:
      'https://img.freepik.com/free-vector/gradient-blue-background_52683-83113.jpg?ga=GA1.1.1006113649.1726469951&semt=ais_hybrid',
    description: 'A comprehensive full-stack shopping service',
    link: 'https://a-zone.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/AZone',
  },
  {
    title: 'Medium clone',
    image:
      'https://img.freepik.com/free-vector/gradient-blue-background_52683-83113.jpg?ga=GA1.1.1006113649.1726469951&semt=ais_hybrid',
    description: 'Blogging platform with pixel perfect design and styling.',
    link: 'https://medium-clone-virid-theta.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/medium-clone',
  },
  {
    title: 'Graphical User Authenticaiton System',
    image:
      'https://img.freepik.com/free-vector/gradient-blue-background_52683-83113.jpg?ga=GA1.1.1006113649.1726469951&semt=ais_hybrid',
    description: 'Developed an system authenticate the user using GUI.',
    link: 'https://gauth-xi.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/gauth',
  },
  {
    title: 'Netflix Clone',
    image:
      'https://img.freepik.com/free-vector/gradient-blue-background_52683-83113.jpg?ga=GA1.1.1006113649.1726469951&semt=ais_hybrid',
    description: 'Developed a clone of Netflix.',
    link: 'https://netflix-pathakvikashs-projects.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/netflix',
  },
  {
    title: 'Dev Chat',
    image:
      'https://img.freepik.com/free-vector/gradient-blue-background_52683-83113.jpg?ga=GA1.1.1006113649.1726469951&semt=ais_hybrid',
    description: 'A Chat UI to chat with LLM.',
    link: 'https://dev-chat-beta.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/DevChat',
  },
  {
    title: 'E-Waste location finder',
    image:
      'https://img.freepik.com/free-vector/gradient-blue-background_52683-83113.jpg?ga=GA1.1.1006113649.1726469951&semt=ais_hybrid',
    description: 'Application to find nearest e-waste collection point.',
    link: 'https://e-waste-locator.vercel.app/',
    gitrepo: 'https://github.com/pathakvikash/E-waste-locator',
  },
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
const linksData = [
  { title: 'Github', url: 'https://github.com/pathakvikash' },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vikash-pathak-298a01183/',
  },
  { title: 'Leetcode', url: 'https://leetcode.com/pathakvikash821/' },
  // Add more links data as needed
];

const AboutMe = [
  {
    name: 'Vikash Pathak',
    title: 'Software Engineer',
  },
  {
    courses: courseworkData,
    education: educationData,
    projects: projectsData,
    skills: skillsData,
    experiences: experiencesData,
    links: linksData,
  },
];

export {
  projectsData,
  experiencesData,
  skillsData,
  educationData,
  courseworkData,
  linksData,
  AboutMe,
};

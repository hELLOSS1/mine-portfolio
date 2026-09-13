import sqlite3Pkg from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3Pkg.verbose();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'portfolio.sqlite');
const db = new sqlite3.Database(dbPath);

const defaultData = {
  theme: 'light',
  hero: {
    name: 'Mia',
    role: 'Full Stack Developer',
    bio: 'I build beautiful, responsive and user-friendly web applications with modern technologies.',
    avatarImg: '/src/assets/avatar_mia.jpg',
    plantImg: '/src/assets/3d_plant.jpg'
  },
  stats: {
    projectsCompleted: '18',
    yearsExperience: '2+',
    happyClients: '12',
    certifications: '6'
  },
  projects: [
    { id: 1, title: 'TaskFlow', desc: 'A productivity tool for team collaboration.', img: '/src/assets/taskflow.jpg', tags: ['React', 'Node.js', 'MongoDB'] },
    { id: 2, title: 'GreenShop', desc: 'E-commerce website for plants & pots.', img: '/src/assets/greenshop.jpg', tags: ['React', 'Stripe', 'Tailwind'] },
    { id: 3, title: 'Weather App', desc: 'Real-time weather forecast application.', img: '/src/assets/weatherapp.jpg', tags: ['JavaScript', 'API', 'CSS'] }
  ],
  experience: [
    { id: 1, role: 'Frontend Developer', company: 'Tech Solutions Pvt. Ltd.', date: 'Mar 2023 - Present', color: '#F7B565' },
    { id: 2, role: 'Web Developer Intern', company: 'CodeCraft Labs', date: 'Jun 2022 - Feb 2023', color: '#8E74E6' },
    { id: 3, role: 'Freelance Developer', company: 'Self Employed', date: 'Jan 2021 - May 2022', color: '#8E74E6' }
  ],
  certificates: [
    { id: 1, name: 'React.js', color: '#F4EFFF' },
    { id: 2, name: 'Node.js', color: '#E8F5E9' },
    { id: 3, name: 'MongoDB', color: '#EEF6FE' },
    { id: 4, name: 'Tailwind CSS', color: '#FCEEF5' }
  ],
  socialLinks: [
    { id: 1, platform: 'GitHub', url: 'https://github.com', color: '#F4EFFF' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com', color: '#EEF6FE' },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com', color: '#FCEEF5' }
  ],
  aboutMe: {
    location: 'India',
    email: 'mia.dev@email.com',
    age: '22',
    education: 'B.Tech in CSE, Parul University'
  },
  skills: [
    { name: 'HTML / CSS', percent: '90%', color: 'linear-gradient(90deg, #A890F0, #8E74E6)' },
    { name: 'JavaScript', percent: '85%', color: 'linear-gradient(90deg, #F98FB9, #F672A7)' },
    { name: 'React.js', percent: '80%', color: 'linear-gradient(90deg, #F7B565, #F59E3D)' },
    { name: 'Node.js', percent: '75%', color: 'linear-gradient(90deg, #76D89D, #5DBE84)' },
    { name: 'MongoDB', percent: '70%', color: 'linear-gradient(90deg, #6BB5F6, #4EA1F0)' },
    { name: 'Tailwind CSS', percent: '85%', color: 'linear-gradient(90deg, #A890F0, #8E74E6)' }
  ],
  visibility: {
    showProjects: true,
    showExperience: true,
    showAboutMe: true,
    showSkills: true
  }
};

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS portfolio_data (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL
  )`);

  db.get(`SELECT data FROM portfolio_data WHERE id = 1`, (err, row) => {
    if (err) {
      console.error("Error reading database:", err);
      return;
    }
    if (!row) {
      console.log("Database empty. Seeding default data...");
      const stmt = db.prepare(`INSERT INTO portfolio_data (id, data) VALUES (1, ?)`);
      stmt.run(JSON.stringify(defaultData));
      stmt.finalize();
    }
  });
});

export default db;

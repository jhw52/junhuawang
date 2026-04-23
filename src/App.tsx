/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Trophy, 
  Mail, 
  Github, 
  Phone, 
  MapPin,
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { ResumeData } from './types';
import resumeJson from './data/resume.json';

// --- Components ---

const Navbar = ({ activeSection }: { activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { id: 'about', label: '关于', icon: User },
    { id: 'education', label: '教育', icon: GraduationCap },
    { id: 'skills', label: '技能', icon: Code2 },
    { id: 'projects', label: '项目', icon: Briefcase },
    { id: 'awards', label: '荣誉', icon: Trophy },
    { id: 'contact', label: '联系', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-xl flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('about')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-mono">W</div>
          <span className="hidden sm:inline">Portfolio</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                activeSection === item.id ? 'text-blue-600' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Trigger */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-8 flex flex-col gap-6 shadow-xl"
          >
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center gap-4 text-lg font-medium text-slate-700 active:text-blue-600"
              >
                <item.icon size={20} className="text-slate-400" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
  <div className="flex items-center gap-3 mb-10">
    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold text-slate-900">{children}</h2>
  </div>
);

const Card = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`glass-card p-8 rounded-2xl ${className}`}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // In a real app, this might be a fetch call to an API
    setData(resumeJson as unknown as ResumeData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center font-mono text-slate-400 animate-pulse">Loading Workspace...</div>;

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} />

      <main className="pt-16">
        {/* Hero Section */}
        <section id="about" className="section-padding min-h-[90vh] flex flex-col justify-center">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6">
                  Available for Internships
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                  你好，我是 <span className="text-blue-600">{data.basics.name}</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 font-medium mb-8 max-w-2xl leading-relaxed">
                  {data.basics.label}
                </p>
                <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
                  {data.basics.summary}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${data.basics.email}`}
                    className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <Mail size={18} /> 联系我
                  </a>
                  <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    查看作品 <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden rotate-3 shadow-2xl relative z-10 border-4 border-white">
                  <img 
                    src={data.basics.image} 
                    alt={data.basics.name}
                    className="w-full h-full object-cover -rotate-3 scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="section-padding bg-slate-100/50">
          <SectionHeading icon={GraduationCap}>教育背景</SectionHeading>
          <div className="grid gap-6">
            {data.education.map((edu, idx) => (
              <Card key={idx}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{edu.institution}</h3>
                    <p className="text-blue-600 font-medium">{edu.area} · {edu.studyType}</p>
                  </div>
                  <div className="text-right">
                    <span className="mono text-sm bg-slate-100 px-3 py-1 rounded-full text-slate-500">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <p className="font-bold text-slate-700 mb-2">主修课程</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span key={i} className="text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-700 mb-2">成绩指标</p>
                    <p className="text-slate-600 italic">{edu.score}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section-padding">
          <SectionHeading icon={Code2}>专业技能</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {data.skills.map((skillGroup, idx) => (
              <Card key={idx} className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{skillGroup.name}</h3>
                  <span className="text-xs font-mono uppercase text-blue-500 font-bold tracking-widest">{skillGroup.level}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skillGroup.keywords.map((skill, i) => (
                    <span key={i} className="bg-slate-50 text-slate-700 text-sm px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="section-padding bg-slate-900 text-white overflow-hidden">
          <div className="relative z-10">
            <SectionHeading icon={Briefcase}><span className="text-white">项目经历</span></SectionHeading>
            <div className="grid gap-12">
              {data.projects.map((project, idx) => (
                <div key={idx} className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-3xl">
                      <div className="bg-slate-800 rounded-[1.4rem] p-8 min-h-[300px] flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-mono font-bold text-blue-400">
                            0{idx + 1}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{project.name}</h3>
                            <p className="text-blue-400 text-sm font-medium">{project.position}</p>
                          </div>
                        </div>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                          {project.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.keywords.map((k, i) => (
                            <span key={i} className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-md mono">
                              #{k}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <ul className="space-y-4">
                      {project.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-4 text-slate-300">
                          <div className="mt-1.5 p-1 bg-blue-500 rounded-full"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex items-center gap-4 text-slate-500 text-sm mono">
                      <ChevronRight size={16} /> {project.startDate} — {project.endDate}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>
        </section>

        {/* Awards */}
        <section id="awards" className="section-padding">
          <SectionHeading icon={Trophy}>获奖经历</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.awards.map((award, idx) => (
              <Card key={idx} className="group">
                <div className="text-sm font-mono text-blue-500 mb-3 flex justify-between items-center">
                  <span>{award.date}</span>
                  <Trophy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                  {award.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed uppercase tracking-wide font-bold">
                  {award.summary}
                </p>
                {award.awarder && (
                  <p className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 italic">
                    颁奖单位: {award.awarder}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-padding">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">准备好开始合作了吗？</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-md">
                  我正在寻找客户端开发相关的实习机会。如果您觉得我符合您的需求，欢迎随时联系！
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm uppercase tracking-widest font-bold">电子邮件</p>
                      <a href={`mailto:${data.basics.email}`} className="text-xl font-medium hover:underline">{data.basics.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm uppercase tracking-widest font-bold">联系电话</p>
                      <p className="text-xl font-medium tracking-tight">{data.basics.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm uppercase tracking-widest font-bold">个人位置</p>
                      <p className="text-xl font-medium">{data.basics.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 md:p-10 text-slate-900 shadow-2xl">
                <h3 className="text-2xl font-bold mb-8">发送快速留言</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 uppercase">姓名</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="您的姓名" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 uppercase">邮箱</label>
                      <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="您的邮箱" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase">信息</label>
                    <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="留言内容..."></textarea>
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                    提交留言
                  </button>
                </form>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-sm mb-4">
          © {new Date().getFullYear()} {data.basics.name}. Built with ❤️ in Guangdong.
        </p>
        <div className="flex justify-center gap-4 text-slate-400">
          <Github size={20} className="hover:text-slate-900 cursor-pointer transition-colors" />
          <ExternalLink size={20} className="hover:text-slate-900 cursor-pointer transition-colors" />
        </div>
      </footer>
    </div>
  );
}

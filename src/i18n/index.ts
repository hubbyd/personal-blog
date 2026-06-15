export const zh = {
  nav: {
    home: "首页",
    about: "关于",
    skills: "技能",
    projects: "项目",
    blog: "博客",
    contact: "联系"
  },
  hero: {
    title: "你好，我是张和浩",
    subtitle: "西安财经大学软件工程专业大二学生",
    description: "热爱前端开发，正在寻找2024暑期实习机会",
    stats: {
      projects: "项目",
      commits: "提交",
      stars: "星标"
    },
    cta: "查看我的项目",
    scroll: "向下滚动"
  },
  about: {
    title: "关于我",
    subtitle: "Get to Know Me",
    story: "我是西安财经大学软件工程专业的大二学生，对前端开发有着浓厚的热情。从大一开始接触编程以来，我就被创造数字体验的过程深深吸引。通过自学和项目实践，我已经掌握了包括React、Vue、TypeScript等在内的现代前端技术。",
    story2: "目前，我正在寻找暑期前端实习机会。希望能在真实的项目中学习成长，为团队做出贡献。我相信技术改变世界的力量，并渴望成为这一变革的一部分。",
    achievements: {
      school: "西安财经大学",
      major: "软件工程 - 大二",
      frontend: "前端开发",
      tech: "React / Vue / TypeScript",
      courses: "课程",
      courseList: "数据结构、算法、计算机网络",
      awards: "荣誉",
      awardList: "奖学金 · 优秀学生"
    }
  },
  skills: {
    title: "我的技能",
    subtitle: "Skills",
    techStack: "技术栈",
    tools: "工具与环境",
    progress: "学习进度",
    frontend: "前端开发",
    progressText: "持续学习中，目标是成为一名优秀的全栈开发者"
  },
  projects: {
    title: "我的项目",
    subtitle: "Projects",
    viewDetails: "查看详情",
    viewMore: "查看更多项目"
  },
  blog: {
    title: "技术文章",
    subtitle: "Blog",
    readMore: "阅读更多",
    viewAll: "查看全部文章"
  },
  contact: {
    title: "联系我",
    subtitle: "Get In Touch",
    sendMessage: "发送消息",
    contactInfo: "联系信息",
    email: "邮箱",
    phone: "电话",
    location: "地址",
    placeholder: {
      name: "你的名字",
      email: "你的邮箱",
      message: "你的消息"
    },
    sentSuccess: "发送成功",
    internship: "关于实习",
    internshipText: "我目前正在寻找2024年暑期前端实习机会。如果你的团队有相关职位，请随时联系我！我对前端开发充满热情，愿意学习新技术，为团队做出贡献。"
  },
  footer: {
    description: "西安财经大学大二学生，热爱前端开发，致力于创造优雅的数字体验。",
    quickLinks: "快速链接",
    socialMedia: "社交媒体",
    copyright: "由 ❤️ 构建"
  }
};

export const en = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact"
  },
  hero: {
    title: "Hello, I'm Zhang Hehao",
    subtitle: "Sophomore at Xi'an University of Finance and Economics",
    description: "Passionate about frontend development, seeking summer 2024 internship",
    stats: {
      projects: "Projects",
      commits: "Commits",
      stars: "Stars"
    },
    cta: "View My Projects",
    scroll: "Scroll Down"
  },
  about: {
    title: "About Me",
    subtitle: "Get to Know Me",
    story: "I am a sophomore majoring in Software Engineering at Xi'an University of Finance and Economics. I have a strong passion for frontend development. Since I started programming in my freshman year, I have been deeply attracted by the process of creating digital experiences. Through self-study and project practice, I have mastered modern frontend technologies including React, Vue, TypeScript, and more.",
    story2: "Currently, I am looking for summer frontend internship opportunities. I hope to learn and grow in real-world projects and contribute to the team. I believe in the power of technology to change the world, and I am eager to be part of this transformation.",
    achievements: {
      school: "Xi'an University of Finance and Economics",
      major: "Software Engineering - Sophomore",
      frontend: "Frontend Development",
      tech: "React / Vue / TypeScript",
      courses: "Courses",
      courseList: "Data Structures, Algorithms, Computer Networks",
      awards: "Awards",
      awardList: "Scholarship · Outstanding Student"
    }
  },
  skills: {
    title: "My Skills",
    subtitle: "Skills",
    techStack: "Tech Stack",
    tools: "Tools & Environment",
    progress: "Learning Progress",
    frontend: "Frontend Development",
    progressText: "Continuously learning, aiming to become an excellent full-stack developer"
  },
  projects: {
    title: "My Projects",
    subtitle: "Projects",
    viewDetails: "View Details",
    viewMore: "View More Projects"
  },
  blog: {
    title: "Tech Articles",
    subtitle: "Blog",
    readMore: "Read More",
    viewAll: "View All Articles"
  },
  contact: {
    title: "Contact Me",
    subtitle: "Get In Touch",
    sendMessage: "Send Message",
    contactInfo: "Contact Information",
    email: "Email",
    phone: "Phone",
    location: "Location",
    placeholder: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message"
    },
    sentSuccess: "Sent Successfully",
    internship: "About Internship",
    internshipText: "I am currently looking for summer 2024 frontend internship opportunities. If your team has relevant positions, please feel free to contact me! I am passionate about frontend development and willing to learn new technologies to contribute to the team."
  },
  footer: {
    description: "Sophomore at Xi'an University of Finance and Economics, passionate frontend developer, dedicated to creating elegant digital experiences.",
    quickLinks: "Quick Links",
    socialMedia: "Social Media",
    copyright: "Built with ❤️"
  }
};

export type Language = "zh" | "en";
export type Translations = typeof zh;
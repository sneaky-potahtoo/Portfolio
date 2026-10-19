import React from 'react';
import {
  Globe,
  Palette,
  Code,
  FileCode,
  Code2,
  Layers,
  Terminal,
  Server,
  Cpu,
  Database,
  Flame,
  GitBranch,
  Send,
  Zap,
  Triangle,
  Layout,
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface SkillIconProps {
  name: string;
  className?: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name.toLowerCase()) {
    case 'globe':
    case 'html5':
      return <Globe className={className} />;
    case 'palette':
    case 'css3':
      return <Palette className={className} />;
    case 'code':
    case 'javascript':
      return <Code className={className} />;
    case 'filecode':
    case 'typescript':
      return <FileCode className={className} />;
    case 'code2':
    case 'react':
      return <Code2 className={className} />;
    case 'layers':
    case 'tailwind':
    case 'tailwindcss':
      return <Layers className={className} />;
    case 'terminal':
    case 'node':
    case 'node.js':
      return <Terminal className={className} />;
    case 'server':
    case 'express':
    case 'express.js':
      return <Server className={className} />;
    case 'cpu':
    case 'c++':
      return <Cpu className={className} />;
    case 'database':
    case 'postgresql':
    case 'mongodb':
      return <Database className={className} />;
    case 'flame':
    case 'firebase':
      return <Flame className={className} />;
    case 'gitbranch':
    case 'git':
      return <GitBranch className={className} />;
    case 'github':
      return <GithubIcon className={className} />;
    case 'send':
    case 'postman':
      return <Send className={className} />;
    case 'zap':
    case 'vite':
      return <Zap className={className} />;
    case 'triangle':
    case 'vercel':
      return <Triangle className={className} />;
    case 'layout':
    case 'figma':
      return <Layout className={className} />;
    default:
      return <Code className={className} />;
  }
};

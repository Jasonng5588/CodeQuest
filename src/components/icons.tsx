/**
 * Central icon system — no emoji anywhere.
 * All icons are Lucide React SVGs.
 */
import {
  Code2, Globe, Server, Database, Terminal, Shield,
  Cpu, BarChart2, Brain, BookOpen, Swords, Zap, Wrench,
  Lock, Star, Trophy, Flame, CheckCircle, Circle, ChevronRight,
  Play, RotateCcw, Lightbulb, AlertCircle, CheckCheck, ArrowLeft,
  Users, Clock, Target, TrendingUp, Award, Layers, GitBranch,
  Hash, FileCode, Braces, Binary, Network, HardDrive, Cloud,
  Eye, EyeOff, Mail, User, Key, LogIn, UserPlus, Home,
  LayoutDashboard, List, Bookmark, Settings, LogOut, ChevronDown,
} from "lucide-react";

export type LucideIconName = string;

/** Map track IDs → Lucide icon components */
export const TRACK_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  // Fundamentals
  html:         Globe,
  css:          Layers,
  javascript:   Code2,
  typescript:   Braces,
  git:          GitBranch,
  terminal:     Terminal,
  regex:        Hash,
  // Web
  react:        Code2,
  nextjs:       Server,
  vue:          Code2,
  angular:      Code2,
  svelte:       Zap,
  tailwind:     Layers,
  graphql:      Network,
  // Backend
  nodejs:       Server,
  python:       FileCode,
  go:           Cpu,
  rust:         Shield,
  java:         FileCode,
  csharp:       FileCode,
  php:          FileCode,
  ruby:         FileCode,
  // Database
  sql:          Database,
  postgresql:   Database,
  mongodb:      Database,
  redis:        HardDrive,
  // DevOps
  docker:       Cloud,
  kubernetes:   Cloud,
  linux:        Terminal,
  "ci-cd":      GitBranch,
  // Security
  "web-security": Shield,
  cryptography:   Lock,
  // CS Theory
  "data-structures": Binary,
  algorithms:       Brain,
  // AI/Data
  "machine-learning": Brain,
  "data-science":     BarChart2,
};

/** Category icons */
export const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  fundamentals: Code2,
  web:          Globe,
  backend:      Server,
  database:     Database,
  devops:       Cloud,
  security:     Shield,
  "cs-theory":  Brain,
  "data-science": BarChart2,
  ai:           Brain,
};

/** Lesson type icons */
export const LESSON_TYPE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  concept:   BookOpen,
  challenge: Swords,
  boss:      Zap,
  project:   Wrench,
};

/** Generic UI icons — export them all from one place */
export {
  Code2, Globe, Server, Database, Terminal, Shield,
  Cpu, BarChart2, Brain, BookOpen, Swords, Zap, Wrench,
  Lock, Star, Trophy, Flame, CheckCircle, Circle, ChevronRight,
  Play, RotateCcw, Lightbulb, AlertCircle, CheckCheck, ArrowLeft,
  Users, Clock, Target, TrendingUp, Award, Layers, GitBranch,
  Hash, FileCode, Braces, Binary, Network, HardDrive, Cloud,
  Eye, EyeOff, Mail, User, Key, LogIn, UserPlus, Home,
  LayoutDashboard, List, Bookmark, Settings, LogOut, ChevronDown,
};

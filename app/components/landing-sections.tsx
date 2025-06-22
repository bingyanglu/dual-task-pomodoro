"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Brain, Users, Settings, MessageSquare, HelpCircle, Play, Clock, ArrowRight, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import "./landing-sections.css"
import { translations } from "../i18n/translations"

type Translations = typeof translations.en

interface LandingSectionsProps {
  t: Translations
}

export function LandingSections({ t }: LandingSectionsProps) {
  const [openFaqItem, setOpenFaqItem] = useState<number | null>(null)
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const toggleFaq = (index: number) => {
    setOpenFaqItem(openFaqItem === index ? null : index)
  }

  const handleScrollToApp = () => {
    const mainAppEl = document.getElementById('main-app');
    if (mainAppEl) {
      mainAppEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 时间线动画效果
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 监听滚动显示返回顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const faqItems = [
    {
      question: t.faq1Question,
      answer: t.faq1Answer,
    },
    {
      question: t.faq2Question,
      answer: t.faq2Answer,
    },
    {
      question: t.faq3Question,
      answer: t.faq3Answer,
    },
    {
      question: t.faq4Question,
      answer: t.faq4Answer,
    },
  ]

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section id="hero" className="text-center space-y-6">
        <Card className="border-slate-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <CardContent className="p-8 md:p-12 relative">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white leading-tight" 
                  dangerouslySetInnerHTML={{ 
                    __html: t.landingHeroTitle
                      .replace('双任务番茄钟', '<span class="text-blue-600 dark:text-blue-400">双任务番茄钟</span>')
                      .replace('Dual-Task Pomodoro', '<span class="text-blue-600 dark:text-blue-400">Dual-Task Pomodoro</span>')
                      .replace('デュアルタスクポモドーロ', '<span class="text-blue-600 dark:text-blue-400">デュアルタスクポモドーロ</span>')
                  }}>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {t.landingHeroSubtitle}
              </p>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={handleScrollToApp}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t.landingHeroCta}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white inline-block pb-2 border-b-2 border-blue-500">
            {t.howItWorksTitle}
          </h2>
        </div>

        <Card className="border-slate-200 dark:border-gray-700">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t.howItWorksPara1
                      .replace(/任务A/g, '<span class="font-semibold text-blue-600 dark:text-blue-400">任务A</span>')
                      .replace(/任务B/g, '<span class="font-semibold text-purple-600 dark:text-purple-400">任务B</span>')
                      .replace(/Task A/g, '<span class="font-semibold text-blue-600 dark:text-blue-400">Task A</span>')
                      .replace(/Task B/g, '<span class="font-semibold text-purple-600 dark:text-purple-400">Task B</span>')
                      .replace(/タスクA/g, '<span class="font-semibold text-blue-600 dark:text-blue-400">タスクA</span>')
                      .replace(/タスクB/g, '<span class="font-semibold text-purple-600 dark:text-purple-400">タスクB</span>')
                  }}
                >
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  {t.howItWorksPara2}
                </p>
              </div>
              <div className="timeline-container">
                <div className="timeline-connector h-full absolute left-1/2 top-0 -translate-x-1/2"></div>
                <div className="flex flex-col space-y-8 relative z-10">
                  <div 
                    className={`timeline-item flex items-center space-x-4 ${activeTimelineStep === 0 ? 'ring-2 ring-blue-400 dark:ring-blue-500 scale-105' : ''}`}
                    onClick={() => setActiveTimelineStep(0)}
                  >
                    <div className={`timeline-circle timeline-circle-task-a h-16 w-16 ${activeTimelineStep === 0 ? 'timeline-pulse' : ''}`}>
                      <span className="text-xl font-bold text-white">A</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <h3 className="font-medium text-slate-800 dark:text-white text-lg">{t.howItWorksTaskA}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{t.howItWorksTaskADesc}</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`timeline-item flex items-center space-x-4 ${activeTimelineStep === 1 ? 'ring-2 ring-green-400 dark:ring-green-500 scale-105' : ''}`}
                    onClick={() => setActiveTimelineStep(1)}
                  >
                    <div className={`timeline-circle timeline-circle-break h-16 w-16 ${activeTimelineStep === 1 ? 'timeline-pulse' : ''}`}>
                      <span className="text-sm font-medium text-white">{t.break}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        <h3 className="font-medium text-slate-800 dark:text-white text-lg">{t.howItWorksBreak}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{t.howItWorksBreakDesc}</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`timeline-item flex items-center space-x-4 ${activeTimelineStep === 2 ? 'ring-2 ring-purple-400 dark:ring-purple-500 scale-105' : ''}`}
                    onClick={() => setActiveTimelineStep(2)}
                  >
                    <div className={`timeline-circle timeline-circle-task-b h-16 w-16 ${activeTimelineStep === 2 ? 'timeline-pulse' : ''}`}>
                      <span className="text-xl font-bold text-white">B</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-purple-500" />
                        <h3 className="font-medium text-slate-800 dark:text-white text-lg">{t.howItWorksTaskB}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{t.howItWorksTaskBDesc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((step) => (
                      <button 
                        key={step} 
                        className={`h-2 w-8 rounded-full transition-all ${activeTimelineStep === step 
                          ? 'bg-blue-500 dark:bg-blue-400 w-12' 
                          : 'bg-slate-300 dark:bg-slate-600'}`}
                        onClick={() => setActiveTimelineStep(step)}
                        aria-label={`Step ${step + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Who Is It For */}
      <section id="who-is-it-for" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white inline-block pb-2 border-b-2 border-blue-500">
            {t.whoIsItForTitle}
          </h2>
        </div>

        <Card className="border-slate-200 dark:border-gray-700 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <Users className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              {t.whoIsItForSubtitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  text: t.whoIsItFor1,
                  icon: (
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400 animate-pulse"></div>
                      <Brain className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                  ),
                  color: "from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40",
                  borderColor: "border-blue-200 dark:border-blue-800",
                  number: 1,
                  numberBg: "bg-blue-500",
                  highlight: "ADHD"
                },
                {
                  text: t.whoIsItFor2,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7 text-indigo-600 dark:text-indigo-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  ),
                  color: "from-indigo-100 to-indigo-50 dark:from-indigo-900/40 dark:to-indigo-800/40",
                  borderColor: "border-indigo-200 dark:border-indigo-800",
                  number: 2,
                  numberBg: "bg-indigo-500",
                  highlight: "创意工作"
                },
                {
                  text: t.whoIsItFor3,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7 text-purple-600 dark:text-purple-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: "from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/40",
                  borderColor: "border-purple-200 dark:border-purple-800",
                  number: 3,
                  numberBg: "bg-purple-500",
                  highlight: "远程工作"
                },
                {
                  text: t.whoIsItFor4,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7 text-cyan-600 dark:text-cyan-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  color: "from-cyan-100 to-cyan-50 dark:from-cyan-900/40 dark:to-cyan-800/40",
                  borderColor: "border-cyan-200 dark:border-cyan-800",
                  number: 4,
                  numberBg: "bg-cyan-500",
                  highlight: "提升效率"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`user-group-card bg-gradient-to-br ${item.color} p-5 rounded-xl border ${item.borderColor}`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`user-group-number h-8 w-8 rounded-full ${item.numberBg} flex items-center justify-center mr-3 text-white font-semibold shadow-sm`}>
                      {item.number}
                    </div>
                    <div className="user-group-icon h-10 w-10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className={`ml-2 px-2 py-0.5 rounded-md text-xs font-semibold ${item.numberBg} bg-opacity-20 text-slate-700 dark:text-slate-200`}>
                      {item.highlight}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg pl-2 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why It Helps ADHD Users */}
      <section id="why-it-helps-adhd" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white inline-block pb-2 border-b-2 border-blue-500">
            {t.whyItHelpsTitle}
          </h2>
        </div>

        <Card className="border-slate-200 dark:border-gray-700">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <Brain className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              {t.whyItHelpsSubtitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.whyItHelpsPara1}</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.whyItHelpsPara2}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-4">{t.whyItHelpsChallengeTitle}</h3>
                <ul className="space-y-3">
                  {[t.whyItHelpsChallenge1, t.whyItHelpsChallenge2, t.whyItHelpsChallenge3].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">!</span>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-gray-700">
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{t.whyItHelpsSolution}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Overview */}
      <section id="features" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white inline-block pb-2 border-b-2 border-blue-500">
            {t.featuresTitle}
          </h2>
        </div>

        <Card className="border-slate-200 dark:border-gray-700">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <Settings className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              {t.featuresSubtitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: t.featuresDualTaskTitle, 
                  desc: t.featuresDualTaskDesc, 
                  icon: (
                    <div className="flex items-center space-x-1">
                      <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">A</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      <div className="h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">B</span>
                      </div>
                    </div>
                  )
                },
                { 
                  title: t.featuresTimerTitle, 
                  desc: t.featuresTimerDesc, 
                  icon: <Clock className="text-blue-600 dark:text-blue-400" />
                },
                { 
                  title: t.featuresProgressTitle, 
                  desc: t.featuresProgressDesc, 
                  icon: (
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    </div>
                  )
                },
                { 
                  title: t.featuresAITitle, 
                  desc: t.featuresAIDesc, 
                  icon: (
                    <div className="relative">
                      <Brain className="text-blue-600 dark:text-blue-400" />
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-yellow-400"></div>
                    </div>
                  )
                },
                { 
                  title: t.featuresDarkModeTitle, 
                  desc: t.featuresDarkModeDesc, 
                  icon: (
                    <div className="flex items-center">
                      <div className="h-6 w-3 rounded-l-full bg-slate-800 dark:bg-white"></div>
                      <div className="h-6 w-3 rounded-r-full bg-white dark:bg-slate-800"></div>
                    </div>
                  )
                },
                { 
                  title: t.featuresCustomizableTitle, 
                  desc: t.featuresCustomizableDesc, 
                  icon: <Settings className="text-blue-600 dark:text-blue-400" />
                },
              ].map((item, index) => (
                <div key={index} className="bg-slate-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white inline-block pb-2 border-b-2 border-blue-500">
            {t.faqTitle}
          </h2>
        </div>

        <Card className="border-slate-200 dark:border-gray-700">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center text-slate-800 dark:text-white">
              <MessageSquare className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
              {t.faqSubtitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-slate-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left font-medium text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{item.question}</span>
                    {openFaqItem === index ? (
                      <ChevronUp className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    )}
                  </button>
                  {openFaqItem === index && (
                    <div className="p-4 bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700">
                      <p className="text-slate-700 dark:text-slate-300">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-gray-800 pt-8 mt-16">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-2">{t.footerMadeWithCare}</p>
          <p className="text-slate-500 dark:text-slate-500">{t.footerCopyright}</p>
        </div>
      </footer>

      {/* 返回顶部按钮 */}
      <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`}>
        <div 
          className="back-to-top-button"
          onClick={scrollToTop}
          role="button"
          aria-label="返回顶部"
          tabIndex={0}
        >
          <ArrowUp size={24} />
        </div>
      </div>
    </div>
  )
} 
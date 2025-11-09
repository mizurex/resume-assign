import { useMemo, useState } from 'react'
import Header from '../components/header'

import resumeData from '../data/resume.json'
import { ChevronRight, Search, X } from 'lucide-react'
import SkillBadge from '../components/skills-badge'

type ExperienceItem = {
  id: string
  company: string
  title: string
  startDate: string
  endDate?: string
  skills: string[]
  summary?: string
  details?: string[]
}

type ResumeData = {
  name: string
  title: string
  email: string
  phone: string
  skills: string[]
  experience: ExperienceItem[]
  education?: { school: string; degree: string; year: string }[]
}

export default function Resume() {
  
  
  const data = resumeData as unknown as ResumeData

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [expandProjects, setExpandProjects] = useState<Set<string>>(new Set())


  const allSkills = useMemo(() => {
    const set_skills = new Set<string>() //use set to remove duplicates
    data.skills?.forEach(s => set_skills.add(s)) //add the skills to the set
    //return the skills as an array and sort them
    const arr = Array.from(set_skills).sort(); //make array from set and sort it
    return arr
  }, [data])


  const filteredExperience = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const skills = Array.from(selectedSkills)
    return data.experience.filter(item => {
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q)
    
        const matchesSkills =
          skills.length === 0 || skills.every(s => item.skills.includes(s))
    
        return matchesQuery && matchesSkills
    })
  }, [data.experience, searchQuery,selectedSkills])
  
  const projects = useMemo(() => {
    return ((data as unknown as { projects?: Array<{
      id: string
      name: string
      role: string
      year?: string
      skills: string[]
      summary?: string
      highlights?: string[]
    }> }).projects) || []
  }, [data])
  
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const skills = Array.from(selectedSkills)
    return projects.filter(p => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        (p.role || '').toLowerCase().includes(q) ||
        (p.skills || []).some((s) => s.toLowerCase().includes(q))
      
      const matchesSkills =
        skills.length === 0 || skills.every(s => (p.skills || []).includes(s))
      
      return matchesQuery && matchesSkills
    })
  }, [projects, searchQuery, selectedSkills])
  

  function toggleSkill(skill: string) {
    setSelectedSkills(
        selectedSkills.includes(skill)?selectedSkills.filter((s)=>{return s !==skill}):[...selectedSkills,skill]
        //if the skill is already in the array, remove it, otherwise add it
        //use the filter method to remove the skill if it is already in the array
        //use the spread operator to add the skill if it is not in the array
    )
  }

 

  function toggleExpanded(id: string) {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

function toggleProject(id: string) {
  setExpandProjects(prev => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })
}

  return (
    <div className="min-h-screen bg-zinc-100 text-gray-900 font-mono selection:bg-zinc-500 selection:text-zinc-100">
      <Header />

      <main className="mx-auto max-w-4xl p-4 md:p-6 bg-white print:bg-white">
        <section aria-labelledby="resume-header" className="mb-6 border-b border-zinc-200 pb-4">
          <h1 id="resume-header" className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">{data.name}</h1>
          <p className="text-zinc-600">{data.title}</p>
          <p className="text-zinc-600">Email: {data.email}</p>
          <p className="text-zinc-600">Phone: {data.phone}</p>
        </section>
        <section aria-labelledby="filters-title" className="mb-6 print:hidden">
          <h2 id="filters-title" className="sr-only">Filters</h2>

            <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium mb-1 text-zinc-900">Filter by Skills:</span>
               {allSkills.map(s=>{
                return(
                    <span key={s} className={`flex items-center justify-center gap-1 rounded-md border border-zinc-300 bg-gray-50 px-2  text-sm text-gray-700 cursor-pointer ${selectedSkills.includes(s) ? 'bg-gray-100' : ''}`} onClick={() => toggleSkill(s)}>     
                    {s}
                    {selectedSkills.includes(s) &&
                          <X className="size-3 text-gray-500" />
                        }
                  </span>
                )
               })}

            </div>
          <div className="mb-4 mt-9 flex items-center gap-2">
            <label htmlFor="search" className="block text-sm font-medium mb-1">
                <Search className="size-4 text-gray-500" />
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or company"
              className="w-[300px] px-2 rounded-lg border border-neutral-300 py-0.5 font-mono outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
              aria-label="Search experience by role or company"
            />
          </div>

      
        </section>
        <section aria-labelledby="experience-title" className="space-y-4 border-b border-zinc-200 pb-4">
          <h2 id="experience-title" className="text-2xl font-semibold mb-4 text-center">Experience</h2>

          {filteredExperience.length === 0 ? (
            <div role="alert" className="text-center text-gray-600 py-12">
              No matching experience found
            </div>
          ) : (
            <ul className="space-y-6">
              {filteredExperience.map(item => {
                const expanded = expandedIds.has(item.id)
                
                const panelId = `exp-panel-${item.id}`
                return (
                  <li key={item.id} className="border-b pb-4 last:border-0 border-zinc-200">
                    <div className="">
                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.id)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        className="w-full text-left cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <div className="flex  justify-between gap-3">
                          <div className="flex justify-between items-center w-full ">
                            <div className="flex items-center gap-2">
                              
                             <ChevronRight
                             className={`size-4 text-gray-500 transition-all duration-300 ease-in-out delay-75 ${expanded ? 'rotate-90' : ''}`}
                           />
                            <h3 className="font-semibold text-sm sm:text-base">
                               {item.title} — {item.company}
                            </h3>
                            </div>
                          
                            <p className="text-xs text-gray-600 font-semibold">
                              {item.startDate} – {item.endDate ?? 'Present'}
                            </p>
                          </div>
                        </div>
                      </button>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.skills?.map(s => (
                           <SkillBadge
                           skill={s}
                           key={s}
                           />
                        ))}
                      </div>

                      <div
                        id={panelId}
                        className={`overflow-hidden transition-all duration-300 delay-100 ease-out ${expanded ? 'max-h-[800px] opacity-100 mt-3' : 'max-h-0 opacity-0'} print:max-h-none print:opacity-100 print:mt-3`}
                      >
                        <div className="text-sm font-sans text-gray-700 mt-2">
                          {item.summary && <p className="mb-2">{item.summary}</p>}
                          {item.details && item.details.length > 0 && (
                            <>
                              <p className="font-medium mt-2">Achievements:</p>
                              <ul className="mt-1 list-disc pl-6 space-y-1 text-sm text-gray-700">
                                {item.details.map(d => <li key={d}>{d}</li>)}
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        {/* Projects */}
        {filteredProjects.length > 0 && (
          <section aria-labelledby="projects-title" className="mt-8 space-y-4 border-b border-zinc-200 pb-4">
            <h2 id="projects-title" className="text-2xl font-semibold mb-4 text-center">Projects</h2>
            <ul className="space-y-6">
              {filteredProjects.map((proj) => {
                const expanded = expandProjects.has(proj.id)
                const panelId = `proj-panel-${proj.id}`
                return (
                  <li key={proj.id} className="border-b pb-4 last:border-0 border-zinc-200">
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleProject(proj.id)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        className="w-full text-left cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <div className="flex justify-between gap-3">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2">
                              <ChevronRight
                                className={`size-4 text-gray-500 transition-all duration-300 ease-in-out delay-75 ${expanded ? 'rotate-90' : ''}`}
                              />
                              <h3 className="font-semibold">
                                {proj.name} — {proj.role}{proj.year ? ` (${proj.year})` : ''}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </button>

                      {proj.skills && proj.skills.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {proj.skills.map(s => (
                            <SkillBadge
                              skill={s}
                              key={s}
                            />
                          ))}
                        </div>
                      )}

                      <div
                        id={panelId}
                        className={`overflow-hidden transition-all duration-300 delay-100 ease-out ${expanded ? 'max-h-[800px] opacity-100 mt-3' : 'max-h-0 opacity-0'} print:max-h-none print:opacity-100 print:mt-3`}
                      >
                        <div className="mt-2 text-sm font-sans text-gray-700">
                          {proj.summary && <p className="mb-2">{proj.summary}</p>}
                          {proj.highlights && proj.highlights.length > 0 && (
                            <ul className="list-disc pl-6 space-y-1 text-sm font-sans text-gray-700">
                              {proj.highlights.map(h => <li key={h}>{h}</li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section aria-labelledby="education-title" className="mt-8 border-b border-zinc-200 pb-4">
            <h2 id="education-title" className="text-2xl font-semibold mb-4 text-center">Education</h2>
            <ul className="space-y-2">
              {data.education.map((edu) => (
                <li key={`${edu.school}-${edu.year}`} className="text-sm text-zinc-800">
                  <span className="font-medium">{edu.school}</span> — {edu.degree} ({edu.year})
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight, BriefcaseBusiness, Code2,
  ExternalLink, GraduationCap, Home, LibraryBig,
  Mail, Menu, Pause, Play, Repeat2,
  Search, Shuffle, SkipBack, SkipForward, Sparkles, Volume2,
  X,
} from 'lucide-react'

const projects = [
  { name: 'FosterSale', type: 'AI-powered content platform', stack: 'Product · AI · Full stack', accent: '#ff7a45', mark: 'FS', cover: '/assets/fostersale-logo.png', description: 'An AI-powered content platform for brands, built across product development, AI integrations, and full-stack engineering.', url: 'https://fostersale.com' },
  { name: 'Triibes', type: 'Social event planning platform', stack: 'TypeScript · React · Drizzle', accent: '#8C7CFF', mark: 'TR', description: 'A social event planning platform and the project Shaurya is currently building as Triibes.in.', url: 'https://github.com/ShauryaRoy/triibes' },
  { name: 'AutoApply', type: 'AI job automation', stack: 'AI · Resume matching · Automation', accent: '#1ed760', mark: 'AA', description: 'An AI-powered job application system for discovery, resume matching, optimized applications, and workflow automation.', url: 'https://github.com/ShauryaRoy/autoapply' },
  { name: 'Security Cam ML Model', type: 'Computer vision experiment', stack: 'Python · Jupyter · ML', accent: '#f5c451', mark: 'CV', description: 'A computer-vision security camera model repository with a trained model artifact and notebook workflow.', url: 'https://github.com/ShauryaRoy/Security_Cam_ML_Model' },
  { name: 'Educator List', type: 'Education directory', stack: 'Python · Data · Discovery', accent: '#52b6ff', mark: 'EL', description: 'A Python-based project for exploring and organizing educator data.', url: 'https://github.com/ShauryaRoy/Educator-List' },
]

const activity = [
  ['01', 'Leadership', 'Vice President, CloudOps Club at VIT Chennai — technical events, workshops, cloud initiatives, mentoring, and team coordination.'],
  ['02', 'Competitions', '1st Place at Sustain-AI-Thon against 100+ teams, plus a Top 100 finalist finish at SAP Hackfest.'],
  ['03', 'Education', 'B.Tech in Electronics and Electrical Engineering at VIT Chennai, applied through software, AI, automation, and product work.'],
]

const experience = [
  { role: 'Founder & Product Engineer', organisation: 'FosterSale', summary: 'Building an AI-powered content platform for brands across product development, AI integrations, full-stack engineering, and the overall product experience.' },
  { role: 'Machine Learning Intern', organisation: 'Hindalco Industries', summary: 'Worked on a computer-vision system for PPE and workplace-safety compliance, with exposure to industrial digitalization and manufacturing systems.' },
  { role: 'Web Development Intern', organisation: 'IBM', summary: 'Worked on full-stack web development with React, Node.js/Express, REST APIs, authentication, and databases.' },
]

const explorations = [
  { title: 'AutoApply', tag: 'AI automation', copy: 'Job discovery, resume matching, application optimization, and workflow automation.' },
  { title: 'Enterprise Intelligence Assistant', tag: 'Applied AI', copy: 'LLM fine-tuning, LoRA, RAG, vector search, and document-based question answering.' },
  { title: 'GeoTech', tag: 'Climate technology', copy: 'Geospatial analysis, solar-output prediction, and a solar marketplace.' },
  { title: 'Disaster Mesh Communication', tag: 'Embedded systems', copy: 'An ESP8266-based offline messaging system for disrupted-network scenarios.' },
  { title: 'Power Electronics Project', tag: 'Hardware engineering', copy: 'MATLAB/Simulink modelling, circuit analysis, PCB fabrication, and physical validation.' },
  { title: 'YouDesign', tag: 'Commerce platform', copy: 'An online platform for creating and selling custom stickers.' },
]

const songs = [
  { title: 'The 1975', artist: 'The 1975', src: '/songs/the-1975.mp3', cover: '/songs/the-1975-cover.png' },
  { title: 'Some Nights', artist: 'fun.', src: '/songs/some-nights.mp3', cover: '/songs/some-nights-cover.jpeg' },
  { title: 'Night Changes', artist: 'One Direction', src: '/songs/night-changes.mp3', cover: '/songs/night-changes-cover.jpeg' },
]

function App() {
  const [active, setActive] = useState('Home')
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isRepeating, setIsRepeating] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const audioRef = useRef(null)
  const selected = useMemo(() => projects.find((project) => project.name === selectedProject), [selectedProject])
  const currentSong = songs[currentSongIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.7
    const attemptAutoplay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        setHasStarted(true)
      } catch {
        setIsPlaying(false)
      }
    }
    attemptAutoplay()
  }, [currentSongIndex])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      await audio.play()
      setIsPlaying(true)
      setHasStarted(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const selectSong = async (index) => {
    if (index === currentSongIndex && audioRef.current?.paused) {
      await audioRef.current.play()
      setIsPlaying(true)
    }
    setCurrentSongIndex(index)
    setHasStarted(true)
  }

  const nextSong = () => {
    const nextIndex = isShuffling ? Math.floor(Math.random() * songs.length) : (currentSongIndex + 1) % songs.length
    selectSong(nextIndex)
  }

  const previousSong = () => selectSong((currentSongIndex - 1 + songs.length) % songs.length)

  const seek = (event) => {
    const nextTime = Number(event.target.value)
    if (audioRef.current) audioRef.current.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00'
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
  }

  const navigate = (label) => {
    setActive(label)
    setMenuOpen(false)
    document.getElementById(label === 'Home' ? 'top' : label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-shell" id="top">
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`} aria-label="Portfolio navigation">
        <button className="wordmark" onClick={() => navigate('Home')} aria-label="Go to home"><span className="wordmark-mark">SR</span> shaurya.dev</button>
        <nav className="nav-group">
          <NavItem icon={<Home />} label="Home" active={active === 'Home'} onClick={() => navigate('Home')} />
          <NavItem icon={<Search />} label="Explore" active={active === 'Explore'} onClick={() => navigate('Explore')} />
          <NavItem icon={<LibraryBig />} label="Library" active={active === 'Library'} onClick={() => navigate('Library')} />
        </nav>
        <div className="sidebar-rule" />
        <div className="nav-label">THE CATALOGUE</div>
        <nav className="nav-group nav-group--compact">
          <NavItem icon={<Code2 />} label="Projects" onClick={() => navigate('Projects')} />
          <NavItem icon={<BriefcaseBusiness />} label="Experience" onClick={() => navigate('Experience')} />
          <NavItem icon={<GraduationCap />} label="Extracurriculars" onClick={() => navigate('Extracurriculars')} />
        </nav>
        <div className="sidebar-foot">Available for thoughtful collaborations.<br /><span>© {new Date().getFullYear()} Shaurya Roy</span></div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></button>
          <a className="availability" href="https://github.com/ShauryaRoy" target="_blank" rel="noreferrer"><span /> 36 public repos <ArrowUpRight size={15} /></a>
        </header>

        <section className="profile-hero" aria-label="Shaurya Roy profile">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="profile-kicker"><span className="verified">✓</span> DEVELOPER · BUILDER · LEARNER</p>
            <div className="name-lockup">
              <img className="profile-portrait" src="/assets/shaurya-profile.jpeg" alt="Shaurya Roy" />
              <h1>Shaurya<br />Roy</h1>
            </div>
            <p className="hero-summary">Full-stack developer building product-first platforms and scalable systems.</p>
          </div>
        </section>

        <section className="content-section catalogue-layout" id="projects">
          <div className="projects-column">
            <SectionHeading title="Popular projects" action="View catalogue" />
            <div className="project-list" role="list">
              {projects.map((project, index) => (
                <button className="project-row" role="listitem" key={project.name} onClick={() => setSelectedProject(project.name)}>
                  <span className="track-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className={`project-art ${project.cover ? 'project-art--image' : ''}`} style={{ '--art': project.accent }}>{project.cover ? <img src={project.cover} alt="" /> : <span className="project-monogram">{project.mark}</span>}</span>
                  <span className="project-main"><strong>{project.name}</strong><small>{project.type}</small></span>
                  <span className="project-stack">{project.stack}</span>
                  <span className="row-action"><ArrowUpRight /></span>
                </button>
              ))}
            </div>
          </div>
          <aside className="favourites-panel" aria-label="My All Time Favs">
            <div className="favourites-heading"><div><span>PERSONAL PLAYLIST</span><h2>My All Time Favs</h2></div><button onClick={togglePlayback} aria-label={isPlaying ? 'Pause current song' : 'Play current song'}>{isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button></div>
            <div className="song-list" role="list">
              {songs.map((song, index) => <button className={`song-row ${index === currentSongIndex ? 'song-row--active' : ''}`} role="listitem" key={song.title} onClick={() => selectSong(index)}><span className="song-art"><img src={song.cover} alt="" /></span><span><strong>{song.title}</strong><small>{song.artist}</small></span><Play size={15} /></button>)}
            </div>
          </aside>
        </section>

        <section className="content-section explore-section" id="explore">
          <SectionHeading title="Explore the archive" action="Built across software, AI, and hardware" />
          <div className="exploration-grid">
            {explorations.map((item) => <article className="exploration-card" key={item.title}><span>{item.tag}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <SectionHeading title="Experience" action="Product, AI & full-stack engineering" />
          <div className="experience-list">
            {experience.map((item, index) => <article className="experience-row" key={item.organisation}><span>0{index + 1}</span><div><h3>{item.role}</h3><p>{item.organisation}</p></div><p className="experience-summary">{item.summary}</p></article>)}
          </div>
        </section>

        <section className="content-section" id="extracurriculars">
          <SectionHeading title="Beyond the repository" action="Leadership, recognition & education" />
          <div className="activity-grid">
            {activity.map(([number, title, copy]) => <article className="activity" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><button onClick={() => setSelectedProject('Fostersale')}>Explore <ArrowUpRight size={15} /></button></article>)}
          </div>
        </section>

        <section className="contact-strip" id="library">
          <div><span>LET’S BUILD SOMETHING GOOD</span><h2>Have a project in mind?</h2></div>
          <div className="contact-links"><a href="https://github.com/ShauryaRoy" target="_blank" rel="noreferrer"><Code2 /> GitHub</a><a href="https://instagram.com/shaurya_roy17" target="_blank" rel="noreferrer"><Sparkles /> Instagram</a><a href="https://x.com/sharpyshaurya1" target="_blank" rel="noreferrer"><BriefcaseBusiness /> X</a></div>
        </section>
      </main>

      <audio ref={audioRef} src={currentSong.src} preload="metadata" onEnded={() => isRepeating ? selectSong(currentSongIndex) : nextSong()} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => { setIsPlaying(true); setHasStarted(true) }} onPause={() => setIsPlaying(false)} />
      {hasStarted && <footer className="now-playing"><div className="now-project"><img className="mini-art" src={currentSong.cover} alt="" /><span><strong>{currentSong.title}</strong><small>{currentSong.artist}</small></span></div><div className="player"><div className="transport-controls"><button className={isShuffling ? 'control-active' : ''} onClick={() => setIsShuffling(!isShuffling)} aria-label="Toggle shuffle"><Shuffle /></button><button onClick={previousSong} aria-label="Previous song"><SkipBack fill="currentColor" /></button><button className="primary-control" onClick={togglePlayback} aria-label={isPlaying ? 'Pause current song' : 'Play current song'}>{isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={nextSong} aria-label="Next song"><SkipForward fill="currentColor" /></button><button className={isRepeating ? 'control-active' : ''} onClick={() => setIsRepeating(!isRepeating)} aria-label="Toggle repeat"><Repeat2 /></button></div><div className="timeline"><span>{formatTime(currentTime)}</span><input type="range" min="0" max={duration || 0} value={Math.min(currentTime, duration || 0)} onChange={seek} aria-label="Song progress" /><span>{formatTime(duration)}</span></div></div><div className="player-tools"><Volume2 /><input type="range" min="0" max="1" step="0.01" defaultValue="0.7" onChange={(event) => { if (audioRef.current) audioRef.current.volume = Number(event.target.value) }} aria-label="Volume" /></div></footer>}

      {selected && <div className="dialog-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}><section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()}><button className="dialog-close" onClick={() => setSelectedProject(null)} aria-label="Close project detail"><X /></button><span className="project-art dialog-art" style={{ '--art': selected.accent }}><Code2 size={35} /></span><p className="dialog-label">FEATURED REPOSITORY</p><h2 id="dialog-title">{selected.name}</h2><p>{selected.description}</p><div className="dialog-meta"><span>{selected.type}</span><span>{selected.stack}</span></div><a href={selected.url} target="_blank" rel="noreferrer" onClick={() => setSelectedProject(null)}>Open on GitHub <ExternalLink size={16} /></a></section></div>}
    </div>
  )
}

function NavItem({ icon, label, active, onClick }) { return <button className={`nav-item ${active ? 'nav-item--active' : ''}`} onClick={onClick}>{icon}<span>{label}</span></button> }
function SectionHeading({ title, action }) { return <div className="section-heading"><h2>{title}</h2><button>{action}<ArrowUpRight size={15} /></button></div> }

export default App

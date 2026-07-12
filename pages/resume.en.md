---
layout: resume
lang: en
page_id: resume
permalink: /en/resume
permalink_tr: /resume
---

<!-- =============================================
  PAGE HEADER
  Contains photo, bio text, and CV download buttons.
  Image: pulled from assets/images/resume/ folder
  CV links: point to PDF files under assets/
============================================= -->
<header class="resume-header">
  <h1 class="resume-page-title">resume</h1>
  <div class="resume-bio-container">
    <img src="{{ '/assets/images/resume/myImageDark.png' | relative_url }}" alt="Muhammet Özmen" class="resume-bio-image dark-only">
    <img src="{{ '/assets/images/resume/myImageLight.png' | relative_url }}" alt="Muhammet Özmen" class="resume-bio-image light-only">
    <div class="resume-bio-text">
      <p class="resume-bio">I'm Muhammet Özmen, born in Mardin, and I'm 24 years old. I continue the computer engineering career I began at İskenderun Technical University as an <b>Embedded Systems &amp; Software Engineer</b>.
      <br><br> I adapt to new technologies quickly, stay open to learning, and approach everything with a problem-solving mindset. I genuinely enjoy building things and staying active - which is why I take part in competitions, events, and volunteer programs. I'm currently working with my team as <b>Software Architect</b> on the <b>BİGGVADİ startup</b> project.
      <br><br> In my personal life I enjoy <a href="{{ 'https://backloggd.com/u/thekaritha/' | relative_url }}">playing video games</a>, <a href="{{ 'https://letterboxd.com/thekaritha/' | relative_url }}">watching films</a>, and <a href="{{ 'https://www.instagram.com/the.karitha/' | relative_url }}">drawing</a> whenever I get the chance.

      <br><br>Technically: I write C/C++ for STM32/ARM Cortex-M in bare-metal and Linux user space (GUI and headless). I develop drivers for UART/I2C/SPI, ADC/PWM, DMA, and interrupts; build desktop interfaces and SCADA systems with Qt; and create on-device AI models with OpenCV and TFLite Micro. I fine-tune and run local AI models for my projects, and actively integrate modern AI tools into my workflow under my own direction.
      </p>
    </div>

  </div>
  <div class="resume-cv-links">
    <a href="{{ '/assets/documents/cv-tr.pdf' | relative_url }}" target="_blank" class="resume-cv-link cv-tr">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      {{ site.data.translations.en.download_cv_tr }}
    </a>
    <a href="{{ '/assets/documents/cv-en.pdf' | relative_url }}" target="_blank" class="resume-cv-link cv-en">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      {{ site.data.translations.en.download_cv_en }}
    </a>
    <a href="{{ '/en/certificates' | relative_url }}" class="resume-cv-link cv-certs">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      My Certificates &amp; Documents
    </a>
  </div>
</header>

<!-- Quick navigation bar: in-page anchor links (Skills, Experience, Education, Timeline) -->
<nav class="resume-quick-nav reveal">
  <a href="#skills">Skills</a>
  <a href="#experience">Experience</a>
  <a href="#education">Education</a>
  <a href="#timeline">Timeline</a>
</nav>

<!-- =============================================
  SKILLS SECTION
  Each skills-group represents one skill category.
  Tag colors: red=hardware, green=firmware,
  blue=software, yellow=soft skills, orange=AI
============================================= -->
<div id="skills" class="resume-section reveal">
  <h2 class="resume-section-title">Skills</h2>
  <div class="skills-grid">
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_hardware }}" data-lang-tr="{{ site.data.translations.tr.skills_hardware }}">{{ site.data.translations.en.skills_hardware }}</div>
      <div class="skills-tags">
        <span class="tag tag-hardware">STM32 / ARM Cortex-M</span>
        <span class="tag tag-hardware">Raspberry Pi / NVIDIA Jetson</span>
        <span class="tag tag-hardware">UART / I2C / SPI / GPIO</span>
        <span class="tag tag-hardware">Basic Electronics</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_firmware }}" data-lang-tr="{{ site.data.translations.tr.skills_firmware }}">{{ site.data.translations.en.skills_firmware }}</div>
      <div class="skills-tags">
        <span class="tag tag-firmware">Bare-metal C / C++</span>
        <span class="tag tag-firmware">ADC / PWM</span>
        <span class="tag tag-firmware">DMA &amp; Interrupt</span>
        <span class="tag tag-firmware">FreeRTOS</span>
        <span class="tag tag-firmware">HAL / LL Driver Development</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_software }}" data-lang-tr="{{ site.data.translations.tr.skills_software }}">{{ site.data.translations.en.skills_software }}</div>
      <div class="skills-tags">
        <span class="tag tag-software">C / C++ / Python</span>
        <span class="tag tag-software">Qt (Widgets / QML)</span>
        <span class="tag tag-software">OpenCV</span>
        <span class="tag tag-software">TFLite Micro</span>
        <span class="tag tag-software">Linux Userspace</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="{{ site.data.translations.en.skills_soft }}" data-lang-tr="{{ site.data.translations.tr.skills_soft }}">{{ site.data.translations.en.skills_soft }}</div>
      <div class="skills-tags">
        <span class="tag tag-soft">Problem Solving</span>
        <span class="tag tag-soft">Teamwork</span>
        <span class="tag tag-soft">Project Management</span>
        <span class="tag tag-soft">Technical Documentation</span>
        <span class="tag tag-soft">Self-directed Learning</span>
      </div>
    </div>
    <div class="skills-group">
      <div class="skills-group-label" data-lang-en="AI" data-lang-tr="Yapay Zeka">AI</div>
      <div class="skills-tags">
        <span class="tag tag-ai">Local AI</span>
        <span class="tag tag-ai">LLM Integration</span>
        <span class="tag tag-ai">Agent Control</span>
        <span class="tag tag-ai">Fine Tuning</span>
      </div>
    </div>
  </div>
</div>

<!-- =============================================
  EXPERIENCE SECTION
  timeline-entry: each work experience entry
  Duplicate one of the blocks below to add more
============================================= -->
<div id="experience" class="resume-section reveal anim-delay-1">
  <h2 class="resume-section-title" data-lang-en="{{ site.data.translations.en.experience }}" data-lang-tr="{{ site.data.translations.tr.experience }}">{{ site.data.translations.en.experience }}</h2>
  <div class="timeline">

<div class="timeline-entry reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-body">
    <div class="timeline-role">Junior Software Engineer</div>
    <div class="timeline-company">Winston Software</div>
    <div class="timeline-date">Feb 2025 - Jul 2025</div>
    <ul class="timeline-bullets">
      <li><strong>Role: Building an LLM-based Academic Performance Analysis &amp; Grading Automation system</strong>
        <ul>
          <li>Developed a backend system using the <strong>OpenAI API</strong> that analyses student data and performs automated grading.</li>
          <li>Built a cross-platform desktop interface with <strong>Qt Widgets / QML</strong>.</li>
          <li>Integrated a <strong>speech-to-text pipeline</strong> to add voice command support to the LLM system.</li>
          <li>Configured an <strong>NVIDIA Jetson Nano</strong> in headless Linux mode and deployed <strong>OpenCV</strong>-based image processing.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

<div class="timeline-entry reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-body">
    <div class="timeline-role">Embedded Systems &amp; Software Intern</div>
    <div class="timeline-company">Winston Software</div>
    <div class="timeline-date">Jul 2025 - Aug 2025</div>
    <ul class="timeline-bullets">
      <li><strong>Role: Designing an LLM-powered Voice-Controlled Smart Home Electrical System</strong>
        <ul>
          <li>Carried out <strong>UART / I2C / GPIO</strong> communication and protocol tests between <strong>ESP8266</strong> and <strong>Raspberry Pi</strong>.</li>
          <li>Managed power switching with <strong>relay modules</strong>; verified hardware stability through environmental testing.</li>
          <li>Implemented PC and voice-command system control via a <strong>Qt-based Python</strong> application.</li>
          <li>Built a <strong>serial communication</strong> and <strong>structured logging</strong> infrastructure on Linux to systematise the debugging process.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

  </div>
</div>

<!-- =============================================
  EDUCATION SECTION
  timeline-entry: each education entry
  Contains school, department, and date info
============================================= -->
<div id="education" class="resume-section reveal anim-delay-2">
  <h2 class="resume-section-title" data-lang-en="{{ site.data.translations.en.education }}" data-lang-tr="{{ site.data.translations.tr.education }}">{{ site.data.translations.en.education }}</h2>
  <div class="timeline">

<div class="timeline-entry reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-body">
    <div class="timeline-role">B.Sc. in Computer Engineering</div>
    <div class="timeline-company">İskenderun Technical University</div>
    <div class="timeline-date">Oct 2021 - Aug 2025</div>
    <ul class="timeline-bullets">
      <li>GPA: 3.3 / 4.0</li>
      <li><strong>Capstone Project:</strong> Designed and implemented an autonomous turret system combining <strong>YOLO</strong>-based object detection and tracking with <strong>servo/stepper motor</strong> control.</li>
      <li><strong>Community &amp; Leadership Activities:</strong>
        <ul>
          <li><strong>IEEE Computer Society President:</strong> Led community management; organised technical presentations and workshops; coordinated member projects.</li>
          <li><strong>İskenderun Technical UAV Society Vice-President:</strong> Managed technical operations and organisation of projects that placed at TÜBİTAK and Teknofest.</li>
          <li><strong>Hatay T3 Foundation Instructor Mentor:</strong> Provided hands-on technical mentoring to students throughout the programme.</li>
          <li>Actively participated within İskenderun Technopark and collaborated with industry stakeholders.</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

  </div>
</div>

<!-- =============================================
  TIMELINE SECTION
  pt-item: each timeline entry
  Contains date, title, description, and optional image.
  Remove the img line if no image is needed
============================================= -->
<div id="timeline" class="resume-section reveal anim-delay-2">
  <h2 class="resume-section-title">Timeline</h2>
  <div class="photo-timeline">

  <!-- LATEST -->

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">March 2026 - June 2026</span>
      <h3 class="pt-title"> TÜBİTAK 1812 BİGG - Startup Project</h3>
    </div>
    <p class="pt-desc"> Together with my team, we successfully passed the first phase of the investment-based startup programme under TÜBİTAK 1812 BİGG and were admitted to the BİGGVADİ programme. With my teammates Umutcan Gökdemir and Busenur Aygün, we took the first step toward the innovative solutions we will create together.</p>
    <!-- Multiple images: horizontal scrolling gallery -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_solaclean.jpg' | relative_url }}" alt="Solo Clean Prototype" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">March 2023 - August 2025</span>
      <h3 class="pt-title"> T3 Instructor Mentorship</h3>
    </div>
    <p class="pt-desc">Under the T3 Foundation's Instructor Mentorship programme, I delivered both theoretical and hands-on training to young students in robotics coding and basic electrical engineering for two years. I designed innovative teaching materials, coordinated workshop activities, and contributed through mentoring to the development of students' technological literacy and problem-solving skills.</p>
    <!-- Multiple images: horizontal scrolling gallery -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_t3_1.jpg' | relative_url }}" alt="With T3 Hatay Coordinator Müslüm Ateş" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_t3_2.jpg' | relative_url }}" alt="Training session with students" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">June 2022 - October 2023</span>
      <h3 class="pt-title"> IEEE UAV Society</h3>
    </div>
    <p class="pt-desc">During my time as Vice-President of the IEEE UAV Society, I ran an intensive activity programme to represent the society. I managed all organisational processes - from planning large-scale events to executing them. Throughout this period I co-founded the GÖKTECH team, under which we competed in dozens of competitions and team projects.</p>
    <!-- Multiple images: horizontal scrolling gallery -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_iha_1.jpg' | relative_url }}" alt="With İskenderun Technical University Rector Prof. Dr. Mehmet DURUEL" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_iha_2.jpg' | relative_url }}" alt="UAV Society project presentation at the Youth Centre" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_iha_3.jpg' | relative_url }}" alt="ÜNİDES Jetson Nano Training" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">June 2022 - October 2023</span>
      <h3 class="pt-title"> IEEE Computer Society Presidency</h3>
    </div>
    <p class="pt-desc"> As President of the İskenderun Technical University IEEE Computer Society, I organised events and training sessions to national and international standards, supporting member growth while raising the society's profile. I personally managed every stage of large-scale organisational processes, from planning through to execution. I also mentored young inventors with projects that reached the finals at platforms such as TÜBİTAK and Teknofest. These roles allowed me to put both my technical leadership and team management skills to the highest possible use.</p>
    <!-- Multiple images: horizontal scrolling gallery -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_ieee_1.jpg' | relative_url }}" alt="IEEE Society Presentation" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_ieee_2.jpg' | relative_url }}" alt="Baykar Factory Visit" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_ieee_3.jpg' | relative_url }}" alt="IEEE Society Introduction at School" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_ieee_4.jpg' | relative_url }}" alt="IEEE Software Training" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">July 2022 - August 2022</span>
      <h3 class="pt-title">Teknofest 2023 Tourism Finalist</h3>
    </div>
    <p class="pt-desc">Representing İskenderun Technical University at Teknofest - Turkey's largest aviation, space, and technology festival - we reached the finals in the Tourism Technologies category. For our project I developed a machine-learning system that analyses tourist venue reviews and generates a scoring and recommendation engine. I took ownership of the software and the presentation, successfully representing our team.</p>
    <!-- Multiple images: horizontal scrolling gallery -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_teknofest_1.jpg' | relative_url }}" alt="Photo with TÜBİTAK President Hasan Mandal" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_teknofest_2.jpg' | relative_url }}" alt="Memory from the first day of Teknofest 2022" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_teknofest_3.jpg' | relative_url }}" alt="Presenting our project to Prof. Dr. Hasan Mandal" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>

  <div class="pt-item reveal">
    <div class="pt-header">
      <span class="pt-date">October 2021 - August 2025</span>
      <h3 class="pt-title">İskenderun Technical University - Computer Engineering</h3>
    </div>
    <p class="pt-desc">I studied computer engineering in the Faculty of Engineering and Natural Sciences for four years. During that time I completed many projects, learned a great deal, and built some great friendships.</p>
    <!-- Multiple images: horizontal scrolling gallery -->
    <div class="pt-gallery-wrap">
      <button class="pt-gallery-btn pt-gallery-btn-prev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="pt-gallery">
        <img src="{{ 'assets/images/resume/timeline_iste_1.jpeg' | relative_url }}" alt="İskenderun Technical University" class="pt-image">
        <img src="{{ 'assets/images/resume/timeline_iste_2.jpeg' | relative_url }}" alt="Graduation day" class="pt-image">
      </div>
      <button class="pt-gallery-btn pt-gallery-btn-next" aria-label="Next">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  </div>
  </div>

</div>
<style>html { scroll-behavior: smooth; }</style>

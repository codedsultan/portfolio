"""Generate resume.pdf from the same data used on the portfolio site."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

INK = HexColor('#0B1220')
SLATE = HexColor('#4B5A70')
BLUE = HexColor('#1D4ED8')
LINE = HexColor('#DDE4EE')

styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    'Name', parent=styles['Normal'], fontName='Helvetica-Bold',
    fontSize=24, leading=27, textColor=INK, spaceAfter=2,
)
headline_style = ParagraphStyle(
    'Headline', parent=styles['Normal'], fontName='Helvetica-Bold',
    fontSize=12.5, leading=15, textColor=BLUE, spaceAfter=6,
)
contact_style = ParagraphStyle(
    'Contact', parent=styles['Normal'], fontName='Helvetica',
    fontSize=9.5, leading=13, textColor=SLATE,
)
section_style = ParagraphStyle(
    'Section', parent=styles['Normal'], fontName='Helvetica-Bold',
    fontSize=10.5, leading=13, textColor=BLUE, spaceBefore=9, spaceAfter=4,
    tracking=0.5,
)
body_style = ParagraphStyle(
    'Body', parent=styles['Normal'], fontName='Helvetica',
    fontSize=9.5, leading=12.8, textColor=INK, alignment=TA_LEFT,
)
role_style = ParagraphStyle(
    'Role', parent=styles['Normal'], fontName='Helvetica-Bold',
    fontSize=10.1, leading=12.5, textColor=INK,
)
meta_style = ParagraphStyle(
    'Meta', parent=styles['Normal'], fontName='Helvetica-Oblique',
    fontSize=8.8, leading=11, textColor=SLATE,
)
bullet_style = ParagraphStyle(
    'Bullet', parent=styles['Normal'], fontName='Helvetica',
    fontSize=9.2, leading=12, textColor=INK, leftIndent=12,
    bulletIndent=2, spaceAfter=1,
)
skill_cat_style = ParagraphStyle(
    'SkillCat', parent=styles['Normal'], fontName='Helvetica-Bold',
    fontSize=9.3, leading=13, textColor=INK,
)
skill_list_style = ParagraphStyle(
    'SkillList', parent=styles['Normal'], fontName='Helvetica',
    fontSize=9.3, leading=13, textColor=SLATE,
)

PROFILE = {
    'name': 'Olusegun Ibraheem',
    'headline': 'Senior Software Engineer',
    'email': 'codesultan369@gmail.com',
    'phone': '+1 (587) 971-9955',
    'location': 'Calgary, Alberta, Canada',
    'linkedin': 'linkedin.com/in/codesultan',
    'github': 'github.com/codedsultan',
    'summary': (
        'Senior Software Engineer with 7+ years architecting and shipping production '
        'applications across the full stack. Background spans Laravel and Go on the '
        'backend, React and Next.js on the front end, and the AWS / Docker / CI-CD layer '
        'that gets it all reliably into production. Currently leading delivery at Tech1M '
        'while building and operating several self-founded SaaS products.'
    ),
}

EXPERIENCE = [
    {
        'role': 'Senior Software Engineer', 'company': 'Tech1M', 'location': 'Remote',
        'dates': 'Oct 2022 — Present',
        'achievements': [
            'Architected and deployed scalable APIs across AWS, Cloudways and VPS infrastructures',
            'Led CI/CD automation using GitHub Actions, Docker and Ansible',
            'Optimised SQL and NoSQL databases, enforced security and TDD standards',
            'Mentored engineers through code reviews and pair programming',
            'Drove Agile delivery across multiple concurrent projects',
        ],
    },
    {
        'role': 'Fullstack Engineer', 'company': 'Tedbree', 'location': 'Lagos, Nigeria',
        'dates': 'Apr 2021 — Oct 2022',
        'achievements': [
            'Designed and built scalable REST APIs using Laravel, FastAPI, and Node.js',
            'Orchestrated integrations with payment gateways, geolocation, SSO, and social auth',
            'Developed interactive admin dashboards using Inertia.js, Laravel, Vue.js, and React',
            'Improved database performance through query optimisation and indexing',
        ],
    },
    {
        'role': 'Web Developer', 'company': 'Veci Technologies', 'location': 'Ibadan, Nigeria',
        'dates': 'Sep 2017 — Mar 2021',
        'achievements': [
            'Delivered dynamic and static websites using CodeIgniter, Laravel, and PHP',
            'Developed custom WordPress themes and plugins',
            'Designed relational databases and managed hosting environments',
        ],
    },
]

SKILLS = [
    ('Languages', 'PHP, JavaScript, TypeScript, Python, Go'),
    ('Backend', 'Laravel, Node.js, FastAPI, Express.js, Gin'),
    ('Frontend', 'React, Next.js, Vue.js, Inertia.js, Tailwind CSS'),
    ('Databases', 'MySQL, PostgreSQL, MongoDB, Firebase'),
    ('DevOps & Cloud', 'AWS (EC2, RDS), Docker, CI/CD, Ansible, Cloudways'),
]

EDUCATION = [
    {
        'program': 'Higher Education Qualification (HEQ) in IT',
        'school': 'The Chartered Institute of IT (BCS), London, UK',
        'date': 'April 2022',
    },
    {
        'program': 'B.Eng. in Civil Engineering',
        'school': 'Osun State University, Osogbo, Nigeria',
        'date': 'September 2015',
    },
]

PROJECTS = [
    ('WriterIX', 'Multi-tenant AI blog-generation SaaS — Laravel, FastAPI/Celery, React, Redis, Reverb.'),
    ('PortfolioOS', 'SaaS portfolio builder with custom domains and live publishing — Laravel, Inertia, React.'),
    ('xurl.fyi', 'High-performance URL shortener — Go API backend, Next.js dashboard, PostgreSQL, Redis.'),
]


def build():
    doc = SimpleDocTemplate(
        'resume.pdf', pagesize=letter,
        leftMargin=0.60 * inch, rightMargin=0.60 * inch,
        topMargin=0.48 * inch, bottomMargin=0.48 * inch,
        title=f"{PROFILE['name']} — Resume",
        author=PROFILE['name'],
    )

    story = []

    story.append(Paragraph(PROFILE['name'], name_style))
    story.append(Paragraph(PROFILE['headline'], headline_style))
    contact_line = (
        f"{PROFILE['email']} &nbsp;&middot;&nbsp; {PROFILE['phone']} &nbsp;&middot;&nbsp; "
        f"{PROFILE['location']}<br/>{PROFILE['linkedin']} &nbsp;&middot;&nbsp; {PROFILE['github']}"
    )
    story.append(Paragraph(contact_line, contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width='100%', thickness=1.1, color=BLUE, spaceAfter=4))

    story.append(Paragraph('SUMMARY', section_style))
    story.append(Paragraph(PROFILE['summary'], body_style))

    story.append(Paragraph('EXPERIENCE', section_style))
    for job in EXPERIENCE:
        header_tbl = Table(
            [[
                Paragraph(f"{job['role']} &middot; {job['company']}", role_style),
                Paragraph(job['dates'], meta_style),
            ]],
            colWidths=[4.6 * inch, 2.25 * inch],
        )
        header_tbl.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        story.append(header_tbl)
        story.append(Paragraph(job['location'], meta_style))
        story.append(Spacer(1, 3))
        for ach in job['achievements']:
            story.append(Paragraph(f'&bull;&nbsp;&nbsp;{ach}', bullet_style))
        story.append(Spacer(1, 5))

    story.append(Paragraph('SELECTED PROJECTS', section_style))
    for title, desc in PROJECTS:
        story.append(Paragraph(f'<b>{title}</b> — {desc}', bullet_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph('SKILLS', section_style))
    skills_rows = []
    for cat, items in SKILLS:
        skills_rows.append([Paragraph(cat, skill_cat_style), Paragraph(items, skill_list_style)])
    skills_tbl = Table(skills_rows, colWidths=[1.3 * inch, 5.55 * inch])
    skills_tbl.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    story.append(skills_tbl)

    story.append(Paragraph('EDUCATION', section_style))
    for edu in EDUCATION:
        edu_tbl = Table(
            [[
                Paragraph(edu['program'], role_style),
                Paragraph(edu['date'], meta_style),
            ]],
            colWidths=[4.6 * inch, 2.25 * inch],
        )
        edu_tbl.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        story.append(edu_tbl)
        story.append(Paragraph(edu['school'], meta_style))
        story.append(Spacer(1, 4))

    doc.build(story)


if __name__ == '__main__':
    build()

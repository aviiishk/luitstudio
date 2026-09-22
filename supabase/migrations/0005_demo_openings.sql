-- Run this once in the Supabase SQL editor for the shared project, after
-- 0003_job_openings.sql (and 0004_job_application_resume.sql if you ran
-- 0003 before it existed).
--
-- Seeds a few demo openings so you can see the admin dashboard and the
-- public /career page working end-to-end. They're inserted as DRAFTS on
-- purpose — nothing here goes live on the public site until you open it
-- in /admin/careers, review/edit the copy, and switch it to Published.
-- Safe to re-run: it skips any slug that already exists.

insert into job_openings (
  title, slug, department, employment_type, location,
  summary, description, responsibilities, requirements, status
)
values
  (
    'Product Designer',
    'product-designer',
    'Design',
    'Full-time',
    'Guwahati, Assam · Remote-friendly',
    'Shape end-to-end product experiences for our own studio and client work.',
    'We''re looking for a product designer who can take a rough idea and turn it into something people actually enjoy using. You''ll work directly with both founders across research, flows, and interface design — no layers, no hand-offs.',
    array[
      'Design end-to-end product flows, from research to high-fidelity screens',
      'Build and maintain a reusable design system',
      'Work directly with developers during implementation',
      'Run lightweight user research when it actually matters'
    ],
    array[
      '2+ years designing digital products',
      'A portfolio that shows real process, not just final screens',
      'Comfortable working directly with founders, not through layers of approval',
      'Based in or open to relocating to Guwahati (remote considered for the right fit)'
    ],
    'draft'
  ),
  (
    'Full-Stack Developer',
    'full-stack-developer',
    'Engineering',
    'Full-time',
    'Guwahati, Assam · Remote-friendly',
    'Build and ship real product work across the stack, with no bureaucracy in the way.',
    'You''ll build features end-to-end — frontend, backend, and the automation in between — for both the studio''s own products and client engagements. We move fast and keep the codebase honest.',
    array[
      'Build and ship features across the full stack',
      'Work with modern frameworks (React/Next.js, Node)',
      'Keep code simple, tested, and maintainable',
      'Pair directly with design on implementation details'
    ],
    array[
      'Solid experience with React/Next.js and a backend language',
      'Comfortable owning a feature from spec to deploy',
      'Cares about code quality without over-engineering',
      'Based in or open to relocating to Guwahati (remote considered for the right fit)'
    ],
    'draft'
  ),
  (
    'Visual Designer',
    'visual-designer',
    'Design',
    'Full-time',
    'Guwahati, Assam',
    'Give brands a point of view — identity, layout, and the visual system that holds it together.',
    'From logo systems to campaign visuals, you''ll shape how our clients'' brands actually look and feel across every touchpoint.',
    array[
      'Design brand identities, layouts, and marketing visuals',
      'Keep a consistent visual system across every deliverable',
      'Collaborate with the content and motion side of the studio'
    ],
    array[
      'Strong portfolio across brand and layout work',
      'Fluent in the standard design toolkit (Figma, Adobe)',
      'An eye for typography and restraint'
    ],
    'draft'
  ),
  (
    'Video Editor & Motion Designer',
    'video-editor-motion-designer',
    'Content',
    'Contract',
    'Guwahati, Assam · Remote-friendly',
    'Cut raw footage into something people actually finish watching, and bring it to life with motion.',
    'You''ll edit everything from short-form social content to longer documentary-style pieces, and add the motion graphics that make it move.',
    array[
      'Edit video for social, YouTube, and client deliverables',
      'Design and animate titles, lower-thirds, and motion graphics',
      'Colour grade and sound-design a full edit start to finish'
    ],
    array[
      'A reel that shows real editing decisions, not just effects',
      'Comfortable with Premiere or DaVinci, plus After Effects',
      'Fast turnaround without cutting corners'
    ],
    'draft'
  )
on conflict (slug) do nothing;

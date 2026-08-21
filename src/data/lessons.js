export const lessons = [
  {
    id: 1,
    title: 'DNA: The Blueprint of Life',
    emoji: '🧬',
    color: 'mint',
    objectives: [
      'Explain what DNA is and why it stores genetic information.',
      'Identify the basic structure and role of DNA.',
      'Connect DNA to the traits of living things.'
    ],
    topics: ['What is DNA?', 'DNA structure', 'DNA and genetic information']
  },
  {
    id: 2,
    title: 'Genes: Tiny Instructions',
    emoji: '🧩',
    color: 'purple',
    objectives: [
      'Describe a gene as a section of DNA carrying genetic information.',
      'Explain how genes are related to traits.',
      'Distinguish genes from DNA as a whole.'
    ],
    topics: ['What is a gene?', 'Genes and traits', 'DNA vs. genes']
  },
  {
    id: 3,
    title: 'Chromosomes: DNA Organized',
    emoji: '🧫',
    color: 'orange',
    objectives: [
      'Describe what chromosomes are.',
      'Explain how DNA is organized into chromosomes.',
      'Connect chromosomes, DNA, and genes.'
    ],
    topics: ['What are chromosomes?', 'DNA packaging', 'Chromosome–DNA–gene relationship']
  },
  {
    id: 4,
    title: 'DNA → Gene → Chromosome',
    emoji: '🔗',
    color: 'blue',
    objectives: [
      'Explain the relationship among DNA, genes, and chromosomes.',
      'Arrange the concepts into a clear mental model.',
      'Use the relationship to explain genetic information.'
    ],
    topics: ['Putting the pieces together', 'Concept map', 'Quick challenge']
  },
  {
    id: 5,
    title: 'How Traits Are Passed On',
    emoji: '🌱',
    color: 'pink',
    objectives: [
      'Explain how genetic information is involved in inherited traits.',
      'Describe how information can be passed from parents to offspring.',
      'Apply genetics ideas to simple examples.'
    ],
    topics: ['Inherited traits', 'Genetic information', 'Trait transmission']
  }
]

export const pretests = Object.fromEntries(
  lessons.map((lesson) => [
    lesson.id,
    [
      { q: 'Which molecule stores genetic information?', options: ['DNA', 'Water', 'Protein', 'Sugar'], answer: 0 },
      { q: 'A gene is best described as…', options: ['A whole cell', 'A section of DNA', 'A type of organ', 'A chromosome itself'], answer: 1 },
      { q: 'Where is DNA organized into structures called chromosomes?', options: ['Inside cells', 'Only outside cells', 'Only in food', 'Only in water'], answer: 0 },
      { q: 'Which statement is most accurate?', options: ['Genes are made of DNA', 'DNA is made of chromosomes', 'Chromosomes are made of genes only', 'Traits are always learned'], answer: 0 },
      { q: 'Why do inherited traits matter in genetics?', options: ['They can involve genetic information passed from parents', 'They never involve DNA', 'They only describe behavior', 'They happen only after birth'], answer: 0 }
    ]
  ])
)

export const finalExam = lessons.flatMap((lesson) => [
  {
    q: `Which idea is central to "${lesson.title}"?`,
    options: [lesson.objectives[0], 'A topic unrelated to genetics', 'Only a vocabulary word', 'A rule about weather'],
    answer: 0
  },
  {
    q: 'Which statement best connects this lesson to earlier topics?',
    options: [
      'Genetic concepts are related to DNA, genes, chromosomes, and traits',
      'Genes are unrelated to DNA',
      'Chromosomes contain no genetic information',
      'Traits cannot be inherited'
    ],
    answer: 0
  }
])

export const instructionalPhases = [
  { id: 'engage', label: 'Engage', icon: '✨' },
  { id: 'explore', label: 'Explore', icon: '🔎' },
  { id: 'predict', label: 'Predict', icon: '💭' },
  { id: 'simulate', label: 'Visualize / Simulate', icon: '🧪' },
  { id: 'explain', label: 'Explain', icon: '📝' },
  { id: 'feedback', label: 'Receive Feedback', icon: '💬' },
  { id: 'apply', label: 'Apply', icon: '🌱' },
  { id: 'reflect', label: 'Reflect', icon: '🌟' }
]

const nativeSimulation = (config) => ({
  provider: 'GENELInK interactive activity',
  ...config
})

const geneExpressionSimulation = {
  provider: 'PhET Interactive Simulations',
  title: 'Gene Expression Essentials',
  url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html',
  instructions: 'Explore how the parts of a gene-expression system interact. Change one control at a time and watch how the cell process responds. This model shows gene expression; it does not directly model visible human traits.',
  expectedOutcome: 'Changing components of the gene-expression system can affect the process or amount of gene expression.',
  evaluationType: 'guided-choice',
  feedbackCorrect: '✓ Correct! Your observation matches the gene-expression model.',
  feedbackIncorrect: 'Not quite — that’s okay! The model shows that changing parts of the system can affect gene expression. A gene is an instruction section of DNA, not the trait itself.',
  difficulty: 'challenging'
}

const configs = {
  101: nativeSimulation({
    title: 'Build-a-DNA: complementary base pairs',
    learningObjective: 'Identify DNA as genetic information and use complementary base pairing.',
    instructions: 'Select a base on the original strand, then complete its matching partner. Look for the pattern across the strand.',
    predictionPrompt: 'If the original base is A, which base do you predict will pair with it?',
    expectedOutcome: 'A pairs with T, and C pairs with G.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! Great observation — A pairs with T.',
    feedbackIncorrect: 'Not quite — that’s okay! In DNA, A pairs with T, while C pairs with G.',
    evaluationQuestion: 'Which base pairs with A in DNA?',
    evaluationOptions: ['T', 'C', 'G'],
    correctOption: 0,
    applicationPrompt: 'A DNA strand has the sequence C-A-G. Write the complementary sequence.',
    reflectionPrompt: 'What pattern helped you build the complementary strand?',
    difficulty: 'standard'
  }),
  102: nativeSimulation({
    title: 'Build-a-DNA: the double-helix ladder',
    learningObjective: 'Explain how matching base pairs form the rungs of DNA.',
    instructions: 'Use the DNA builder to match complementary bases. Notice how each base has a specific partner.',
    predictionPrompt: 'What do you predict would happen to the ladder pattern if a base were paired with the wrong partner?',
    expectedOutcome: 'Complementary matching follows A–T and C–G; a mismatch breaks the usual pairing pattern.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! Your prediction matches the complementary-pairing rule.',
    feedbackIncorrect: 'Not quite — that’s okay! DNA bases pair in a specific way: A with T and C with G.',
    evaluationQuestion: 'Which statement describes DNA base pairing?',
    evaluationOptions: ['A pairs with T, and C pairs with G', 'A pairs with C, and T pairs with G', 'Any base can pair with any other base'],
    correctOption: 0,
    applicationPrompt: 'If one strand reads G-T-A, what bases would pair with it?',
    reflectionPrompt: 'How does a specific pairing rule make the DNA ladder predictable?',
    difficulty: 'standard'
  }),
  103: nativeSimulation({
    title: 'Build-a-DNA: information in a sequence',
    learningObjective: 'Describe DNA as a sequence that stores biological information used by cells.',
    instructions: 'Explore the DNA sequence and its complementary strand. Focus on how an ordered sequence can be copied using pairing rules.',
    predictionPrompt: 'If one base in a DNA sequence changes, do you predict the sequence will still be exactly the same?',
    expectedOutcome: 'A changed base makes the sequence different; effects on a cell or trait depend on where and how the change occurs.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! A changed base changes the DNA sequence.',
    feedbackIncorrect: 'Not quite — that’s okay! A changed base changes the sequence, though not every DNA change has the same effect.',
    evaluationQuestion: 'What is certain when a base in a DNA sequence is substituted?',
    evaluationOptions: ['The DNA sequence changes', 'Every trait must change', 'The cell immediately stops working'],
    correctOption: 0,
    applicationPrompt: 'Explain why a change in DNA sequence is not automatically proof that a visible trait will change.',
    reflectionPrompt: 'What is one question you would ask before deciding whether a DNA change affects a trait?',
    difficulty: 'standard'
  }),
  201: nativeSimulation({
    ...geneExpressionSimulation,
    learningObjective: 'Explain that genes are sections of DNA with instructions used in gene expression.',
    predictionPrompt: 'What do you predict will happen to gene expression if a component needed in the model is changed?',
    evaluationQuestion: 'What does the PhET model help you observe?',
    evaluationOptions: ['How parts of a gene-expression system interact', 'That a gene is the same thing as a visible trait', 'How chromosomes are packaged during cell division'],
    correctOption: 0,
    applicationPrompt: 'In your own words, distinguish the gene instruction from the cell process that uses it.',
    reflectionPrompt: 'Which part of the model helped you connect a gene to a cell process?'
  }),
  202: nativeSimulation({
    ...geneExpressionSimulation,
    difficulty: 'standard',
    learningObjective: 'Distinguish a gene from an observable trait and explain how genes can contribute to traits.',
    predictionPrompt: 'Do you predict a gene is itself the visible trait, or does it contribute instructions that can affect the trait?',
    evaluationQuestion: 'Which statement best describes a gene and a trait?',
    evaluationOptions: ['A gene is DNA information that can contribute to a trait', 'A gene is the visible trait itself', 'Traits are always caused by one gene alone'],
    correctOption: 0,
    applicationPrompt: 'A cell uses genetic instructions to make a protein involved in pigment. Explain which part is the gene instruction and which part is observable.',
    reflectionPrompt: 'How did the model help you connect an instruction inside a cell to a possible outcome?',
    feedbackIncorrect: 'Not quite — that’s okay! A gene is a section of DNA. It can contribute to a trait through cell processes, but it is not the visible trait itself.'
  }),
  203: nativeSimulation({
    ...geneExpressionSimulation,
    learningObjective: 'Compare DNA and genes as related but different levels of genetic information.',
    predictionPrompt: 'If DNA is a long molecule containing many instructions, what do you predict a gene is within it?',
    evaluationQuestion: 'Which comparison is accurate?',
    evaluationOptions: ['DNA is the molecule; a gene is a section of DNA', 'A gene is larger than the whole DNA molecule', 'DNA and genes are unrelated'],
    correctOption: 0,
    applicationPrompt: 'Complete the relationship: a gene is a ______ of the DNA molecule.',
    reflectionPrompt: 'What analogy or visual helped you remember how a gene relates to DNA?'
  }),
  301: nativeSimulation({
    title: 'Pack the DNA: chromosome organization',
    learningObjective: 'Describe chromosomes as organized structures containing DNA and proteins.',
    instructions: 'Step through the DNA packaging visual. Observe how DNA and proteins form increasingly organized structures.',
    predictionPrompt: 'Why do you predict a cell packages its long DNA molecules?',
    expectedOutcome: 'Packaging makes long DNA more compact and organized within a cell.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! DNA packaging helps organize long genetic material.',
    feedbackIncorrect: 'Not quite — that’s okay! Packaging helps long DNA fit and stay organized in cells.',
    evaluationQuestion: 'Why is DNA packaged into chromosomes?',
    evaluationOptions: ['To organize long DNA so it can fit and be managed in cells', 'To remove the genetic information', 'To turn DNA into a gene'],
    correctOption: 0,
    applicationPrompt: 'Describe one problem a cell could face if its long DNA were not organized.',
    reflectionPrompt: 'Which stage in the visual made the packaging process easiest to understand?',
    difficulty: 'standard'
  }),
  302: nativeSimulation({
    title: 'Pack the DNA: from DNA to chromosome',
    learningObjective: 'Trace the relationship between DNA, proteins, chromatin, and chromosomes.',
    instructions: 'Advance through each stage and notice what combines or changes at each level.',
    predictionPrompt: 'What do you predict DNA wraps around as it begins to become more compact?',
    expectedOutcome: 'DNA associates with proteins to form chromatin, which can condense into chromosomes.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! DNA associates with proteins as it is organized into chromatin.',
    feedbackIncorrect: 'Not quite — that’s okay! DNA wraps around proteins; together they form chromatin, which can condense into chromosomes.',
    evaluationQuestion: 'Which sequence best describes DNA packaging?',
    evaluationOptions: ['DNA + proteins → chromatin → chromosome', 'Gene → trait → DNA', 'Chromosome → protein → DNA disappears'],
    correctOption: 0,
    applicationPrompt: 'Put these terms in order from less condensed to more organized: chromosome, DNA, chromatin.',
    reflectionPrompt: 'How is packaging similar to organizing a long object for storage?',
    difficulty: 'standard'
  }),
  303: nativeSimulation({
    title: "Who's Inside Whom?",
    learningObjective: 'Explain that chromosomes contain DNA and DNA contains genes.',
    instructions: 'Explore the hierarchy activity. Focus on which structure contains the next smaller level.',
    predictionPrompt: 'Which relationship do you predict is correct: genes contain DNA, or DNA contains genes?',
    expectedOutcome: 'Chromosomes contain DNA, and genes are sections of DNA.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! A chromosome contains DNA, and DNA contains genes.',
    feedbackIncorrect: 'Not quite — that’s okay! Genes are sections of DNA, and DNA is organized into chromosomes.',
    evaluationQuestion: 'Which hierarchy is accurate?',
    evaluationOptions: ['Chromosome contains DNA; DNA contains genes', 'Gene contains a chromosome; chromosome contains DNA', 'DNA and chromosomes are unrelated'],
    correctOption: 0,
    applicationPrompt: 'Use the word “contains” to describe how a chromosome, DNA, and a gene are related.',
    reflectionPrompt: 'Which is the largest structure in this hierarchy, and which is a specific DNA section?',
    difficulty: 'standard'
  }),
  401: nativeSimulation({
    title: "Who's Inside Whom? Build the hierarchy",
    learningObjective: 'Connect chromosomes, DNA, and genes as nested levels of organization.',
    instructions: 'Use the hierarchy activity to arrange the three concepts, then explain how each level relates to the next.',
    predictionPrompt: 'Predict which item is the organized package and which is a specific section of the molecule inside it.',
    expectedOutcome: 'A chromosome is an organized package containing DNA; genes are sections of DNA.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! You have the relationship in the right order.',
    feedbackIncorrect: 'Not quite — that’s okay! Think of the chromosome as the package, DNA as the molecule, and a gene as a section of DNA.',
    evaluationQuestion: 'Which description connects all three?',
    evaluationOptions: ['Chromosomes contain DNA, and DNA contains genes', 'Genes contain chromosomes, and DNA is separate', 'All three words mean exactly the same thing'],
    correctOption: 0,
    applicationPrompt: 'Use a book or container analogy to explain chromosome → DNA → gene.',
    reflectionPrompt: 'What helped you avoid thinking of these as three unrelated objects?',
    difficulty: 'challenging'
  }),
  402: nativeSimulation({
    title: 'Genetics concept map',
    learningObjective: 'Represent the relationships among chromosomes, DNA, genes, and genetic instructions.',
    instructions: 'Explore the hierarchy activity, then use the relationships you observe to sketch or describe a simple concept map.',
    predictionPrompt: 'Which two concepts do you predict should be directly connected by “contains”?',
    expectedOutcome: 'Chromosomes contain DNA, and DNA contains genes that carry instructions.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! Those connections show the nested organization clearly.',
    feedbackIncorrect: 'Not quite — that’s okay! A chromosome contains DNA, and DNA contains genes.',
    evaluationQuestion: 'Which two “contains” relationships belong on the map?',
    evaluationOptions: ['Chromosome contains DNA; DNA contains genes', 'Gene contains DNA; DNA contains chromosome', 'Trait contains chromosome; gene contains cell'],
    correctOption: 0,
    applicationPrompt: 'Write two arrows that would belong on a concept map for chromosome, DNA, and gene.',
    reflectionPrompt: 'How did mapping the relationships help you remember each role?',
    difficulty: 'standard'
  }),
  403: nativeSimulation({
    title: 'Genetics hierarchy quick challenge',
    learningObjective: 'Explain the chromosome–DNA–gene relationship from memory.',
    instructions: 'Use the hierarchy activity as a visual check, then answer the question without copying the displayed sentence.',
    predictionPrompt: 'Before checking the activity, predict the correct order from the largest structure to the specific instruction section.',
    expectedOutcome: 'Chromosome → DNA → gene, with each level containing or forming part of the next.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! Your hierarchy matches how genetic information is organized.',
    feedbackIncorrect: 'Not quite — that’s okay! A chromosome organizes DNA, and genes are sections within DNA.',
    evaluationQuestion: 'From largest structure to specific section, which order is right?',
    evaluationOptions: ['Chromosome → DNA → gene', 'Gene → chromosome → DNA', 'DNA → gene → chromosome'],
    correctOption: 0,
    applicationPrompt: 'Explain the hierarchy in one sentence without saying the three concepts are identical.',
    reflectionPrompt: 'Which relationship do you understand more clearly now than before?',
    difficulty: 'challenging'
  }),
  501: nativeSimulation({
    title: 'Punnett Square Explorer: inherited traits',
    learningObjective: 'Model possible allele combinations inherited from two parents.',
    instructions: 'Change the parent genotypes and inspect the Punnett square. The outcomes are possibilities, not guarantees for an individual offspring.',
    predictionPrompt: 'For two Aa parents, what fraction of the four equally likely combinations do you predict will be aa?',
    expectedOutcome: 'For Aa × Aa, one of four combinations is aa (25%) in this simplified model.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! One of the four modeled combinations is aa.',
    feedbackIncorrect: 'Not quite — that’s okay! For Aa × Aa, the four combinations are AA, Aa, Aa, and aa, so one out of four is aa.',
    evaluationQuestion: 'For Aa × Aa, what fraction of the modeled combinations is aa?',
    evaluationOptions: ['1 out of 4 (25%)', '2 out of 4 (50%)', '4 out of 4 (100%)'],
    correctOption: 0,
    applicationPrompt: 'How would you explain why the square shows possible outcomes rather than guaranteeing one child’s genotype?',
    reflectionPrompt: 'How did the parent alleles combine in the square?',
    difficulty: 'challenging'
  }),
  502: nativeSimulation({
    title: 'Punnett Square Explorer: allele combinations',
    learningObjective: 'Describe alleles as versions of a gene and model how parental alleles combine.',
    instructions: 'Try different parent genotypes in the Punnett Square Explorer. Observe that each parent contributes one allele to each modeled combination.',
    predictionPrompt: 'If each parent contributes one allele, what do you predict each box in the Punnett square represents?',
    expectedOutcome: 'Each box represents one possible combination of one allele from each parent.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! Each box shows one possible inherited allele combination.',
    feedbackIncorrect: 'Not quite — that’s okay! Each box pairs one allele from each parent to show a possible genotype.',
    evaluationQuestion: 'What does one box in a Punnett square represent?',
    evaluationOptions: ['One possible combination of alleles from the parents', 'A guaranteed outcome for every offspring', 'A different gene unrelated to the parents'],
    correctOption: 0,
    applicationPrompt: 'Explain why two siblings can inherit different allele combinations from the same parents.',
    reflectionPrompt: 'What did changing a parent genotype help you notice about possible outcomes?',
    difficulty: 'standard'
  }),
  503: nativeSimulation({
    title: 'Punnett Square Explorer: predicting probabilities',
    learningObjective: 'Use a Punnett square to identify possible genotypes and describe their probabilities.',
    instructions: 'Set both parents to Aa and compare the four cells. Count the genotypes and use the proportions as model probabilities.',
    predictionPrompt: 'For Aa × Aa, what do you predict is the probability of an offspring genotype aa in this simplified model?',
    expectedOutcome: 'One of four modeled combinations is aa, giving a 25% probability in the simplified model.',
    evaluationType: 'guided-choice',
    feedbackCorrect: '✓ Correct! The model gives aa a 1-in-4 (25%) chance for each conception under these assumptions.',
    feedbackIncorrect: 'Not quite — that’s okay! One of the four combinations is aa, which is 25% in this simplified model. It is a probability, not a promise.',
    evaluationQuestion: 'For Aa × Aa, what is the modeled probability of aa?',
    evaluationOptions: ['25%', '50%', '100%'],
    correctOption: 0,
    applicationPrompt: 'A Punnett square shows a 25% chance for aa. Does that mean exactly one out of every four children must be aa? Explain.',
    reflectionPrompt: 'What is the difference between a probability and a guaranteed outcome?',
    difficulty: 'challenging'
  })
}

export function getTopicLearningConfig(topic) {
  const configured = configs[Number(topic?.id)]
  if (configured) return configured

  return nativeSimulation({
    title: topic?.activity_title || topic?.title || 'Guided genetics activity',
    learningObjective: topic?.objectives?.[0] || 'Explore the genetics concept in this topic.',
    instructions: 'Work through the guided activity and note one pattern you observe.',
    predictionPrompt: 'What do you predict you will observe in the activity?',
    expectedOutcome: 'Use evidence from the activity to explain the target genetics idea.',
    evaluationType: 'reflection',
    feedbackCorrect: '✓ Thanks for checking your thinking against the activity.',
    feedbackIncorrect: 'Not quite — that’s okay! Use the observation to revise your explanation.',
    applicationPrompt: topic?.challenge || 'Apply the concept to a new example.',
    reflectionPrompt: topic?.reflection || 'What is one idea you understand better now?'
  })
}

export function shouldRecommendAI({
  difficulty,
  misconceptionDetected = false,
  incorrectAttempts = 0,
  studentResponse = '',
  explicitRequest = false
} = {}) {
  if (explicitRequest) return true
  if (difficulty === 'challenging' || misconceptionDetected || incorrectAttempts >= 2) return true

  const response = String(studentResponse).toLowerCase()
  return /gene is (the )?trait|chromosome is (a )?gene|dna is made of genes|dominant means common/.test(response)
}

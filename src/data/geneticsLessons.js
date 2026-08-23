export const geneticsLessons = [
  {
    id: 1,
    title: 'DNA: The Blueprint of Life',
    emoji: '🧬',
    color: 'mint',
    activity_type: 'dna_builder',
    activity_title: 'Build-a-DNA',
    pretest: [
      {
        question: 'Which molecule stores genetic information?',
        options: ['DNA', 'Water', 'Protein', 'Sugar'],
        answer: 0
      },
      {
        question: 'A gene is best described as…',
        options: ['A whole cell', 'A section of DNA', 'A type of organ', 'A chromosome itself'],
        answer: 1
      },
      {
        question: 'Where is DNA organized into structures called chromosomes?',
        options: ['Inside cells', 'Only outside cells', 'Only in food', 'Only in water'],
        answer: 0
      },
      {
        question: 'Which statement is most accurate?',
        options: ['Genes are made of DNA', 'DNA is made of chromosomes', 'Chromosomes are made of genes only', 'Traits are always learned'],
        answer: 0
      },
      {
        question: 'Why do inherited traits matter in genetics?',
        options: ['They can involve genetic information passed from parents', 'They never involve DNA', 'They only describe behavior', 'They happen only after birth'],
        answer: 0
      }
    ],
    topics: [
      {
        id: 101,
        title: 'What is DNA?',
        intro: 'DNA is the instruction set inside cells. It helps living things grow, work, and pass traits on to the next generation.',
        objectives: [
          'Spot what DNA is and why cells really need it.',
          'Picture the DNA ladder and explain its shape.',
          'See how DNA keeps the life instructions neatly stored.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever wondered how your body knows how to grow, repair itself, and develop certain characteristics? The answer is not magic—it is DNA.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA is a molecule found inside the cells of living things. It acts like a biological instruction system. Every cell uses DNA to guide its activities, from making proteins to helping an organism grow and respond to its environment.</p>
              <p>Think of DNA as a detailed instruction library. It is not stored in one simple place like a book on a shelf. Instead, it is carefully organized inside cells. Scientists call the shape of DNA a double helix, which looks like a twisted ladder.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>DNA stores biological information in a chemical code. The code is made from four bases: A, T, C, and G. These letters are arranged in specific sequences, and those sequences carry instructions for building and maintaining an organism.</p>
              <p>Cells read this information to make proteins, and proteins do many jobs. Some help build body structures, while others help control chemical reactions inside cells. Without DNA, cells would not have the instructions they need to function correctly.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>DNA is the molecule that stores genetic information.</li>
                <li>DNA is found in the cells of living things.</li>
                <li>Cells use DNA as a set of instructions for growth, repair, and survival.</li>
                <li>DNA has a double-helix shape that helps it store information efficiently.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Imagine a school library full of plans, rules, and directions for how a school should function. DNA works in a similar way: it stores the information that helps a living thing grow, repair itself, and stay alive.</p>
              <p>You can also think of DNA like a recipe book. It does not contain only one recipe—it contains many instructions that help the body build the right materials at the right time.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If DNA carries the instructions for the body, what might happen if the code were copied incorrectly? How could that affect a cell or organism?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>DNA is the instruction code for life. It carries information, helps cells function, and helps living things grow and stay healthy. The pattern of A, T, C, and G is what stores that genetic information.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Now you are ready to try the DNA-building activity. As you match complementary bases, notice how the pairs fit together like a puzzle. This helps you see how the double helix is built and why accurate pairing matters.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Nice work, explorer! DNA is the molecule that stores the instructions needed for life. It helps cells work together, supports growth and repair, and is built from base pairs that carry important information.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Can you explain in your own words why DNA is like an instruction system? Try to include the words double helix, base pairs, and cells in your explanation.</p>
            </section>
          </div>
        `,
        activity_type: 'dna_builder',
        activity_title: 'Build-a-DNA',
        reflection: 'What did you notice about the matching pairs? Why do you think complementary pairing matters?',
        challenge: 'If DNA is the instruction code, why do cells need it to stay organized and protected?'
      },
      {
        id: 102,
        title: 'DNA structure',
        intro: 'DNA is built from repeating units. These units connect in a pattern that helps genes and instructions fit together.',
        objectives: [
          'Explain how DNA is built from matching base pairs.',
          'Notice why A pairs with T and C pairs with G.',
          'Understand how DNA keeps its code super accurate.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever noticed how a ladder has two long sides and many rungs connecting them? DNA has a similar design, but it is much smaller and much more important.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA is shaped like a double helix, which means it has two strands twisted together. The two strands are connected by pairs of chemical bases. This structure helps DNA be strong, compact, and able to store information reliably.</p>
              <p>Each strand is made of building blocks that link together. The order of these building blocks forms the code that tells a cell what to do.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>The sides of the DNA ladder are made from sugar and phosphate groups. The rungs are made from base pairs. A always pairs with T, and C always pairs with G. This pattern is important because it helps the DNA code stay stable and accurate when cells divide.</p>
              <p>When a cell needs to copy DNA, it can use the base-pair rule to make an accurate copy of the instructions. This is one reason DNA is so effective as an information storage molecule.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>DNA has a double-helix shape made of two strands.</li>
                <li>The ladder rungs are base pairs.</li>
                <li>A pairs with T, and C pairs with G.</li>
                <li>The structure helps DNA copy itself accurately.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think of the double helix like a zipper. The two sides are connected in a predictable pattern, and because the pattern is specific, the zipper works smoothly and consistently. DNA works in a similar way—its pairs fit together in a reliable pattern.</p>
              <p>That predictable pattern helps cells protect and copy genetic information without confusion.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why do you think A must always pair with T and C must always pair with G? What would happen if the base-pair rule were not followed?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>DNA is not just a random chain. Its structure is carefully organized so that information can be stored and copied correctly. Base pairing is one of the most important features of DNA.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>As you build DNA in the activity, watch how each base only connects with its matching partner. This pattern is what helps the code stay accurate and organized.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Great thinking! The double helix is the shape of DNA, and the matching base pairs are part of what makes DNA reliable and useful as an instruction code.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Write a sentence describing how the base-pair rule helps DNA stay accurate. Use the words pair, code, and copy in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'dna_builder',
        activity_title: 'Build-a-DNA',
        reflection: 'When you matched a base pair, what pattern did you see?',
        challenge: 'Why is the pairing rule important if DNA needs to be copied accurately?'
      },
      {
        id: 103,
        title: 'DNA and genetic information',
        intro: 'DNA stores the details that help make each organism distinct. It acts like a biological recipe book.',
        objectives: [
          'Connect DNA to the instructions guiding cells.',
          'See how DNA helps shape traits and body features.',
          'Explain why accurate DNA code really matters.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Think about how a recipe book tells a cook what ingredients to use and how to combine them. DNA works in a similar way, but instead of recipes, it stores instructions for life.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA stores information using a sequence of chemical letters. These letters are not random. They are arranged in a particular order that tells a cell how to make molecules, carry out functions, and develop in a consistent way.</p>
              <p>That is why DNA can influence traits. The information it carries guides the body in building proteins and controlling activities that affect appearance and function.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Cells read the DNA code to make proteins. Proteins help build parts of the body and carry out chemical reactions. The instructions in DNA are important because even small errors can affect the proteins being made.</p>
              <p>That is why DNA needs to be copied carefully. If the code is changed or copied incorrectly, the instructions can be altered, which may affect traits or cell function.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>DNA stores information in a sequence of chemical letters.</li>
                <li>Cells use DNA instructions to make proteins.</li>
                <li>Accuracy matters because incorrect instructions can affect traits and cell function.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Suppose a recipe has a missing ingredient or an incorrect step. The final dish would not turn out the way the cook expected. DNA is similar: if the information is copied or read incorrectly, the final result inside the body may not be correct.</p>
              <p>That is one reason DNA must be protected and copied carefully.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>How could a mistake in the DNA code affect the proteins a cell makes? Why might that matter to an organism?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>DNA stores the instructions that make life work. When the DNA code is copied and read accurately, cells can build the correct proteins and support healthy growth and function.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>As you work through the DNA builder, think about how the sequence of bases affects the final instructions. A small change in the code can lead to a big change in what the cell builds.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Excellent job thinking like a scientist! DNA is more than a molecule—it is a biological instruction system. It stores genetic information and helps guide the activities that shape living things.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Explain how DNA acts like a recipe book for a cell. Include the words code, proteins, and instructions in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'dna_builder',
        activity_title: 'Build-a-DNA',
        reflection: 'How does DNA help cells know what to build?',
        challenge: 'What would happen if the code in DNA changed or was copied incorrectly?'
      }
    ]
  },
  {
    id: 2,
    title: 'Genes: Tiny Instructions',
    emoji: '🧩',
    color: 'purple',
    activity_type: 'phet',
    activity_title: 'Gene Expression Essentials',
    activity_url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html',
    pretest: [
      {
        question: 'Which molecule contains genes?',
        options: ['DNA', 'Water', 'Fat', 'Salt'],
        answer: 0
      },
      {
        question: 'A gene is…',
        options: ['A section of DNA', 'A complete organism', 'A type of tissue', 'A food molecule'],
        answer: 0
      },
      {
        question: 'Genes can influence…',
        options: ['Traits', 'The weather', 'Planet size', 'Day length'],
        answer: 0
      },
      {
        question: 'Which is the best comparison?',
        options: ['DNA is the molecule; a gene is a section of it', 'Genes are bigger than cells', 'DNA is made of organs', 'Genes have no genetic information'],
        answer: 0
      },
      {
        question: 'What can a gene contain?',
        options: ['Genetic information', 'Only water', 'Only minerals', 'No information'],
        answer: 0
      }
    ],
    topics: [
      {
        id: 201,
        title: 'What is a gene?',
        intro: 'Genes are small parts of DNA that contain biological instructions.',
        objectives: [
          'Tell what a gene is and where it fits in DNA.',
          'Explain how genes give cells their instructions.',
          'Connect genes to traits and why they matter so much.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever thought about how one small section of a huge instruction code can affect something as visible as eye color, hair texture, or even how a cell behaves? That small section is a gene.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA is a very long molecule that contains lots of information. Inside that long molecule are smaller sections called genes. A gene is not a separate object floating around by itself. It is a specific section of DNA.</p>
              <p>Think of DNA like a long instruction manual. A gene is one specific section of that manual, and it gives a cell one important instruction or group of instructions.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Genes contain instructions used by cells. These instructions help cells make proteins, and proteins do many jobs in the body. Some proteins help build structures, while others help control chemical reactions.</p>
              <p>Because genes give different instructions, they can contribute to different characteristics. DNA contains many genes, so a cell can access a wide range of information without mixing everything together into one giant instruction.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>DNA is the large molecule that stores biological information.</li>
                <li>A gene is a specific section of DNA.</li>
                <li>Genes give cells instructions to make important molecules.</li>
                <li>Genes can help influence traits, but traits often involve many genes working together.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Imagine a recipe book where one page has instructions for making a special sauce. That page is just one small part of the whole book, but it gives a specific instruction for a particular outcome. A gene works in a similar way: it is one part of DNA with a specific instruction for a cell.</p>
              <p>Different genes can affect different processes, which is why living things can have such variety in their features and functions.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If DNA is the whole set of instructions, what makes one gene different from another gene? Why might different genes affect different parts of an organism?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Genes are sections of DNA, not separate objects. They carry instructions that cells use, and they can contribute to traits in combination with other genes and environmental factors.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Before you open the PhET Gene Expression Essentials activity, think about what you expect to see. Look for how a gene can influence the production of a protein and how that protein can affect an outcome. This will help you connect the idea of a gene to an actual biological process.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Nice work! A gene is one specific section of DNA, and DNA contains many genes. These genes provide instructions that cells can read and use to help build the body and support life.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>In one or two sentences, explain the difference between DNA and a gene. Use the words instruction manual and section in your explanation.</p>
            </section>
          </div>
        `,
        activity_type: 'phet',
        activity_title: 'Gene Expression Essentials',
        activity_url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html',
        reflection: 'What happened when you changed the controls in the simulation? What did you notice about how different parts of the system connected?',
        challenge: 'How is a gene like an instruction card inside a larger DNA blueprint?'
      },
      {
        id: 202,
        title: 'Genes and traits',
        intro: 'Genes help create traits, but they are not the same thing as the trait itself.',
        objectives: [
          'Explain how genes help shape traits.',
          'Spot the difference between a gene and the trait you see.',
          'See why genes matter in inheritance.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever noticed that some people have curly hair, brown eyes, or freckles while others do not? Those visible features are called traits, and genes help guide them.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>A trait is something you can observe, such as eye color, hair texture, or height. A gene is the section of DNA that helps contribute to that trait. A gene does not look like a trait by itself—it is the instruction behind the trait.</p>
              <p>In other words, genes are not the same as the physical feature. They help direct the body to make proteins and develop structures that lead to features we can see.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Genes influence traits by controlling the production of proteins. Some proteins help make pigments, while others help shape body structures or influence how body systems work. Different genes can affect different traits, and many traits come from more than one gene.</p>
              <p>That is why traits are not always simple. They are often influenced by a combination of genes and environment, but genes are still a key part of the story.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>A trait is an observable feature.</li>
                <li>A gene is a DNA instruction that can contribute to a trait.</li>
                <li>Proteins help carry out the instructions that lead to traits.</li>
                <li>Many traits are influenced by more than one gene.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>If a gene helps produce a protein involved in pigment, it may influence hair or eye color. Another gene may help a cell shape a structure in the body. The trait is the final expression, but the gene is the instruction that helped shape it.</p>
              <p>This is why it is useful to separate the idea of the gene from the trait it influences.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why is it helpful to say a gene influences a trait instead of saying a gene is the trait itself?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>A gene is an instruction, while a trait is the expression or outcome. Genes often work together, and the result is a combination of genetic influences and environment.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>As you explore the simulation, look for how a gene can lead to a protein, and how that protein can affect what you observe in a living thing. It is a great way to connect the invisible code to the visible outcome.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Genes are instructions, and traits are the final visible results. The two are connected, but they are not the same thing.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Explain the difference between a gene and a trait in your own words. Use the sentence frame: “A gene is… while a trait is…”</p>
            </section>
          </div>
        `,
        activity_type: 'phet',
        activity_title: 'Gene Expression Essentials',
        activity_url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html',
        reflection: 'How do genes connect to something you can actually observe in a living thing?',
        challenge: 'Why is it helpful to separate the idea of a gene from the trait it helps produce?'
      },
      {
        id: 203,
        title: 'DNA vs. genes',
        intro: 'DNA is the whole molecule, while genes are smaller sections within it.',
        objectives: [
          'Compare DNA and genes without mixing them up.',
          'Explain how they connect to each other.',
          'Use that link to talk about genetic information.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Imagine a giant library full of many instruction pages. The library is DNA, and one specific page is a gene. Both are part of the same system, but they are not the same thing.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA is the long molecule that stores genetic information. A gene is one section within that molecule. It is a specific instruction set, not the whole DNA molecule itself.</p>
              <p>This helps us see that the relationship is nested. DNA is the larger structure, and genes are smaller parts inside it.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>DNA contains many genes, and each gene gives instructions for a particular purpose. A simple way to remember it is: DNA is the whole library, and genes are individual pages or chapters with specific instructions.</p>
              <p>That is why students should not confuse DNA with a gene. A gene is part of DNA, and DNA is the full molecule that holds many genes together.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>DNA is the larger molecule.</li>
                <li>A gene is a smaller section of DNA.</li>
                <li>Genes carry specific instructions.</li>
                <li>DNA contains many genes working together.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think about a textbook. The textbook is the whole book, but one chapter is a smaller piece of it. A gene is like a chapter that gives instructions for one job, while DNA is the whole textbook containing many chapters.</p>
              <p>They are different in size and function, but they belong to the same bigger system.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If a gene is a small section of DNA, what does that tell you about how much information DNA can store?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>DNA is the large molecule; genes are specific sections inside it. DNA stores many instructions, and genes are the parts that carry those instructions for a particular task or trait.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>As you explore the gene-expression simulation, watch how a gene influences a cell process. This will help you connect the idea of the larger DNA molecule to the smaller gene instructions.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Excellent! DNA is the larger molecule, and genes are smaller sections inside it. Both are important because DNA holds the full set of instructions while genes help direct specific jobs.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Can you explain the difference between DNA and a gene in one sentence? Try to include the words molecule and section in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'phet',
        activity_title: 'Gene Expression Essentials',
        activity_url: 'https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html',
        reflection: 'What does the simulation help you understand about how a gene can affect an outcome?',
        challenge: 'Can you explain the difference between a DNA molecule and a gene in one sentence?'
      }
    ]
  },
  {
    id: 3,
    title: 'Chromosomes: DNA Organized',
    emoji: '🧫',
    color: 'orange',
    activity_type: 'chromosome_visualizer',
    activity_title: 'Pack the DNA!',
    pretest: [
      {
        question: 'Chromosomes are mainly organized…',
        options: ['DNA and proteins', 'Water and sugar', 'Only fat', 'Only minerals'],
        answer: 0
      },
      {
        question: 'Why is DNA packaged into chromosomes?',
        options: ['To organize long DNA molecules', 'To remove all genetic information', 'To turn DNA into water', 'To stop cells from working'],
        answer: 0
      },
      {
        question: 'Genes are…',
        options: ['Sections of DNA', 'Entire organs', 'Types of cells', 'Foods'],
        answer: 0
      },
      {
        question: 'Which order is correct?',
        options: ['DNA → genes → chromosomes as organized DNA', 'Chromosomes → water → genes', 'Genes → cells → DNA only', 'Traits → water → chromosomes'],
        answer: 0
      },
      {
        question: 'Chromosomes help organize…',
        options: ['Genetic material', 'Weather patterns', 'Food recipes', 'Muscles only'],
        answer: 0
      }
    ],
    topics: [
      {
        id: 301,
        title: 'What are chromosomes?',
        intro: 'Chromosomes are a highly organized way to package DNA inside cells.',
        objectives: [
          'Explain why DNA needs to be packed neatly in cells.',
          'Describe chromosomes as organized DNA packages.',
          'See how chromosomes help store lots of genes.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Imagine trying to carry a very long extension cord in a backpack that is too small. It would be messy and hard to manage. The same challenge happens with DNA inside a cell: it is extremely long, so it must be organized carefully.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA is long, and it stores a huge amount of information. If it were left loose inside a cell, it would be difficult to manage and could become tangled or damaged. To solve this problem, cells package DNA with proteins so it can fit into a compact form.</p>
              <p>This organized structure is called chromatin, and it can become tightly condensed into chromosomes when a cell is getting ready to divide. Chromosomes are the highly organized structures that hold DNA in a manageable form.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>DNA wraps around proteins and coils into a more compact arrangement. This makes it easier to fit inside the nucleus of a cell. The relationship looks like this: DNA → DNA + proteins → chromatin → chromosome.</p>
              <p>Chromosomes are not separate from DNA. They are organized structures containing DNA. They also hold many genes, which are sections of DNA with instructions for cells. This organization helps the cell store information efficiently and retrieve it when needed.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>DNA is very long and must be organized inside cells.</li>
                <li>DNA wraps around proteins to become more compact.</li>
                <li>Chromatin is the packaged form of DNA and proteins.</li>
                <li>Chromosomes are condensed structures that contain DNA and many genes.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think about packing a very long piece of thread into a box. If you toss it in loosely, it becomes tangled and difficult to use. But if you wind it carefully around a spool, it becomes organized and easier to manage. DNA works in a similar way.</p>
              <p>This matters because cells need to keep genetic information protected while also being able to access it at the right time.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why would a cell need DNA to be organized instead of floating around loosely? What problems could happen if it were not packed or protected?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Chromosomes are organized structures containing DNA. They help cells manage long DNA molecules so the information stays protected, readable, and manageable during cell division.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Now you are ready for the “Pack the DNA!” activity. As you organize the strands, think about how the structure helps the cell fit a large amount of information into a small space. This is a great way to visualize why DNA needs packaging.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Great job, explorer! DNA is long, and cells solve the storage problem by wrapping it around proteins and organizing it into chromosomes. This keeps the information available and protected.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Try to describe the order DNA → DNA + proteins → chromatin → chromosome in your own words. Explain why the organization is important.</p>
            </section>
          </div>
        `,
        activity_type: 'chromosome_visualizer',
        activity_title: 'Pack the DNA!',
        reflection: 'How does organizing DNA help the cell manage information?',
        challenge: 'Why would long DNA molecules be difficult to manage without chromosome structure?'
      },
      {
        id: 302,
        title: 'DNA packaging',
        intro: 'Packaging helps DNA fit and function efficiently without losing its instructions.',
        objectives: [
          'Explain why DNA packing matters so much.',
          'Describe how DNA and proteins team up to organize it.',
          'Recognize chromatin and chromosomes when you see them.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>If you had to carry a giant rope in a tiny backpack, you would probably coil it up. Cells do something similar with DNA so it can fit and still be used correctly.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>DNA is very long, so it must be wrapped and compacted. The material formed by DNA and proteins is called chromatin. Chromatin is the compact form that helps DNA fit inside a cell nucleus.</p>
              <p>When a cell prepares to divide, chromatin becomes even more compact and forms chromosomes. This makes the genetic material easier to move and organize.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>The compact structure helps the cell save space, protect DNA, and control when genes are read. If DNA stayed loose all the time, it would be difficult to manage and easier to damage.</p>
              <p>Chromosomes are a highly organized version of DNA, and they make it easier for cells to divide and pass information to new cells accurately.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>Packaging helps DNA fit into the cell.</li>
                <li>DNA and proteins form chromatin.</li>
                <li>Chromosomes are highly organized packages of DNA.</li>
                <li>Packaging protects the code and helps with cell division.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>A garden hose is easier to store when it is coiled neatly than when it is loose and tangled. DNA is similar: packaging makes it easier to organize and protect long information strands.</p>
              <p>In a cell, this organization is essential because the instructions are valuable and must be handled carefully.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why is it important for a cell to both protect DNA and still be able to access it when needed?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Packaging is not random. It helps the cell fit long DNA molecules into a small space and keeps the information protected and organized.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Compare the loose and packed forms while you drag and organize the DNA. Notice how the structure changes when the cell needs to prepare for division.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Nice job! DNA needs packaging to stay organized and protected. Chromatin and chromosomes are smart solutions that help the cell manage its genetic information.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Write a short explanation of why DNA must be packed and organized inside a cell. Use the words protect and organize in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'chromosome_visualizer',
        activity_title: 'Pack the DNA!',
        reflection: 'Why is a compact form useful when a cell is dividing?',
        challenge: 'What would happen if DNA were not organized?'
      },
      {
        id: 303,
        title: 'Chromosome–DNA–gene relationship',
        intro: 'Chromosomes are not separate from DNA; they are organized forms of it.',
        objectives: [
          'Explain how genes, DNA, and chromosomes fit together.',
          'Spot chromosomes as the packages that hold DNA and many genes.',
          'Use the right order to explain how genetic info is organized.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Can you imagine a giant set of instructions packed into a neat container? That is a good way to think about chromosomes, DNA, and genes. They are connected parts of one system.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>A chromosome contains a very long DNA molecule. That DNA molecule contains many genes, and each gene is a specific section with instructions for the cell. These ideas belong together—they are not separate from one another.</p>
              <p>Understanding this relationship helps us see how genetic information is stored and organized inside the cell.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Here is the key connection: chromosome → contains DNA → DNA contains genes → genes carry instructions. The bigger structure contains the smaller parts, and each level helps organize genetic information in a different way.</p>
              <p>So DNA, genes, and chromosomes are related levels of organization. The chromosome is the package, DNA is the long molecule inside it, and genes are specific sections of that DNA molecule.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>A chromosome is an organized package.</li>
                <li>Inside that package is a long DNA molecule.</li>
                <li>Along that DNA molecule are many genes.</li>
                <li>Genes are specific sections of DNA that carry instructions.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think of a chromosome like a carefully organized storage box. Inside that box is a long instruction sheet—the DNA. Along that sheet are smaller sections with different jobs—the genes. Each one is important, but they work as a connected system.</p>
              <p>This helps explain the hierarchy: gene ⊂ DNA ⊂ chromosome.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If a gene is inside DNA and DNA is inside a chromosome, what does that tell you about how genetic information is organized inside a cell?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Genes are not separate from DNA. They are parts of DNA, and DNA is organized into chromosomes. Understanding this hierarchy helps you make sense of genetic information.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Now that you understand the relationship, you are ready for the “Who’s Inside Whom?” activity. This activity will help you place chromosome, DNA, and gene in the correct order and see the connection clearly.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Excellent work! DNA, genes, and chromosomes are different parts of the same system. They are connected, and understanding their relationship helps explain how a cell stores and uses genetic information.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Can you draw or explain the hierarchy in your own words: chromosome → DNA → gene? Try to use the phrases contains and specific section in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'chromosome_visualizer',
        activity_title: 'Pack the DNA!',
        reflection: 'Which idea is the largest structure, and which one is the smallest instruction unit?',
        challenge: 'Explain the hierarchy: chromosome → DNA → gene.'
      }
    ]
  },
  {
    id: 4,
    title: 'DNA → Gene → Chromosome',
    emoji: '🔗',
    color: 'blue',
    activity_type: 'hierarchy_drag_drop',
    activity_title: "Who's Inside Whom?",
    pretest: [
      {
        question: 'Which statement connects the concepts?',
        options: ['Genes are sections of DNA and DNA is organized into chromosomes', 'Genes are unrelated to DNA', 'Chromosomes contain no DNA', 'DNA is an organ'],
        answer: 0
      },
      {
        question: 'A useful mental model is…',
        options: ['DNA is material, genes are instructions, chromosomes are organized packages', 'DNA is weather, genes are water', 'Chromosomes are cells', 'Genes are organs'],
        answer: 0
      },
      {
        question: 'Where are genes found?',
        options: ['Within DNA', 'Only in water', 'Outside all cells', 'Only in food'],
        answer: 0
      },
      {
        question: 'What do chromosomes organize?',
        options: ['DNA', 'Weather', 'Food', 'Water'],
        answer: 0
      },
      {
        question: 'Which idea is most important?',
        options: ['DNA, genes, and chromosomes are connected parts of genetic organization', 'They are completely unrelated', 'Only genes exist', 'Chromosomes contain no genetic information'],
        answer: 0
      }
    ],
    topics: [
      {
        id: 401,
        title: 'Putting the pieces together',
        intro: 'The relationship between DNA, genes, and chromosomes is a hierarchy, not three separate unrelated objects.',
        objectives: [
          'Connect DNA, genes, and chromosomes as one system.',
          'Explain that genes are tiny sections inside DNA.',
          'Map the order: chromosome → DNA → gene.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever tried to sort a few ideas and realized they are really part of one big system? DNA, genes, and chromosomes are like that. They are connected, not separate and unrelated.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>Many students think of DNA, genes, and chromosomes as three completely separate objects. That is not the best way to understand them. These ideas are part of one organization system inside cells.</p>
              <p>A chromosome contains a long DNA molecule. That DNA molecule contains many genes. A gene is a specific section of DNA, and it carries instructions used by the cell.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Here is the key relationship: chromosome contains DNA, DNA contains genes, and genes are specific instruction sections inside DNA. This means the relationship is nested. A gene is inside DNA, and DNA is inside a chromosome.</p>
              <p>So the correct idea is not “DNA, genes, and chromosomes are all the same thing.” They are related levels of organization. Each level has a different role, but they work together as one system.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>A chromosome is an organized package.</li>
                <li>Inside that package is a very long DNA molecule.</li>
                <li>Along that DNA molecule are many genes.</li>
                <li>Genes are specific sections of DNA that carry instruction information.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Imagine a chromosome as a neatly organized package of information. Inside it is a very long instruction document—the DNA molecule. Along that document are smaller sections, each one with a different instruction or task. Those smaller sections are genes.</p>
              <p>This helps you see the relationship clearly: gene ⊂ DNA ⊂ chromosome.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If a gene is inside DNA and DNA is inside a chromosome, what does that tell you about how genetic information is organized inside a cell?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Genes are not separate from DNA. They are parts of DNA, and DNA is organized into chromosomes. Understanding this hierarchy helps you make sense of genetic information.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Now that you understand the relationship, you are ready for the “Who’s Inside Whom?” drag-and-drop activity. This activity will help you place chromosome, DNA, and gene in the correct order and test your understanding.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Excellent thinking! DNA, genes, and chromosomes are connected parts of the same system. The chromosome is the organized structure, DNA is the long molecule inside it, and genes are specific sections of DNA that carry instructions.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Can you draw or explain the hierarchy in your own words: chromosome → DNA → gene? Try to use the words contains and specific section in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'hierarchy_drag_drop',
        activity_title: "Who's Inside Whom?",
        reflection: 'If the relationship is connected, what phrase best explains it?',
        challenge: 'Can you arrange the correct hierarchy without thinking of them as separate objects?'
      },
      {
        id: 402,
        title: 'Concept map',
        intro: 'Visualizing the structure makes the idea easier to remember.',
        objectives: [
          'Build a quick concept map of the hierarchy.',
          'Explain what each level is doing in the system.',
          'Connect the idea to how traits get passed on.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Sometimes a map helps more than a paragraph. The relationship among DNA, genes, and chromosomes is easier to understand when you can see the hierarchy.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>A concept map shows how ideas connect. In genetics, the key connection is: chromosomes contain DNA, and DNA contains genes. This helps us see how information is organized and stored.</p>
              <p>Instead of treating these words as unrelated, a map helps you use the same system to think about how the information works together.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Concept maps are useful because they show structure. A chromosome is a packaged unit, DNA is the long molecule inside it, and genes are specific sections of DNA. Together, they form a clear hierarchy.</p>
              <p>This kind of thinking helps you remember both the size of each part and its role in carrying instructions.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>Chromosome = larger organized package.</li>
                <li>DNA = the long molecule inside the chromosome.</li>
                <li>Gene = a specific section of DNA with instructions.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think about how a city map organizes streets and buildings. The map has levels of detail, from the big picture to the small specific locations. Genetic information works in a similar way: bigger structures contain smaller parts with specific jobs.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why might it be useful to organize genetic information as a map instead of a random list?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>When you understand the hierarchy, the ideas become easier to remember and compare. Chromosomes organize DNA, and DNA contains genes with specific instructions.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Use the drag-and-drop activity to test whether you can correctly place chromosome, DNA, and gene in the system. The goal is not speed—it is understanding the relationship.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Great job! A concept map helps you see the structure clearly. When the relationship is visualized, the pieces fit together much more easily.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Draw a quick concept map using the words chromosome, DNA, and gene. Then explain how the levels are connected.</p>
            </section>
          </div>
        `,
        activity_type: 'hierarchy_drag_drop',
        activity_title: "Who's Inside Whom?",
        reflection: 'Which level is the largest structure, and which level is the most specific instruction?',
        challenge: 'Write a short sentence that describes the relationship in your own words.'
      },
      {
        id: 403,
        title: 'Quick challenge',
        intro: 'Check how clearly you can explain the relationship.',
        objectives: [
          'Rebuild the hierarchy from memory.',
          'Use the right science words without getting mixed up.',
          'Explain the relationship in a simple, clear way.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Now that you know the main idea, try a quick challenge: can you explain how the pieces fit together without mixing them up?</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>Genetic information is organized in a clear hierarchy. Chromosomes are big, organized structures; DNA is the long molecule they hold; and genes are specific sections of DNA with instructions.</p>
              <p>When you can explain this relationship clearly, you are thinking like a scientist. You are seeing how the system works together rather than as three unrelated parts.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>The system is not random. Chromosomes organize DNA so it can fit inside cells, and DNA contains genes that carry important instructions. Those instructions help the cell make proteins and carry out functions.</p>
              <p>This means the hierarchy is both structural and functional. The bigger structure stores the instruction set, and the smaller pieces carry specific jobs.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>Chromosomes organize DNA.</li>
                <li>DNA contains many genes.</li>
                <li>Genes provide instructions for traits and functions.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think of a school building. The building is the big structure, the hallways organize the space, and each classroom has a specific purpose. In genetics, the chromosome is the building, DNA is the hallway system, and genes are the classrooms with instructions inside them.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why is it important to see DNA, genes, and chromosomes as connected rather than separate?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Chromosomes, DNA, and genes are part of one system. The big picture matters, but so do the smaller parts and their specific jobs.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Use this final quick challenge to check your understanding. If you can place the pieces in order without confusion, you are ready to explain the system clearly.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Fantastic! You have now connected the main idea: chromosomes contain DNA, DNA contains genes, and genes carry the instructions that help living things function and develop.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Explain the relationship in one sentence: chromosomes, DNA, and genes are connected because…</p>
            </section>
          </div>
        `,
        activity_type: 'hierarchy_drag_drop',
        activity_title: "Who's Inside Whom?",
        reflection: 'Can you explain the relationship without saying the parts are unrelated?',
        challenge: 'What phrase from the lesson is most important to remember?'
      }
    ]
  },
  {
    id: 5,
    title: 'How Traits Are Passed On',
    emoji: '🌱',
    color: 'pink',
    activity_type: 'punnett_square',
    activity_title: 'Punnett Square Explorer',
    pretest: [
      {
        question: 'Inherited traits can involve…',
        options: ['Genetic information from parents', 'Only weather', 'Only learned behavior', 'No biological information'],
        answer: 0
      },
      {
        question: 'Genetic information is encoded in…',
        options: ['DNA', 'Water', 'Salt', 'Air'],
        answer: 0
      },
      {
        question: 'Offspring can receive genetic information from…',
        options: ['Parents', 'Only teachers', 'Only friends', 'The weather'],
        answer: 0
      },
      {
        question: 'Which can contribute to inherited characteristics?',
        options: ['Genes', 'Only exercise', 'Only school grades', 'Only weather'],
        answer: 0
      },
      {
        question: 'Why do genetics help explain traits?',
        options: ['Genes carry information that can influence inherited characteristics', 'Traits never involve biology', 'Genes only control weather', 'DNA exists only outside cells'],
        answer: 0
      }
    ],
    topics: [
      {
        id: 501,
        title: 'Inherited traits',
        intro: 'Traits can be inherited when genetic information is passed from parents to offspring.',
        objectives: [
          'Explain how parents pass genetic info to offspring.',
          'Tell the difference between genes, alleles, and traits.',
          'Use a Punnett square to show possible outcomes.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever noticed that children can look a little like one parent, a little like the other, or a mix of both? That happens because genetic information is passed from parents to offspring.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>Living things inherit genetic information from their parents. This information is stored in DNA and carried by genes. A trait is something you can observe, such as eye color, hair texture, or height. A gene is an instruction section of DNA that can contribute to that trait.</p>
              <p>Genes can exist in different versions called alleles. Alleles are slightly different forms of the same gene. When a parent passes genes to offspring, each parent contributes one allele for a gene, and the combination of those alleles can influence the trait that appears.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Inheritance is not always a simple “one gene equals one trait” rule. Sometimes one gene strongly influences a trait, but many traits are influenced by several genes and even by environmental factors.</p>
              <p>Even so, Punnett squares are a helpful way to model simplified inheritance patterns. They show possible combinations of alleles from the parents. These are possible outcomes, not guaranteed outcomes.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>Offspring receive genetic information from both parents.</li>
                <li>Genes may come in different versions called alleles.</li>
                <li>Alleles combine to make possible inherited outcomes.</li>
                <li>Punnett squares show possible combinations, not certainties.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Suppose Parent 1 has the genotype Aa and Parent 2 has the genotype Aa. Each parent can contribute either an A or an a allele. The combinations can be AA, Aa, or aa. This is why Punnett squares are useful—they help us see the possible combinations and their probabilities.</p>
              <div style="overflow:auto; margin-top:12px;">
                <pre style="background:#f4f7fb; padding:12px; border-radius:10px; font-family:monospace; white-space:pre;">      A    a
   ┌────┬────┐
A  │ AA │ Aa │
   ├────┼────┤
a  │ Aa │ aa │
   └────┴────┘</pre>
              </div>
              <p>That gives 25% AA, 50% Aa, and 25% aa.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If each parent contributes one allele, why do different combinations happen even when the parents are the same? What does that tell you about inheritance?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Traits can be influenced by inherited genetic information. Punnett squares help model possible combinations of alleles, showing patterns of inheritance in a simplified way.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Now it is time to use the Punnett Square Explorer. As you fill in the grid, remember that the goal is not to predict a guaranteed outcome, but to explore the possible combinations each parent can contribute.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Nice work! Inherited traits come from genetic information that is passed from parents to offspring. Punnett squares help us model possible outcomes by showing how alleles can combine.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Explain in your own words why Punnett squares show possible outcomes rather than certain outcomes. Include the terms allele, parent, and offspring in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'punnett_square',
        activity_title: 'Punnett Square Explorer',
        reflection: 'What is the difference between a gene and a trait?',
        challenge: 'Why would two parents both have a gene for a trait without necessarily showing the same final outcome?'
      },
      {
        id: 502,
        title: 'Genetic information',
        intro: 'A gene might have different versions called alleles, which can affect outcomes.',
        objectives: [
          'Describe alleles and why they matter in inheritance.',
          'Connect inherited traits to genes and alleles.',
          'Explain why allele combinations can turn out differently.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever wondered why siblings can inherit different combinations of traits even when they have the same parents? The answer lies in the way alleles combine.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>Genes are sections of DNA, but they may not all be exactly the same. Different versions of the same gene are called alleles. For example, a gene might have an A form and an a form.</p>
              <p>When parents pass on genetic information, each one contributes one allele. The specific combination of alleles in the offspring helps shape the trait that appears.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>Alleles matter because they are the different versions of the instructions. The same gene can have more than one version, and those versions can lead to different expression of a trait.</p>
              <p>When two parents contribute alleles, the offspring does not automatically get one exact version from each. It gets a pairing, and that pairing can create different outcomes.</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>Alleles are different versions of the same gene.</li>
                <li>Each parent contributes one allele.</li>
                <li>Different allele combinations can lead to different inherited outcomes.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Think of two recipe cards for the same dessert. One card might say “use chocolate chips,” while another says “use caramel.” Both are versions of the same dessert idea, but each leads to a different result. Alleles are similar—they are different versions of the same gene instruction.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>Why do you think different allele combinations can lead to different inherited outcomes even when the same genes are involved?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>The same gene can have different versions, and those versions affect what the offspring inherits. This is why inheritance can produce variety.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>As you work with the Punnett square, pay attention to how each parent contributes one allele. The pattern of those two alleles is what determines the possible inherited result.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Great thinking! Different versions of genes called alleles help explain why inheritance can result in variety. The combination you receive is part of the story.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Explain how a gene and an allele are related. Then describe why different allele combinations can lead to different inherited outcomes.</p>
            </section>
          </div>
        `,
        activity_type: 'punnett_square',
        activity_title: 'Punnett Square Explorer',
        reflection: 'What does a Punnett square help you see?',
        challenge: 'How can two parents both pass along an allele with different combinations?'
      },
      {
        id: 503,
        title: 'Trait transmission',
        intro: 'Punnett squares make it easier to see possible outcomes in inheritance.',
        objectives: [
          'Use a simple Punnett square with confidence.',
          'Predict the possible offspring outcomes.',
          'Explain genotype chances in a way that makes sense.'
        ],
        content: `
          <div class="discussion">
            <section>
              <h3>Friendly Hook</h3>
              <p>Have you ever wondered why a prediction is not always the same as a certainty? In genetics, a Punnett square helps us model possible outcomes without claiming that one result is guaranteed.</p>
            </section>
            <section>
              <h3>Introduction to the Concept</h3>
              <p>Punnett squares are diagrams that show how alleles from parents can combine. They help us predict the possible genotypes of offspring based on the alleles each parent contributes.</p>
              <p>They are a model, not a guarantee. The diagram helps us see the range of possible results, along with their probabilities.</p>
            </section>
            <section>
              <h3>Main Explanation</h3>
              <p>When two parents are both Aa, each parent can pass on either A or a. The square organizes these possibilities and helps us see four combinations: AA, Aa, aA, or aa.</p>
              <p>From this, we can estimate percentages. A Punnett square helps us ask: “What are the possible outcomes?” rather than “What is definitely going to happen?”</p>
            </section>
            <section>
              <h3>Break the Concept into Smaller Ideas</h3>
              <ul class="mini-list">
                <li>Punnett squares organize possible allele combinations.</li>
                <li>Each parent contributes one allele.</li>
                <li>Probabilities help describe likely outcomes.</li>
              </ul>
            </section>
            <section>
              <h3>Example or Real-Life Connection</h3>
              <p>Imagine flipping two coins. Each coin has two possible outcomes, and the pair of outcomes creates a variety of combinations. A Punnett square works in a similar way: each parent contributes one item from a set of options, and the combinations are organized into a grid.</p>
              <p>That is why genetic predictions are often described as probabilities rather than certainties.</p>
            </section>
            <section class="think-box">
              <h3>Think About It</h3>
              <p>If a Punnett square shows more than one possible outcome, why is it still useful to science? What does it tell us that we might not know otherwise?</p>
            </section>
            <section>
              <h3>Key Idea / Important Reminder</h3>
              <p>Punnett squares show possible outcomes, not guaranteed results. They are helpful models for understanding inheritance and probability.</p>
            </section>
            <section class="activity-box">
              <h3>Interactive Activity Introduction</h3>
              <p>Use the Punnett Square Explorer to fill in the grid and notice how the combinations appear. The goal is to understand the pattern of possible inherited outcomes.</p>
            </section>
            <section>
              <h3>Friendly Recap</h3>
              <p>Excellent work! Punnett squares are powerful tools because they help us see how inherited information can combine. They show possible outcomes and help us reason about probabilities.</p>
            </section>
            <section>
              <h3>Explorer Challenge</h3>
              <p>Write a sentence explaining why Punnett squares are useful in genetics. Include the words likely, possible, and offspring in your answer.</p>
            </section>
          </div>
        `,
        activity_type: 'punnett_square',
        activity_title: 'Punnett Square Explorer',
        reflection: 'Why is a Punnett square useful for predicting possible outcomes?',
        challenge: 'Why are probabilities helpful when thinking about traits in offspring?'
      }
    ]
  }
]

export const finalExamQuestions = [
  { question: 'Which molecule stores genetic information?', options: ['DNA', 'Water', 'Protein', 'Sugar'], answer: 0 },
  { question: 'A gene is best described as…', options: ['A section of DNA', 'A whole cell', 'A type of organ', 'A chromosome itself'], answer: 0 },
  { question: 'Why is DNA organized into chromosomes?', options: ['To fit and manage long DNA molecules', 'To remove all genetic information', 'To make DNA disappear', 'To change the genetic code'], answer: 0 },
  { question: 'Which statement is correct?', options: ['Genes are sections of DNA and DNA is organized into chromosomes', 'Genes are unrelated to DNA', 'Chromosomes contain no DNA', 'DNA is made of organs'], answer: 0 },
  { question: 'How are inherited traits related to DNA?', options: ['They involve genetic information passed from parents', 'They are only learned behaviors', 'They happen without DNA', 'They are never influenced by genes'], answer: 0 },
  { question: 'What does a Punnett square help you do?', options: ['Predict possible allele combinations in offspring', 'Measure cell size', 'Create proteins directly', 'Destroy DNA'], answer: 0 },
  { question: 'What is the best description of DNA?', options: ['A biological molecule storing instructions', 'A cell wall', 'A type of body tissue', 'A pure liquid'], answer: 0 },
  { question: 'If a chromosome contains DNA, what else does DNA contain?', options: ['Many genes', 'Only water', 'Only minerals', 'No information'], answer: 0 },
  { question: 'Why are genes important?', options: ['They carry instructions for traits and proteins', 'They create weather patterns', 'They are the same as chromosomes', 'They have no role in cells'], answer: 0 },
  { question: 'What is a good way to describe the relationship between DNA, genes, and chromosomes?', options: ['Chromosomes contain DNA, DNA contains genes, and genes carry biological instructions', 'They are all unrelated objects', 'Only genes have instructions', 'Chromosomes are made of water only'], answer: 0 }
]

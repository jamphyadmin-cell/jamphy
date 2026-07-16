const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding blog posts...');

  // Find an admin user to be the author
  const admin = await prisma.user.findFirst({
    where: { email: 'jamphy.admin@gmail.com' }
  }) || await prisma.user.findFirst();

  if (!admin) {
    console.error('No users found in database to act as author.');
    return;
  }

  const posts = [
    {
      title: "Mastering Mathematical Methods for IIT JAM Physics",
      slug: "mastering-mathematical-methods-iit-jam-physics",
      excerpt: "A comprehensive guide on how to approach Mathematical Physics, the foundational pillar for scoring high in IIT JAM.",
      content: `Mathematical Methods form the bedrock of almost every other subject in the IIT JAM Physics syllabus. If your mathematics is weak, your physics will inevitably suffer. Here is a strategic approach to mastering this crucial section.

## 1. Vector Calculus is Non-Negotiable
You must be completely comfortable with Gradient, Divergence, and Curl. The theorems of Gauss, Stokes, and Green are frequently tested directly or applied in Electrodynamics. 

Make sure you know how to use:
$$ \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0} $$
and the divergence theorem:
$$ \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV = \\iint_S \\mathbf{F} \\cdot d\\mathbf{a} $$

## 2. Differential Equations
First-order and second-order linear differential equations with constant coefficients are standard fare. Pay special attention to:
- Homogeneous vs. Non-Homogeneous equations
- Finding the Particular Integral (PI) and Complementary Function (CF)
- Legendre and Bessel differential equations (understand their generating functions and orthogonality conditions).

## 3. Complex Analysis
Don't get bogged down by the abstract math. Focus on:
- Cauchy-Riemann equations
- Cauchy's Integral Theorem and Formula
- Finding Residues and evaluating real integrals using the Residue Theorem.

**Pro Tip:** Always practice drawing the contour and identifying the poles that lie *inside* the contour.

## 4. Matrices and Determinants
Eigenvalues and eigenvectors are extremely high-yield topics, especially when combined with Quantum Mechanics (Hermitian matrices). 

### Key Properties to Memorize:
1. The sum of eigenvalues equals the trace of the matrix.
2. The product of eigenvalues equals the determinant.
3. Eigenvalues of a Hermitian matrix are real.
4. Eigenvalues of a Unitary matrix have a magnitude of 1.

Mastering these four areas will give you a significant edge and make topics like Quantum Mechanics and Electrodynamics much easier to tackle. Happy studying!`,
      status: "PUBLISHED",
      tags: ["Strategy", "Mathematical Methods", "Preparation"],
      authorId: admin.id,
      publishedAt: new Date()
    },
    {
      title: "Time Management Strategy for the Final 90 Days",
      slug: "time-management-strategy-final-90-days",
      excerpt: "How to effectively allocate your time, revise your notes, and take mock tests in the crucial final three months before the exam.",
      content: `The final 90 days before the IIT JAM Physics exam can make or break your rank. It’s no longer about learning new concepts; it’s about consolidating what you know, identifying weak points, and mastering time management.

Here is a proven 3-phase strategy for your final three months.

## Phase 1: The Consolidation (Days 90 to 60)
During this month, your primary goal is to finish any lingering syllabus topics and consolidate your notes.
- **Short Notes:** You should be converting your detailed notes into formula sheets and 'short notes'. If a topic takes 10 pages in your notebook, it should take 1 page in your short notes.
- **Topic-wise Tests:** Take topic-wise tests to ensure you haven't forgotten the subjects you studied 6 months ago. 

## Phase 2: The Revision & Mock Phase (Days 60 to 30)
This is when you shift from learning to testing.
- **Full-Length Mocks:** Start taking one full-length mock test every week. Sit for 3 hours straight without interruptions to build stamina.
- **Error Analysis:** Spending 3 hours taking a test is useless if you don't spend 2 hours analyzing it. *Why did you get a question wrong?* Was it a conceptual error, a calculation mistake, or a time-pressure guess?
- **Update the Vault:** Add your mistakes to your Mistakes Vault and review them periodically.

## Phase 3: The Final Sprint (Days 30 to 1)
In the last 30 days, do not touch any new topics.
- **Previous Year Questions (PYQs):** Solve the last 10 years of PYQs. IIT JAM tends to repeat patterns, if not exact questions.
- **Frequency:** Increase your mock tests to two per week.
- **Sleep Schedule:** Fix your biological clock. If your exam is in the morning session, make sure your brain is accustomed to being active and solving physics problems at 9:00 AM. 

> **Remember:** Consistency > Intensity. Studying 6 hours every day is far better than studying 14 hours for two days and then burning out for a week.

Trust your preparation, stay calm, and execute your strategy. You've got this!`,
      status: "PUBLISHED",
      tags: ["Time Management", "Strategy", "Revision"],
      authorId: admin.id,
      publishedAt: new Date()
    }
  ];

  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.post.create({ data: post });
      console.log(`Created post: ${post.title}`);
    } else {
      console.log(`Post already exists: ${post.title}`);
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

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
      content: `Mathematical Methods form the absolute bedrock of almost every other subject in the IIT JAM Physics syllabus. It is a simple reality that if your mathematics foundation is shaky, your overall physics performance will inevitably suffer. Here is a very strategic and focused approach to mastering this crucial section of the syllabus.

## 1. Vector Calculus is Completely Non-Negotiable
You must be entirely comfortable with Gradient, Divergence, and Curl before you even think about looking at other topics. The mathematical theorems of Gauss, Stokes, and Green are frequently tested directly. Even more importantly, they are applied heavily in Electrodynamics. 

Make sure you know exactly how to use Maxwell's equations in differential form:
$$ \\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0} $$
and the divergence theorem to convert integrals seamlessly:
$$ \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV = \\iint_S \\mathbf{F} \\cdot d\\mathbf{a} $$

## 2. Differential Equations
First-order and second-order linear differential equations with constant coefficients are standard fare on the exam. Pay special attention to these specific areas:
*   Homogeneous versus Non-Homogeneous equations
*   Finding the Particular Integral (PI) and Complementary Function (CF)
*   Legendre and Bessel differential equations. You must understand their generating functions and orthogonality conditions thoroughly.

## 3. Complex Analysis
Do not get bogged down by the abstract math that you might see in pure mathematics textbooks. For Physics, you need to focus on practical applications:
*   Cauchy Riemann equations for analyticity
*   Cauchy's Integral Theorem and Formula
*   Finding Residues and evaluating real integrals using the Residue Theorem.

**Pro Tip:** Always take the time to practice drawing the contour carefully. Identifying the exact poles that lie inside the contour is where most students make silly mistakes.

## 4. Matrices and Determinants
Eigenvalues and eigenvectors are extremely high yield topics, especially when combined with Quantum Mechanics where you will deal with Hermitian matrices. 

### Key Properties You Must Memorize:
1. The sum of all eigenvalues always equals the trace of the matrix.
2. The product of all eigenvalues exactly equals the determinant.
3. Eigenvalues of a Hermitian matrix are strictly real.
4. Eigenvalues of a Unitary matrix always have a magnitude of exactly one.

Mastering these four core mathematical areas will give you a significant edge over the competition and make advanced topics like Quantum Mechanics and Electrodynamics much easier to tackle. Happy studying and stay consistent!`,
      status: "PUBLISHED",
      tags: ["Strategy", "Mathematical Methods", "Preparation"],
      authorId: admin.id,
      publishedAt: new Date(),
      views: 142
    },
    {
      title: "Time Management Strategy for the Final 90 Days",
      slug: "time-management-strategy-final-90-days",
      excerpt: "How to effectively allocate your time, revise your notes, and take mock tests in the crucial final three months before the exam.",
      content: `The final 90 days before the IIT JAM Physics exam are truly the most important days of your preparation journey. These three months can literally make or break your final rank. At this stage, it is no longer about trying to learn entirely new concepts from scratch. Instead, it is all about consolidating what you already know, identifying your specific weak points, and mastering your time management skills.

Here is a highly proven, step by step, three phase strategy for your final three months.

## Phase 1: The Consolidation (Days 90 to 60)
During this first month, your primary goal is to finish up any lingering syllabus topics and consolidate your scattered notes into a highly readable format.
*   **Short Notes:** You should be actively converting your detailed, lengthy notes into tight formula sheets and short notes. If a particular topic takes up 10 pages in your main notebook, it should take exactly 1 page in your short notes. Be brutal with what you cut out.
*   **Topic wise Tests:** Take targeted topic wise tests to ensure you have not forgotten the fundamental subjects you studied six months ago. 

## Phase 2: The Revision and Mock Phase (Days 60 to 30)
This is the critical transition period where you shift entirely from learning mode to testing mode.
*   **Full Length Mocks:** Start taking one full length mock test every single week. You must sit for 3 hours straight without any interruptions to build up your mental stamina.
*   **Deep Error Analysis:** Spending 3 hours taking a test is completely useless if you do not spend at least 2 hours analyzing it afterwards. Why did you get a specific question wrong? Was it a deep conceptual error, a silly calculation mistake, or simply a time pressure guess?
*   **Update the Mistakes Vault:** Always add your mistakes to a notebook or vault and review them periodically so you never make the same mistake twice.

## Phase 3: The Final Sprint (Days 30 to 1)
In the last 30 days before the exam, under no circumstances should you touch any new, complicated topics.
*   **Previous Year Questions (PYQs):** Solve the last 10 years of PYQs meticulously. IIT JAM tends to repeat underlying patterns and concepts, even if they do not repeat exact questions.
*   **Test Frequency:** Increase your mock tests to two full tests per week.
*   **Fix Your Sleep Schedule:** Fix your biological clock right now. If your actual exam is in the morning session, make sure your brain is accustomed to being fully active and solving complex physics problems at exactly 9:00 AM every day. 

> **Remember:** Consistency is far greater than Intensity. Studying 6 solid hours every single day is much better than studying 14 hours for two days and then burning out completely for an entire week.

Trust the hard work you have put in, stay extremely calm during the paper, and execute your strategy perfectly. You have absolutely got this!`,
      status: "PUBLISHED",
      tags: ["Time Management", "Strategy", "Revision"],
      authorId: admin.id,
      publishedAt: new Date(),
      views: 315
    },
    {
      title: "Conquering the Toughest Archetypes: Quantum Mechanics & Electrodynamics",
      slug: "toughest-archetypes-quantum-electrodynamics",
      excerpt: "A deep dive into the notoriously difficult MSQ and NAT questions in Quantum Mechanics and Electrodynamics, and how to approach them.",
      content: `In the IIT JAM Physics exam, the toughest questions are typically found hiding in the Multiple Select Question (MSQ) and Numerical Answer Type (NAT) sections. These questions demand a very deep conceptual understanding and rigorous, multi step calculations rather than simple rote formula plugging.

Let us break down the most notoriously difficult questions on the exam that consistently revolve around Quantum Mechanics and Electrodynamics.

## 1. Quantum Mechanics: Perturbation Theory and Commutators
These questions are specifically designed to test your ability to confidently handle non commuting operators and calculate first order energy or state corrections without breaking a sweat.

**The Ultimate Challenge:** Often, the examiner will give you a perturbed Hamiltonian in the form of $\\hat{H} = \\hat{H}_0 + \\hat{H}'$ where you must use bra ket notation to evaluate intricate integrals over spatial coordinates. You will find yourself relying heavily on the fundamental properties of harmonic oscillator raising and lowering operators to get through the math quickly.

**Why it is so tough:** It requires simultaneously holding multiple complex concepts in your head at once. You need a firm grasp of operator algebra, parity, and advanced integration techniques without making a single algebraic error in the middle of a long page of working. One dropped negative sign will cost you the entire question.

## 2. Electrodynamics: Boundary Value Problems and Multipole Expansion
Determining the exact electric potential and electric field in regions with specific dielectric boundaries requires solving Laplace's equation. This is almost always done using the method of Separation of Variables.

**The Ultimate Challenge:** You are typically handed a boundary condition that does not simplify easily at all. This forces you to manually apply Fourier coefficients to match the potentials accurately at the boundaries, such as calculating the potential inside and outside a spherical shell.

**Why it is so tough:** You desperately need strong spatial reasoning skills to visualize the problem. Beyond that, you need a flawless recall of Legendre polynomials and the mathematical ability to meticulously apply orthogonal properties to cancel out the correct terms. It is tedious and highly error prone.

If you want to master these sections, you have to practice solving these archetypes entirely on blank paper, without looking at the solutions halfway through. Build a strong habit of finishing the calculation all the way to the final numerical answer.`,
      status: "PUBLISHED",
      tags: ["Quantum Mechanics", "Electrodynamics", "Advanced Problems"],
      authorId: admin.id,
      publishedAt: new Date(),
      views: 89
    },
    {
      title: "Cracking Hard MSQs: Mathematical Methods and Practice Strategies",
      slug: "cracking-hard-msqs-mathematical-methods",
      excerpt: "How to tackle complex Vector Calculus problems and the best strategies to build competency for the toughest sections of IIT JAM.",
      content: `Following up on our discussion of Quantum Mechanics and Electrodynamics, we must talk about the third pillar of difficult questions in the IIT JAM Physics exam: Mathematical Methods. Mathematical physics questions in the MSQ section are famous for being tricky, time consuming, and conceptually dense.

## 1. Mathematical Methods: Vector Calculus and Complex Analysis
Exam setters absolutely love to combine several different theorems into a single, massive problem. For example, you might be asked to evaluate a complex line integral using Cauchy's Residue Theorem, or you might have to convert a tricky surface integral to a volume integral using Gauss's Divergence Theorem with highly non trivial vector fields.

**The Ultimate Challenge:** The geometry of the surface or contour given in the question is usually highly unusual. You might see something strange like the intersection of a solid cylinder and a paraboloid. Identifying the absolutely correct coordinate system to use, whether that is Cartesian, Cylindrical, or Spherical, can be incredibly difficult under pressure.

**Why it is so tough:** Mixing multiple calculus theorems and trigonometric simplifications in a high pressure, time crunched environment is a very common stumbling block. Students often pick the wrong coordinate system and end up with an unsolveable integral that eats up 15 minutes of exam time.

## How to Practice and Build Real Competency
To confidently tackle questions of this high caliber, you need to familiarize yourself with the exact structural difficulty of previous exams. You must build up a rigorous habit of solving the NAT and MSQ sections without ever using partial approximations.

1. **Review Official Past Papers:** You can directly explore and download previous year question papers from excellent resources like the Pravegaa Education IIT JAM portal. This will allow you to view the absolute hardest actual test questions and get a feel for the examiner's mindset.
2. **Practice with Step by Step Solutions:** If you want to accurately check your reasoning against official or expert verified working, try utilizing the Physics by Fiziks solutions to see exactly how seasoned educators break down these multi step quantum and mathematical problems. 

The secret to MSQs is patience. Read every single option carefully, treat every option as an individual True or False question, and never assume that finding one correct option means the others are wrong. Good luck!`,
      status: "PUBLISHED",
      tags: ["Mathematical Methods", "MSQ", "NAT"],
      authorId: admin.id,
      publishedAt: new Date(),
      views: 56
    }
  ];

  for (const post of posts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.post.create({ data: post });
      console.log(`Created post: ${post.title}`);
    } else {
      await prisma.post.update({
        where: { slug: post.slug },
        data: post
      });
      console.log(`Updated existing post: ${post.title}`);
    }
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

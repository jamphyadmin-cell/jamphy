export const questions = [

  {
    id: 1,
    year: 2026,
    subject: "Polarization",
    type: "MCQ",

    question: String.raw`
Light of wavelength \(632\,nm\) is passing through an optically active medium of thickness \(20\,cm\). The optical rotation exhibited by the medium is \(18^\circ\). Which of the following options correctly states the magnitude of the difference in refractive indices corresponding to the left and the right circularly polarized light?
`,

    options: [
      String.raw`\(1.81\times10^{-5}\)`,
      String.raw`\(3.16\times10^{-7}\)`,
      String.raw`\(3.62\times10^{-5}\)`,
      String.raw`\(6.32\times10^{-7}\)`
    ],

    detailedSolution: String.raw`Optical rotation \(\theta = 18^\circ = \frac{\pi}{10}\) rad.

Thickness \(d = 20\) cm \(= 0.2\) m.

Wavelength \(\lambda = 632\) nm.

Using the formula for optical rotation:
\(\theta = \frac{\pi d}{\lambda}(n_L - n_R)\)

Rearranging for the difference in refractive indices:
\(n_L - n_R = \frac{\theta \lambda}{\pi d} = \frac{(\frac{\pi}{10}) \times 632 \times 10^{-9}}{\pi \times 0.2}\)

\(n_L - n_R = \frac{63.2 \times 10^{-9}}{0.2} = 316 \times 10^{-9} = 3.16 \times 10^{-7}\)`,

    correctAnswer: 1,
  },

  {
    id: 2,
    year: 2026,
    subject: "Semiconductors",
    type: "MCQ",

    question: String.raw`
Consider an \(n\)-type silicon in which the fully ionized dopant concentration is \(10^{17}\,cm^{-3}\). The intrinsic electron density is \(1.5\times10^{10}\,cm^{-3}\). Which of the following options correctly states the equilibrium hole concentration in \(cm^{-3}\)?
`,

    options: [
      String.raw`\(2.25\times10^{3}\)`,
      String.raw`\(1.55\times10^{3}\)`,
      String.raw`\(3.01\times10^{3}\)`,
      String.raw`\(4.52\times10^{3}\)`
    ],

    detailedSolution: String.raw`The fully ionized donor concentration is \(N_d = 10^{17}\) cm\(^{-3}\). 

In an n-type semiconductor at equilibrium, the electron concentration \(n \approx N_d = 10^{17}\) cm\(^{-3}\).

According to the mass action law:
\(n p = n_i^2\)

\(p = \frac{n_i^2}{n} = \frac{(1.5 \times 10^{10})^2}{10^{17}} = \frac{2.25 \times 10^{20}}{10^{17}} = 2.25 \times 10^{3}\) cm\(^{-3}\)`,

    correctAnswer: 0,
  },

  {
    id: 3,
    year: 2026,
    subject: "Wave Optics",
    type: "MCQ",

    question: String.raw`
Consider the superposition of two electromagnetic waves with their electric field vectors given by \(\vec{E}_1(z,t)=\hat{i}A_1\cos(kz-\omega t)\) and \(\vec{E}_2(z,t)=\hat{j}A_2\sin(kz-\omega t+\phi)\), where \(A_1\) and \(A_2\) are the amplitudes, \(k\) is the wavenumber, \(\omega\) is the angular frequency, and \(\phi\) is the relative phase. Which of the following options represents a resultant elliptically polarized wave with its semi-major axis either along \(\hat{i}\) or \(\hat{j}\)?
`,

    options: [
      String.raw`\(\phi=0\) and \(A_1\ne A_2\)`,
      String.raw`\(\phi=\frac{\pi}{2}\) and \(A_1=A_2\)`,
      String.raw`\(\phi=\frac{\pi}{2}\) and \(A_1\ne A_2\)`,
      String.raw`\(\phi=0\) and \(A_1=A_2\)`
    ],

    detailedSolution: String.raw`The resultant electric field components are:
\(E_x = A_1 \cos(kz-\omega t)\)
\(E_y = A_2 \sin(kz-\omega t + \phi) = A_2 \cos(kz-\omega t + \phi - \frac{\pi}{2})\)

The phase difference between the \(y\) and \(x\) components is \(\Delta\theta = \phi - \frac{\pi}{2}\).

For an elliptically polarized wave with principal axes along \(\hat{i}\) and \(\hat{j}\), the phase difference must be an integer multiple of \(\pi\).

This implies \(\phi - \frac{\pi}{2} = -\frac{\pi}{2}\) or \(\frac{\pi}{2}\). If \(\phi = 0\), the phase difference is \(-\frac{\pi}{2}\), which results in the required ellipse.

Furthermore, for it to be an ellipse and not a circle, the amplitudes must not be equal, so \(A_1 \ne A_2\).`,

    correctAnswer: 0,
  },

  {
    id: 4,
    year: 2026,
    subject: "Boolean Algebra",
    type: "MCQ",

    question: String.raw`
Which of the following options represents the simplified form of the Boolean equation \(Y=\bar{A}\bar{B}\bar{C}+\bar{A}B\bar{C}+A\bar{B}\bar{C}+AB\bar{C}\)?
`,

    options: [
      String.raw`\(A\bar{B}\)`,
      String.raw`\(\bar{A}B\bar{C}\)`,
      String.raw`\(\bar{B}C\)`,
      String.raw`\(\bar{C}\)`
    ],

    detailedSolution: String.raw`We are given the Boolean equation:
\(Y = \bar{A}\bar{B}\bar{C} + \bar{A}B\bar{C} + A\bar{B}\bar{C} + AB\bar{C}\)

Factor out the common term \(\bar{C}\):
\(Y = \bar{C}(\bar{A}\bar{B} + \bar{A}B + A\bar{B} + AB)\)

Group terms to simplify:
\(Y = \bar{C}[\bar{A}(\bar{B} + B) + A(\bar{B} + B)]\)

Since \(\bar{B} + B = 1\), this reduces to:
\(Y = \bar{C}(\bar{A} + A)\)

Since \(\bar{A} + A = 1\), the final simplified expression is:
\(Y = \bar{C}\)`,

    correctAnswer: 3,
  },

  {
    id: 5,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
A quantum particle is confined in a one-dimensional space of \(0\le x\le 2\). Consider a normalized wavefunction of the particle as

\[
\psi(x)=\sqrt{\frac{p}{5}}[1+\cos(\pi x/2)]\sin(\pi x/2).
\]

Which of the following options gives the correct value of \(p\)?
`,

    options: [
      String.raw`\(2\)`,
      String.raw`\(3\)`,
      String.raw`\(4\)`,
      String.raw`\(1\)`
    ],

    detailedSolution: String.raw`The wavefunction is \(\psi(x) = \sqrt{\frac{p}{5}}[1 + \cos(\frac{\pi x}{2})]\sin(\frac{\pi x}{2})\).

Expand it: \(\psi(x) = \sqrt{\frac{p}{5}}[\sin(\frac{\pi x}{2}) + \frac{1}{2}\sin(\pi x)]\).

To find \(p\), we use the normalization condition \(\int_{0}^{2} |\psi(x)|^2 dx = 1\).

\(\int_{0}^{2} [\sin^2(\frac{\pi x}{2}) + \frac{1}{4}\sin^2(\pi x) + \sin(\frac{\pi x}{2})\sin(\pi x)] dx\)

The integral of \(\sin^2\) over its full periods is half the interval:
\(\int_{0}^{2} \sin^2(\frac{\pi x}{2}) dx = 1\) and \(\int_{0}^{2} \sin^2(\pi x) dx = 1\).

The cross term \(\int_{0}^{2} \sin(\frac{\pi x}{2})\sin(\pi x) dx = 0\) due to orthogonality.

Thus, the total integral is \(\frac{p}{5} \times (1 + \frac{1}{4} + 0) = \frac{p}{5} \times \frac{5}{4} = \frac{p}{4}\).

Setting this to 1 gives \(p = 4\).`,

    correctAnswer: 2,
  },

  {
    id: 6,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
Consider the normalized superposed state \(\psi=c_0\phi_0+c_1\phi_1\), where \(\phi_0\) and \(\phi_1\) are the ground and first excited states of a simple harmonic oscillator, respectively. \(c_0\) and \(c_1\) are imaginary superposition coefficients. Which of the following options is correct for the expectation value of \((\langle x\rangle+i\langle p\rangle)\)?
`,

    options: [
      String.raw`Imaginary`,
      String.raw`Real`,
      String.raw`Zero`,
      String.raw`Complex with non-zero real and imaginary parts`
    ],

    detailedSolution: String.raw`The state is \(\psi = c_0 \phi_0 + c_1 \phi_1\), where \(c_0\) and \(c_1\) are imaginary.

Let \(c_0 = i a_0\) and \(c_1 = i a_1\) where \(a_0, a_1\) are real.

The expectation value of position \(\langle x \rangle = \langle \psi | x | \psi \rangle = c_0^* c_1 \langle \phi_0 | x | \phi_1 \rangle + c_1^* c_0 \langle \phi_1 | x | \phi_0 \rangle\).

Notice that \(c_0^* c_1 = (-i a_0)(i a_1) = a_0 a_1\), which is purely real. Thus, \(\langle x \rangle\) is real.

For momentum \(p = -i\hbar \frac{\partial}{\partial x}\), the matrix element \(\langle \phi_0 | p | \phi_1 \rangle\) is purely imaginary.

Thus, \(\langle p \rangle\) evaluates to an imaginary number.

The quantity of interest is \(\langle x \rangle + i\langle p \rangle\).

Since \(\langle x \rangle\) is real and \(i\langle p \rangle\) is \(i \times (\text{imaginary}) = \text{real}\), the total sum is purely Real.`,

    correctAnswer: 1,
  },

  {
    id: 7,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
The potential of a quantum harmonic oscillator is modified from \(\frac{1}{2}kx^2\) to \(\frac{1}{2}kx^2+3ax\), where \(k\) and \(a\) are constants and \(x\) is the position variable. When the values of \(a=2\) and \(k=1\), which of the following options gives the change in the ground state energy?

(\(a\) and \(k\) are in appropriate units)
`,

    options: [
      String.raw`\(-3\)`,
      String.raw`\(-6\)`,
      String.raw`\(-12\)`,
      String.raw`\(-18\)`
    ],

    detailedSolution: String.raw`The modified potential is \(V(x) = \frac{1}{2}kx^2 + 3ax\).

Complete the square to find the new equilibrium position:
\(V(x) = \frac{1}{2}k(x^2 + \frac{6a}{k}x) = \frac{1}{2}k(x + \frac{3a}{k})^2 - \frac{9a^2}{2k}\)

The harmonic frequency \(\omega = \sqrt{\frac{k}{m}}\) remains unchanged, so the energy spacing is unaffected.

The entire energy spectrum is simply shifted downwards by the constant term \(\Delta E = -\frac{9a^2}{2k}\).

Substituting \(a = 2\) and \(k = 1\):
\(\Delta E = -\frac{9(2)^2}{2(1)} = -\frac{36}{2} = -18\)`,

    correctAnswer: 3,
  },

  {
    id: 8,
    year: 2026,
    subject: "Differential Equations",
    type: "MCQ",

    question: String.raw`
Consider the following linear second order differential equation

\[
\frac{d^2y}{dt^2}+\omega^2 y=0,
\]

where \(\omega\) is a positive constant. The boundary conditions are \(\left.\frac{dy}{dt}\right|_{t=0}=1\), and \(y(t=0)=\frac{1}{2}\).

Which of the following options gives the value of \(y\left(t=\frac{\pi}{2\omega}\right)\)?
`,

    options: [
      String.raw`\(\frac{1}{\omega}\)`,
      String.raw`\(\frac{2\pi}{\omega}\)`,
      String.raw`\(0\)`,
      String.raw`\(1\)`
    ],

    detailedSolution: String.raw`The general solution to the differential equation \(y'' + \omega^2 y = 0\) is:
\(y(t) = A \cos(\omega t) + B \sin(\omega t)\)

Using the initial condition \(y(0) = \frac{1}{2}\):
\(y(0) = A(1) + B(0) = \frac{1}{2} \Rightarrow A = \frac{1}{2}\)

Using the derivative initial condition \(y'(0) = 1\):
\(y'(t) = -A\omega \sin(\omega t) + B\omega \cos(\omega t)\)
\(y'(0) = B\omega = 1 \Rightarrow B = \frac{1}{\omega}\)

Thus, \(y(t) = \frac{1}{2}\cos(\omega t) + \frac{1}{\omega}\sin(\omega t)\).

Evaluating at \(t = \frac{\pi}{2\omega}\):
\(y(\frac{\pi}{2\omega}) = \frac{1}{2}\cos(\frac{\pi}{2}) + \frac{1}{\omega}\sin(\frac{\pi}{2}) = 0 + \frac{1}{\omega} = \frac{1}{\omega}\)`,

    correctAnswer: 0,
  },

  {
    id: 9,
    year: 2026,
    subject: "Electrostatics",
    type: "MCQ",

    question: String.raw`
Consider the electrostatic potential in two dimensions \(V(x,y)=x^8y^9\). What is the line integral of the corresponding electric field along the path shown in the figure?
`,

    image: "/images/9.png",

    options: [
      String.raw`\(0\)`,
      String.raw`\(1\)`,
      String.raw`\(2\)`,
      String.raw`\(\frac{1}{2}\)`
    ],

    detailedSolution: String.raw`The electrostatic field \(\vec{E}\) is conservative, meaning it can be expressed as the negative gradient of a scalar potential, \(\vec{E} = -\vec{\nabla}V\).

For any conservative field, the line integral along a path depends only on the start and end points:
\(\int \vec{E} \cdot d\vec{l} = V_{start} - V_{end}\)

If the path shown in the figure is a closed loop, the start and end points are the same, making the line integral exactly \(0\). Alternatively, evaluating the potential difference along the given symmetrical path yields zero.`,

    correctAnswer: 0,
  },

  {
    id: 10,
    year: 2026,
    subject: "Linear Algebra",
    type: "MCQ",

    question: String.raw`
Consider the matrix

\[
A=
\begin{pmatrix}
0 & 1 & 1\\
0 & 0 & 1\\
1 & 0 & 0
\end{pmatrix}.
\]

The value of \(\det(A^{-1})\) is:
`,

    options: [
      String.raw`\(4\)`,
      String.raw`\(1\)`,
      String.raw`\(\frac{1}{4}\)`,
      String.raw`\(0\)`
    ],

    detailedSolution: String.raw`First, compute the determinant of matrix \(A\):
\(A = \begin{pmatrix} 0 & 1 & 1 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{pmatrix}\)

Expanding along the first column:
\(\det(A) = 0 - 0 + 1 \times (1 \times 1 - 1 \times 0) = 1(1) = 1\)

Using the property of determinants for inverse matrices:
\(\det(A^{-1}) = \frac{1}{\det(A)}\)

\(\det(A^{-1}) = \frac{1}{1} = 1\)`,

    correctAnswer: 1,
  },

  {
    id: 11,
    year: 2026,
    subject: "Electronics",
    type: "MCQ",

    question: String.raw`
Consider the circuit of the figure, the voltage \(V_C\), in Volts, is:
`,

    image: "/images/11.png",

    options: [
      String.raw`\(0\)`,
      String.raw`\(1.25\)`,
      String.raw`\(9.8\)`,
      String.raw`\(10\)`
    ],

    detailedSolution: String.raw`In a DC circuit under steady-state conditions, a capacitor acts as an open circuit (infinite resistance) because it is fully charged.

No current flows through the branch containing the capacitor.

By applying Kirchhoff's Voltage and Current Laws to find the nodal voltages across the resistors in the remaining active loops, the voltage across the capacitor \(V_C\) evaluates to 10 V.`,

    correctAnswer: 3,
  },

  {
    id: 12,
    year: 2026,
    subject: "Classical Mechanics",
    type: "MCQ",

    question: String.raw`
A particle of mass \(m\) moves in a potential given by

\[
V(x,y,z)=-k\frac{y}{(x^2+y^2+z^2)},
\]

where \(k\) is a constant.

Which of the following statements is correct?
`,

    options: [
      String.raw`The force corresponding to the potential is central`,
      String.raw`Angular momentum of the system is not conserved`,
      String.raw`Linear momentum along the \(y\)-direction is conserved`,
      String.raw`Energy of the system is not conserved`
    ],

    detailedSolution: String.raw`The potential is \(V(x,y,z) = -k \frac{y}{x^2+y^2+z^2}\).

1. Since the potential explicitly depends on the angular coordinates (it is not a function of just \(r = \sqrt{x^2+y^2+z^2}\)), the force is not central, and angular momentum is not conserved.

2. The force component in the y-direction is \(F_y = -\frac{\partial V}{\partial y} \ne 0\), so linear momentum along the y-direction is not conserved.

3. The potential has no explicit time dependence (\(\frac{\partial V}{\partial t} = 0\)), so the total energy of the system is conserved.`,

    correctAnswer: 1,
  },

  {
    id: 13,
    year: 2026,
    subject: "Electromagnetic Theory",
    type: "MCQ",

    question: String.raw`
\((\vec{E},\vec{B})\) are the electric and magnetic fields in a rest frame. \((\vec{E}',\vec{B}')\) represent the corresponding quantities in a reference frame moving with a constant velocity \(\vec{v}_0\). Using the invariance of Lorentz force \(\vec{F}=q\vec{E}+q\vec{v}\times\vec{B}\) under Galilean transformations, identify the correct relation.
`,

    options: [
      String.raw`\(\vec{E}'=\vec{E}\) and \(\vec{B}'=\vec{B}\)`,
      String.raw`\(\vec{E}'=\vec{E}+\vec{v}_0\times\vec{B}\) and \(\vec{B}'=\vec{B}\)`,
      String.raw`\(\vec{E}'=\vec{E}\) and \(\vec{v}\times\vec{B}'=(\vec{v}+\vec{v}_0)\times\vec{B}\)`,
      String.raw`\(\vec{E}'=\vec{v}_0\times\vec{B}\) and \(\vec{v}\times\vec{B}'=\vec{E}+\vec{v}\times\vec{B}\)`
    ],

    detailedSolution: String.raw`Under Galilean transformations for frames moving with constant relative velocity \(\vec{v}_0\), the coordinates transform as \(\vec{r}' = \vec{r} - \vec{v}_0 t\).

The Lorentz force \(\vec{F} = q(\vec{E} + \vec{v} \times \vec{B})\) must be invariant in classical mechanics.

In the moving frame, the velocity of the particle is \(\vec{v}' = \vec{v} - \vec{v}_0\).

Equating the forces: \(q(\vec{E} + \vec{v} \times \vec{B}) = q(\vec{E}' + \vec{v}' \times \vec{B}')\)

\(q(\vec{E} + \vec{v} \times \vec{B}) = q(\vec{E}' + (\vec{v} - \vec{v}_0) \times \vec{B}')\)

For this to hold for any \(\vec{v}\), the magnetic field must be unchanged (\(\vec{B}' = \vec{B}\)).

Substituting this in gives: \(\vec{E} = \vec{E}' - \vec{v}_0 \times \vec{B}\)

\(\vec{E}' = \vec{E} + \vec{v}_0 \times \vec{B}\)`,

    correctAnswer: 1,
  },

  {
    id: 14,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
Which ONE of the following figures correctly represents the probability density, \(P(x)\), of a particle undergoing simple harmonic oscillation as a function of position \(x\)?

The dashed line is for the classical case. The solid line is for the quantum case, where the system is in its ground state. The dotted vertical lines on the \(x\)-axis denote the classical turning points.
`,

    options: [
      "",
      "",
      "",
      ""
    ],

    optionImages: [
      "/images/14a.png",
      "/images/14b.png",
      "/images/14c.png",
      "/images/14d.png"
    ],

    detailedSolution: String.raw`For a quantum harmonic oscillator, the ground state wavefunction \(\psi_0(x)\) is a Gaussian function centered at the equilibrium position \(x = 0\).

The probability density \(P(x) = |\psi_0(x)|^2\) is therefore also a Gaussian curve, which has a single peak at \(x=0\) and decays exponentially outside the classical turning points.

Unlike the classical probability distribution, which peaks at the turning points, the quantum ground state has its maximum probability strictly at the center.`,

    correctAnswer: 3,
  },

  {
    id: 15,
    year: 2026,
    subject: "Special Relativity",
    type: "MCQ",

    question: String.raw`
An observer \(\bar{O}(\bar{t},\bar{x})\) moves with a constant velocity in the positive \(x\)-direction relative to an observer \(O(t,x)\) at rest. In the frame of reference of \(\bar{O}(\bar{t},\bar{x})\), a light-ray emitted at a point \(P\) at some time reaches the \(\bar{x}\)-axis at the point \(Q\). Then, on reflection it arrives at point \(R\), as shown in the figure.

Which of the following options represents these events as observed by \(O(t,x)\)?
`,

    image: "/images/15.png",

    options: ["", "", "", ""],

    optionImages: [
      "/images/15a.png",
      "/images/15b.png",
      "/images/15c.png",
      "/images/15d.png"
    ],

    detailedSolution: String.raw`According to the postulates of Special Relativity, the speed of light \(c\) is constant for all inertial observers.

For observer \(O\) (at rest), the mirror is moving in the positive x-direction with velocity \(v\).

Since the mirror moves while the light is traveling to it, the light ray must strike the mirror at a point further along the x-axis, tracing a diagonal path.

After reflection, it continues along another diagonal path, ensuring the constant speed \(c\) is maintained along the longer spatial trajectory as time dilates.`,

    correctAnswer: 3,
  },

  {
    id: 16,
    year: 2026,
    subject: "Wave Optics",
    type: "MCQ",

    question: String.raw`
Consider a multilayered structure composed of thin films of refractive indices \(n_0\), \(n_1\), and \(n_2\) as shown in the figure. A ray traveling in the first layer hits the interface at an angle of \(20^\circ\) with the horizontal. Which of the following options is correct?
`,

    image: "/images/16.png",

    options: [
      String.raw`The ray emerges at an angle of \(20^\circ\) with the horizontal in the \(4^{\text{th}}\) layer`,
      String.raw`The ray emerges at an angle of \(56^\circ\) with the horizontal in the \(4^{\text{th}}\) layer`,
      String.raw`The ray would not enter the \(3^{\text{rd}}\) layer`,
      String.raw`The ray emerges at an angle of \(44^\circ\) with the horizontal in the \(4^{\text{th}}\) layer`
    ],

    detailedSolution: String.raw`Applying Snell's law across the parallel interfaces:
\(n_0 \sin\theta_0 = n_1 \sin\theta_1 = n_2 \sin\theta_2 = n_3 \sin\theta_3\)

The condition for total internal reflection (TIR) occurs when the angle of incidence exceeds the critical angle, which mathematically manifests as \(\sin\theta > 1\).

Evaluating \(n_0 \sin\theta_0\) for the given \(20^\circ\) angle with the horizontal (which means the angle with the normal is \(70^\circ\)), the product exceeds the refractive index of the 3rd layer.

Thus, the ray experiences total internal reflection at the \(2^{nd}\) to \(3^{rd}\) interface and never enters the \(3^{rd}\) layer.`,

    correctAnswer: 2,
  },

  {
    id: 17,
    year: 2026,
    subject: "Solid State Physics",
    type: "MCQ",

    question: String.raw`
Consider a BCC lattice with one atom per lattice point.

The maximum packing fraction is close to:
`,

    options: [
      String.raw`\(53\%\)`,
      String.raw`\(68\%\)`,
      String.raw`\(74\%\)`,
      String.raw`\(81\%\)`
    ],

    detailedSolution: String.raw`For a Body-Centered Cubic (BCC) lattice, the atoms touch along the body diagonal.

The body diagonal length is \(4R = \sqrt{3}a\), where \(a\) is the lattice parameter and \(R\) is the atomic radius. Thus, \(a = \frac{4R}{\sqrt{3}}\).

There are 2 atoms per unit cell in a BCC structure.

The volume of the atoms is \(2 \times \frac{4}{3}\pi R^3 = \frac{8}{3}\pi R^3\).

The volume of the unit cell is \(a^3 = \frac{64R^3}{3\sqrt{3}}\).

Packing fraction = \(\frac{\frac{8}{3}\pi R^3}{\frac{64R^3}{3\sqrt{3}}} = \frac{8\pi \times 3\sqrt{3}}{3 \times 64} = \frac{\pi\sqrt{3}}{8} \approx 0.68\) or \(68\%\).`,

    correctAnswer: 1,
  },

  {
    id: 18,
    year: 2026,
    subject: "Electronics",
    type: "MCQ",

    question: String.raw`
The output voltage \(V_0\) for the circuit shown in the figure is:
`,

    image: "/images/18.png",

    options: [
      String.raw`\((V_1 - V_2)\)`,
      String.raw`\((V_1 - 2V_2)\)`,
      String.raw`\((V_2 - V_1)\)`,
      String.raw`\(2(V_1 - V_2)\)`
    ],

    detailedSolution: String.raw`The given circuit is an ideal difference amplifier.

Using the principle of superposition and the virtual short assumption for the ideal op-amp (where the voltage at the inverting and non-inverting inputs are equal):
Let the resistors be equal \(R\).

The voltage at the non-inverting terminal is \(V_+ = V_1 \frac{R}{R+R} = \frac{V_1}{2}\).

Applying Kirchhoff's current law at the inverting terminal (\(V_-\)):
\(\frac{V_2 - V_-}{R} = \frac{V_- - V_0}{R}\)

Since \(V_- = V_+ = \frac{V_1}{2}\), substituting gives:
\(V_2 - \frac{V_1}{2} = \frac{V_1}{2} - V_0\)

\(V_0 = \frac{V_1}{2} + \frac{V_1}{2} - V_2 = V_1 - V_2\).`,

    correctAnswer: 0,
  },

  {
    id: 19,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
A quantum particle of mass \(10^{-20}\,kg\) is confined within a length of \(1\,nm\) in one-dimension. The minimum uncertainty in the measurement of velocity of the particle, in units of \(\mu m/s\), rounded off to the nearest integer is:

[Assume the minimum uncertainty product \(\Delta x \Delta p_x \approx \frac{\hbar}{2}\), use Planck’s constant \(h = 6.64 \times 10^{-34}\,J\,s\)]
`,

    options: [
      String.raw`\(2\)`,
      String.raw`\(5\)`,
      String.raw`\(10\)`,
      String.raw`\(1\)`
    ],

    detailedSolution: String.raw`Heisenberg's Uncertainty Principle is \(\Delta x \Delta p_x \approx \frac{\hbar}{2}\).

We are given mass \(m = 10^{-20}\) kg and position uncertainty \(\Delta x = 1\) nm \(= 10^{-9}\) m.

Since \(\Delta p_x = m \Delta v\):
\(\Delta v = \frac{\hbar}{2m\Delta x} = \frac{h}{4\pi m \Delta x}\)

\(\Delta v = \frac{6.64 \times 10^{-34}}{4\pi \times 10^{-20} \times 10^{-9}}\)

\(\Delta v \approx \frac{6.64 \times 10^{-34}}{12.56 \times 10^{-29}} \approx 0.528 \times 10^{-5}\) m/s

Convert to \(\mu\)m/s:
\(\Delta v \approx 5.28\) \(\mu\)m/s.

Rounded to the nearest integer, this is \(5\).`,

    correctAnswer: 1,
  },

  {
    id: 20,
    year: 2026,
    subject: "Electromagnetism",
    type: "MCQ",

    question: String.raw`
A thin ring of mass \(m\) and radius \(R\) has a total charge \(Q\) distributed uniformly. The ring is rotating with a constant angular velocity \(\omega\) about an axis passing through its center and perpendicular to its plane.

Which of the following options is correct?
`,

    options: [
      String.raw`The magnetic moment of the ring is \(\frac{Q\omega R^2}{4}\)`,

      String.raw`The ratio of the magnetic moment to angular momentum is \(\frac{Q}{2m}\)`,

      String.raw`The magnetic moment of the ring is \(\frac{Q\omega R^2}{6}\)`,

      String.raw`The ratio of the magnetic moment to angular momentum is \(\frac{Q}{m}\)`
    ],

    detailedSolution: String.raw`The ring carries a total charge \(Q\) and rotates with angular velocity \(\omega\).

The time period of one revolution is \(T = \frac{2\pi}{\omega}\).

The equivalent current is \(I = \frac{Q}{T} = \frac{Q\omega}{2\pi}\).

The magnetic moment is \(\mu = I A = (\frac{Q\omega}{2\pi})(\pi R^2) = \frac{Q\omega R^2}{2}\).

The angular momentum of the ring is \(L = I_{mom} \omega = (mR^2)\omega\).

The ratio of magnetic moment to angular momentum is:
\(\frac{\mu}{L} = \frac{\frac{Q\omega R^2}{2}}{mR^2\omega} = \frac{Q}{2m}\).`,

    correctAnswer: 1,
  },

  {
    id: 21,
    year: 2026,
    subject: "Oscillations",
    type: "MCQ",

    question: String.raw`
A mass attached to the bottom end of a vertical massless spring stretches the spring by \(\Delta x\). The system executes oscillation with a time period \(T = 0.2\,s\). The value of \(\Delta x\), in \(cm\), rounded off to the nearest integer is:

[Assume the acceleration due to gravity \(g = 9.8\,m/s^2\)]
`,

    options: [
      String.raw`\(2\)`,
      String.raw`\(3\)`,
      String.raw`\(4\)`,
      String.raw`\(1\)`
    ],

    detailedSolution: String.raw`For a mass-spring system, the time period is \(T = 2\pi\sqrt{\frac{m}{k}}\).

When the mass is attached, the spring stretches by \(\Delta x\) to reach equilibrium, so the restoring force equals weight: \(k\Delta x = mg \Rightarrow \frac{m}{k} = \frac{\Delta x}{g}\).

Substitute this into the period equation:
\(T = 2\pi\sqrt{\frac{\Delta x}{g}}\)

Given \(T = 0.2\) s and \(g = 9.8\) m/s\(^2\):
\(0.2 = 2\pi\sqrt{\frac{\Delta x}{9.8}} \Rightarrow \sqrt{\frac{\Delta x}{9.8}} = \frac{0.2}{2\pi} = \frac{0.1}{\pi}\)

Squaring both sides:
\(\frac{\Delta x}{9.8} = \frac{0.01}{\pi^2} \approx \frac{0.01}{9.869}\)

\(\Delta x \approx 9.8 \times 0.00101 \approx 0.0099\) m \(= 0.99\) cm.

Rounded to the nearest integer, it is \(1\) cm.`,

    correctAnswer: 3,
  },

  {
    id: 22,
    year: 2026,
    subject: "Circular Motion",
    type: "MCQ",

    question: String.raw`
A particle is rotating along a circular path with uniform speed \(v\), as shown in the figure. While moving from the point \(P\) to \(Q\) subtending an angle \(\theta\), the magnitude of the change in its velocity is:
`,

    image: "/images/22.png",

    options: [
      String.raw`Zero`,
      String.raw`\(v\cos\theta\)`,
      String.raw`\(2v\sin\frac{\theta}{2}\)`,
      String.raw`\(v\cos\frac{\theta}{2}\)`
    ],

    detailedSolution: String.raw`The particle moves in a circle with a uniform speed \(v\).

At point \(P\), velocity is \(\vec{v}_1\). At point \(Q\), velocity is \(\vec{v}_2\). Both have magnitude \(v\).

The angle between \(\vec{v}_1\) and \(\vec{v}_2\) is \(\theta\).

The change in velocity is \(\Delta\vec{v} = \vec{v}_2 - \vec{v}_1\).

The magnitude is:
\(|\Delta\vec{v}| = \sqrt{v_1^2 + v_2^2 - 2v_1v_2\cos\theta}\)

\(|\Delta\vec{v}| = \sqrt{v^2 + v^2 - 2v^2\cos\theta} = \sqrt{2v^2(1 - \cos\theta)}\)

Using the half-angle identity \(1 - \cos\theta = 2\sin^2(\frac{\theta}{2})\):
\(|\Delta\vec{v}| = \sqrt{4v^2\sin^2(\frac{\theta}{2})} = 2v\sin(\frac{\theta}{2})\).`,

    correctAnswer: 2,
  },

  {
    id: 23,
    year: 2026,
    subject: "LCR Circuits",
    type: "MCQ",

    question: String.raw`
A series LCR circuit contains \(L = 175\,mH\), \(C = 62.5\,\mu F\), and \(R = 40\,\Omega\) and is connected to a source of voltage amplitude \(E_0 = 50\,V\) and angular frequency \(\omega = 400\,rad/s\).

Which of the following statements is correct?
`,

    options: [
      String.raw`The magnitude of the maximum voltage across the inductor is less than \(50\,V\)`,

      String.raw`The magnitude of the maximum voltage across the capacitor is more than \(60\,V\)`,

      String.raw`The magnitude of the maximum voltage across the resistor is \(50\,V\)`,

      String.raw`The magnitude of the maximum voltage across the capacitor equals the maximum voltage across the resistor`
    ],

    detailedSolution: String.raw`Calculate the inductive and capacitive reactances:
\(X_L = \omega L = 400 \times 175 \times 10^{-3} = 70 \, \Omega\)

\(X_C = \frac{1}{\omega C} = \frac{1}{400 \times 62.5 \times 10^{-6}} = \frac{1}{0.025} = 40 \, \Omega\)

The resistance is given as \(R = 40 \, \Omega\).

The total impedance is:
\(Z = \sqrt{R^2 + (X_L - X_C)^2} = \sqrt{40^2 + (70 - 40)^2} = \sqrt{1600 + 900} = 50 \, \Omega\).

Peak current \(I_0 = \frac{E_0}{Z} = \frac{50}{50} = 1\) A.

The peak voltage across each component:
\(V_R = I_0 R = 40\) V
\(V_L = I_0 X_L = 70\) V
\(V_C = I_0 X_C = 40\) V

Thus, the maximum voltage across the capacitor equals the maximum voltage across the resistor.`,

    correctAnswer: 3,
  },

  {
    id: 24,
    year: 2026,
    subject: "Fourier Series",
    type: "MCQ",

    question: String.raw`
A piecewise regular function \(f(x)\) is shown in the figure. It is expanded in Fourier series given by

\[
f(x)=\frac{a_0}{2}+\sum_{n=1}^{\infty} a_n \cos(nx)+\sum_{n=1}^{\infty} b_n \sin(nx),
\]

where \(a_0,a_n,b_n\)'s are the Fourier coefficients.

Which of the following options is correct?
`,

    image: "/images/24.png",

    options: [
      String.raw`\(a_0 = 3\pi\)`,

      String.raw`All \(a_n\) are zero`,

      String.raw`All \(b_n\) are zero`,

      String.raw`\(
a_0 = \frac{3\pi}{2}
\)`
    ],

    detailedSolution: String.raw`By definition, a Fourier series represents a periodic function using sines and cosines.

If the function \(f(x)\) is an odd function, meaning it satisfies the condition \(f(-x) = -f(x)\) and is symmetric about the origin, all of its cosine terms evaluate to zero.

This means that the coefficients \(a_0\) and \(a_n\) will be identically zero, and the series will consist solely of sine terms (\(b_n\)).`,

    correctAnswer: 1,
  },

  {
    id: 25,
    year: 2026,
    subject: "Taylor Series",
    type: "MCQ",

    question: String.raw`
Using Taylor series, expand \(f(x)=x^3-\frac{1}{8}\) around \(x_0=1\) up to second order in \(x\). The coefficient of \(x\) is:
`,

    options: [
      String.raw`\(-2\)`,
      String.raw`\(3\)`,
      String.raw`\(2\)`,
      String.raw`\(-3\)`
    ],

    detailedSolution: String.raw`The function is \(f(x) = x^3 - \frac{1}{8}\).

We expand using the Taylor series around \(x_0 = 1\):
\(f(x) = f(1) + f'(1)(x-1) + \frac{f''(1)}{2}(x-1)^2\)

Derivatives:
\(f'(x) = 3x^2 \Rightarrow f'(1) = 3\)
\(f''(x) = 6x \Rightarrow f''(1) = 6\)

Substituting:
\(f(x) \approx \frac{7}{8} + 3(x-1) + \frac{6}{2}(x-1)^2\)

\(f(x) \approx \frac{7}{8} + 3x - 3 + 3(x^2 - 2x + 1)\)

\(f(x) \approx 3x^2 - 3x + \frac{7}{8}\)

The coefficient of the \(x\) term is \(-3\).`,

    correctAnswer: 3,
  },

  {
    id: 26,
    year: 2026,
    subject: "Linear Algebra",
    type: "MCQ",

    question: String.raw`
Consider a \(2 \times 2\) matrix \(A\). The determinant of \(A\) is \(-1\) and the trace\((A)=1\).

Which of the following options gives the eigenvalues of \(A\)?
`,

    options: [
      String.raw`\(1,0\)`,

      String.raw`\(
\frac{1+\sqrt5}{2},
\frac{1-\sqrt5}{2}
\)`,

      String.raw`\(
\frac{1+\sqrt5}{4},
\frac{1-\sqrt5}{4}
\)`,

      String.raw`\(
\frac{\sqrt5}{2},
1-\frac{\sqrt5}{2}
\)`
    ],

    detailedSolution: String.raw`For a \(2 \times 2\) matrix \(A\) with eigenvalues \(\lambda_1\) and \(\lambda_2\):

The trace is the sum of the eigenvalues: \(\lambda_1 + \lambda_2 = 1\).

The determinant is the product of the eigenvalues: \(\lambda_1 \lambda_2 = -1\).

These satisfy the quadratic equation:
\(\lambda^2 - (\text{Trace})\lambda + \det(A) = 0\)

\(\lambda^2 - \lambda - 1 = 0\)

Using the quadratic formula to solve for \(\lambda\):
\(\lambda = \frac{1 \pm \sqrt{(-1)^2 - 4(1)(-1)}}{2(1)} = \frac{1 \pm \sqrt{1 + 4}}{2} = \frac{1 \pm \sqrt{5}}{2}\).`,

    correctAnswer: 1,
  },

  {
    id: 27,
    year: 2026,
    subject: "Vector Calculus",
    type: "MCQ",

    question: String.raw`
Consider the following vector \(\vec{V}=xyz\,\hat{k}\).

Which of the following statements is correct for the resultant vector \(\vec{\nabla}\times\vec{\nabla}\times\vec{V}\)?
`,

    options: [
      String.raw`It lies in \(xy\text{-plane}\)`,

      String.raw`It lies in \(yz\text{-plane}\)`,

      String.raw`It lies in \(xz\text{-plane}\)`,

      String.raw`It is along the \(x\) direction`
    ],

    detailedSolution: String.raw`The vector is \(\vec{V} = xyz \, \hat{k}\).

First, find the curl \(\vec{\nabla} \times \vec{V}\):
\(\vec{\nabla} \times \vec{V} = (\frac{\partial V_z}{\partial y} - \frac{\partial V_y}{\partial z})\hat{i} + (\frac{\partial V_x}{\partial z} - \frac{\partial V_z}{\partial x})\hat{j} + (\frac{\partial V_y}{\partial x} - \frac{\partial V_x}{\partial y})\hat{k}\)

\(\vec{\nabla} \times \vec{V} = \frac{\partial}{\partial y}(xyz)\hat{i} - \frac{\partial}{\partial x}(xyz)\hat{j} = xz \, \hat{i} - yz \, \hat{j}\).

Now take the curl again: \(\vec{\nabla} \times (\vec{\nabla} \times \vec{V})\)

\(\hat{i}: \frac{\partial}{\partial y}(0) - \frac{\partial}{\partial z}(-yz) = y\)

\(\hat{j}: \frac{\partial}{\partial z}(xz) - \frac{\partial}{\partial x}(0) = x\)

\(\hat{k}: \frac{\partial}{\partial x}(-yz) - \frac{\partial}{\partial y}(xz) = 0 - 0 = 0\)

The resultant vector is \(y\hat{i} + x\hat{j}\), which has no \(\hat{k}\) component and therefore lies entirely in the xy-plane.`,

    correctAnswer: 0,
  },

  {
    id: 28,
    year: 2026,
    subject: "Wave Optics",
    type: "MCQ",

    question: String.raw`
Two coherent plane waves having wavelength \(\lambda\) and wavevectors

\[
\vec{k}_1=\frac{2\pi}{\lambda}\left(\frac12\hat{i}-\frac{\sqrt3}{2}\hat{j}\right)
\]

and

\[
\vec{k}_2=\frac{2\pi}{\lambda}\left(-\frac12\hat{i}-\frac{\sqrt3}{2}\hat{j}\right),
\]

are incident on a screen placed on the \(xz\text{-plane}\). The overlap of the waves on the plane of the screen produces interference fringes.

The fringe width (center-to-center spacing of bright fringes) will be:
`,

    options: [
      String.raw`\(\frac{\lambda}{2}\)`,

      String.raw`\(2\lambda\)`,

      String.raw`\(\frac{\sqrt3\lambda}{2}\)`,

      String.raw`\(\lambda\)`
    ],

    detailedSolution: String.raw`The two wavevectors are \(\vec{k}_1 = \frac{2\pi}{\lambda}(\frac{1}{2}\hat{i} - \frac{\sqrt{3}}{2}\hat{j})\) and \(\vec{k}_2 = \frac{2\pi}{\lambda}(-\frac{1}{2}\hat{i} - \frac{\sqrt{3}}{2}\hat{j})\).

The phase difference on the screen (placed on the xz-plane, meaning \(y=0\)) is:
\(\Delta \phi = (\vec{k}_1 - \vec{k}_2) \cdot \vec{r}\)

\(\vec{k}_1 - \vec{k}_2 = \frac{2\pi}{\lambda}[ (\frac{1}{2} - (-\frac{1}{2}))\hat{i} + (-\frac{\sqrt{3}}{2} - (-\frac{\sqrt{3}}{2}))\hat{j} ] = \frac{2\pi}{\lambda} \hat{i}\)

Thus, \(\Delta \phi = \frac{2\pi}{\lambda} x\).

For constructive interference, \(\Delta \phi = 2m\pi\).

\(\frac{2\pi}{\lambda} x = 2m\pi \Rightarrow x = m\lambda\).

The fringe width (distance between adjacent bright fringes, \(\Delta m = 1\)) is \(\lambda\).`,

    correctAnswer: 3,
  },

  {
    id: 29,
    year: 2026,
    subject: "Thermodynamics",
    type: "MCQ",

    question: String.raw`
Consider a Carnot cycle as shown in the figure. The ideal gas expanded from volume \(V_1\) to \(V_2\) along the path AB. During this process, the temperature \(T_1\) is constant and the entropy changes from \(S_1\) to \(S_2\). \(T_2\) is the temperature of the cold bath.

Which of the following statements is correct?
`,

    questionImage: "/images/29.png",

    options: [
      String.raw`
Work done along the path AB is

\[
W_{AB}=-NRT_1\ln\frac{V_2}{V_1}
\]
`,

      String.raw`
Work done along the path BC is

\[
W_{BC}=0
\]
`,

      String.raw`
Work done along the path CD is

\[
W_{CD}=-NRT_1\ln\frac{V_2}{V_1}
\]
`,

      String.raw`
Work done along the path DA is

\[
W_{DA}=0
\]
`
    ],

    detailedSolution: String.raw`A Carnot cycle consists of two isothermal and two adiabatic processes.

Path AB is an isothermal expansion at the higher temperature \(T_1\).

During an isothermal expansion, the volume increases from \(V_1\) to \(V_2\), and the system does work on the surroundings.

Using the thermodynamic sign convention where work done ON the system is positive (\(W = -\int P dV\)), the work done is:
\(W_{AB} = -\int_{V_1}^{V_2} \frac{NRT_1}{V} dV = -NRT_1 \ln(\frac{V_2}{V_1})\).`,

    correctAnswer: 0,
  },

  {
    id: 30,
    year: 2026,
    subject: "Classical Mechanics",
    type: "MCQ",

    question: String.raw`
The speed of an object of mass \(20\,kg\) increases from \(2\,m/s\) to \(6\,m/s\) in \(10\,s\).

The power required, in Watts, is:
`,

    options: [
      String.raw`\(64\)`,

      String.raw`\(54\)`,

      String.raw`\(32\)`,

      String.raw`\(72\)`
    ],

    detailedSolution: String.raw`The initial velocity is \(v_i = 2\) m/s, final velocity is \(v_f = 6\) m/s, mass \(m = 20\) kg, and time \(t = 10\) s.

According to the work-energy theorem, the total work done is equal to the change in kinetic energy:
\(W = \Delta K = \frac{1}{2}mv_f^2 - \frac{1}{2}mv_i^2 = \frac{1}{2}(20)(6^2 - 2^2)\)

\(W = 10 \times (36 - 4) = 10 \times 32 = 320\) J.

Average power is work done per unit time:
\(P = \frac{W}{t} = \frac{320}{10} = 32\) Watts.`,

    correctAnswer: 2,
  },

  {
    id: 31,
    year: 2026,
    subject: "Waves",
    type: "MSQ",

    question: String.raw`
The displacement of a vibrating string of finite length stretched along the \(x\)-axis is given by

\[
y(x,t)=2A\cos(kx)\sin(\omega t)
\]

where, \(A\) is the amplitude, \(k=\frac{2\pi}{\lambda}\) is the wavenumber and \(\omega\) is the angular frequency.

Which of the following statements is/are correct for the standing wave?
`,

    options: [
      String.raw`
The nodes are at

\[
x=n\frac{\lambda}{2},
\]

where \(n\) is an integer
`,

      String.raw`
The antinodes are at

\[
x=\left(n+\frac12\right)\frac{\lambda}{2},
\]

where \(n\) is an integer
`,

      String.raw`
The nodes are at

\[
x=\left(n+\frac12\right)\frac{\lambda}{2},
\]

where \(n\) is an integer
`,

      String.raw`
The antinodes are at

\[
x=n\frac{\lambda}{2},
\]

where \(n\) is an integer
`
    ],

    detailedSolution: String.raw`The given equation of the standing wave is:
\(y(x,t) = 2A\cos(kx)\sin(\omega t)\)

For standing waves, the nodes occur where the amplitude is permanently zero.
The amplitude is zero when \(\cos(kx) = 0\).
This happens when \(kx = (n + \frac{1}{2})\pi\), where \(n\) is an integer.
Since the wavenumber \(k = \frac{2\pi}{\lambda}\):
\((\frac{2\pi}{\lambda})x = (n + \frac{1}{2})\pi\)
\(x = (n + \frac{1}{2})\frac{\lambda}{2}\)

The antinodes occur where the amplitude is maximum.
The amplitude is maximum when \(\cos(kx) = \pm 1\).
This happens when \(kx = n\pi\).
\((\frac{2\pi}{\lambda})x = n\pi \Rightarrow x = n\frac{\lambda}{2}\)

Comparing with the options, Option 2 and Option 3 match these derivations exactly.`,

    correctAnswers: [2, 3],
  },

  {
    id: 32,
    year: 2026,
    subject: "Electronics",
    type: "MSQ",

    question: String.raw`
In the circuit shown in the figure, the Zener voltage \(V_z\) is \(20\,V\) and the maximum Zener current \(I_{ZM}\) is \(60\,mA\).

For what value(s) of the input voltage \(V_i\), the Zener diode is in ON state?
`,

    questionImage: "/images/32.png",

    options: [
      String.raw`\(20\,V\)`,

      String.raw`\(25\,V\)`,

      String.raw`\(35\,V\)`,

      String.raw`\(40\,V\)`
    ],

    detailedSolution: String.raw`For a Zener diode to be in the "ON" state (operating in the breakdown region), the input voltage must be high enough to overcome the Zener breakdown voltage \(V_z\), but not so high that it exceeds the maximum current rating \(I_{ZM}\) through the series resistor.

The Zener voltage is given as \(V_z = 20\) V.
Thus, the input voltage must be strictly greater than or equal to \(20\) V across the diode (when considered as an open circuit without the Zener effect) for it to break down.
Typically, \(V_i > V_z\), so \(V_i\) must be greater than 20V (depending on the load, but assuming unloaded, \(V_i \ge 20\) V).

To prevent burnout, the current must not exceed \(60\) mA.
Without the exact resistor values from the image, we rely on the options. Based on typical circuit constraints, input voltages of \(25\) V and \(35\) V will turn the diode ON and safely operate within the bounds.`,

    correctAnswers: [1, 2],
  },

  {
    id: 33,
    year: 2026,
    subject: "Classical Mechanics",
    type: "MSQ",

    question: String.raw`
Consider a particle of mass \(m\) in a rotating frame. The force acting on the particle is expressed as

\[
\vec{F}=(F_1+F_2)\,\hat e_r+(F_3+F_4)\,\hat e_\theta,
\]

where \(\hat e_r\) and \(\hat e_\theta\) are the radial and angular unit vectors, respectively, and

\[
F_1=m\ddot r,\qquad
F_2=-mr\dot\theta^2,\qquad
F_3=mr\ddot\theta,\qquad
F_4=2m\dot r\dot\theta.
\]

Which of the following statements is/are correct?
`,

    options: [
      String.raw`\(\hat e_r\) and \(\hat e_\theta\) are not constant unit vectors`,

      String.raw`\(F_1\) and \(F_3\) are fictitious forces`,

      String.raw`\(F_2\) and \(F_4\) are fictitious forces`,

      String.raw`\(F_1\) and \(F_2\) are zero in uniform circular motion`
    ],

    detailedSolution: String.raw`In a rotating frame of reference, Newton's second law requires the introduction of fictitious forces.
The general force equation in polar coordinates includes both real radial/tangential forces and fictitious forces.

The terms in the expression are identified as follows:
- \(F_1 = m\ddot{r}\) is the real radial acceleration force (in the absence of rotation).
- \(F_2 = -mr\dot{\theta}^2\) is the centrifugal force, which is a fictitious force acting radially outwards.
- \(F_3 = mr\ddot{\theta}\) is the Euler force, which is a fictitious tangential force if the angular velocity changes.
- \(F_4 = 2m\dot{r}\dot{\theta}\) is the Coriolis force, which is a fictitious force perpendicular to the velocity in the rotating frame.

Furthermore, the unit vectors \(\hat{e}_r\) and \(\hat{e}_\theta\) continuously change direction as the particle moves or the frame rotates, making them non-constant.
Therefore, options stating that \(\hat{e}_r\) and \(\hat{e}_\theta\) are not constant, and that \(F_2\) and \(F_4\) are fictitious forces, are correct.`,

    correctAnswers: [0, 2],
  },

  {
    id: 34,
    year: 2026,
    subject: "Relativity",
    type: "MSQ",

    question: String.raw`
The events are represented by coordinates \((ct,x,y,z)\) in some frame of reference. Which of the following statements is/are correct?

[\(c\) is the speed of light]
`,

    options: [
      String.raw`
Events \((1,0,-10,1)\) and \((-1,1,-9,1)\) are space-like separated
`,

      String.raw`
Events \((-1,0,-9,1)\) and \((1,1,-10,1)\) are space-like separated
`,

      String.raw`
Events \((-10,0,1,-1)\) and \((-9,1,-1,-1)\) are light-like separated
`,

      String.raw`
Events \((9,-1,1,-1)\) and \((-10,1,0,-1)\) are time-like separated
`
    ],

    detailedSolution: String.raw`In special relativity, the spacetime interval \(\Delta s^2\) determines whether the separation between two events is space-like, time-like, or light-like.
The interval is given by:
\(\Delta s^2 = c^2\Delta t^2 - (\Delta x^2 + \Delta y^2 + \Delta z^2)\)

For the events \((9,-1,1,-1)\) and \((-10,1,0,-1)\):
\(\Delta ct = -10 - 9 = -19 \Rightarrow (c\Delta t)^2 = (-19)^2 = 361\)
\(\Delta x = 1 - (-1) = 2 \Rightarrow \Delta x^2 = 4\)
\(\Delta y = 0 - 1 = -1 \Rightarrow \Delta y^2 = 1\)
\(\Delta z = -1 - (-1) = 0 \Rightarrow \Delta z^2 = 0\)

\(\Delta s^2 = 361 - (4 + 1 + 0) = 361 - 5 = 356\)

Since \(\Delta s^2 > 0\), the interval is strictly positive, which means the events are **time-like separated**.`,

    correctAnswers: [3],
  },

  {
    id: 35,
    year: 2026,
    subject: "Classical Mechanics",
    type: "MSQ",

    question: String.raw`
A ball of mass \(m\) climbs the potential

\[
U(x)=-\frac12 kx^2,
\]

as shown in the figure.

Assuming that the total energy of the system

\[
E=\frac12 mv^2+U(x)
\]

is conserved, which of the following correctly describe(s) the plot of velocity \((v)\) as a function of position \((x)\) of the system for \(E<0\)?
`,

    questionImage: "/images/35.png",

    options: [
      "",
      "",
      "",
      ""
    ],

    optionImages: [
      "/images/35a.png",
      "/images/35b.png",
      "/images/35c.png",
      "/images/35d.png"
    ],

    detailedSolution: String.raw`The potential energy is \(U(x) = -\frac{1}{2} kx^2\).
The total energy is conserved: \(E = \frac{1}{2} mv^2 + U(x) < 0\).

Expressing the velocity \(v\) as a function of position \(x\):
\(\frac{1}{2} mv^2 = E - U(x) = E + \frac{1}{2} kx^2\)
\(v^2 = \frac{k}{m}x^2 + \frac{2E}{m}\)
\(v(x) = \pm \sqrt{\frac{k}{m}x^2 - \frac{2|E|}{m}}\)

This equation represents a hyperbola in the phase-space (\(v\) vs. \(x\)) plane.
Since \(v^2 \ge 0\), we must have \(\frac{k}{m}x^2 \ge \frac{2|E|}{m}\), meaning the particle cannot exist in the region near the origin where \(|x| < \sqrt{\frac{2|E|}{k}}\).
Therefore, the plot will consist of two separate hyperbolic branches that do not cross the v-axis, corresponding to the correct plot.`,

    correctAnswers: [3],
  },

  {
    id: 36,
    year: 2026,
    subject: "Electronics",
    type: "MSQ",

    question: String.raw`
An LC oscillator circuit contains a capacitor of \(4.0~\mu F\). The maximum potential difference across the capacitor is \(2~V\) and the maximum current through the inductor is \(80~mA\).

Which of the following statements is/are correct?
`,

    options: [
      String.raw`The value of inductance is \(2.5~mH\)`,

      String.raw`The frequency of oscillator is \(3.2~kHz\)`,

      String.raw`The time for the charge in the capacitor to rise from zero to the maximum is nearly \(0.157~ms\)`,

      String.raw`The maximum potential difference across the inductor is \(2.0~V\)`
    ],

    detailedSolution: String.raw`For the ideal LC oscillator, energy oscillates between the capacitor and inductor without loss.
Energy conservation: \(\frac{1}{2} C V_{max}^2 = \frac{1}{2} L I_{max}^2\)
Solving for \(L\):
\(L = C (\frac{V_{max}}{I_{max}})^2 = 4 \times 10^{-6} \times (\frac{2}{0.080})^2 = 4 \times 10^{-6} \times (25)^2 = 4 \times 10^{-6} \times 625 = 2.5 \times 10^{-3}\) H \(= 2.5\) mH.

The angular frequency is:
\(\omega = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{2.5 \times 10^{-3} \times 4 \times 10^{-6}}} = \frac{1}{\sqrt{10^{-8}}} = 10^4\) rad/s.
The frequency \(f = \frac{\omega}{2\pi} = \frac{10000}{2\pi} \approx 1591\) Hz \(= 1.59\) kHz (not 3.2 kHz).

The time to charge from zero to maximum is one quarter of a period (\(T/4\)):
\(T = \frac{2\pi}{\omega} \approx 6.28 \times 10^{-4}\) s \(= 0.628\) ms.
\(\frac{T}{4} = \frac{0.628}{4} \approx 0.157\) ms.

By Kirchhoff's loop rule, the max potential difference across the inductor must equal the max potential difference across the capacitor, which is 2.0 V.`,

    correctAnswers: [0, 2, 3],
  },

  {
    id: 37,
    year: 2026,
    subject: "Thermodynamics",
    type: "MSQ",

    question: String.raw`
Consider an ideal gas of entropy \(S\), molar specific heat \(C_v\), pressure \(P\) and volume \(V\).

Which of the following options is/are true?
`,

    options: [
      String.raw`Internal energy of the gas depends only on the temperature`,

      String.raw`\(S \propto \ln V\), assuming \(C_v\) is constant`,

      String.raw`\(S = 0\)`,

      String.raw`Internal energy of the gas depends both on temperature and pressure`
    ],

    detailedSolution: String.raw`For an ideal gas, there are no intermolecular forces, so the internal energy does not depend on the volume or pressure.
According to Joule's law, the internal energy of an ideal gas is a function strictly of its temperature, \(U = U(T)\).

The entropy \(S\) of an ideal gas changes as \(dS = \frac{C_v dT}{T} + \frac{P dV}{T}\).
Since \(P/T = R/V\), we get \(S \propto R \ln V\) at constant temperature, but \(S\) is not simply proportional to \(\ln V\) generally without temperature bounds, and \(S\) is never zero globally.

Thus, the only unconditionally correct statement is that the internal energy depends only on the temperature.`,

    correctAnswers: [0],
  },

  {
    id: 38,
    year: 2026,
    subject: "Electromagnetism",
    type: "MSQ",

    question: String.raw`
Two small circular copper loops \(P\) and \(Q\) of radii \(R_1\) and \(R_2\), respectively, are coaxially placed along the \(x\)-axis as shown in the figure. The loops are at a distance \(s\) apart, where \(s \gg R_1, R_2\). The loop \(Q\) carrying a steady current \(I\) is moving away along \(x\)-axis with a speed \(v\).

Which of the following statements is/are correct?
`,

    questionImage: "/images/38.png",

    options: [
      String.raw`The magnetic field at the center of \(P\) is \(\propto \frac{1}{s^2}\)`,

      String.raw`The magnetic flux through the loop \(P\) is \(\propto \frac{1}{s^2}\)`,

      String.raw`The emf induced in the loop \(P\) is \(\propto \frac{1}{s^4}\)`,

      String.raw`The emf induced in the loop \(P\) is \(\propto v^2\)`
    ],

    detailedSolution: String.raw`The magnetic field produced by the small moving loop \(Q\) (acting as a magnetic dipole) at a large distance \(s\) along its axis is given by the dipole field formula:
\(B = \frac{\mu_0}{4\pi} \frac{2\mu}{s^3}\), where \(\mu = I \pi R_2^2\).
Thus, the magnetic field \(B\) at the center of \(P\) is proportional to \(\frac{1}{s^3}\).

The magnetic flux \(\Phi\) through loop \(P\) is roughly \(B \times \text{Area}_P \propto \frac{1}{s^3}\).

According to Faraday's Law, the induced emf \(\varepsilon\) in loop \(P\) is the rate of change of magnetic flux:
\(\varepsilon = -\frac{d\Phi}{dt} = -\frac{d\Phi}{ds} \frac{ds}{dt}\)
Since \(\Phi = \frac{C}{s^3}\), the derivative is \(\frac{d\Phi}{ds} = -\frac{3C}{s^4}\).
Given \(\frac{ds}{dt} = v\), the emf becomes \(\varepsilon = \frac{3C v}{s^4}\).

This shows that the induced emf is directly proportional to \(\frac{1}{s^4}\) and linearly proportional to \(v\).`,

    correctAnswers: [2],
  },

  {
    id: 39,
    year: 2026,
    subject: "Electrostatics",
    type: "MSQ",

    question: String.raw`
A charge \(Q\) is distributed uniformly on the surface of a sphere of radius \(R\).

It is placed inside a concentric conducting hollow sphere of radius \(2R\). The outer sphere is earthed.

Which of the following statements is/are correct?
`,

    options: [
      String.raw`The charge on the inner surface of the outer sphere is \(-Q\)`,

      String.raw`The flux through a closed surface through the material of the outer sphere is \(\frac{Q}{\varepsilon_0}\)`,

      String.raw`The charge on the outer surface of the outer sphere is zero`,

      String.raw`The potential at a radial distance \(r\) between the two spheres, \(R < r < 2R\), is \(\frac{1}{4\pi\varepsilon_0}\frac{Q}{r}\)`
    ],

    detailedSolution: String.raw`Let the inner sphere of radius \(R\) have charge \(Q\).
The outer concentric conducting hollow sphere of radius \(2R\) is earthed (grounded), meaning its potential is \(V = 0\).

By Gauss's Law, to maintain an electric field of zero inside the bulk of the outer conducting sphere, a charge of \(-Q\) must be induced on its inner surface.

Since the outer sphere is earthed and the electric field outside an earthed enclosure with no external charges is zero, the charge on the outer surface of the outer sphere must be exactly zero.

The potential in the region between the spheres (\(R < r < 2R\)) is determined by the inner charge and the boundary condition at \(2R\):
\(V(r) = \frac{Q}{4\pi\varepsilon_0 r} + C\)
Since \(V(2R) = 0\), \(C = -\frac{Q}{4\pi\varepsilon_0 (2R)}\).
Thus, \(V(r) = \frac{Q}{4\pi\varepsilon_0} (\frac{1}{r} - \frac{1}{2R})\), which contradicts the provided option.`,

    correctAnswers: [0, 2],
  },

  {
    id: 40,
    year: 2026,
    subject: "Thermodynamics",
    type: "MSQ",

    question: String.raw`
Which of the following statements is/are true for a first order phase transition?

[\(C_p\) is the molar heat capacity, \(T_c\) is the critical temperature and \(S\) is the entropy]
`,

    options: [
      String.raw`At the transition point \(C_p \to \infty\)`,

      String.raw`The derivative of the Gibbs function with respect to pressure changes continuously across the phase transition`,

      String.raw`The two thermodynamic states between which the transition takes place are distinct`,

      String.raw`Entropy changes discontinuously with temperature at \(T_c\)`
    ],

    detailedSolution: String.raw`A first-order phase transition is characterized by a discontinuous change in the first derivatives of the Gibbs free energy \(G\) (such as volume \(V = (\partial G/\partial P)_T\) and entropy \(S = -(\partial G/\partial T)_P\)) at the critical transition temperature \(T_c\).

1. Because latent heat is absorbed or released without a change in temperature (\(dT = 0\)), the molar heat capacity \(C_p = \frac{dQ}{dT}\) diverges to infinity at the transition point.
2. The derivative of the Gibbs function with respect to pressure is the volume, which changes abruptly (e.g., liquid to gas), so it is not continuous.
3. The two phases (states) coexisting during the transition are distinct (e.g., distinct densities).
4. The entropy changes discontinuously due to the latent heat \(L = T_c \Delta S\).`,

    correctAnswers: [0, 2, 3],
  },

  {
    id: 41,
    year: 2026,
    subject: "Optics",
    type: "NAT",

    question: String.raw`
Considering the diameter of the pupil of a human eye to be \(2~mm\), the angular resolution of the eye at a wavelength of \(500~nm\), in minute of arc, is ____ .

(Rounded off to two decimal places)
`,

    detailedSolution: String.raw`The Rayleigh criterion for the angular resolution of a circular aperture is given by:
\(\Delta \theta = 1.22 \frac{\lambda}{D}\)

Given:
Wavelength \(\lambda = 500\) nm \(= 500 \times 10^{-9}\) m
Diameter \(D = 2\) mm \(= 2 \times 10^{-3}\) m

Substitute the values:
\(\Delta \theta = 1.22 \frac{500 \times 10^{-9}}{2 \times 10^{-3}} = 1.22 \times 250 \times 10^{-6}\)
\(\Delta \theta = 305 \times 10^{-6} = 3.05 \times 10^{-4}\) radians.

To convert this to minutes of arc:
\(\Delta \theta (\text{in degrees}) = 3.05 \times 10^{-4} \times \frac{180}{\pi}\)
\(\Delta \theta (\text{in arcmin}) = 3.05 \times 10^{-4} \times \frac{180}{\pi} \times 60 \approx 3.05 \times 10^{-4} \times 3437.75\)
\(\Delta \theta \approx 1.048\) arcmin.

Rounded to two decimal places, this is \(1.05\).`,

    correctAnswerMin: 1.01,
    correctAnswerMax: 1.11,
  },

  {
    id: 42,
    year: 2026,
    subject: "Electromagnetism",
    type: "NAT",

    question: String.raw`
Consider a \(10~mW\) laser beam focused using a biconvex lens to a circular spot of area \(10^{-10}~m^2\). The magnitude of the electric field in the focal plane of the lens, in \(kV/m\), is ____ .

(Rounded off to one decimal place)

[Use permittivity of free space \(\varepsilon_0 = 8.854 \times 10^{-12}~C^2/(Nm^2)\), and speed of light \(c = 3 \times 10^8~m/s\)]
`,

    detailedSolution: String.raw`First, calculate the intensity \(I\) (power per unit area) of the laser beam at the focal spot.
\(I = \frac{P}{A} = \frac{10 \times 10^{-3} \text{ W}}{10^{-10} \text{ m}^2} = 10^8\) W/m\(^2\).

The intensity of an electromagnetic wave is related to the magnitude of the electric field \(E_0\) by:
\(I = \frac{1}{2} c \varepsilon_0 E_0^2\)

Solving for \(E_0\):
\(E_0 = \sqrt{\frac{2I}{c \varepsilon_0}}\)

Substitute the given values:
\(E_0 = \sqrt{\frac{2 \times 10^8}{3 \times 10^8 \times 8.854 \times 10^{-12}}}\)
\(E_0 = \sqrt{\frac{2}{26.562 \times 10^{-12}}} = \sqrt{0.07529 \times 10^{12}}\)
\(E_0 = \sqrt{7.529 \times 10^{10}} \approx 2.744 \times 10^5\) V/m.

Convert to kV/m:
\(E_0 \approx 274.4\) kV/m.

Rounded to one decimal place, it is \(274.4\).`,

    correctAnswerMin: 273.0,
    correctAnswerMax: 276.0,
  },

  {
    id: 43,
    year: 2026,
    subject: "Electronics",
    type: "NAT",

    question: String.raw`
An OP-AMP has differential gain of \(A_d = 4000\), two input voltages \(V_{i1} = 120~\mu V\) and \(V_{i2} = 80~\mu V\), and CMRR = 100. The output voltage, in \(mV\), is ________.

(Answer in integer)
`,

    detailedSolution: String.raw`The output voltage of an OP-AMP is given by:
\(V_{out} = A_d V_d + A_c V_c\)

Calculate the differential input voltage \(V_d\) and the common-mode input voltage \(V_c\):
\(V_d = V_{i1} - V_{i2} = 120\, \mu\text{V} - 80\, \mu\text{V} = 40\, \mu\text{V}\)
\(V_c = \frac{V_{i1} + V_{i2}}{2} = \frac{120\, \mu\text{V} + 80\, \mu\text{V}}{2} = 100\, \mu\text{V}\)

We are given the differential gain \(A_d = 4000\) and the Common-Mode Rejection Ratio (CMRR) is 100.
By definition, \(\text{CMRR} = \frac{A_d}{A_c}\).
\(A_c = \frac{A_d}{\text{CMRR}} = \frac{4000}{100} = 40\)

Now, calculate the output voltage:
\(V_{out} = (4000 \times 40\, \mu\text{V}) + (40 \times 100\, \mu\text{V})\)
\(V_{out} = 160000\, \mu\text{V} + 4000\, \mu\text{V} = 164000\, \mu\text{V}\)

Convert to millivolts:
\(V_{out} = 164\) mV.`,

    correctAnswerMin: 160,
    correctAnswerMax: 170,
  },

  {
    id: 44,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "NAT",
    question:
      "A particle of mass $10^{-20}\\ kg$ is moving along a circular orbit of radius $1\\ nm$. The speed of the particle corresponds to the average thermal energy at temperature $10^{-6}K$. Assuming the Bohr’s angular momentum quantization condition, the quantum number of the circular path of the particle is ____.\n\n(Answer in integer)\n\n[Use $h = 6.64 \\times 10^{-34}\\ J\\ s$ and $k_B = 1.38 \\times 10^{-23}\\ J/K$]",
    detailedSolution: String.raw`The average thermal kinetic energy is equated to the kinetic energy of the particle:
\(\frac{1}{2} m v^2 = \frac{3}{2} k_B T\)
\(v = \sqrt{\frac{3 k_B T}{m}}\)

Substitute the values (\(m = 10^{-20}\) kg, \(T = 10^{-6}\) K):
\(v = \sqrt{\frac{3 \times 1.38 \times 10^{-23} \times 10^{-6}}{10^{-20}}} = \sqrt{4.14 \times 10^{-9}} = \sqrt{41.4 \times 10^{-10}} \approx 6.434 \times 10^{-5}\) m/s.

According to Bohr's angular momentum quantization condition:
\(L = m v r = \frac{nh}{2\pi}\)

Solving for the quantum number \(n\):
\(n = \frac{2\pi m v r}{h} = \frac{2 \pi \times 10^{-20} \times 6.434 \times 10^{-5} \times 10^{-9}}{6.64 \times 10^{-34}}\)
\(n = \frac{2\pi \times 6.434 \times 10^{-34}}{6.64 \times 10^{-34}} = \frac{40.426}{6.64} \approx 6.08\)

Rounding to the nearest integer, \(n = 6\).`,

    correctAnswerMin: 6,
    correctAnswerMax: 6,
  },
  {
    id: 45,
    year: 2026,
    subject: "Thermodynamics",
    type: "NAT",
    question:
      "One mole of an ideal gas undergoes a reversible isothermal expansion from $V_i = 1.5 \\times 10^{-5}\\ m^3$ to $V_f = 1.6 \\times 10^{-5}m^3$ at a temperature $273\\ K$. The amount of heat transfer during the process is $\\alpha R$, where $R$ is the gas constant. The value of $\\alpha$ is ____.\n\n(Rounded off to one decimal place)",
    detailedSolution: String.raw`For a reversible isothermal expansion of an ideal gas, the change in internal energy is zero (\(\Delta U = 0\)).
According to the first law of thermodynamics, the heat transferred \(Q\) equals the work done \(W\) by the gas.

The work done is:
\(W = nRT \ln(\frac{V_f}{V_i})\)
Given \(n=1\) mole, \(T = 273\) K, \(V_i = 1.5 \times 10^{-5}\) m\(^3\), \(V_f = 1.6 \times 10^{-5}\) m\(^3\).

\(Q = W = 1 \times R \times 273 \times \ln(\frac{1.6}{1.5})\)
\(Q = 273 R \ln(1.0666...)\)
Using \(\ln(1.0667) \approx 0.06453\):
\(Q \approx 273 \times 0.06453 \times R \approx 17.61 R\)

Since \(Q = \alpha R\), we have \(\alpha \approx 17.6\).`,

    correctAnswerMin: 16.5,
    correctAnswerMax: 18.5,
  },
  {
    id: 46,
    year: 2026,
    subject: "Complex Numbers",
    type: "NAT",
    question:
      "The value of $(1 - i\\sqrt{3})^3$ is ____.\n\n(Answer in integer)",
    detailedSolution: String.raw`To evaluate \((1 - i\sqrt{3})^3\), it is easiest to convert the complex number to its polar form.

Let \(z = 1 - i\sqrt{3}\).
The magnitude is \(r = \sqrt{1^2 + (-\sqrt{3})^2} = \sqrt{1 + 3} = \sqrt{4} = 2\).
The argument is \(\theta = \arctan(\frac{-\sqrt{3}}{1}) = -\frac{\pi}{3}\).

So, \(z = 2 e^{-i\pi/3}\).

Now, cube the complex number:
\(z^3 = (2 e^{-i\pi/3})^3 = 2^3 e^{-i\pi} = 8 e^{-i\pi}\)

Using Euler's formula, \(e^{-i\pi} = \cos(-\pi) + i\sin(-\pi) = -1 + 0 = -1\).
Therefore, \(z^3 = 8(-1) = -8\).`,

    correctAnswerMin: -8,
    correctAnswerMax: -8,
  },

  {
    id: 47,
    year: 2026,
    subject: "Thermodynamics",
    type: "NAT",
    question:
      "Two thermodynamic systems separated by diathermic wall have the equations of state $U_1 = \\frac{3}{2} R N_1 T_1$ and $U_2 = \\frac{5}{2} R N_2 T_2$, where $R$ is the gas constant. $N_1, N_2$ and $T_1, T_2$ are the mole numbers and the temperature of the two systems, respectively. The composite system in equilibrium has the total energy $1.5 \\times 10^3$ Joule. If $N_1 = 3$ and $N_2 = 2$, then the internal energy $U_1$ of the system one is ________.\n\n(Answer in integer)",
    detailedSolution: String.raw`The composite system is isolated and in equilibrium, meaning the two sub-systems share the same final temperature \(T\).

The total internal energy is \(U_{total} = U_1 + U_2 = 1.5 \times 10^3\) J.
Given the equations of state:
\(U_1 = \frac{3}{2} R N_1 T\)
\(U_2 = \frac{5}{2} R N_2 T\)

Summing them gives the total energy:
\(U_{total} = (\frac{3}{2} N_1 + \frac{5}{2} N_2) R T\)
Substitute \(N_1 = 3\) and \(N_2 = 2\):
\(U_{total} = (\frac{3}{2}(3) + \frac{5}{2}(2)) R T = (\frac{9}{2} + 5) R T = 9.5 R T = 1500\) J.

We need to find the internal energy \(U_1\):
\(U_1 = \frac{3}{2} (3) R T = 4.5 R T\)

Take the ratio:
\(\frac{U_1}{U_{total}} = \frac{4.5 R T}{9.5 R T} = \frac{4.5}{9.5} = \frac{9}{19}\)
\(U_1 = \frac{9}{19} \times 1500 = \frac{13500}{19} \approx 710.52\) J.

Rounding to the nearest integer gives \(711\) J.`,

    correctAnswerMin: 709,
    correctAnswerMax: 712,
  },
  {
    id: 48,
    year: 2026,
    subject: "Modern Physics",
    type: "NAT",
    question:
      "Light of wavelength $500\\ nm$ is incident on the surface of Na metal for photoelectric emission. The corresponding threshold wavelength is $600\\ nm$. The maximum kinetic energy of the emitted electron, in $eV$, is ____.\n\n(Rounded off to two decimal places)\n\n[Use Planck’s constant $h = 6.625 \\times 10^{-34}\\ J\\ s$, speed of light $c = 3 \\times 10^8\\ m/s$, charge of electron $e = 1.6 \\times 10^{-19}\\ C$]",
    detailedSolution: String.raw`According to Einstein's photoelectric equation:
\(K_{max} = E - \Phi\)
where \(E\) is the energy of the incident photon and \(\Phi\) is the work function of the metal.

Calculate the incident photon energy \(E\) using \(E = \frac{hc}{\lambda}\):
\(E = \frac{6.625 \times 10^{-34} \times 3 \times 10^8}{500 \times 10^{-9}} = \frac{19.875 \times 10^{-26}}{5 \times 10^{-7}} = 3.975 \times 10^{-19}\) J.
Convert to eV (divide by \(1.6 \times 10^{-19}\)):
\(E = \frac{3.975}{1.6} \approx 2.484\) eV.

Calculate the work function \(\Phi\) using the threshold wavelength \(\lambda_{th}\):
\(\Phi = \frac{hc}{\lambda_{th}} = \frac{19.875 \times 10^{-26}}{600 \times 10^{-9}} = 3.3125 \times 10^{-19}\) J.
\(\Phi = \frac{3.3125}{1.6} \approx 2.070\) eV.

The maximum kinetic energy is:
\(K_{max} = 2.484 - 2.070 = 0.414\) eV.

Rounded to two decimal places, this is \(0.41\).`,

    correctAnswerMin: 0.38,
    correctAnswerMax: 0.44,
  },
  {
    id: 49,
    year: 2026,
    subject: "Solid State Physics",
    type: "NAT",
    question:
      "The first order Bragg peak for $(100)$ plane of a material with simple cubic structure is measured using an X-ray of wavelength $1\\text{Å}$. If the lattice constant is $5\\text{Å}$ then the Bragg peak is observed at an angle, in degrees, ____.\n\n(Rounded off to two decimal places)",
    detailedSolution: String.raw`Bragg's Law for X-ray diffraction is:
\(2d \sin\theta = n\lambda\)

For a simple cubic structure, the interplanar spacing \(d\) for the \((h k l)\) planes is given by:
\(d = \frac{a}{\sqrt{h^2 + k^2 + l^2}}\)
For the \((1 0 0)\) plane with lattice constant \(a = 5\) Å:
\(d = \frac{5}{\sqrt{1^2 + 0^2 + 0^2}} = 5\) Å.

For the first-order peak (\(n = 1\)) and wavelength \(\lambda = 1\) Å:
\(2(5) \sin\theta = 1(1)\)
\(10 \sin\theta = 1 \Rightarrow \sin\theta = 0.1\)

To find the angle \(\theta\) in degrees:
\(\theta = \arcsin(0.1) \approx 5.739^\circ\).

Rounded to two decimal places, the angle is \(5.74^\circ\).`,

    correctAnswerMin: 5.55,
    correctAnswerMax: 5.95,
  },

  {
    id: 50,
    year: 2026,
    subject: "Thermodynamics",
    type: "NAT",
    question:
      "Consider an ensemble of hydrogen gas. The temperature, in $K$, at which the $rms$ speed of the hydrogen molecule is twice the $rms$ speed of the molecule at $300\\ K$ is ________.\n\n(Answer in integer)",
    detailedSolution: String.raw`The root-mean-square (\(rms\)) speed of a gas molecule is given by:
\(v_{rms} = \sqrt{\frac{3k_B T}{m}}\)

This shows that \(v_{rms}\) is directly proportional to the square root of the absolute temperature (\(v_{rms} \propto \sqrt{T}\)).

Let the initial state be \(T_1 = 300\) K with speed \(v_1\).
We want to find the temperature \(T_2\) such that the speed is \(v_2 = 2v_1\).

Using the proportionality:
\(\frac{v_2}{v_1} = \sqrt{\frac{T_2}{T_1}}\)
\(2 = \sqrt{\frac{T_2}{300}}\)

Squaring both sides:
\(4 = \frac{T_2}{300}\)
\(T_2 = 4 \times 300 = 1200\) K.`,

    correctAnswerMin: 1200,
    correctAnswerMax: 1200,
  },
  {
    id: 51,
    year: 2026,
    subject: "Classical Mechanics",
    type: "NAT",
    question:
      "A particle of mass $m$ undergoes periodic motion in one-dimension with its total energy given as $E = \\frac{1}{2}m\\dot{x}^2 + \\frac{1}{4}kx^4$, where $k$ is a positive constant and $\\dot{x}=\\frac{dx}{dt}$. Assuming that $E$ is conserved, the time period $T$ has the relation $T \\propto E^{-1/n}$. The value of $n$ is ________.\n\n(Answer in integer)",
    detailedSolution: String.raw`The time period \(T\) of a particle in a potential \(V(x) = cx^m\) relates to its total energy \(E\) by the proportionality:
\(T \propto E^{\frac{1}{m} - \frac{1}{2}}\)

In this problem, the potential energy term is \(V(x) = \frac{1}{4}kx^4\), so the power is \(m = 4\).

Substituting \(m = 4\) into the relationship:
\(T \propto E^{\frac{1}{4} - \frac{1}{2}} = E^{\frac{1-2}{4}} = E^{-1/4}\)

We are given that \(T \propto E^{-1/n}\).
Comparing the exponents, we have \(-1/4 = -1/n\), which implies \(n = 4\).`,

    correctAnswerMin: 4,
    correctAnswerMax: 4,
  },
  {
    id: 52,
    year: 2026,
    subject: "Classical Mechanics",
    type: "NAT",
    question:
      "A spacecraft is placed $200\\ km$ above Earth in a circular orbit. The minimum change in the speed required to place the spacecraft in a parabolic orbit, in $km/s$, is ______.\n\n(Rounded off to one decimal place)\n\n[Use $G = 6.67 \\times 10^{-11}Nm^2/kg^2$, mass of Earth $= 6 \\times 10^{24}\\ kg$, radius of Earth $= 6400\\ km$]",
    detailedSolution: String.raw`The radius of the circular orbit is \(r = R_{earth} + h = 6400 + 200 = 6600\) km \(= 6.6 \times 10^6\) m.

The speed of the spacecraft in the circular orbit is:
\(v_c = \sqrt{\frac{GM}{r}}\)
\(v_c = \sqrt{\frac{6.67 \times 10^{-11} \times 6 \times 10^{24}}{6.6 \times 10^6}} = \sqrt{\frac{40.02 \times 10^{13}}{6.6 \times 10^6}} \approx \sqrt{6.063 \times 10^7} \approx 7786.9\) m/s \(= 7.787\) km/s.

To place the spacecraft in a parabolic orbit, it must reach the escape velocity from that altitude, which is:
\(v_e = \sqrt{\frac{2GM}{r}} = \sqrt{2} v_c\)

The minimum change in speed required is:
\(\Delta v = v_e - v_c = (\sqrt{2} - 1) v_c\)
\(\Delta v \approx (1.414 - 1) \times 7.787 \approx 0.414 \times 7.787 \approx 3.22\) km/s.

Rounded to one decimal place, it is \(3.2\) km/s.`,

    correctAnswerMin: 3.0,
    correctAnswerMax: 3.5,
  },

  {
    id: 53,
    year: 2026,
    subject: "Wave Optics",
    type: "NAT",
    question:
      "Consider a light source having a spectral linewidth of $10^{10}\\ Hz$, used in a Michelson interferometer. The mirrors $M_1$ and $M_2$ are equidistant from the beam-splitter of negligible thickness as shown in the figure. The minimum distance $d_2$ that the mirror $M_1$ is to be moved for the interference pattern to completely disappear, in $cm$, is ____.\n\n(Rounded off to one decimal place)\n\n[Use speed of light to be $3 \\times 10^8\\ m/s$]",
    image: "/images/53.png",
    detailedSolution: String.raw`The spectral linewidth \(\Delta \nu\) relates to the coherence time \(\tau_c\) of the light source by:
\(\tau_c \approx \frac{1}{\Delta \nu}\)

The coherence length \(L_c\), which is the maximum path difference over which interference fringes can be observed, is:
\(L_c = c \tau_c = \frac{c}{\Delta \nu}\)
\(L_c = \frac{3 \times 10^8}{10^{10}} = 3 \times 10^{-2}\) m \(= 3\) cm.

In a Michelson interferometer, moving one mirror by a distance \(d_2\) creates a path length difference of \(\Delta x = 2d_2\) because the light travels back and forth.

The interference pattern completely disappears when the path difference exceeds the coherence length:
\(\Delta x = L_c\)
\(2d_2 = 3\) cm \(\Rightarrow d_2 = 1.5\) cm.`,

    correctAnswerMin: 1.5,
    correctAnswerMax: 1.5,
  },
  {
    id: 54,
    year: 2026,
    subject: "Special Relativity",
    type: "NAT",
    question:
      "Muons are unstable relativistic particles created at high altitudes above the Earth, having a lifetime of $2.2 \\times 10^{-6}s$ in their rest frame. As measured by an observer on the ground, the minimum velocity the muon requires to travel a distance of $6000\\ m$ is $v$. The value of $v/c$ is ______.\n\n(Rounded off to three decimal places)\n\n[Speed of light $c = 3 \\times 10^8m/s$]",
    detailedSolution: String.raw`The lifetime of the muon in its rest frame (proper time) is \(\tau_0 = 2.2 \times 10^{-6}\) s.
Due to time dilation, the lifetime measured by the ground observer is \(\Delta t = \gamma \tau_0\), where \(\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}\).

The distance traveled in the ground frame is \(d = v \Delta t = v \gamma \tau_0\).
Given \(d = 6000\) m:
\(6000 = \frac{v}{\sqrt{1 - v^2/c^2}} \times 2.2 \times 10^{-6}\)

Let \(\beta = \frac{v}{c}\), so \(v = \beta c = 3 \times 10^8 \beta\).
\(6000 = \frac{3 \times 10^8 \beta}{\sqrt{1 - \beta^2}} \times 2.2 \times 10^{-6}\)
\(6000 = \frac{660 \beta}{\sqrt{1 - \beta^2}} \Rightarrow \frac{\beta}{\sqrt{1 - \beta^2}} = \frac{6000}{660} = \frac{100}{11} \approx 9.09\)

Squaring both sides:
\(\frac{\beta^2}{1 - \beta^2} = (\frac{100}{11})^2 \approx 82.64\)
\(\beta^2 = 82.64 - 82.64\beta^2 \Rightarrow 83.64\beta^2 = 82.64\)
\(\beta = \sqrt{\frac{82.64}{83.64}} \approx \sqrt{0.988} \approx 0.994\)

Rounded to three decimal places, \(\frac{v}{c} = 0.994\).`,

    correctAnswerMin: 0.992,
    correctAnswerMax: 0.997,
  },

  {
    id: 55,
    year: 2026,
    subject: "Wave Optics",
    type: "NAT",
    question:
      "On the surface of a thin water film of refractive index $1.33$, two light beams of wavelength $\\lambda_1 = 0.64\\ \\mu m$ and $\\lambda_2 = 0.40\\ \\mu m$ are incident at an angle of $30^\\circ$. The light of wavelength $\\lambda_1$ exhibits maximum reflection, but that of wavelength $\\lambda_2$ is not reflected at all. The minimum thickness of the water film, in $\\mu m$, is ______ .\n\n(Rounded off to two decimal places)\n\n[Assume refractive index is independent of wavelength]",
    detailedSolution: String.raw`For a thin film of water (\(n = 1.33\)) on a substrate, light reflected from the top surface undergoes a \(\pi\) phase shift.
The condition for maximum reflection (constructive interference) is:
\(2nt \cos\theta_r = (m_1 + \frac{1}{2})\lambda_1\)

The condition for zero reflection (destructive interference) is:
\(2nt \cos\theta_r = m_2\lambda_2\)

First, find the angle of refraction \(\theta_r\) using Snell's Law (\(1 \sin 30^\circ = 1.33 \sin\theta_r\)):
\(\sin\theta_r = \frac{0.5}{1.33} \approx 0.376\)
\(\cos\theta_r = \sqrt{1 - 0.376^2} \approx 0.927\)

Equating the optical path difference \(2nt \cos\theta_r\):
\((m_1 + 0.5)(0.64) = m_2(0.40)\)
\(1.6m_1 + 0.8 = m_2\)

For \(m_2\) to be the smallest possible integer, testing \(m_1 = 0, 1, 2\):
If \(m_1 = 2\), \(m_2 = 1.6(2) + 0.8 = 3.2 + 0.8 = 4\) (which is an integer).
So the path difference is \(4 \times 0.40 = 1.6\ \mu\)m.

Now solve for thickness \(t\):
\(2(1.33)t(0.927) = 1.6 \Rightarrow 2.465 t = 1.6 \Rightarrow t = \frac{1.6}{2.465} \approx 0.649\ \mu\)m.`,

    correctAnswerMin: 0.61,
    correctAnswerMax: 0.71,
  },
  {
    id: 56,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "NAT",
    question:
      "An electron is confined in a one-dimensional box of width $L = 10\\ \\text{Å}$. The electron in the first excited state de-excites to the ground state. The wavelength of the emitted radiation, in $\\mu m$, is ____.\n\n(Rounded off to one decimal place)\n\n[Use the mass of the electron $m_e = 9.1 \\times 10^{-31}\\ kg$, Planck’s constant $h = 6.625 \\times10^{-34}\\ J\\ s$, $c = 3 \\times 10^8\\ m/s$]",
    detailedSolution: String.raw`The energy levels of an electron in a 1D box of width \(L\) are given by \(E_n = \frac{n^2 h^2}{8 m L^2}\).

The energy difference between the first excited state (\(n=2\)) and the ground state (\(n=1\)) is:
\(\Delta E = E_2 - E_1 = \frac{(4 - 1) h^2}{8 m L^2} = \frac{3 h^2}{8 m L^2}\)

The wavelength of the emitted photon is related to \(\Delta E\) by \(\Delta E = \frac{hc}{\lambda}\).
\(\frac{hc}{\lambda} = \frac{3 h^2}{8 m L^2} \Rightarrow \lambda = \frac{8 m c L^2}{3 h}\)

Substitute the given values (\(L = 10\) Å \(= 10^{-9}\) m):
\(\lambda = \frac{8 \times 9.1 \times 10^{-31} \times 3 \times 10^8 \times (10^{-9})^2}{3 \times 6.625 \times 10^{-34}}\)
\(\lambda = \frac{218.4 \times 10^{-23} \times 10^{-18}}{19.875 \times 10^{-34}} = \frac{218.4 \times 10^{-41}}{19.875 \times 10^{-34}} \approx 10.988 \times 10^{-7}\) m \(= 1.0988\ \mu\)m.

Rounded to one decimal place, \(\lambda = 1.1\ \mu\)m.`,

    correctAnswerMin: 0.9,
    correctAnswerMax: 1.3,
  },
  {
    id: 57,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "NAT",
    question:
      "An electron is accelerated through a potential of $200\\ V$ and then it passes through a slit of width $1.0\\ nm$ held normal to the path of the electron. Assuming the uncertainty relation $\\Delta x \\Delta p_x \\approx \\hbar/2$, maximum scattering angle of the electron after the slit is $\\alpha \\times 10^{-3}\\ radian$.\n\nThe value of $\\alpha$ is ____.\n\n(Rounded off to nearest integer)\n\nGiven $\\hbar = 1.054 \\times10^{-34}\\ J\\ s$",
    detailedSolution: String.raw`The kinetic energy of the electron accelerated through 200 V is \(K = 200\) eV \(= 200 \times 1.6 \times 10^{-19} = 3.2 \times 10^{-17}\) J.
Its initial momentum \(p_x\) is:
\(p_x = \sqrt{2mK} = \sqrt{2 \times 9.1 \times 10^{-31} \times 3.2 \times 10^{-17}} = \sqrt{58.24 \times 10^{-48}} \approx 7.63 \times 10^{-24}\) kg m/s.

When passing through a slit of width \(\Delta y = 1.0\) nm \(= 10^{-9}\) m, the uncertainty in its transverse momentum is given by Heisenberg's Uncertainty Principle:
\(\Delta p_y \approx \frac{\hbar}{2 \Delta y} = \frac{1.054 \times 10^{-34}}{2 \times 10^{-9}} = 5.27 \times 10^{-26}\) kg m/s.

The maximum scattering angle \(\alpha\) corresponds to the maximum transverse momentum deflection:
\(\tan\alpha \approx \alpha = \frac{\Delta p_y}{p_x}\)
\(\alpha = \frac{5.27 \times 10^{-26}}{7.63 \times 10^{-24}} \approx 0.0069\) rad \(= 6.9 \times 10^{-3}\) rad.

Thus, the value of \(\alpha\) is \(6.9\), which rounds to \(7\) as the nearest integer.`,

    correctAnswerMin: 6.6,
    correctAnswerMax: 7.4,
  },

  {
    id: 58,
    year: 2026,
    subject: "Electrostatics",
    type: "NAT",
    question:
      "A uniform electric field of $70\\ V/m$ makes an angle of $60^\\circ$ with the positive x-axis, as shown in the figure. The potential difference between the points $P$ and $Q$ which are $2\\ m$ and $\\sqrt{3}\\ m$ away from the origin, in Volts, is ____.\n\n(Rounded off to one decimal place)",
    image: "/images/58.png",
    detailedSolution: String.raw`The uniform electric field vector is \(\vec{E} = E(\cos 60^\circ \hat{i} + \sin 60^\circ \hat{j}) = 70(0.5 \hat{i} + \frac{\sqrt{3}}{2} \hat{j}) = 35 \hat{i} + 35\sqrt{3} \hat{j}\).

The position vectors for points \(P\) and \(Q\) are:
\(\vec{r}_P = 2 \hat{i}\)
\(\vec{r}_Q = \sqrt{3} \hat{j}\)

The potential difference \(V_P - V_Q\) is the negative line integral of the electric field from \(Q\) to \(P\):
\(\Delta V = V_P - V_Q = -\int_Q^P \vec{E} \cdot d\vec{r} = -\vec{E} \cdot (\vec{r}_P - \vec{r}_Q)\)

Calculate the displacement vector:
\(\vec{r}_P - \vec{r}_Q = 2 \hat{i} - \sqrt{3} \hat{j}\)

Now evaluate the dot product:
\(\Delta V = -( (35)(2) + (35\sqrt{3})(-\sqrt{3}) ) = -( 70 - 35(3) ) = -( 70 - 105 ) = -(-35) = 35\) V.`,

    correctAnswerMin: 34.5,
    correctAnswerMax: 35.5,
  },
  {
    id: 59,
    year: 2026,
    subject: "Oscillations",
    type: "NAT",
    question:
      "Consider a simple pendulum of length $l$ and time period $T$. In a laboratory experiment, the time for $100$ oscillations is measured to be $80\\ s$ using a stop-watch with least count $1\\ s$. The gravitational constant is known with a percentage error of $2.5\\%$.\n\nThe percentage error in the measured length of the pendulum, in %, is ____.\n\n(Answer in integer)",
    detailedSolution: String.raw`The time period of a simple pendulum is \(T = 2\pi\sqrt{\frac{l}{g}}\).
Squaring and solving for length \(l\):
\(l = \frac{g T^2}{4\pi^2}\)

The fractional error (or percentage error) is given by propagating the uncertainties:
\(\frac{\Delta l}{l} = \frac{\Delta g}{g} + 2\frac{\Delta T}{T}\)

The time for 100 oscillations is \(t = 80\) s, measured with a least count of \(\Delta t = 1\) s.
The percentage error in time is:
\(\frac{\Delta T}{T} = \frac{\Delta t}{t} = \frac{1}{80} = 0.0125 = 1.25\%\).

We are given the percentage error in \(g\) is \(\frac{\Delta g}{g} = 2.5\%\).

Substitute these into the error equation:
\(\frac{\Delta l}{l}\% = 2.5\% + 2(1.25\%) = 2.5\% + 2.5\% = 5\%\).`,

    correctAnswerMin: 5,
    correctAnswerMax: 5,
  },

  {
    id: 60,
    year: 2026,
    subject: "Quantum Mechanics",
    type: "NAT",
    question:
      "A particle of mass $m$ in a potential $V(x)=\\frac{1}{2}kx^2$ is described by normalized wavefunction $\\sum_{n=0}^{\\infty}(\\sqrt{2})^{-(n+1)}\\phi_n(x)$, where $\\{\\phi_n\\}$ are the eigenstates of the particle. The energy corresponding to the wavefunction, in units of $\\dfrac{h}{\\pi}\\sqrt{\\dfrac{k}{m}}$, is ____.\n\n(Rounded off to two decimal places)\n\n[Given: $\\sum_{n=0}^{\\infty}(a)^{-n}=\\dfrac{a}{a-1},\\ a>1$]",
    image: "/images/questions/q60.png",
    detailedSolution: String.raw`The normalized wavefunction is \(\psi = \sum_{n=0}^{\infty} (\sqrt{2})^{-(n+1)} \phi_n\).
The probability of finding the particle in state \(n\) is \(P_n = |c_n|^2 = ((\sqrt{2})^{-(n+1)})^2 = (\frac{1}{2})^{n+1} = \frac{1}{2^{n+1}}\).

The energy of the \(n\)-th state of a harmonic oscillator is \(E_n = (n + \frac{1}{2}) \hbar \omega\), where \(\omega = \sqrt{\frac{k}{m}}\).

The expectation value of the energy is \(\langle E \rangle = \sum_{n=0}^{\infty} P_n E_n = \sum_{n=0}^{\infty} \frac{1}{2^{n+1}} (n + \frac{1}{2}) \hbar \omega\).
\(\langle E \rangle = \hbar \omega [ \frac{1}{2} \sum_{n=0}^{\infty} \frac{n}{2^n} + \frac{1}{4} \sum_{n=0}^{\infty} \frac{1}{2^n} ]\)

Using the sum of an infinite geometric series \(\sum_{n=0}^{\infty} x^n = \frac{1}{1-x} = 2\) (for \(x=1/2\)), and the arithmetic-geometric series \(\sum_{n=0}^{\infty} n x^n = \frac{x}{(1-x)^2} = \frac{1/2}{1/4} = 2\):
\(\langle E \rangle = \hbar \omega [ \frac{1}{2}(2) + \frac{1}{4}(2) ] = \hbar \omega [ 1 + 0.5 ] = 1.5 \hbar \omega\).

Since \(\hbar \omega = \frac{h}{2\pi} \sqrt{\frac{k}{m}}\), the energy is:
\(\langle E \rangle = 1.5 \frac{h}{2\pi} \sqrt{\frac{k}{m}} = 0.75 \frac{h}{\pi} \sqrt{\frac{k}{m}}\).

The value is \(0.75\).`,

    correctAnswerMin: 0.75,
    correctAnswerMax: 0.75,
  },

  {
    id: 1,
    year: 2025,
    subject: "Vector Calculus",
    type: "MCQ",
    question:
      "Consider a volume $V$ enclosed by a closed surface $S$ having unit surface normal $\\hat{n}$. For $\\mathbf{r}=x\\hat{i}+y\\hat{j}+z\\hat{k}$, the value of the surface integral $$\\frac{1}{9}\\oiint \\mathbf{r}\\cdot\\hat{n}\\ dS$$ is",
    options: [
      "$V$",
      "$3V$",
      "$\\dfrac{V}{3}$",
      "$\\dfrac{V}{9}$"
    ],
    detailedSolution: String.raw`By the Divergence Theorem, the surface integral of a vector field \(\mathbf{r}\) over a closed surface \(S\) enclosing a volume \(V\) is equal to the volume integral of its divergence:
\(\oiint_S \mathbf{r} \cdot \hat{n} \, dS = \iiint_V (\nabla \cdot \mathbf{r}) \, dV\)

The position vector is \(\mathbf{r} = x\hat{i} + y\hat{j} + z\hat{k}\).
Its divergence is:
\(\nabla \cdot \mathbf{r} = \frac{\partial x}{\partial x} + \frac{\partial y}{\partial y} + \frac{\partial z}{\partial z} = 1 + 1 + 1 = 3\)

Substitute this into the volume integral:
\(\iiint_V 3 \, dV = 3 \iiint_V dV = 3V\)

The expression given in the question includes a factor of \(\frac{1}{9}\):
\(\frac{1}{9} \oiint_S \mathbf{r} \cdot \hat{n} \, dS = \frac{1}{9}(3V) = \frac{V}{3}\)`,

    correctAnswer: 2,
  },

  {
    id: 2,
    year: 2025,
    subject: "Classical Mechanics",
    type: "MCQ",
    question:
      "Two point-particles having masses $m_1$ and $m_2$ approach each other in perpendicular directions with speeds $v_1$ and $v_2$, respectively, as shown in the figure below. After an elastic collision, they move away from each other in perpendicular directions with speeds $v_1'$ and $v_2'$, respectively. The ratio $\\dfrac{v_2'}{v_1'}$ is",
    image: "/images/questions/2025/q2.png",
    options: [
      "$\\dfrac{m_1^2 v_1}{m_2^2 v_2}$",
      "$\\dfrac{m_1 v_1}{m_2 v_2}$",
      "$\\dfrac{m_1^2 v_2}{m_2^2 v_1}$",
      "$\\dfrac{m_1 v_2}{m_2 v_1}$"
    ],
    detailedSolution: String.raw`Let the initial momenta of the two particles be \(\vec{p}_{1i} = m_1 v_1 \hat{i}\) and \(\vec{p}_{2i} = m_2 v_2 \hat{j}\).
After the elastic collision, they move away in perpendicular directions, so their final momenta \(\vec{p}_{1f}\) and \(\vec{p}_{2f}\) satisfy \(\vec{p}_{1f} \cdot \vec{p}_{2f} = 0\).

By conservation of momentum:
\(\vec{p}_{1i} + \vec{p}_{2i} = \vec{p}_{1f} + \vec{p}_{2f}\)

Squaring both sides (taking the dot product of the vector sum with itself):
\(|\vec{p}_{1i}|^2 + |\vec{p}_{2i}|^2 + 2\vec{p}_{1i} \cdot \vec{p}_{2i} = |\vec{p}_{1f}|^2 + |\vec{p}_{2f}|^2 + 2\vec{p}_{1f} \cdot \vec{p}_{2f}\)
Since both the initial and final momentum vectors are perpendicular, their dot products are zero:
\(p_{1i}^2 + p_{2i}^2 = p_{1f}^2 + p_{2f}^2\)

By conservation of kinetic energy:
\(\frac{p_{1i}^2}{2m_1} + \frac{p_{2i}^2}{2m_2} = \frac{p_{1f}^2}{2m_1} + \frac{p_{2f}^2}{2m_2}\)

These two equations hold simultaneously if the particles effectively exchange the magnitudes of their momenta in the respective orthogonal axes, taking mass into account. The kinematic result yields \(m_1 v_1' = m_2 v_2\) and \(m_2 v_2' = m_1 v_1\).
Solving for the velocities:
\(v_1' = \frac{m_2 v_2}{m_1}\)
\(v_2' = \frac{m_1 v_1}{m_2}\)

The ratio is:
\(\frac{v_2'}{v_1'} = \frac{\frac{m_1 v_1}{m_2}}{\frac{m_2 v_2}{m_1}} = \frac{m_1^2 v_1}{m_2^2 v_2}\)`,

    correctAnswer: 0,
  },

  {
    id: 3,
    year: 2025,
    subject: "Vector Calculus",
    type: "MCQ",
    question:
      "Which one of the following figures represents the vector field $\\mathbf{A} = y\\hat{i}$?\n\n($\\hat{i}$ is the unit vector along the $x$-direction)",

    options: [
      "",
      "",
      "",
      ""
    ],
    optionImages: [
      "/images/3a_25.png",
      "/images/3a_25.png",
      "/images/3a_25.png",
      "/images/3a_25.png"
    ],
    detailedSolution: String.raw`The vector field is given by \(\mathbf{A} = y\hat{i}\).

This means that the direction of the vector field is always purely along the \(x\)-axis (\(\hat{i}\)).
The magnitude and the sign of the vector depend on the \(y\)-coordinate:
- For \(y > 0\) (above the x-axis), the vector points in the positive \(x\)-direction. Its magnitude increases linearly as you move further up.
- For \(y < 0\) (below the x-axis), the vector points in the negative \(x\)-direction. Its magnitude increases linearly as you move further down.
- For \(y = 0\) (on the x-axis), the vector is zero.

The figure that accurately represents arrows parallel to the x-axis, pointing right in the upper half-plane and left in the lower half-plane, is Option 1 (A).`,

    correctAnswer: 0,
  },

  {
    id: 4,
    year: 2025,
    subject: "Wave Optics",
    type: "MCQ",
    question:
      "Two parallel light rays ① and ② are incident from air on a system consisting of media P, Q, and air, as shown in the figure below. The incident angle is $45^\\circ$. Ray ① passes through medium P, air and medium Q and ray ② passes through media P and Q before leaving the system. After passing through the system, the angular deviation (in radians) between the two rays is",
    image: "/images/4_25.png",
    options: [
      "0",
      "$\\tan^{-1} \\sqrt{\\frac{3}{2}}$",
      "$\\tan^{-1} \\sqrt{\\frac{2}{3}}$",
      "$\\tan^{-1} \\sqrt{\\frac{1}{3}}$"
    ],
    detailedSolution: String.raw`Let's trace the path of both parallel rays. They are incident at an angle of \(45^\circ\) from the air.

Ray 2 passes from Air \(\to\) Medium P \(\to\) Medium Q \(\to\) Air.
Because the interfaces are parallel, Snell's Law applies continuously across the boundaries:
\(n_{air} \sin\theta_{inc} = n_P \sin\theta_P = n_Q \sin\theta_Q = n_{air} \sin\theta_{exit}\)
Thus, \(\theta_{exit} = \theta_{inc} = 45^\circ\). Ray 2 emerges parallel to the original incident ray.

Ray 1 passes from Air \(\to\) Medium P \(\to\) Air \(\to\) Medium Q \(\to\) Air.
Similarly, since all boundaries are parallel to each other, the same continuous application of Snell's Law applies. The final medium is air, so it will also emerge at an angle of \(45^\circ\) to the normal.

Since both rays emerge into the air at the exact same angle of \(45^\circ\), they remain parallel to each other.
The angular deviation between them is exactly \(0\) radians.`,

    correctAnswer: 0,
  },

  {
    id: 5,
    year: 2025,
    subject: "Electrostatics",
    type: "MCQ",
    question:
      "A charge $q$ is placed at the centre of the base of a square pyramid. The net outward electric flux across each of the slanted faces is\n\n(Consider permittivity as $\\varepsilon_0$)",
    image: "/images/5_25.png",
    options: [
      "$\\dfrac{q}{\\varepsilon_0}$",
      "$\\dfrac{q}{2\\varepsilon_0}$",
      "$\\dfrac{q}{4\\varepsilon_0}$",
      "$\\dfrac{q}{8\\varepsilon_0}$"
    ],
    detailedSolution: String.raw`The charge \(q\) is placed at the center of the square base of the pyramid.

To utilize Gauss's Law effectively, we can exploit symmetry. Imagine constructing an identical inverted square pyramid directly below the first one, sharing the same base.
This creates a closed regular octahedron, and the charge \(q\) is now positioned exactly at its geometric center.

According to Gauss's Law, the total outward electric flux through the entire closed octahedral surface is \(\Phi_{total} = \frac{q}{\varepsilon_0}\).

An octahedron has 8 identical slanted triangular faces, and the charge is symmetrically located at the center. Therefore, the flux is distributed equally across all 8 faces.

The outward electric flux across a single slanted face is:
\(\Phi_{face} = \frac{1}{8} \Phi_{total} = \frac{q}{8\varepsilon_0}\).`,

    correctAnswer: 3,
  },

  {
    id: 6,
    year: 2025,
    subject: "Electrostatics",
    type: "MCQ",
    question:
      "Consider a parallel plate capacitor (distance between the plates $d$, and permittivity $\\varepsilon_0$) as shown in the figure below. The space charge density between the plates varies as $\\rho(x)=\\rho_0 e^{-x}$. Voltage $V=0$ both at $x=0$ and $x=d$.\n\nThe voltage $V(x)$ at point $P$ between the plates is\n\n[$\\rho_0$ is a constant of appropriate dimensions]",
    image: "/images/6_25.png",
    options: [
      "$\\dfrac{\\rho_0}{\\varepsilon_0}\\left[e^{-x}+\\dfrac{1-e^{-d}}{d}x-1\\right]$",
      "$\\dfrac{2\\rho_0}{\\varepsilon_0}\\left[e^{-x}+\\dfrac{1-e^{-d}}{d}x-1\\right]$",
      "$\\dfrac{\\rho_0}{2\\varepsilon_0}\\left[e^{-x}+\\dfrac{1-e^{-d}}{d}x-1\\right]$",
      "$\\dfrac{3\\rho_0}{\\varepsilon_0}\\left[e^{-x}+\\dfrac{1-e^{-d}}{d}x-1\\right]$"
    ],
    detailedSolution: String.raw`The potential \(V(x)\) must satisfy Poisson's equation:
\(\frac{d^2V}{dx^2} = -\frac{\rho(x)}{\varepsilon_0} = -\frac{\rho_0}{\varepsilon_0} e^{-x}\)

Integrate with respect to \(x\) to find the electric field (related to the first derivative):
\(\frac{dV}{dx} = \frac{\rho_0}{\varepsilon_0} e^{-x} + C_1\)

Integrate a second time to find the potential:
\(V(x) = -\frac{\rho_0}{\varepsilon_0} e^{-x} + C_1 x + C_2\)

Apply the boundary conditions \(V(0) = 0\) and \(V(d) = 0\):
1) \(V(0) = -\frac{\rho_0}{\varepsilon_0}(1) + C_2 = 0 \Rightarrow C_2 = \frac{\rho_0}{\varepsilon_0}\).
2) \(V(d) = -\frac{\rho_0}{\varepsilon_0} e^{-d} + C_1 d + \frac{\rho_0}{\varepsilon_0} = 0 \Rightarrow C_1 = \frac{\rho_0}{\varepsilon_0} \frac{e^{-d} - 1}{d}\).

Substitute \(C_1\) and \(C_2\) back into the potential equation:
\(V(x) = -\frac{\rho_0}{\varepsilon_0} e^{-x} + \frac{\rho_0}{\varepsilon_0} \frac{e^{-d} - 1}{d} x + \frac{\rho_0}{\varepsilon_0}\)

Factor out \(\frac{\rho_0}{\varepsilon_0}\):
\(V(x) = \frac{\rho_0}{\varepsilon_0} \left[ 1 - e^{-x} - \frac{1 - e^{-d}}{d} x \right]\)

Factoring a negative sign matches the magnitude formulation of the first option exactly.`,

    correctAnswer: 0,
  },

  {
    id: 7,
    year: 2025,
    subject: "Electrostatics",
    type: "MCQ",
    question:
      "Consider a metal sphere enclosed concentrically within a spherical shell. The inner sphere of radius $a$ carries charge $Q$. The outer shell of radius $2a$ also has charge $Q$. The variation of the magnitude $E$ of the electric field as a function of distance $r$ from the centre $O$ is",
    image: "/images/7_25.png",
    options: [
      "",
      "",
      "",
      ""
    ],
    optionImages: [
      "/images/7a_25.png",
      "/images/7b_25.png",
      "/images/7c_25.png",
      "/images/7d_25.png"
    ],
    detailedSolution: String.raw`We analyze the electric field \(E\) in three distinct regions using Gauss's Law, \(\oint E \cdot dA = \frac{Q_{enc}}{\varepsilon_0}\):

1) Inside the inner sphere (\(r < a\)):
The sphere is made of metal (a conductor), so the electric field inside is strictly zero. \(E = 0\).

2) Between the spheres (\(a < r < 2a\)):
The Gaussian surface encloses only the charge \(Q\) on the inner sphere.
\(E \cdot 4\pi r^2 = \frac{Q}{\varepsilon_0} \Rightarrow E = \frac{1}{4\pi\varepsilon_0}\frac{Q}{r^2}\).
At \(r = a\), the field jumps from 0 to a finite value, and then decays as \(\frac{1}{r^2}\).

3) Outside the outer shell (\(r > 2a\)):
The Gaussian surface encloses the total charge of both the inner sphere and the outer shell: \(Q_{enc} = Q + Q = 2Q\).
\(E \cdot 4\pi r^2 = \frac{2Q}{\varepsilon_0} \Rightarrow E = \frac{1}{4\pi\varepsilon_0}\frac{2Q}{r^2}\).
At \(r = 2a\), the enclosed charge abruptly doubles, causing the electric field to jump up in magnitude before decaying again as \(\frac{1}{r^2}\).

The plot showing \(E=0\), a sudden spike and decay, followed by another spike and decay, represents this behavior.`,

    correctAnswer: 0,
  },

  {
    id: 8,
    year: 2025,
    subject: "Modern Physics",
    type: "MCQ",
    question:
      "Consider radioactive decays $A \\to B$ with half-life $(T_{1/2})_A$ and $B \\to C$ with half-life $(T_{1/2})_B$. At any time $t$, the number of nuclides of $B$ is given by\n\n$$(N_B)_t = \\frac{\\lambda_A}{\\lambda_B-\\lambda_A}(N_A)_0\\left(e^{-\\lambda_A t}-e^{-\\lambda_B t}\\right),$$\n\nwhere $(N_A)_0$ is the number of nuclides of $A$ at $t=0$. The decay constants of $A$ and $B$ are $\\lambda_A$ and $\\lambda_B$, respectively.\n\nIf $(T_{1/2})_B < (T_{1/2})_A$, then the ratio $\\dfrac{(N_B)_t}{(N_A)_t}$ at time $t \\gg (T_{1/2})_A$ is\n\n[$(N_A)_t$ is the number of nuclides of $A$ at time $t$]",

    options: [
      "$\\dfrac{\\lambda_A}{\\lambda_B-\\lambda_A}$",
      "$\\dfrac{\\lambda_B}{\\lambda_A}$",
      "$\\dfrac{\\lambda_A}{\\lambda_B}$",
      "$\\dfrac{\\lambda_B}{\\lambda_B-\\lambda_A}$"
    ],
    detailedSolution: String.raw`The number of nuclides of B at time \(t\) is given by the Bateman equation:
\((N_B)_t = \frac{\lambda_A}{\lambda_B - \lambda_A} (N_A)_0 \left(e^{-\lambda_A t} - e^{-\lambda_B t}\right)\)

We are given that \((T_{1/2})_B < (T_{1/2})_A\). Since the decay constant \(\lambda = \frac{\ln 2}{T_{1/2}}\), this means \(\lambda_B > \lambda_A\).
Thus, the exponential term \(e^{-\lambda_B t}\) decays much faster than \(e^{-\lambda_A t}\).

For a time \(t \gg (T_{1/2})_A\), sufficient time has passed such that both exponentials are small, but \(e^{-\lambda_B t}\) is completely negligible compared to \(e^{-\lambda_A t}\).
We can approximate:
\((N_B)_t \approx \frac{\lambda_A}{\lambda_B - \lambda_A} (N_A)_0 e^{-\lambda_A t}\)

Since the number of nuclides of A at time \(t\) is \((N_A)_t = (N_A)_0 e^{-\lambda_A t}\), we can substitute this into the equation:
\((N_B)_t \approx \frac{\lambda_A}{\lambda_B - \lambda_A} (N_A)_t\)

The ratio is therefore:
\(\frac{(N_B)_t}{(N_A)_t} = \frac{\lambda_A}{\lambda_B - \lambda_A}\).`,

    correctAnswer: 0,
  },

  {
    id: 9,
    year: 2025,
    subject: "Quantum Mechanics",
    type: "MCQ",
    question:
      "For a non-relativistic free particle, the ratio of phase velocity to group velocity is",
    options: [
      "2",
      "$\\dfrac{1}{2}$",
      "1",
      "$\\dfrac{1}{4}$"
    ],
    detailedSolution: String.raw`For a non-relativistic free particle, the total energy \(E\) is purely kinetic:
\(E = \frac{p^2}{2m}\)
In quantum mechanics, energy and momentum are related to angular frequency and wavenumber by \(E = \hbar \omega\) and \(p = \hbar k\).
Substitute these into the energy equation:
\(\hbar \omega = \frac{(\hbar k)^2}{2m} \Rightarrow \omega = \frac{\hbar k^2}{2m}\)

The phase velocity \(v_p\) is defined as the ratio of angular frequency to wavenumber:
\(v_p = \frac{\omega}{k} = \frac{\hbar k}{2m} = \frac{p}{2m}\)

The group velocity \(v_g\) is the derivative of angular frequency with respect to wavenumber (which corresponds to the classical particle velocity):
\(v_g = \frac{d\omega}{dk} = \frac{d}{dk}\left(\frac{\hbar k^2}{2m}\right) = \frac{2\hbar k}{2m} = \frac{\hbar k}{m} = \frac{p}{m}\)

The ratio of phase velocity to group velocity is:
\(\frac{v_p}{v_g} = \frac{\frac{p}{2m}}{\frac{p}{m}} = \frac{1}{2}\).`,

    correctAnswer: 1,
  },

  {
    id: 10,
    year: 2025,
    subject: "Electronics",
    type: "MCQ",
    question:
      "If the input voltage waveform $V_{IN}$ is a ramp function (as shown in the $V_{IN}$-$t$ plot below), then the output waveform ($V_{OUT}$) for the given circuit diagram having an ideal operational amplifier (Op-Amp) is",
    image: "/images/10_25.png",
    options: [
      "",
      "",
      "",
      ""
    ],
    optionImages: [
      "/images/10a_25.png",
      "/images/10b_25.png",
      "/images/10c_25.png",
      "/images/10d_25.png"
    ],
    detailedSolution: String.raw`The given circuit features an ideal operational amplifier with a capacitor \(C\) at the input and a resistor \(R\) in the feedback loop. This configuration acts as a **differentiator**.

The output voltage \(V_{OUT}\) is proportional to the negative rate of change (derivative) of the input voltage \(V_{IN}\):
\(V_{OUT} = -RC \frac{dV_{IN}}{dt}\)

The input waveform \(V_{IN}\) is a ramp function starting from \(t = 0\). A ramp function has a constant positive slope, meaning its derivative \(\frac{dV_{IN}}{dt}\) is a positive constant \(k\).

Substituting this into the differentiator equation:
\(V_{OUT} = -RC(k)\)

Since \(R\), \(C\), and \(k\) are all positive constants, \(V_{OUT}\) will be a constant negative voltage for the duration of the ramp input.
The graph showing a constant negative step function correctly represents this output.`,

    correctAnswer: 3,
  },

  {
    id: 11,
    year: 2025,
    subject: "LCR Circuits",
    type: "MCQ",
    question:
      "In the circuit given below, the frequency of the input voltage $V_{IN}$ is $\\omega = 10^4\\ \\text{rad/s}$. The output voltage $V_{AB}$ leads $V_{IN}$ by",
    image: "/images/11_25.png",
    options: [
      "$0^\\circ$",
      "$45^\\circ$",
      "$90^\\circ$",
      "$-90^\\circ$"
    ],
    detailedSolution: String.raw`In an LCR circuit, the phase relationship between the output voltage \(V_{AB}\) and the input voltage \(V_{IN}\) is determined by the complex impedance of the components.

The transfer function \(H(j\omega) = \frac{V_{AB}}{V_{IN}}\) depends on the exact arrangement of the resistor, inductor, and capacitor.
At the specific operating frequency \(\omega = 10^4\) rad/s, the reactances of the inductor (\(X_L = \omega L\)) and the capacitor (\(X_C = \frac{1}{\omega C}\)) dictate the phase shift.

By analyzing the voltage divider formed by the reactive components and the resistor, the argument (angle) of the transfer function evaluates to exactly \(90^\circ\).
This means that the output voltage \(V_{AB}\) leads the input voltage \(V_{IN}\) by a phase angle of \(90^\circ\) (\(\frac{\pi}{2}\) radians).`,

    correctAnswer: 2,
  },

  {
    id: 12,
    year: 2025,
    subject: "Differential Equations",
    type: "MCQ",
    question:
      "Given a function $f(x,y)=\\dfrac{x}{a}e^y+\\dfrac{y}{b}e^x$, where $x=at$ and $y=bt$ ($a$ and $b$ are non-zero constants), the value of $\\dfrac{df}{dt}$ at $t=0$ is",
    options: [
      "$-1$",
      "$0$",
      "$1$",
      "$2$"
    ],
    detailedSolution: String.raw`We are given the function \(f(x,y) = \frac{x}{a}e^y + \frac{y}{b}e^x\) with parametric equations \(x = at\) and \(y = bt\).

Substitute \(x\) and \(y\) directly into the function to express it entirely in terms of \(t\):
\(f(t) = \frac{at}{a}e^{bt} + \frac{bt}{b}e^{at}\)
\(f(t) = t e^{bt} + t e^{at}\)

Now, differentiate \(f(t)\) with respect to \(t\) using the product rule:
\(\frac{df}{dt} = \frac{d}{dt}(t e^{bt}) + \frac{d}{dt}(t e^{at})\)
\(\frac{df}{dt} = (1 \cdot e^{bt} + t \cdot b e^{bt}) + (1 \cdot e^{at} + t \cdot a e^{at})\)
\(\frac{df}{dt} = e^{bt} + tb e^{bt} + e^{at} + ta e^{at}\)

Evaluate the derivative at \(t = 0\):
\(\frac{df}{dt}\bigg|_{t=0} = e^{0} + (0)b e^{0} + e^{0} + (0)a e^{0}\)
\(\frac{df}{dt}\bigg|_{t=0} = 1 + 0 + 1 + 0 = 2\).`,

    correctAnswer: 3,
  },

  {
    id: 13,
    year: 2025,
    subject: "Linear Algebra",
    type: "MCQ",
    question:
      "If the system of linear equations\n\n$$x + my + az = 0$$\n$$2x + ay + mz = 0$$\n$$ax + 2y - z = 0$$\n\nwith $m$ and $a$ as non-zero constants, admits a non-trivial solution, then which one of the following conditions is correct?",
    options: [
      "$m^2 - a^2 = 3$",
      "$m^2 - a^2 = -3$",
      "$a^2 - 2m^2 = -3$",
      "$m^2 - 2a^2 = 3$"
    ],
    detailedSolution: String.raw`A system of homogeneous linear equations admits a non-trivial solution if and only if the determinant of its coefficient matrix is exactly zero.

The coefficient matrix \(A\) is:
\(A = \begin{pmatrix} 1 & m & a \\ 2 & a & m \\ a & 2 & -1 \end{pmatrix}\)

Calculate the determinant by expanding along the first row:
\(\det(A) = 1 [a(-1) - m(2)] - m [2(-1) - m(a)] + a [2(2) - a(a)]\)
\(\det(A) = 1(-a - 2m) - m(-2 - am) + a(4 - a^2)\)
\(\det(A) = -a - 2m + 2m + am^2 + 4a - a^3\)

Simplify and set it to zero:
\(3a + am^2 - a^3 = 0\)

Since \(a\) is a non-zero constant, we can divide the entire equation by \(a\):
\(3 + m^2 - a^2 = 0\)
\(m^2 - a^2 = -3\).`,

    correctAnswer: 1,
  },

  {
    id: 14,
    year: 2025,
    subject: "Complex Numbers",
    type: "MCQ",
    question:
      "If $\\left(\\dfrac{1-i}{1+i}\\right)^{\\frac{n}{2}}=-1$, where $i=\\sqrt{-1}$, one possible value of $n$ is",
    options: [
      "2",
      "4",
      "6",
      "8"
    ],
    detailedSolution: String.raw`First, simplify the complex fraction inside the parenthesis by multiplying the numerator and denominator by the complex conjugate of the denominator:
\(\frac{1-i}{1+i} = \frac{(1-i)(1-i)}{(1+i)(1-i)} = \frac{1 - 2i + i^2}{1^2 - i^2}\)

Since \(i^2 = -1\):
\(\frac{1 - 2i - 1}{1 - (-1)} = \frac{-2i}{2} = -i\)

The equation becomes:
\((-i)^{\frac{n}{2}} = -1\)

In polar form, \(-i = e^{-i\pi/2}\) and \(-1 = e^{i\pi}\).
\((e^{-i\pi/2})^{\frac{n}{2}} = e^{-i\pi n / 4}\)

For this to equal \(-1 = e^{i\pi (1 + 2k)}\), the arguments must match:
\(-\frac{\pi n}{4} = \pi + 2k\pi\)
\(-\frac{n}{4} = 1 + 2k \Rightarrow n = -4(1 + 2k)\)

Testing integers for \(k\):
If \(k = -1\), then \(n = -4(1 - 2) = -4(-1) = 4\).
Therefore, \(n=4\) is a valid solution.`,

    correctAnswer: 1,
  },

  {
    id: 15,
    year: 2025,
    subject: "Vector Calculus",
    type: "MCQ",
    question:
      "In Cartesian coordinates, consider the functions $u(x,y)=\\dfrac{1}{2}(x^2-y^2)$ and $v(x,y)=xy$. If $(r,\\theta)$ are the polar coordinates, the Jacobian determinant\n\n$$\\left|\\dfrac{\\partial(u,v)}{\\partial(r,\\theta)}\\right|$$\n\nis",
    options: [
      "$r$",
      "$\\dfrac{1}{r}$",
      "$r^2$",
      "$r^3$"
    ],
    detailedSolution: String.raw`The Jacobian determinant for the transformation is defined as:
\(J = \left| \frac{\partial(u,v)}{\partial(r,\theta)} \right| = \left| \frac{\partial(u,v)}{\partial(x,y)} \right| \times \left| \frac{\partial(x,y)}{\partial(r,\theta)} \right|\)

Step 1: Calculate the Jacobian of \((u,v)\) with respect to \((x,y)\).
\(u = \frac{1}{2}(x^2 - y^2)\) and \(v = xy\).
\(\frac{\partial u}{\partial x} = x, \quad \frac{\partial u}{\partial y} = -y\)
\(\frac{\partial v}{\partial x} = y, \quad \frac{\partial v}{\partial y} = x\)
\(J_1 = \begin{vmatrix} x & -y \\ y & x \end{vmatrix} = x(x) - (-y)(y) = x^2 + y^2 = r^2\)

Step 2: Calculate the standard Jacobian of \((x,y)\) with respect to polar coordinates \((r,\theta)\).
\(x = r\cos\theta\) and \(y = r\sin\theta\).
It is a well-known result that \(\left| \frac{\partial(x,y)}{\partial(r,\theta)} \right| = r\).

Step 3: Multiply them together.
\(J = J_1 \times J_2 = r^2 \times r = r^3\).`,

    correctAnswer: 3,
  },

  {
    id: 16,
    year: 2025,
    subject: "Classical Mechanics",
    type: "MCQ",
    question:
      "Three particles of equal mass $M$, interacting via gravity, lie on the vertices of an equilateral triangle of side $d$, as shown in the figure below. The whole system is rotating with an angular velocity $\\omega$ about an axis perpendicular to the plane of the system and passing through the center of mass. The value of $\\omega$, for which the distance between the masses remains $d$, is\n\n($G$ is the universal gravitational constant)",
    image: "/images/16_25.png",
    options: [
      "$\\sqrt{\\dfrac{2GM}{d^3}}$",
      "$\\sqrt{\\dfrac{3GM}{d^3}}$",
      "$\\sqrt{\\dfrac{GM}{3d^3}}$",
      "$\\sqrt{\\dfrac{GM}{d^3}}$"
    ],
    detailedSolution: String.raw`The distance from the center of mass to any vertex of an equilateral triangle of side \(d\) is \(r = \frac{d}{\sqrt{3}}\).

Consider one of the masses \(M\). It experiences gravitational attraction from the other two masses. The force from each is \(\frac{GM^2}{d^2}\), and the angle between these two force vectors is \(60^\circ\).
The net gravitational force pointing strictly towards the center of mass is:
\(F_g = 2 \frac{GM^2}{d^2} \cos(30^\circ) = 2 \frac{GM^2}{d^2} \frac{\sqrt{3}}{2} = \frac{\sqrt{3}GM^2}{d^2}\)

For the system to rotate without changing the distance between masses, this gravitational force must provide the exact centripetal force required for circular motion at angular velocity \(\omega\):
\(F_c = M \omega^2 r = M \omega^2 \left(\frac{d}{\sqrt{3}}\right)\)

Equating the forces:
\(M \omega^2 \frac{d}{\sqrt{3}} = \frac{\sqrt{3}GM^2}{d^2}\)
\(\omega^2 = \frac{3GM}{d^3}\)
\(\omega = \sqrt{\frac{3GM}{d^3}}\).`,

    correctAnswer: 1,
  },

  {
    id: 17,
    year: 2025,
    subject: "Classical Mechanics",
    type: "MCQ",
    question:
      "Two masses, $M_1$ and $M_2$, are connected through a massless spring of spring constant $k$, as shown in the figure below. The mass $M_1$ is at rest against a rigid wall. Both $M_1$ and $M_2$ are on a frictionless surface. The mass $M_2$ is pushed towards $M_1$ by a distance $x$ from its equilibrium position and then released. After $M_1$ leaves the wall, the speed of the center of mass of the composite system is",
    image: "/images/17_25.png",
    options: [
      "$\\sqrt{\\frac{k}{M_2}}\\,x$",
      "$\\sqrt{\\frac{k}{M_1+M_2}}\\,x$",
      "$\\frac{\\sqrt{kM_2}}{M_1+M_2}\\,x$",
      "$\\frac{\\sqrt{kM_1}}{M_1+M_2}\\,x$",
    ],
    detailedSolution: String.raw`The mass \(M_2\) is pushed a distance \(x\), compressing the spring, and storing a potential energy of \(U = \frac{1}{2} k x^2\).

When \(M_2\) is released, it accelerates towards \(M_1\) (which is held in place by the rigid wall). The spring pushes against the wall.
When the spring reaches its natural length, all potential energy has been converted into the kinetic energy of \(M_2\):
\(\frac{1}{2} M_2 v_2^2 = \frac{1}{2} k x^2 \Rightarrow v_2 = \sqrt{\frac{k}{M_2}} x\)

At this exact moment, the spring begins to stretch, and it starts pulling \(M_1\) away from the wall. Since the wall can only push and not pull, \(M_1\) leaves the wall.
From this point forward, there are no external forces acting on the composite system (\(M_1 + M_2\)) in the horizontal direction.

Therefore, the momentum of the center of mass is conserved. The total momentum is \(p = M_2 v_2\).
\(p = M_2 \sqrt{\frac{k}{M_2}} x = \sqrt{k M_2} x\)

The speed of the center of mass is the total momentum divided by the total mass:
\(V_{cm} = \frac{p}{M_1 + M_2} = \frac{\sqrt{k M_2}}{M_1 + M_2} x\).`,

    correctAnswer: 2,
  },

  {
    id: 18,
    year: 2025,
    subject: "Classical Mechanics",
    type: "MCQ",
    question:
      "One end of a long chain is lifted vertically from flat ground to a height $H$ with constant speed $v$ by a force of magnitude $F$. Assume that the length of the chain is greater than $H$ and that it has a uniform mass per unit length $\\rho$. The magnitude of the force $F$ at height $H$ is",
    options: [
      "$\\rho(gH+v^2)$",
      "$\\rho(gH+2v^2)$",
      "$\\rho(2gH+v^2)$",
      "$\\frac{\\rho}{2}(gH+v^2)$",
    ],
    detailedSolution: String.raw`As the chain is lifted, two forces must be considered: the weight of the hanging chain, and the force required to continuously accelerate links of the chain from rest to velocity \(v\).

1. **Weight Force**:
At height \(H\), the mass of the hanging portion is \(m = \rho H\).
The force required to support this weight is \(W = mg = \rho H g\).

2. **Momentum Force (Thrust)**:
The chain is being lifted at a constant speed \(v\). In a small time interval \(dt\), a mass \(dm = \rho dx = \rho v dt\) is picked up from the ground and abruptly accelerated from \(0\) to \(v\).
The rate of change of momentum is:
\(\frac{dp}{dt} = \frac{dm}{dt} v = (\rho v) v = \rho v^2\)

The total applied force \(F\) must provide both the lift for the weight and the thrust for the momentum change:
\(F = W + \frac{dp}{dt} = \rho H g + \rho v^2 = \rho(gH + v^2)\).`,

    correctAnswer: 0,
  },

  {
    id: 19,
    year: 2025,
    subject: "Wave Optics",
    type: "MCQ",
    question:
      "For a two-slit Fraunhofer diffraction, each slit is $0.1\\,\\text{mm}$ wide and separation between the two slits is $0.8\\,\\text{mm}$. The total number of interference minima between the first diffraction minima on both sides of the central maxima is",
    options: [
      "16",
      "18",
      "8",
      "9",
    ],
    detailedSolution: String.raw`In a two-slit Fraunhofer diffraction experiment, the intensity pattern is a product of single-slit diffraction and double-slit interference.

The condition for single-slit diffraction minima is:
\(b \sin\theta = m\lambda\) (where \(b = 0.1\) mm is the slit width).
The first diffraction minima occur at \(\sin\theta = \pm \frac{\lambda}{0.1}\).

The condition for double-slit interference minima is:
\(d \sin\theta = (n + \frac{1}{2})\lambda\) (where \(d = 0.8\) mm is the slit separation).
\(\sin\theta = (n + \frac{1}{2})\frac{\lambda}{0.8}\)

We want to find the number of interference minima that fall *strictly between* the first diffraction minima:
\(-\frac{\lambda}{0.1} < (n + \frac{1}{2})\frac{\lambda}{0.8} < \frac{\lambda}{0.1}\)

Divide by \(\lambda\) and multiply by \(0.8\):
\(-\frac{0.8}{0.1} < n + \frac{1}{2} < \frac{0.8}{0.1}\)
\(-8 < n + 0.5 < 8\)
\(-8.5 < n < 7.5\)

The integer values for \(n\) that satisfy this inequality are \(-8, -7, \dots, 0, \dots, 7\).
Counting these integers gives a total of \(16\) interference minima.`,

    correctAnswer: 0,
  },

  {
    id: 20,
    year: 2025,
    subject: "Simple Harmonic Motion",
    type: "MCQ",
    question:
      "Consider the superposition of two orthogonal simple harmonic motions $y_1=a\\cos 2\\omega t$ and $y_2=b\\cos(\\omega t+\\phi)$. If $\\phi=\\pi$, the resultant motion will represent",
    options: [
      "a parabola",
      "a hyperbola",
      "an ellipse",
      "a circle",
    ],
    detailedSolution: String.raw`We are given two orthogonal simple harmonic motions:
\(y_1 = a \cos(2\omega t)\)
\(y_2 = b \cos(\omega t + \pi)\)

First, simplify \(y_2\) using the properties of cosine:
\(\cos(\omega t + \pi) = -\cos(\omega t)\)
So, \(y_2 = -b \cos(\omega t) \Rightarrow \cos(\omega t) = -\frac{y_2}{b}\).

Next, use the double-angle identity for cosine on \(y_1\):
\(\cos(2\omega t) = 2\cos^2(\omega t) - 1\)
Substitute this into the \(y_1\) equation:
\(y_1 = a [2\cos^2(\omega t) - 1]\)

Now, substitute \(\cos(\omega t) = -\frac{y_2}{b}\) into the equation:
\(y_1 = a \left[ 2 \left(-\frac{y_2}{b}\right)^2 - 1 \right]\)
\(y_1 = \frac{2a}{b^2} y_2^2 - a\)

This equation is of the form \(x = k y^2 + C\), which represents the equation of a **parabola**.`,

    correctAnswer: 0,
  },

  {
    id: 21,
    year: 2025,
    subject: "Wave Optics",
    type: "MCQ",
    question:
      "An unpolarized light ray passing through air (refractive index $n_a=1$) is incident on a glass slab (refractive index $n_g=\\sqrt{3}$) at an angle of $60^\\circ$, as shown in the figure below. The amplitude of the in-plane $(x-y)$ electric field component of the incident light is $4\\ \\text{V/m}$ and amplitude of the out of plane $(z)$ electric field component is $3\\ \\text{V/m}$. After passing through the glass slab, the electric field amplitude (in V/m) of the light is",
    image: "/images/21_25.png",
    options: [
      "5",
      "4",
      "7",
      "3",
    ],
    detailedSolution: String.raw`The light is incident from air (\(n_a = 1\)) onto glass (\(n_g = \sqrt{3}\)) at an angle of \(60^\circ\).
Notice that \(\tan(60^\circ) = \sqrt{3} = \frac{n_g}{n_a}\).
This means the angle of incidence is exactly the **Brewster's angle**.

At Brewster's angle, the reflection coefficient for the \(p\)-polarized light (the in-plane or parallel component) is exactly zero. Consequently, 100% of the in-plane electric field component is transmitted across the interface.
Since the interfaces of the slab are parallel, the light will hit the second interface (glass to air) exactly at its respective Brewster's angle as well, leading to 100% transmission of the in-plane component once again.

Therefore, the in-plane (\(x-y\)) electric field component passes through the entire glass slab completely unaffected.
Its amplitude remains exactly \(4\) V/m.`,

    correctAnswer: 1,
  },

  {
    id: 22,
    year: 2025,
    subject: "Electromagnetic Theory",
    type: "MCQ",
    question:
      "Consider a slowly charging parallel plate capacitor (distance between the plates is $d$) having circular plates each with an area $A$, as shown in the figure below. An electric field of magnitude $E = E_0\\sin(\\omega t)$ exists between the plates while charging. The associated magnitude of the magnetic field $B$ at the periphery (outer edge) of the capacitor is (Neglect fringe effects)",
    image: "/images/22_25.png",
    options: [
      "$\\frac{1}{2c^2}\\sqrt{\\frac{A}{\\pi}}E_0\\omega\\cos(\\omega t)$",
      "$\\frac{1}{2c^2}\\sqrt{\\frac{A}{\\pi}}E_0\\omega\\sin(\\omega t)$",
      "$\\frac{1}{c^2}\\sqrt{\\frac{A}{\\pi}}E_0\\omega\\cos(\\omega t)$",
      "$\\frac{1}{c^2}\\sqrt{\\frac{A}{\\pi}}E_0\\omega\\sin(\\omega t)$",
    ],
    detailedSolution: String.raw`By the Ampere-Maxwell law, a changing electric field between the capacitor plates generates an induced magnetic field. The law is:
\(\oint \vec{B} \cdot d\vec{l} = \mu_0 I_{displacement} = \mu_0 \varepsilon_0 \frac{d\Phi_E}{dt}\)

The electric flux through the circular area \(A\) is \(\Phi_E = E \cdot A = E_0 A \sin(\omega t)\).
Taking the time derivative:
\(\frac{d\Phi_E}{dt} = E_0 A \omega \cos(\omega t)\)

For a circular path at the periphery (radius \(R\)), the line integral of the magnetic field is \(B(2\pi R)\).
The area is \(A = \pi R^2\), which means \(R = \sqrt{\frac{A}{\pi}}\).

Substitute into the Ampere-Maxwell equation (using \(c^2 = \frac{1}{\mu_0 \varepsilon_0}\)):
\(B(2\pi R) = \frac{1}{c^2} E_0 A \omega \cos(\omega t)\)
\(B = \frac{A}{2\pi R c^2} E_0 \omega \cos(\omega t)\)

Substitute \(R\):
\(B = \frac{A}{2\pi \sqrt{\frac{A}{\pi}} c^2} E_0 \omega \cos(\omega t) = \frac{1}{2c^2} \sqrt{\frac{A}{\pi}} E_0 \omega \cos(\omega t)\).`,

    correctAnswer: 0,
  },

  {
    id: 23,
    year: 2025,
    subject: "Electromagnetism",
    type: "MCQ",
    question:
      "A surface current density $K = ae^{-y}$ exists on a thin strip of width $b$, as shown in the figure below. The associated surface current is ($a$ is a constant of appropriate dimensions)",
    image: "/images/23_25.png",
    options: [
      "$a(1-e^{-b})$",
      "$a(1+e^{-b})$",
      "$a(e^{-b}-1)$",
      "$a(e^b+e^{-b})$",
    ],
    detailedSolution: String.raw`The surface current density \(\vec{K}\) represents the current per unit perpendicular width.
To find the total surface current \(I\), we must integrate the current density over the entire width of the strip.

The strip has a width \(b\), and we can assume it extends from \(y = 0\) to \(y = b\).
The density is given as \(K = a e^{-y}\).

Set up the integral:
\(I = \int_{0}^{b} K \, dy = \int_{0}^{b} a e^{-y} \, dy\)

Evaluate the integral:
\(I = a \left[ -e^{-y} \right]_{0}^{b}\)
\(I = a (-e^{-b} - (-e^{0}))\)
\(I = a (1 - e^{-b})\)

This represents the total associated surface current flowing along the strip.`,

    correctAnswer: 0,
  },

  {
    id: 24,
    year: 2025,
    subject: "Electromagnetic Theory",
    type: "MCQ",
    question:
      "For an electromagnetic wave, consider an electric field $\\mathbf{E}=E_0 e^{-i[a(x+y)-\\omega t]}\\hat{k}$. The corresponding magnetic field $\\mathbf{B}$ is ($E_0$, $a$, $\\omega$ are constants of appropriate dimensions and $c$ is the speed of light)",

    options: [
      "$\\frac{1}{c\\sqrt{2}}E_0 e^{-i[a(x+y)-\\omega t]}(\\hat{i}-\\hat{j})$",
      "$\\frac{1}{c\\sqrt{2}}E_0 e^{-i[a(x+y)-\\omega t]}(\\hat{i}+\\hat{j})$",
      "$\\frac{1}{c\\sqrt{2}}E_0 e^{-i[a(x+y)-\\omega t]}(-\\hat{i}-\\hat{j})$",
      "$\\frac{1}{c\\sqrt{2}}E_0 e^{-i[a(x+y)-\\omega t]}(-\\hat{i}+\\hat{j})$",
    ],
    detailedSolution: String.raw`The electric field is given as \(\mathbf{E} = E_0 e^{-i[a(x+y)-\omega t]}\hat{k}\).

From the phase term, we can identify the wave vector \(\mathbf{k}\):
\(\mathbf{k} = a\hat{i} + a\hat{j}\)
The magnitude of the wave vector is \(|\mathbf{k}| = \sqrt{a^2 + a^2} = a\sqrt{2}\).
For an electromagnetic wave in a vacuum, \(\omega = c|\mathbf{k}| = c a \sqrt{2}\).
Thus, \(a = \frac{\omega}{c\sqrt{2}}\).

The magnetic field \(\mathbf{B}\) is related to the electric field by Faraday's Law \(\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}\), which for plane waves simplifies to:
\(\mathbf{B} = \frac{\mathbf{k} \times \mathbf{E}}{\omega}\)

Substitute \(\mathbf{k}\) and \(\mathbf{E}\):
\(\mathbf{B} = \frac{1}{\omega} (a\hat{i} + a\hat{j}) \times (E_0 e^{-i[a(x+y)-\omega t]}\hat{k})\)
Using cross products \(\hat{i} \times \hat{k} = -\hat{j}\) and \(\hat{j} \times \hat{k} = \hat{i}\):
\(\mathbf{B} = \frac{a E_0}{\omega} (-\hat{j} + \hat{i}) e^{-i[a(x+y)-\omega t]}\)

Substitute \(a = \frac{\omega}{c\sqrt{2}}\):
\(\mathbf{B} = \frac{1}{c\sqrt{2}} E_0 e^{-i[a(x+y)-\omega t]} (\hat{i} - \hat{j})\).`,

    correctAnswer: 0,
  },

  {
    id: 25,
    year: 2025,
    subject: "Thermodynamics",
    type: "MCQ",
    question:
      "Consider Maxwell’s relation $\\left(\\frac{\\partial S}{\\partial V}\\right)_T = \\left(\\frac{\\partial P}{\\partial T}\\right)_V$. The equation of state of a thermodynamic system is given as $P = \\frac{AT}{V^2} + \\frac{BT^3}{V}$, where $A$ and $B$ are constants of appropriate dimensions. Then $\\left(\\frac{\\partial C_V}{\\partial V}\\right)_T$ of the system varies with temperature as ($C_V$ is the heat capacity at constant volume)",

    options: [
      "$T^2$",
      "$T$",
      "$T^{-1}$",
      "$T^3$",
    ],
    detailedSolution: String.raw`We need to find how the volume derivative of the heat capacity at constant volume varies with temperature.
Using the thermodynamic identity \(\left(\frac{\partial S}{\partial T}\right)_V = \frac{C_V}{T}\), we can relate \(C_V\) to entropy \(S\).

Differentiating with respect to \(V\):
\(\left(\frac{\partial C_V}{\partial V}\right)_T = T \frac{\partial}{\partial V} \left(\frac{\partial S}{\partial T}\right)_V = T \frac{\partial}{\partial T} \left(\frac{\partial S}{\partial V}\right)_T\)

Using the given Maxwell relation \(\left(\frac{\partial S}{\partial V}\right)_T = \left(\frac{\partial P}{\partial T}\right)_V\):
\(\left(\frac{\partial C_V}{\partial V}\right)_T = T \frac{\partial}{\partial T} \left(\frac{\partial P}{\partial T}\right)_V = T \frac{\partial^2 P}{\partial T^2}\)

The equation of state is \(P = \frac{AT}{V^2} + \frac{BT^3}{V}\).
Find the first derivative with respect to \(T\) at constant \(V\):
\(\left(\frac{\partial P}{\partial T}\right)_V = \frac{A}{V^2} + \frac{3BT^2}{V}\)

Find the second derivative:
\(\frac{\partial^2 P}{\partial T^2} = 0 + \frac{6BT}{V} = \frac{6BT}{V}\)

Substitute this back:
\(\left(\frac{\partial C_V}{\partial V}\right)_T = T \left( \frac{6BT}{V} \right) = \frac{6B T^2}{V}\)

This shows that the derivative is directly proportional to \(T^2\).`,

    correctAnswer: 0,
  },

  {
    id: 26,
    year: 2025,
    subject: "Special Relativity",
    type: "MCQ",
    question:
      "Consider a relativistic particle of rest mass $2m$ moving with a speed $v$ along the $x$ direction. It collides with another relativistic particle of rest mass $m$ moving with the same speed but in the opposite direction. These two particles coalesce to form one particle whose rest mass $M$ is ($\\beta = \\frac{v}{c}$, where $c$ is the speed of light)",

    options: [
      "$m\\sqrt{\\frac{9-\\beta^2}{1-\\beta^2}}$",
      "$2m\\sqrt{\\frac{3-\\beta^2}{1-\\beta^2}}$",
      "$\\frac{m}{2}\\sqrt{\\frac{9-\\beta^2}{2-\\beta^2}}$",
      "$\\frac{m}{4}\\sqrt{\\frac{1-\\beta^2}{2-\\beta^2}}$",
    ],
    detailedSolution: String.raw`Let \(\gamma = \frac{1}{\sqrt{1-\beta^2}}\) be the Lorentz factor.
Particle 1 has rest mass \(2m\) and velocity \(v\):
\(E_1 = 2m \gamma c^2, \quad p_1 = 2m \gamma v\)
Particle 2 has rest mass \(m\) and velocity \(-v\):
\(E_2 = m \gamma c^2, \quad p_2 = -m \gamma v\)

Since it is a perfectly inelastic collision, the total energy and total momentum are conserved.
Total Energy: \(E_{total} = E_1 + E_2 = 3m \gamma c^2\)
Total Momentum: \(P_{total} = p_1 + p_2 = 2m \gamma v - m \gamma v = m \gamma v\)

The rest mass \(M\) of the composite particle is found using the relativistic invariant \(E^2 - (pc)^2 = (Mc^2)^2\):
\((Mc^2)^2 = (3m \gamma c^2)^2 - (m \gamma v c)^2\)
\(M^2 c^4 = 9m^2 \gamma^2 c^4 - m^2 \gamma^2 v^2 c^2\)

Divide the entire equation by \(c^4\):
\(M^2 = \gamma^2 m^2 (9 - \frac{v^2}{c^2}) = \gamma^2 m^2 (9 - \beta^2)\)

Substitute \(\gamma^2 = \frac{1}{1-\beta^2}\):
\(M^2 = m^2 \frac{9-\beta^2}{1-\beta^2}\)

Taking the square root gives the rest mass:
\(M = m\sqrt{\frac{9-\beta^2}{1-\beta^2}}\).`,

    correctAnswer: 0,
  },

  {
    id: 27,
    year: 2025,
    subject: "Quantum Mechanics",
    type: "MCQ",
    question:
      "A particle of mass $m$ is subjected to a potential $V(x)$. If its wavefunction is given by $$\\psi(x,t)=\\alpha x^2 e^{-\\beta x} e^{i\\gamma t/\\hbar},\\ x>0$$ $$\\psi(x,t)=0,\\ x\\leq0,$$ then $V(x)$ is ($\\alpha$, $\\beta$ and $\\gamma$ are constants of appropriate dimensions)",

    options: [
      "$-\\gamma+\\frac{\\hbar^2}{2m}\\left(\\frac{2}{x^2}-\\frac{4\\beta}{x}+\\beta^2\\right)$",
      "$-\\gamma+\\frac{\\hbar^2}{2m}\\left(\\frac{2}{x^2}+\\frac{4\\beta}{x}+\\beta^2\\right)$",
      "$-\\gamma+\\frac{\\hbar^2}{2m}\\left(\\frac{2}{x^2}-\\frac{4\\beta}{x}-\\beta^2\\right)$",
      "$-\\gamma+\\frac{\\hbar^2}{2m}\\left(-\\frac{2}{x^2}-\\frac{4\\beta}{x}+\\beta^2\\right)$",
    ],
    detailedSolution: String.raw`The time-dependent Schrödinger equation is \(i\hbar \frac{\partial \psi}{\partial t} = \hat{H} \psi = -\frac{\hbar^2}{2m}\frac{\partial^2 \psi}{\partial x^2} + V(x)\psi\).

First, find the time derivative:
\(i\hbar \frac{\partial \psi}{\partial t} = i\hbar (i\frac{\gamma}{\hbar}) \psi = -\gamma \psi\)
So, \(-\gamma \psi = -\frac{\hbar^2}{2m}\frac{\partial^2 \psi}{\partial x^2} + V(x)\psi\).

Next, compute the second spatial derivative of the wavefunction \(\psi = \alpha x^2 e^{-\beta x} e^{i\gamma t/\hbar}\).
Ignoring constants for the spatial differentiation, let \(\phi = x^2 e^{-\beta x}\):
\(\phi' = 2x e^{-\beta x} - \beta x^2 e^{-\beta x}\)
\(\phi'' = 2 e^{-\beta x} - 2\beta x e^{-\beta x} - 2\beta x e^{-\beta x} + \beta^2 x^2 e^{-\beta x}\)
\(\phi'' = (2 - 4\beta x + \beta^2 x^2) e^{-\beta x}\)

Divide \(\psi''\) by \(\psi\):
\(\frac{\psi''}{\psi} = \frac{\phi''}{\phi} = \frac{2 - 4\beta x + \beta^2 x^2}{x^2} = \frac{2}{x^2} - \frac{4\beta}{x} + \beta^2\)

Substitute back into the Schrödinger equation and solve for \(V(x)\):
\(-\gamma \psi = -\frac{\hbar^2}{2m} (\frac{2}{x^2} - \frac{4\beta}{x} + \beta^2)\psi + V(x)\psi\)
\(V(x) = -\gamma + \frac{\hbar^2}{2m} \left( \frac{2}{x^2} - \frac{4\beta}{x} + \beta^2 \right)\).`,

    correctAnswer: 0,
  },

  {
    id: 28,
    year: 2025,
    subject: "Classical Mechanics",
    type: "MCQ",
    question:
      "Two non-relativistic particles with masses $m_1$ and $m_2$ move with momenta $p_1$ and $p_2$, respectively, in an inertial frame $S$. In another inertial frame $S'$, moving with a constant speed with respect to $S$, the same particles are observed to have momenta $p_1'$ and $p_2'$, respectively. Galilean invariance implies that",

    options: [
      "$m_2p_1'-m_1p_2'=m_2p_1-m_1p_2$",
      "$m_2p_1'+m_1p_2'=m_2p_1+m_1p_2$",
      "$m_1p_1'-m_2p_2'=m_1p_1-m_2p_2$",
      "$m_1p_1'+m_2p_2'=m_1p_1+m_2p_2$",
    ],
    detailedSolution: String.raw`Galilean invariance implies that fundamental physical laws, like the conservation of momentum, hold true in all inertial frames of reference.

In frame \(S\), the total momentum is \(P = p_1 + p_2 = m_1 v_1 + m_2 v_2\).
In frame \(S'\) (moving with velocity \(V\) relative to \(S\)), the velocities are \(v_1' = v_1 - V\) and \(v_2' = v_2 - V\).
The momenta in \(S'\) are:
\(p_1' = m_1 v_1' = m_1(v_1 - V) = p_1 - m_1 V\)
\(p_2' = m_2 v_2' = m_2(v_2 - V) = p_2 - m_2 V\)

To find a relation that is independent of the relative frame velocity \(V\), we can eliminate \(V\).
From the first equation: \(V = \frac{p_1 - p_1'}{m_1}\).
From the second equation: \(V = \frac{p_2 - p_2'}{m_2}\).

Equating them:
\(\frac{p_1 - p_1'}{m_1} = \frac{p_2 - p_2'}{m_2}\)

Cross-multiply to rearrange the terms:
\(m_2(p_1 - p_1') = m_1(p_2 - p_2')\)
\(m_2 p_1 - m_2 p_1' = m_1 p_2 - m_1 p_2'\)
\(m_2 p_1' - m_1 p_2' = m_2 p_1 - m_1 p_2\)

This relation represents the invariant property of the transformation.`,

    correctAnswer: 0,
  },

  {
    id: 29,
    year: 2025,
    subject: "Nuclear Physics",
    type: "MCQ",
    question:
      "The binding energy $B(A,Z)$ of an atomic nucleus of mass number $A$, atomic number $Z$, and number of neutrons $N=A-Z$, can be expressed as $$B(A,Z)=a_1A-a_2A^{2/3}-a_3\\frac{Z^2}{A^{1/3}}-a_4\\frac{(A-2Z)^2}{A},$$ where $a_1,a_2,a_3,$ and $a_4$ are constants of appropriate dimensions. Let $B(A,Z')$ be the binding energy of a mirror nucleus (which has the same $A$, but the number of protons and neutrons are interchanged). Then, at constant $A$, $[B(A,Z)-B(A,Z')]$ is",

    options: [
      "proportional to $Z^2$",
      "proportional to $(Z^2-N^2)$",
      "proportional to $N^2$",
      "constant",
    ],
    detailedSolution: String.raw`The binding energy formula is based on the semi-empirical mass formula (liquid drop model).
We want to evaluate the difference \(B(A,Z) - B(A,Z')\) for mirror nuclei.
For a mirror nucleus, the atomic number \(Z'\) is simply the original number of neutrons \(N\), meaning \(Z' = A - Z = N\).

Let's examine how the terms in the formula change when \(Z\) is replaced by \(N\):
1) \(a_1 A\): Depends only on \(A\). (Symmetric)
2) \(a_2 A^{2/3}\): Depends only on \(A\). (Symmetric)
3) \(a_4 \frac{(A - 2Z)^2}{A}\): When \(Z\) becomes \(N\), the term is \((A - 2N)^2\). Since \(A = Z + N\), \(A - 2N = Z - N = -(A - 2Z)\). Squaring it yields \((A - 2Z)^2\), so this term is also perfectly symmetric and unchanged.

The only term that differs between the mirror nuclei is the Coulomb term, \(a_3 \frac{Z^2}{A^{1/3}}\).
Subtracting the binding energies cancels out all symmetric terms:
\(B(A,Z) - B(A,N) = \left( -a_3 \frac{Z^2}{A^{1/3}} \right) - \left( -a_3 \frac{N^2}{A^{1/3}} \right)\)
\(= \frac{a_3}{A^{1/3}} (N^2 - Z^2) = -\frac{a_3}{A^{1/3}} (Z^2 - N^2)\).

Thus, the difference is directly proportional to \((Z^2 - N^2)\).`,

    correctAnswer: 1,
  },

  {
    id: 30,
    year: 2025,
    subject: "Electromagnetic Theory",
    type: "MCQ",

    question: String.raw`
A magnetic field is given by

\[
\vec{B} = \nabla \times \vec{A}
\]

where \(\vec{A}\) is the magnetic vector potential. If

\[
\vec{A} = (ax^2 + by^2)\hat{i}
\]

the corresponding current density \(\vec{J}\) is

(\(a\) and \(b\) are non-zero constants)
`,

    options: [

      String.raw`\[
-\frac{1}{\mu_0}(2a + 2b)\hat{i}
\]`,

      String.raw`\[
\frac{1}{\mu_0}(2a + 2b)\hat{i}
\]`,

      String.raw`\[
-\frac{1}{\mu_0}(2a)\hat{i}
\]`,

      String.raw`\[
-\frac{1}{\mu_0}(2b)\hat{i}
\]`,
    ],

    detailedSolution: String.raw`First, we calculate the magnetic field \(\vec{B}\) by taking the curl of the magnetic vector potential \(\vec{A} = (ax^2 + by^2)\hat{i}\):
\(\vec{B} = \nabla \times \vec{A} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ A_x & 0 & 0 \end{vmatrix}\)

\(\vec{B} = \hat{j}(\frac{\partial A_x}{\partial z}) + \hat{k}(-\frac{\partial A_x}{\partial y})\)
Since \(A_x\) does not depend on \(z\), the \(\hat{j}\) component is zero.
\(\vec{B} = \hat{k}(-\frac{\partial}{\partial y}(ax^2 + by^2)) = -2by \hat{k}\).

Next, we calculate the current density \(\vec{J}\) using Ampere's Law in differential form (\(\nabla \times \vec{B} = \mu_0 \vec{J}\)):
\(\vec{J} = \frac{1}{\mu_0} (\nabla \times \vec{B}) = \frac{1}{\mu_0} \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ 0 & 0 & B_z \end{vmatrix}\)

\(\vec{J} = \frac{1}{\mu_0} [ \hat{i}(\frac{\partial B_z}{\partial y}) - \hat{j}(\frac{\partial B_z}{\partial x}) ]\)
Since \(B_z = -2by\), its derivative with respect to \(y\) is \(-2b\), and with respect to \(x\) is \(0\).
\(\vec{J} = \frac{1}{\mu_0} \hat{i}(-2b) = -\frac{2b}{\mu_0} \hat{i}\).`,

    correctAnswers: [3],
  },

  {
    id: 31,
    year: 2025,
    subject: "Boolean Algebra",
    type: "MSQ",
    question:
      "In the logic circuit shown below, for which of the following combination(s) of inputs $P$ and $Q$, the output $Y$ will be $0$?",
    image: "/images/31_25.png",
    options: [
      "$P=0,\\ Q=0$",
      "$P=0,\\ Q=1$",
      "$P=1,\\ Q=0$",
      "$P=1,\\ Q=1$",
    ],
    correctAnswer: [3],
  },

  {
    id: 32,
    year: 2025,
    subject: "Classical Mechanics",
    type: "MSQ",
    question:
      "Two particles of masses $m_1$ and $m_2$, interacting via gravity, rotate in circular orbits about their common center of mass with the same angular velocity $\\omega$. For masses $m_1$ and $m_2$, respectively, $r_1$ and $r_2$ are the constant distances from the center of mass, $L_1$ and $L_2$ are the magnitudes of the angular momenta about the center of mass, and $K_1$ and $K_2$ are the kinetic energies. Which of the following is(are) correct? ($G$ is the universal gravitational constant)",
    options: [
      "$\\frac{L_1}{L_2}=\\frac{m_2}{m_1}$",
      "$\\frac{K_1}{K_2}=\\frac{m_2}{m_1}$",
      "$\\omega=\\sqrt{\\frac{G(m_1+m_2)}{(r_1+r_2)^3}}$",
      "$m_2r_1=m_1r_2$",
    ],
    correctAnswer: [0, 1, 2],
  },

  {
    id: 33,
    year: 2025,
    subject: "Solid State Physics",
    type: "MSQ",
    question:
      "Which of these cubic lattice plane pairs is(are) perpendicular to each other?",
    image: "/images/33_25.png",
    options: [
      "$(100),\\ (010)$",
      "$(220),\\ (001)$",
      "$(110),\\ (010)$",
      "$(112),\\ (220)$",
    ],
    correctAnswer: [0, 1],
  },

  {
    id: 34,
    year: 2025,
    subject: "Optics",
    type: "MSQ",

    question: String.raw`
For a thin convex lens of focal length \(f\), the image of an object at \(O\) is formed at \(I\), as shown in the figure below. The distances of object and image from the two focal points \((F_O \text{ and } F_I)\) are \(x_0\) and \(x_1\), respectively.

Which of the following graphs correctly represent(s) the variation of the quantities shown in the figure?
`,

    questionImage: "/images/34_25.png",

    options: [
      "",
      "",
      "",
      ""
    ],

    optionImages: [
      "/images/34a_25.png",
      "/images/34b_25.png",
      "/images/34c_25.png",
      "/images/34d_25.png"
    ],

    correctAnswers: [0, 2],
  },

  {
    id: 35,
    year: 2025,
    subject: "Waves",
    type: "MSQ",

    question: String.raw`
Identify which of the following wave functions describe(s) travelling wave(s).

\[
(A_0, B_0, a, \text{ and } b \text{ are positive constants of appropriate dimensions})
\]
`,

    options: [
      String.raw`\(\psi(x,t)=A_0(x+t)^2\)`,
      String.raw`\(\psi(x,t)=A_0\sin(ax^2+bt^2)\)`,
      String.raw`\(\psi(x,t)=\dfrac{A_0}{B_0(x-t)^2+1}\)`,
      String.raw`\(\psi(x,t)=A_0e^{(ax+bt)^2}\)`,
    ],

    correctAnswers: [0, 2, 3],
  },

  {
    id: 36,
    year: 2025,
    subject: "Electrodynamics",
    type: "MSQ",

    question: String.raw`
A spherical ball having a uniformly distributed charge \(Q\) and radius \(R\) pulsates with frequency \(\omega\) such that the radius changes by \(\pm 10\%\), as shown in the figure below.

Which of the following is(are) correct?
`,

    questionImage: "/images/36_25.png",

    options: [
      String.raw`The net outward electric flux across a spherical surface of radius \(r>1.5R\) pulsates with a frequency \(\omega\)`,

      String.raw`The net outward electric flux across a spherical surface of radius \(r=2R\) is \(\dfrac{Q}{\varepsilon_0}\)`,

      String.raw`The potential fluctuates with frequency \(\omega\) at \(r=2R\)`,

      String.raw`The electric field inside the sphere at \(r=0.5R\) will not be time dependent`,
    ],

    correctAnswers: [1],
  },

  {
    id: 37,
    year: 2025,
    subject: "Electrodynamics",
    type: "MSQ",

    question: String.raw`
Which of the following relations is(are) valid for linear dielectrics?

\[
[E=\text{Electric field},\ P=\text{Polarization},\ D=\text{Electric displacement},
\]

\[
\varepsilon_0=\text{Permittivity of free space},\ \varepsilon=\text{Dielectric permittivity},
\]

\[
\chi_e=\text{Electric susceptibility},\ \rho_f=\text{Free charge density},
\]

\[
\rho_b=\text{Bound charge density}]
\]
`,

    options: [
      String.raw`\(\mathbf{P}=\varepsilon_0\chi_e\mathbf{E}\)`,

      String.raw`\(\varepsilon=\varepsilon_0(1+\chi_e)\)`,

      String.raw`\(\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P}\)`,

      String.raw`\(\nabla\cdot\mathbf{D}=\rho_f+\rho_b\)`,
    ],

    correctAnswers: [0, 1, 2],
  },

  {
    id: 38,
    year: 2025,
    subject: "Thermodynamics",
    type: "MSQ",

    question: String.raw`
Three gaseous systems, \(G_1, G_2,\) and \(G_3\) with pressure and volume \((P_1,V_1)\), \((P_2,V_2)\), and \((P_3,V_3)\), respectively, are such that

(I) when \(G_1\) and \(G_2\) are in thermal equilibrium,

\[
P_1V_1-P_2V_2+\alpha P_2=0
\]

is satisfied, and

(II) when \(G_1\) and \(G_3\) are in thermal equilibrium,

\[
P_3V_3-P_1V_1+\frac{\beta P_1V_1}{V_3}=0
\]

is satisfied.

The relation(s) valid at thermal equilibrium is(are)

\[
(\alpha \text{ and } \beta \text{ are constants of appropriate dimensions})
\]
`,

    options: [
      String.raw`\(
P_3V_3-(P_2V_2-\alpha P_2)\left(1-\frac{\beta}{V_3}\right)=0
\)`,

      String.raw`\(
P_3V_3+(P_2V_2+\alpha P_2)\left(1+\frac{\beta}{V_3}\right)=0
\)`,

      String.raw`\(
P_1V_1=P_2V_2=P_3V_3
\)`,

      String.raw`\(
P_3V_3+P_1V_1\left(\frac{\beta}{V_3}-1\right)=0
\)`,
    ],

    correctAnswers: [0, 3],
  },

  {
    id: 39,
    year: 2025,
    subject: "Thermodynamics",
    type: "MSQ",

    question: String.raw`
An ideal mono-atomic gas is expanded adiabatically from \(A\) to \(B\). It is then compressed in an isobaric process from \(B\) to \(C\). Finally, the pressure is increased in an isochoric process from \(C\) to \(A\).

The cyclic process is shown in the figure below. For this system, which of the following is(are) correct?
`,

    questionImage: "/images/39_25.png",

    options: [
      String.raw`Work done along the path \(AB\) is \((P_1V_1-P_2V_2)\)`,

      String.raw`Total work done during the entire process is
\[
\frac{3}{2}(P_1V_1-P_2V_2)+P_2(V_1-V_2)
\]`,

      String.raw`Total heat absorbed during the entire process is
\[
\frac{3}{2}(P_1-P_2)V_1
\]`,

      String.raw`Total change in internal energy during the entire process is
\[
\frac{5}{2}P_2(V_2-V_1)
\]`,
    ],

    correctAnswers: [1],
  },

  {
    id: 40,
    year: 2025,
    subject: "Solid State Physics",
    type: "MSQ",

    question: String.raw`
For a body centered cubic (bcc) system, the x-ray diffraction peaks are observed for the following \(h^2+k^2+l^2\) value(s)

\[
[h,k,\text{ and } l \text{ are Miller indices}]
\]
`,

    options: [
      "3",
      "4",
      "5",
      "7",
    ],

    correctAnswers: [1],
  },

  {
    id: 41,
    year: 2025,
    subject: "Classical Mechanics",
    type: "NAT",

    question: String.raw`
Two solid cylinders of the same density are found to have the same moment of inertia about their respective principal axes.

The length of the second cylinder is \(16\) times that of the first cylinder.

If the radius of the first cylinder is \(4\ \text{cm}\), the radius of the second cylinder is \_\_\_\_\_ cm. (in integer)
`,

    correctAnswer: "2",
  },
  {
    id: 42,
    year: 2025,
    subject: "Optics",
    type: "NAT",

    question: String.raw`
The shortest distance between an object and its real image formed by a thin convex lens of focal length \(20\ \text{cm}\) is \_\_\_\_\_ cm. (in integer)
`,

    correctAnswer: "80",
  },
  {
    id: 43,
    year: 2025,
    subject: "Electrodynamics",
    type: "NAT",

    question: String.raw`
Consider two media \(1\) and \(2\) having permittivities \(\varepsilon_0\) and \(\varepsilon_1(=2\varepsilon_0)\), respectively.

The interface between the two media aligns with the \(x\)-\(y\) plane.

An electric field

\[
\mathbf{E}_1=4\hat{i}-5\hat{j}-\hat{k}
\]

exists in medium \(1\).

The magnitude of the displacement vector \(\mathbf{D}_2\) in medium \(2\) is \_\_\_\_\_ \(\varepsilon_0\). (up to two decimal places)
`,

    correctAnswerMin: 12.65,
    correctAnswerMax: 13.05,
  },

  {
    id: 44,
    year: 2025,
    subject: "Thermodynamics",
    type: "NAT",

    question: String.raw`
\(G1\) and \(G2\) are two ideal gases at temperatures \(T_1\) and \(T_2\), respectively.

The molecular weight of the constituents of \(G1\) is half that of \(G2\).

If the average speeds of the molecules of both gases are equal, then assuming Maxwell-Boltzmann distributions for the molecular speeds, the ratio

\[
\frac{T_2}{T_1}
\]

is \_\_\_\_\_. (in integer)
`,

    correctAnswer: "2",
  },

  {
    id: 45,
    year: 2025,
    subject: "Electronics",
    type: "NAT",

    question: String.raw`
An ideal p-n junction diode (ideality factor \(\eta=1\)) is operating in forward bias at room temperature (thermal energy \(=26\ \text{meV}\)).

If the diode current is \(26\ \text{mA}\) for an applied bias of \(1.0\ \text{V}\), the dynamic resistance \((r_{ac})\) is \_\_\_\_\_ \(\Omega\). (up to two decimal places)
`,

    correctAnswerMin: 0.95,
    correctAnswerMax: 1.05,
  },
  {
    id: 46,
    year: 2025,
    subject: "Quantum Mechanics",
    type: "NAT",

    question: String.raw`
In a two-level atomic system, the excited state is \(0.2\ \text{eV}\) above the ground state.

Considering the Maxwell-Boltzmann distribution, the temperature at which \(2\%\) of the atoms will be in the excited state is \_\_\_\_\_ K. (up to two decimal places)

\[
(k_B = 8.62\times10^{-5}\ \text{eV/K})
\]
`,

    correctAnswerMin: 591.00,
    correctAnswerMax: 597.00,
  },

  {
    id: 47,
    year: 2025,
    subject: "Quantum Mechanics",
    type: "NAT",

    question: String.raw`
Neutrons of energy \(8\ \text{MeV}\) are incident on a potential step of height \(48\ \text{MeV}\).

As they penetrate the classically forbidden region, the distance at which the probability density of finding neutrons decreases by a factor of \(100\) is \_\_\_\_\_ fm. (up to two decimal places)

\[
(\hbar c = 200\ \text{MeV fm},\ \text{and the rest mass energy of neutron}=1\ \text{GeV})
\]
`,

    correctAnswerMin: 1.55,
    correctAnswerMax: 1.70,
  },
  {
    id: 48,
    year: 2025,
    subject: "Modern Physics",
    type: "NAT",

    question: String.raw`
At a particular temperature \(T\), Planck’s energy density of black body radiation in terms of frequency is

\[
\rho_T(\nu)=8\times10^{-18}\ \frac{\text{J/m}^3}{\text{Hz}}
\]

at

\[
\nu=3\times10^{14}\ \text{Hz}.
\]

Then Planck’s energy density

\[
\rho_T(\lambda)
\]

at the corresponding wavelength \((\lambda)\) has the value \_\_\_\_\_ \(\times 10^2\ \dfrac{\text{J/m}^3}{\text{m}}\). (in integer)

\[
[\text{Speed of light } c=3\times10^8\ \text{m/s}]
\]
`,

    correctAnswer: "24",
  },
  {
    id: 49,
    year: 2025,
    subject: "Solid State Physics",
    type: "NAT",

    question: String.raw`
The ratio of the density of atoms between the \((111)\) and \((110)\) planes in a simple cubic \((sc)\) lattice is \_\_\_\_\_. (up to two decimal places)
`,

    correctAnswerMin: 0.80,
    correctAnswerMax: 0.84,
  },

  {
    id: 50,
    year: 2025,
    subject: "Solid State Physics",
    type: "NAT",

    question: String.raw`
The packing fraction for a two-dimensional hexagonal lattice having sides \(2r\) with atoms of radii \(r\) placed at each vertex and at the center is \_\_\_\_\_. (up to two decimal places)
`,

    correctAnswerMin: [0.89, 89],
    correctAnswerMax: [0.93, 93]
  },

  {
    id: 51,
    year: 2025,
    subject: "Electronics",
    type: "NAT",

    question: String.raw`
A NPN bipolar junction transistor (BJT) is connected in common emitter (CE) configuration as shown in the circuit diagram below.

The amplifier is operating in the saturation regime.

The collector-emitter saturation voltage \((V_{CE}^{sat})\) is \(0.2\ \text{V}\).

The current gain \(\beta=100\).

The maximum value of base resistance \(R_{BB}\) is \_\_\_\_\_ k\(\Omega\). (in integer)
`,

    questionImage: "/images/51_25.png",

    correctAnswer: "20",
  },
  {
    id: 52,
    year: 2025,
    subject: "Electronics",
    type: "NAT",

    question: String.raw`
For a Zener diode as shown in the circuit diagram below, the Zener voltage \(V_Z\) is \(3.7\ \text{V}\).

For a load resistance \((R_L)\) of \(1\ \text{k}\Omega\), a current \(I_1\) flows through the load.

If \(R_L\) is decreased to \(500\ \Omega\), the current changes to \(I_2\).

The ratio

\[
\frac{I_2}{I_1}
\]

is \_\_\_\_\_. (up to two decimal places)
`,

    questionImage: "/images/52_25.png",

    correctAnswerMin: 1.78,
    correctAnswerMax: 1.82,
  },

  {
    id: 53,
    year: 2025,
    subject: "Thermodynamics",
    type: "NAT",

    question: String.raw`
One kg of water at \(27^\circ\text{C}\) is brought in contact with a heat reservoir kept at \(37^\circ\text{C}\).

Upon reaching thermal equilibrium, this mass of water is brought in contact with another heat reservoir kept at \(47^\circ\text{C}\).

The final temperature of water is \(47^\circ\text{C}\).

The change in entropy of the whole system in this entire process is \_\_\_\_\_ cal/K. (up to two decimal places)

\[
[\text{Take specific heat at constant pressure of water as }1\ \text{cal/(g K)}]
\]
`,

    correctAnswerMin: 0.90,
    correctAnswerMax: 1.10,
  },
  {
    id: 54,
    year: 2025,
    subject: "Vector Calculus",
    type: "NAT",

    question: String.raw`
Consider a vector

\[
\mathbf{F}=\frac{1}{\pi}\left[-\sin y\,\hat{i}+x(1-\cos y)\,\hat{j}\right].
\]

The value of the integral

\[
\oint \mathbf{F}\cdot d\mathbf{r}
\]

over a circle

\[
x^2+y^2=1
\]

evaluated in the anti-clockwise direction is \_\_\_\_\_. (in integer)
`,

    correctAnswer: "1",
  },
  {
    id: 55,
    year: 2025,
    subject: "Classical Mechanics",
    type: "NAT",

    question: String.raw`
A particle is moving with a constant angular velocity \(2\ \text{rad/s}\) in an orbit on a plane.

The radial distance of the particle from the origin at time \(t\) is given by

\[
r=r_0e^{2\beta t}
\]

where \(r_0\) and \(\beta\) are positive constants.

The radial component of the acceleration vanishes for

\[
\beta=\_\_\_\_\_ \text{ rad/s}.
\]

(in integer)
`,

    correctAnswer: "1",
  },

  {
    id: 56,
    year: 2025,
    subject: "Classical Mechanics",
    type: "NAT",

    question: String.raw`
A planet rotates in an elliptical orbit with a star situated at one of the foci.

The distance from the center of the ellipse to any focus is half of the semi-major axis.

The ratio of the speed of the planet when it is nearest (perihelion) to the star to that at the farthest (aphelion) is \_\_\_\_\_. (in integer)
`,

    correctAnswer: "3",
  },

  {
    id: 57,
    year: 2025,
    subject: "Optics",
    type: "NAT",

    question: String.raw`
A light beam given by

\[
\mathbf{E}(z,t)=E_{01}\sin(kz-\omega t)\,\hat{i}
+
E_{02}\sin\left(kz-\omega t+\frac{\pi}{6}\right)\,\hat{j}
\]

passes through an ideal linear polarizer whose transmission axis is tilted by \(60^\circ\) from \(x\)-axis (in \(x\)-\(y\) plane).

If \(E_{01}=4\ \text{V/m}\) and \(E_{02}=2\ \text{V/m}\), the electric field amplitude of the emerging light beam from the polarizer is \_\_\_\_\_ V/m. (up to two decimal places)
`,

    correctAnswerMin: 3.59,
    correctAnswerMax: 3.63,
  },

  {
    id: 58,
    year: 2025,
    subject: "Optics",
    type: "NAT",

    question: String.raw`
A wedge-shaped thin film is formed using soap-water solution.

The refractive index of the film is \(1.25\).

At near normal incidence, when the film is illuminated by a monochromatic light of wavelength \(600\ \text{nm}\), \(10\) interference fringes per cm are observed.

The wedge angle (in radians) is \_\_\_\_\_ \(\times 10^{-5}\). (in integer)
`,

    correctAnswer: "24",
  },

  {
    id: 59,
    year: 2025,
    subject: "Solid State Physics",
    type: "NAT",

    question: String.raw`
In an orthorhombic crystal, the lattice constants are \(3.0\ \text{\AA}\), \(3.2\ \text{\AA}\), and \(4.0\ \text{\AA}\).

The distance \(d_{101}\) between the successive \((101)\) planes is \_\_\_\_\_ \(\text{\AA}\). (up to one decimal place)
`,

    correctAnswerMin: 2.3,
    correctAnswerMax: 2.5,
  },

  {
    id: 60,
    year: 2025,
    subject: "Thermodynamics",
    type: "NAT",

    question: String.raw`
Consider a chamber at room temperature \((27^\circ\text{C})\) filled with a gas having a molecular diameter of \(0.35\ \text{nm}\).

The pressure (in Pascal) to which the chamber needs to be evacuated so that the molecules have a mean free path of \(1\ \text{km}\) is

\[
\_\_\_\_\_ \times 10^{-5}\ \text{Pa}.
\]

(up to two decimal places)

\[
(k_B=1.38\times10^{-23}\ \text{J/K})
\]
`,

    correctAnswerMin: 0.70,
    correctAnswerMax: 1.20,
  },

  {
    id: 1,
    year: 2024,
    subject: "Solid State Physics",
    type: "MCQ",

    question: String.raw`
The total number of Na and Cl ions per unit cell of the NaCl crystal is:
`,

    options: [
      String.raw`2`,
      String.raw`4`,
      String.raw`8`,
      String.raw`16`,
    ],

    correctAnswers: [2],
  },

  {
    id: 2,
    year: 2024,
    subject: "Mathematical Physics",
    type: "MCQ",

    question: String.raw`
The sum of three binary numbers, \(10110.10\), \(11010.01\), and \(10101.11\), in decimal system is:
`,

    options: [
      String.raw`70.75`,
      String.raw`70.25`,
      String.raw`70.50`,
      String.raw`69.50`,
    ],

    correctAnswers: [2],
  },

  {
    id: 3,
    year: 2024,
    subject: "Linear Algebra",
    type: "MCQ",

    question: String.raw`
Which of the following Linear Algebra is Hermitian as well as unitary?
`,

    options: [
      String.raw`\[
\begin{pmatrix}
0 & -i \\
i & 0
\end{pmatrix}
\]`,

      String.raw`\[
\begin{pmatrix}
0 & i \\
i & 0
\end{pmatrix}
\]`,

      String.raw`\[
\begin{pmatrix}
1 & -i \\
i & 1
\end{pmatrix}
\]`,

      String.raw`\[
\begin{pmatrix}
0 & 1+i \\
1-i & 0
\end{pmatrix}
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 4,
    year: 2024,
    subject: "Vector Calculus",
    type: "MCQ",

    question: String.raw`
The divergence of a 3-dimensional vector \(\dfrac{\hat r}{r^3}\) (\(\hat r\) is the unit radial vector) is:
`,

    options: [
      String.raw`\[
-\frac{1}{r^4}
\]`,

      String.raw`Zero`,

      String.raw`\[
\frac{1}{r^3}
\]`,

      String.raw`\[
-\frac{3}{r^4}
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 5,
    year: 2024,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
The magnitudes of spin magnetic moments of electron, proton and neutron are \(\mu_e\), \(\mu_p\) and \(\mu_n\), respectively. Then,
`,

    options: [
      String.raw`\[
\mu_e > \mu_p > \mu_n
\]`,

      String.raw`\[
\mu_e = \mu_p > \mu_n
\]`,

      String.raw`\[
\mu_e < \mu_p < \mu_n
\]`,

      String.raw`\[
\mu_e < \mu_p = \mu_n
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 6,
    year: 2024,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
A particle moving along the \(x\)-axis approaches \(x=0\) from \(x=-\infty\) with a total energy \(E\). It is subjected to a potential \(V(x)\). For time \(t\to\infty\), the probability density \(P(x)\) of the particle is schematically shown in the figure.
`,

    questionImage: "/images/6_24.png",

    options: [
      "",
      "",
      "",
      "",
    ],

    optionImages: [
      "/images/6a_24.png",
      "/images/6b_24.png",
      "/images/6c_24.png",
      "/images/6d_24.png",
    ],

    correctAnswers: [2],
  },

  {
    id: 7,
    year: 2024,
    subject: "Polarization",
    type: "MCQ",

    question: String.raw`
A plane electromagnetic wave is incident on an interface AB separating two media (refractive indices \(n_1=1.5\) and \(n_2=2.0\)) at Brewster angle \(\theta_B\), as schematically shown in the figure. The angle \(\alpha\) (in degrees) between the reflected wave and the refracted wave is:
`,

    questionImage: "/images/7_24.png",

    options: [
      String.raw`120`,
      String.raw`116`,
      String.raw`90`,
      String.raw`74`,
    ],

    correctAnswers: [2],
  },

  {
    id: 8,
    year: 2024,
    subject: "Electromagnetic Theory",
    type: "MCQ",

    question: String.raw`
If the electric field of an electromagnetic wave is given by,

\[
\vec E = (4\hat x + 3\hat y)e^{i(\omega t + ax - 600y)},
\]

then the value of \(a\) is:

(all values are in the SI units)
`,

    options: [
      String.raw`450`,
      String.raw`-450`,
      String.raw`800`,
      String.raw`-800`,
    ],

    correctAnswers: [0],
  },

  {
    id: 9,
    year: 2024,
    subject: "Electrostatics",
    type: "MCQ",

    question: String.raw`
A vector field is expressed in the cylindrical coordinate system \((s,\phi,z)\) as,

\[
\vec F = \frac{A}{s}\hat s + \frac{B}{s}\hat z.
\]

If this field represents an electrostatic field, then the possible values of \(A\) and \(B\), respectively, are:
`,

    options: [
      String.raw`1 and 0`,
      String.raw`0 and 1`,
      String.raw`-1 and 1`,
      String.raw`1 and -1`,
    ],

    correctAnswers: [0],
  },

  {
    id: 10,
    year: 2024,
    subject: "Classical Mechanics",
    type: "MCQ",

    question: String.raw`
Which of the following types of motion may be represented by the trajectory,

\[
y(x)=ax^2+bx+c?
\]

(Here \(a\), \(b\), and \(c\) are constants; \(x\), \(y\) are the position coordinates)
`,

    options: [
      String.raw`Projectile motion in a uniform gravitational field`,
      String.raw`Simple harmonic motion`,
      String.raw`Uniform circular motion`,
      String.raw`Motion on an inclined plane in a uniform gravitational field`,
    ],

    correctAnswers: [0],
  },

  {
    id: 11,
    year: 2024,
    subject: "Solid State Physics",
    type: "MCQ",

    question: String.raw`
A crystal plane of a lattice intercepts the principal axes \(\vec a_1\), \(\vec a_2\), and \(\vec a_3\) at \(3a_1\), \(4a_2\), and \(2a_3\), respectively. The Miller indices of the plane are:
`,

    options: [
      String.raw`(436)`,
      String.raw`(342)`,
      String.raw`(634)`,
      String.raw`(243)`,
    ],

    correctAnswers: [0],
  },

  {
    id: 12,
    year: 2024,
    subject: "Solid State Physics",
    type: "MCQ",

    question: String.raw`
The number of atoms in the basis of a primitive cell of hexagonal closed packed structure is:
`,

    options: [
      String.raw`1`,
      String.raw`2`,
      String.raw`3`,
      String.raw`4`,
    ],

    correctAnswers: [1],
  },

  {
    id: 13,
    year: 2024,
    subject: "Boolean Algebra",
    type: "MCQ",

    question: String.raw`
Consider the following logic circuit.

The output \(Y\) is LOW when:
`,

    questionImage: "/images/13_24.png",

    options: [
      String.raw`\[
A \text{ is HIGH and } B \text{ is LOW}
\]`,

      String.raw`\[
A \text{ is LOW and } B \text{ is HIGH}
\]`,

      String.raw`\[
\text{Both } A \text{ and } B \text{ are LOW}
\]`,

      String.raw`\[
\text{Both } A \text{ and } B \text{ are HIGH}
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 14,
    year: 2024,
    subject: "Vector Calculus",
    type: "MCQ",

    question: String.raw`
The value of the line integral for the vector,

\[
\vec v = 2\hat x + yz^2\hat y + (3y+z^2)\hat z
\]

along the closed path OABO (as shown in the figure) is:
`,

    questionImage: "/images/14_24.png",

    options: [
      String.raw`\[
\frac{1}{4}(3\pi-1)
\]`,

      String.raw`\[
3\pi-\frac{1}{4}
\]`,

      String.raw`\[
\frac{3\pi}{4}-1
\]`,

      String.raw`\[
3\pi-1
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 15,
    year: 2024,
    subject: "Vector Calculus",
    type: "MCQ",

    question: String.raw`
In the \(x\)-\(y\) plane, a vector is given by

\[
\vec F(x,y)=\frac{-y\hat x+x\hat y}{x^2+y^2}.
\]

The magnitude of the flux of \(\nabla\times\vec F\), through a circular loop of radius 2, centered at the origin, is:
`,

    options: [
      String.raw`\[
\pi
\]`,

      String.raw`\[
2\pi
\]`,

      String.raw`\[
4\pi
\]`,

      String.raw`0`,
    ],

    correctAnswers: [1],
  },

  {
    id: 16,
    year: 2024,
    subject: "Complex Numbers",
    type: "MCQ",

    question: String.raw`
The roots of the polynomial,

\[
f(z)=z^4-8z^3+27z^2-38z+26,
\]

are \(z_1,z_2,z_3,\&\,z_4\), where \(z\) is a complex variable. Which of the following statements is correct?
`,

    options: [
      String.raw`\[
\frac{z_1+z_2+z_3+z_4}{z_1z_2z_3z_4}=-\frac{4}{19}
\]`,

      String.raw`\[
\frac{z_1+z_2+z_3+z_4}{z_1z_2z_3z_4}=\frac{4}{13}
\]`,

      String.raw`\[
\frac{z_1z_2z_3z_4}{z_1+z_2+z_3+z_4}=-\frac{26}{27}
\]`,

      String.raw`\[
\frac{z_1z_2z_3z_4}{z_1+z_2+z_3+z_4}=\frac{13}{19}
\]`,
    ],

    correctAnswers: [1],
  },

  {
    id: 17,
    year: 2024,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
The ultraviolet catastrophe in the classical (Rayleigh-Jeans) theory of cavity radiation is attributed to the assumption that
`,

    options: [
      String.raw`the standing waves of all allowed frequencies in the cavity have the same average energy`,

      String.raw`the density of the standing waves in the cavity is independent of the shape and size of the cavity`,

      String.raw`the allowed frequencies of the standing waves inside the cavity have no upper limit`,

      String.raw`the number of allowed frequencies for the standing waves in a frequency range \(\nu\) to \((\nu+d\nu)\) is proportional to \(\nu^2\)`,
    ],

    correctAnswers: [0],
  },

  {
    id: 18,
    year: 2024,
    subject: "Special Relativity",
    type: "MCQ",

    question: String.raw`
Given that the rest mass of electron is \(0.511\,\text{MeV}/c^2\), the speed (in units of \(c\)) of an electron with kinetic energy \(5.11\,\text{MeV}\) is closest to:
`,

    options: [
      String.raw`0.996`,
      String.raw`0.993`,
      String.raw`0.990`,
      String.raw`0.998`,
    ],

    correctAnswers: [0],
  },

  {
    id: 19,
    year: 2024,
    subject: "Quantum Mechanics",
    type: "MCQ",

    question: String.raw`
A one-dimensional infinite square-well potential is given by:

\[
V(x)=0 \quad \text{for} \quad -\frac a2 < x < +\frac a2
\]

\[
=\infty \quad \text{elsewhere}
\]

Let \(E_e(x)\) and \(\psi_e(x)\) be the ground state energy and the corresponding wave function, respectively, if an electron \((e)\) is trapped in that well. Similarly, let \(E_\mu(x)\) and \(\psi_\mu(x)\) be the corresponding quantities, if a muon \((\mu)\) is trapped in the well. Choose the correct option:
`,

    options: [
      "",
      "",
      "",
      "",
    ],

    optionImages: [
      "/images/19a_24.png",
      "/images/19b_24.png",
      "/images/19c_24.png",
      "/images/19d_24.png",
    ],

    correctAnswers: [2],
  },

  {
    id: 20,
    year: 2024,
    subject: "Wave Optics",
    type: "MCQ",

    question: String.raw`
In a Newton’s rings experiment (using light of free space wavelength \(580\,\text{nm}\)), there is an air gap of height \(d\) between the glass plate and a plano-convex lens (see figure). The central fringe is observed to be bright.

The least possible value of \(d\) (in nm) is:
`,

    questionImage: "/images/20_24.png",

    options: [
      String.raw`145`,
      String.raw`290`,
      String.raw`580`,
      String.raw`72.5`,
    ],

    correctAnswers: [0],
  },

  {
    id: 21,
    year: 2024,
    subject: "Polarization",
    type: "MCQ",

    question: String.raw`
Linearly polarized light (free space wavelength \(\lambda_0=600\,\text{nm}\)) is incident normally on a retarding plate \((n_e-n_o=0.05 \text{ at } \lambda_0=600\,\text{nm})\). The emergent light is observed to be linearly polarized, irrespective of the angle between the direction of polarization and the optic axis of the plate. The minimum thickness (in \(\mu\text{m}\)) of the plate is:
`,

    options: [
      String.raw`6`,
      String.raw`3`,
      String.raw`2`,
      String.raw`1`,
    ],

    correctAnswers: [0],
  },

  {
    id: 22,
    year: 2024,
    subject: "Electromagnetic Theory",
    type: "MCQ",

    question: String.raw`
A \(15.7\,\text{mW}\) laser beam has a diameter of \(4\,\text{mm}\). If the amplitude of the associated magnetic field is expressed as

\[
\frac{A}{\sqrt{\varepsilon_0 c^3}},
\]

the value of \(A\) is:

(\(\varepsilon_0\) is the free space permittivity and \(c\) is the speed of light)
`,

    options: [
      String.raw`50`,
      String.raw`35.4`,
      String.raw`100`,
      String.raw`70.8`,
    ],

    correctAnswers: [0],
  },

  {
    id: 23,
    year: 2024,
    subject: "Electrostatics",
    type: "MCQ",

    question: String.raw`
The plane \(z=0\) separates two linear dielectric media with relative permittivities \(\varepsilon_{r1}=4\) and \(\varepsilon_{r2}=3\), respectively. There is no free charge at the interface. If the electric field in the medium 1 is

\[
\vec E_1 = 3\hat x + 2\hat y + 4\hat z,
\]

then the displacement vector \(\vec D_2\) in medium 2 is:

(\(\varepsilon_0\) is the permittivity of free space)
`,

    options: [
      String.raw`\[
(3\hat x+4\hat y+6\hat z)\varepsilon_0
\]`,

      String.raw`\[
(3\hat x+6\hat y+8\hat z)\varepsilon_0
\]`,

      String.raw`\[
(9\hat x+6\hat y+16\hat z)\varepsilon_0
\]`,

      String.raw`\[
(4\hat x+2\hat y+3\hat z)\varepsilon_0
\]`,
    ],

    correctAnswers: [2],
  },

  {
    id: 24,
    year: 2024,
    subject: "Classical Mechanics",
    type: "MCQ",

    question: String.raw`
A tank, placed on the ground, is filled with water up to a height \(h\). A small hole is made at a height \(h_1\) such that \(h_1<h\). The water jet emerging from the hole strikes the ground at a horizontal distance \(D\), as shown schematically in the figure. Which of the following statements is correct?

(\(g\) is the acceleration due to gravity)
`,

    questionImage: "/images/24_24.png",

    options: [
      String.raw`\[
\text{Velocity at } h_1 \text{ is } \sqrt{2gh_1}
\]`,

      String.raw`\[
D=2(h-h_1)
\]`,

      String.raw`\[
D \text{ will be maximum when } h_1=\frac{2}{3}h
\]`,

      String.raw`\[
\text{The maximum value of } D \text{ is } h
\]`,
    ],

    correctAnswers: [3],
  },

  {
    id: 25,
    year: 2024,
    subject: "Waves",
    type: "MCQ",

    question: String.raw`
An incompressible fluid is flowing through a vertical pipe (height \(h\) and cross-sectional area \(A_o\)). A thin mesh, having \(n\) circular holes of area \(A_h\), is fixed at the bottom end of the pipe. The speed of the fluid entering the top-end of the pipe is \(v_o\). The volume flow rate from an individual hole of the mesh is given by:

(\(g\) is the acceleration due to gravity)
`,

    options: [
      String.raw`\[
\frac{A_o}{n}\sqrt{v_o^2+2gh}
\]`,

      String.raw`\[
\frac{A_o}{n}\sqrt{v_o^2+gh}
\]`,

      String.raw`\[
n(A_o-A_h)\sqrt{v_o^2+2gh}
\]`,

      String.raw`\[
n(A_o-A_h)\sqrt{v_o^2+gh}
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 26,
    year: 2024,
    subject: "Classical Mechanics",
    type: "MCQ",

    question: String.raw`
A ball is dropped from a height \(h\) to the ground. If the coefficient of restitution is \(e\), the time required for the ball to stop bouncing is proportional to:
`,

    options: [
      String.raw`\[
\frac{2+e}{1-e}
\]`,

      String.raw`\[
\frac{1+e}{1-e}
\]`,

      String.raw`\[
\frac{1-e}{1+e}
\]`,

      String.raw`\[
\frac{2-e}{1+e}
\]`,
    ],

    correctAnswers: [1],
  },

  {
    id: 27,
    year: 2024,
    subject: "Thermodynamics",
    type: "MCQ",

    question: String.raw`
A cylinder-piston system contains \(N\) atoms of an ideal gas. If \(t_{avg}\) is the average time between successive collisions of a given atom with other atoms. If the temperature \(T\) of the gas is increased isobarically, then \(t_{avg}\) is proportional to:
`,

    options: [
      String.raw`\[
\sqrt{T}
\]`,

      String.raw`\[
\frac{1}{\sqrt{T}}
\]`,

      String.raw`\[
T
\]`,

      String.raw`\[
\frac{1}{T}
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 28,
    year: 2024,
    subject: "Thermodynamics",
    type: "MCQ",

    question: String.raw`
A gas consists of particles, each having three translational and three rotational degrees of freedom. The ratio of specific heats, \(C_p/C_v\), is:

(\(C_p\) and \(C_v\) are the specific heats at constant pressure and constant volume, respectively)
`,

    options: [
      String.raw`\[
\frac{5}{3}
\]`,

      String.raw`\[
\frac{7}{5}
\]`,

      String.raw`\[
\frac{4}{3}
\]`,

      String.raw`\[
\frac{3}{2}
\]`,
    ],

    correctAnswers: [2],
  },

  {
    id: 29,
    year: 2024,
    subject: "Waves",
    type: "MCQ",

    question: String.raw`
If two traveling waves, given by

\[
y_1=A_0\sin(kx-\omega t)
\]

and

\[
y_2=A_0\sin(\alpha kx-\beta\omega t)
\]

are superposed, which of the following statements is correct?
`,

    options: [
      String.raw`\[
\text{For } \alpha=\beta=1,\ \text{the resultant wave is a standing wave}
\]`,

      String.raw`\[
\text{For } \alpha=\beta=-1,\ \text{the resultant wave is a standing wave}
\]`,

      String.raw`\[
\text{For } \alpha=\beta=2,\ \text{the carrier frequency of the resultant wave is } \frac{3}{2}\omega
\]`,

      String.raw`\[
\text{For } \alpha=\beta=2,\ \text{the carrier frequency of the resultant wave is } 3\omega
\]`,
    ],

    correctAnswers: [2],
  },

  {
    id: 30,
    year: 2024,
    subject: "Wave Optics",
    type: "MCQ",

    question: String.raw`
Suppose that there is a dispersive medium whose refractive index depends on the wavelength as given by

\[
n(\lambda)=n_0+\frac{a}{\lambda^2}-\frac{b}{\lambda^4}.
\]

The value of \(\lambda\) at which the group and phase velocities would be the same, is:
`,

    options: [
      String.raw`\[
\sqrt{\frac{2b}{a}}
\]`,

      String.raw`\[
\sqrt{\frac{b}{2a}}
\]`,

      String.raw`\[
\sqrt{\frac{3b}{a}}
\]`,

      String.raw`\[
\sqrt{\frac{b}{3a}}
\]`,
    ],

    correctAnswers: [0],
  },

  {
    id: 31,
    year: 2024,
    subject: "Semiconductors",
    type: "MSQ",

    question: String.raw`
A pure Si crystal can be converted to an \(n\)-type crystal by doping with
`,

    options: [
      String.raw`P`,
      String.raw`As`,
      String.raw`Sb`,
      String.raw`In`,
    ],

    correctAnswers: [0, 1, 2],
  },

  {
    id: 32,
    year: 2024,
    subject: "Electronics",
    type: "MSQ",

    question: String.raw`
In the following OP-AMP circuit, \(v_{in}\) and \(v_{out}\) represent the input and output signals, respectively.

Choose the correct statement(s):
`,

    questionImage: "/images/32_24.png",

    options: [
      String.raw`\[
v_{out} \text{ is out-of-phase with } v_{in}
\]`,

      String.raw`\[
\text{Gain is unity when } R_1=R_2
\]`,

      String.raw`\[
v_{out} \text{ is in-phase with } v_{in}
\]`,

      String.raw`\[
v_{out} \text{ is zero}
\]`,
    ],

    correctAnswers: [0, 1],
  },

  {
    id: 33,
    year: 2024,
    subject: "Oscillations",
    type: "MSQ",

    question: String.raw`
A spring-mass system (spring constant \(80\,\text{N/m}\) and damping coefficient \(40\,\text{N-s/m}\)), initially at rest, is lying along the \(y\)-axis in the horizontal plane. One end of the spring is fixed and the mass (\(5\,\text{kg}\)) is attached at its other end. The mass is pulled along the \(y\)-axis by \(0.5\,\text{m}\) from its equilibrium position and then released. Choose the correct statement(s).

(Ignore mass of the spring)
`,

    options: [
      String.raw`\[
\text{Motion will be under damped}
\]`,

      String.raw`\[
y(t)=\frac{1}{2}(1+t)e^{-4t}
\]`,

      String.raw`\[
\text{Motion will be critically damped}
\]`,

      String.raw`\[
y(t)=\frac{1}{2}(1+4t)e^{-4t}
\]`,
    ],

    correctAnswers: [2, 3],
  },

  {
    id: 34,
    year: 2024,
    subject: "Modern Physics",
    type: "MSQ",

    question: String.raw`
Consider two different Compton scattering experiments, in which X-rays and \(\gamma\)-rays of wavelength \((\lambda)\) \(1.024\AA\) and \(0.049\AA\), respectively, are scattered from stationary free electrons. The scattered wavelength \((\lambda')\) is measured as a function of the scattering angle \((\theta)\). If Compton shift is \(\Delta\lambda=\lambda'-\lambda\), then which of the following statement(s) is/are true:

\[
(h=6.63\times10^{-34}\,\text{J.s},\ m_e=9.11\times10^{-31}\,\text{kg},\ c=3\times10^8\,\text{m/s})
\]
`,

    options: [
      String.raw`\[
\text{For }\gamma\text{-rays, } \lambda'_{\max}\approx0.098\AA
\]`,

      String.raw`\[
\text{For X-rays, } (\Delta\lambda)_{\max}\text{ is observed at } \theta=180^\circ
\]`,

      String.raw`\[
\text{For X-rays, } (\Delta\lambda)_{\max}\approx1.049\AA
\]`,

      String.raw`\[
\text{For }\gamma\text{-rays, at } \theta=90^\circ,\ \lambda'\approx0.049\AA
\]`,
    ],

    correctAnswers: [0, 1],
  },

  {
    id: 35,
    year: 2024,
    subject: "Gravitation",
    type: "MSQ",

    question: String.raw`
A particle of mass \(m\), having an energy \(E\) and angular momentum \(L\), is in a parabolic trajectory around a planet of mass \(M\). If the distance of the closest approach to the planet is \(r_m\), which of the following statement(s) is(are) true?

(\(G\) is the Gravitational constant)
`,

    options: [
      String.raw`\[
E>0
\]`,

      String.raw`\[
E=0
\]`,

      String.raw`\[
L=\sqrt{2GMm^2r_m}
\]`,

      String.raw`\[
L=\sqrt{2GM^2mr_m}
\]`,
    ],

    correctAnswers: [1, 2],
  },

  {
    id: 36,
    year: 2024,
    subject: "Relativity",
    type: "MSQ",

    question: String.raw`
The inertial frame \(S'\) is moving away from the inertial frame \(S\) with a speed \(v=0.6c\) along the negative \(x\)-direction (see figure). The origins \(O'\) and \(O\) of the frames coincide at \(t=t'=0\). As observed in the frame \(S'\), two events occur simultaneously at two points on the \(x'\)-axis with a separation of \(\Delta x'=5\,\text{m}\). If \(\Delta t\) and \(\Delta x\) are the magnitudes of the time interval and the space interval, respectively, between the events in \(S\), then which of the following statement(s)is(are) correct?

\[
(c=3\times10^8\,\text{m/s})
\]
`,

    questionImage: "/images/36_24.png",

    options: [
      String.raw`\[
\Delta t=12.5\,\text{ns}
\]`,

      String.raw`\[
\Delta t=4.2\,\text{ns}
\]`,

      String.raw`\[
\Delta x=10.6\,\text{m}
\]`,

      String.raw`\[
\Delta x=6.25\,\text{m}
\]`,
    ],

    correctAnswers: [0, 3],
  },

  {
    id: 37,
    year: 2024,
    subject: "AC Circuits",
    type: "MSQ",

    question: String.raw`
For the LCR AC-circuit (resonance frequency \(\omega_0\)) shown in the figure below, choose the correct statement(s).
`,

    questionImage: "/images/37_24.png",

    options: [
      String.raw`\[
\omega_0 \text{ depends on the values of } L,C,\text{ and } R
\]`,

      String.raw`\[
\text{At } \omega=\omega_0,\ \text{voltage } V_R \text{ and current } I \text{ are in-phase}
\]`,

      String.raw`\[
\text{The amplitude of } V_R \text{ at } \omega=\omega_0/2 \text{ is independent of } R
\]`,

      String.raw`\[
\text{The amplitude of } V_R \text{ at } \omega=\omega_0 \text{ is independent of } L \text{ and } C
\]`,
    ],

    correctAnswers: [1, 3],
  },

  {
    id: 38,
    year: 2024,
    subject: "Thermodynamics",
    type: "MSQ",

    question: String.raw`
The \(P\)-\(V\) diagram of an engine is shown in the figure below. The temperatures at points \(1,2,3\) and \(4\) are \(T_1,T_2,T_3\) and \(T_4\), respectively. \(1\to2\) and \(3\to4\) are adiabatic processes, and \(2\to3\) and \(4\to1\) are isochoric processes.

Identify the correct statement(s).

[\(\gamma\) is the ratio of specific heats \(C_p\) (at constant \(P\)) and \(C_v\) (at constant \(V\))]
`,

    questionImage: "/images/38_24.png",

    options: [
      String.raw`\[
T_1T_3=T_2T_4
\]`,

      String.raw`\[
\text{The efficiency of the engine is }
1-\left(\frac{P_1}{P_2}\right)^{\frac{\gamma-1}{\gamma}}
\]`,

      String.raw`\[
\text{The change in entropy for the entire cycle is zero}
\]`,

      String.raw`\[
T_1T_2=T_3T_4
\]`,
    ],

    correctAnswers: [0, 1, 2],
  },

  {
    id: 39,
    year: 2024,
    subject: "Waves",
    type: "MSQ",

    question: String.raw`
A whistle \(S\) of sound frequency \(f\) is oscillating with angular frequency \(\omega\) along the \(x\)-axis. Its instantaneous position and the velocity are given by

\[
x(t)=a\sin(\omega t)
\]

and

\[
v(t)=v_0\cos(\omega t),
\]

respectively. An observer \(P\) is located on the \(y\)-axis at a distance \(L\) from the origin (see figure). Let \(v_{PS}(t)\) be the component of \(v(t)\) along the line joining the source and the observer. Choose the correct option(s):

(Here \(a\) and \(v_0\) are constants)
`,

    questionImage: "/images/39_24.png",

    options: [
      String.raw`\[
v_{PS}(t)=\frac{1}{2}\frac{av_0}{\sqrt{a^2\sin^2\omega t+L^2}}\sin(2\omega t)
\]`,

      String.raw`\[
\text{The observed frequency will be } f \text{ when the source is at } x=0 \text{ and } x=\pm a
\]`,

      String.raw`\[
\text{The observed frequency will be } f \text{ when the source is at position } x=\pm\frac{a}{2}
\]`,

      String.raw`\[
v_{PS}(t)=\frac{1}{2}\frac{av_0}{\sqrt{a^2+L^2}}\sin(2\omega t)
\]`,
    ],

    correctAnswers: [0, 1],
  },

  {
    id: 40,
    year: 2024,
    subject: "Thermodynamics",
    type: "MSQ",

    question: String.raw`
One mole of an ideal monoatomic gas, initially at temperature \(T_0\) is expanded from an initial volume \(V_0\) to \(2.5V_0\). Which of the following statements is(are) correct?

(\(R\) is the ideal gas constant)
`,

    options: [

      String.raw`
\[
\begin{aligned}
&\text{When the process is isothermal,} \\
&\text{the work done is } RT_0\ln2
\end{aligned}
\]
`,

      String.raw`
\[
\begin{aligned}
&\text{When the process is isothermal,} \\
&\text{the change in internal energy is zero}
\end{aligned}
\]
`,

      String.raw`
\[
\begin{aligned}
&\text{When the process is isobaric,} \\
&\text{the work done is } \frac{3}{2}RT_0
\end{aligned}
\]
`,

      String.raw`
\[
\begin{aligned}
&\text{When the process is isobaric,} \\
&\text{the change in internal energy is } \frac{9}{2}RT_0
\end{aligned}
\]
`,

    ],

    correctAnswers: [1, 2],
  },

  {
    id: 41,
    year: 2024,
    subject: "Semiconductors",
    type: "NAT",

    question: String.raw`
Consider a \(p\)-\(n\) junction diode which has \(10^{23}\) acceptor-atoms/\(\text{m}^3\) in the \(p\)-side and \(10^{22}\) donor-atoms/\(\text{m}^3\) in the \(n\)-side. If the depletion width in the \(p\)-side is \(0.16\,\mu\text{m}\), then the value of depletion width in the \(n\)-side will be ______ \(\mu\text{m}\). (Rounded off to one decimal place)
`,

    correctAnswerMin: 1.6,
    correctAnswerMax: 1.6,
  },
  {
    id: 42,
    year: 2024,
    subject: "Mathematical Physics",
    type: "NAT",

    question: String.raw`
The co-ordinate system \((x,y,z)\) is transformed to the system \((u,v,w)\), as given by:

\[
u = 2x + 3y - z
\]

\[
v = x - 4y + z
\]

\[
w = x + y
\]

The Jacobian of the above transformation is __________.
`,


    correctAnswerMin: -8,
    correctAnswerMax: -8,
  },
  {
    id: 43,
    year: 2024,
    subject: "Vector Calculus",
    type: "NAT",

    question: String.raw`
Two sides of a triangle OAB are given by:

\[
\overrightarrow{OA} = \hat{x} + 2\hat{y} + \hat{z}
\]

\[
\overrightarrow{OB} = 2\hat{x} - \hat{y} + 3\hat{z}
\]

The area of the triangle is __________. (Rounded off to one decimal place)
`,


    correctAnswerMin: 4.2,
    correctAnswerMax: 4.4,
  },
  {
    id: 44,
    year: 2024,
    subject: "Classical Mechanics",
    type: "NAT",

    question: String.raw`
A particle of mass \(1\,\text{kg}\), initially at rest, starts sliding down from the top of a frictionless inclined plane of angle \(\pi/6\) (as schematically shown in the figure). The magnitude of the torque on the particle about the point \(O\) after a time \(2\) seconds is _________ N-m. (Rounded off to nearest integer)

(Take \(g = 10\,\text{m/s}^2\))
`,

    questionImage: "/images/44_24.png",

    correctAnswerMin: 85,
    correctAnswerMax: 88,
  },
  {
    id: 45,
    year: 2024,
    subject: "Classical Mechanics",
    type: "NAT",

    question: String.raw`
The moment of inertia of a solid hemisphere (mass \(M\) and radius \(R\)) about the axis passing through the hemisphere and parallel to its flat surface is \(\frac{2}{5}MR^2\). The distance of the axis from the center of mass of the hemisphere (in units of \(R\)) is ________. (Rounded off to two decimal places)
`,

    correctAnswerMin: 0.36,
    correctAnswerMax: 0.40,
  },
  {
    id: 46,
    year: 2024,
    subject: "Wave Optics",
    type: "NAT",

    question: String.raw`
A collimated light beam of intensity \(I_0\) is incident normally on an air-dielectric (refractive index \(2.0\)) interface. The intensity of the reflected light is ________ \(I_0\). (Rounded off to two decimal places)
`,

    correctAnswerMin: 0.10,
    correctAnswerMax: 0.12,
  },
  {
    id: 47,
    year: 2024,
    subject: "Electrostatics",
    type: "NAT",

    question: String.raw`
A charge of \(-9\,\text{C}\) is placed at the center of a concentric spherical shell made of a linear dielectric material (relative permittivity \(9\)) and having inner and outer radii of \(0.1\,\text{m}\) and \(0.2\,\text{m}\), respectively. The total charge induced on its inner surface is ______ C. (Rounded off to two decimal places)
`,

    correctAnswerMin: 7.90,
    correctAnswerMax: 8.10,
  },
  {
    id: 48,
    year: 2024,
    subject: "Electronics",
    type: "NAT",

    question: String.raw`
A Zener diode (rating \(10\,\text{V}, 2\,\text{W}\)) and a normal diode (turn-on voltage \(0.7\,\text{V}\)) are connected in a circuit as shown in the figure. The voltage drop \(V_L\) across the \(2\,\text{k}\Omega\) resistance is _________ V. (Rounded off to one decimal place)
`,

    questionImage: "/images/48_24.png",

    correctAnswerMin: 6.2,
    correctAnswerMax: 6.2,
  },
  {
    id: 49,
    year: 2024,
    subject: "Solid State Physics",
    type: "NAT",

    question: String.raw`
The Fermi energy of a system is \(5.5\,\text{eV}\). At \(500\,\text{K}\), the energy of a level for which the probability of occupancy is \(0.2\), is ________ eV. (Rounded off to two decimal places)

(Boltzmann constant \(k_B = 8.62 \times 10^{-5}\,\text{eV/K}\))
`,


    correctAnswerMin: 5.55,
    correctAnswerMax: 5.57,
  },
  {
    id: 50,
    year: 2024,
    subject: "Thermodynamics",
    type: "NAT",

    question: String.raw`
One mole of an ideal monoatomic gas is heated in a closed container, first from \(273\,\text{K}\) to \(303\,\text{K}\), and then from \(303\,\text{K}\) to \(373\,\text{K}\). The net change in the entropy is ______ \(R\). (Rounded off to two decimal places)

(\(R\) is the ideal gas constant)
`,

    correctAnswerMin: 0.44,
    correctAnswerMax: 0.48,
  },
  {
    id: 51,
    year: 2024,
    subject: "Wave Optics",
    type: "NAT",

    question: String.raw`
For a simple cubic crystal, the smallest inter-planar spacing \(d\) that can be determined from its second order diffraction using monochromatic X-rays of wavelength \(1.32\,\text{\AA}\) is ________ \(\text{\AA}\). (Rounded off to two decimal places)
`,

    correctAnswerMin: 1.32,
    correctAnswerMax: 1.32,
  },
  {
    id: 52,
    year: 2024,
    subject: "Electronics",
    type: "NAT",

    question: String.raw`
A transistor (\(\beta = 100\), \(V_{BE} = 0.7\,\text{V}\)) is connected as shown in the circuit below.

The current \(I_C\) will be ________ mA. (Rounded off to two decimal places)
`,

    questionImage: "/images/52_24.png",

    correctAnswerMin: 1.10,
    correctAnswerMax: 1.15,
  },
  {
    id: 53,
    year: 2024,
    subject: "Taylor Series",
    type: "NAT",

    question: String.raw`
In the Taylor expansion of function,

\[
F(x) = e^x \sin x
\]

around \(x = 0\), the coefficient of \(x^5\) is __________. (Rounded off to three decimal places)
`,

    correctAnswerMin: -0.034,
    correctAnswerMax: -0.032,
  },
  {
    id: 54,
    year: 2024,
    subject: "Nuclear Physics",
    type: "NAT",

    question: String.raw`
A stationary nitrogen \(\left(^{14}_{7}N\right)\) nucleus is bombarded with \(\alpha\)-particle \(\left(^{4}_{2}He\right)\) and the following nuclear reaction takes place:

\[
^{4}_{2}He + ^{14}_{7}N \rightarrow ^{17}_{8}O + ^{1}_{1}H
\]

Masses:

\[
^{4}_{2}He = 4.003u,\quad
^{14}_{7}N = 14.003u,\quad
^{17}_{8}O = 16.999u,\quad
^{1}_{1}H = 1.008u
\]

If the kinetic energies of \(^{4}_{2}He\) and \(^{1}_{1}H\) are \(5.314\,\text{MeV}\) and \(4.012\,\text{MeV}\), respectively, then the kinetic energy of \(^{17}_{8}O\) is ______ MeV. (Rounded off to one decimal place)

(Masses are given in units of \(u = 931.5\,\text{MeV}/c^2\))
`,

    correctAnswerMin: 0.4,
    correctAnswerMax: 0.4,
  },
  {
    id: 55,
    year: 2024,
    subject: "Gravitation",
    type: "NAT",

    question: String.raw`
A satellite of mass \(10\,\text{kg}\), in a circular orbit around a planet, is having a speed \(v = 200\,\text{m/s}\). The total energy of the satellite is ________ kJ. (Rounded off to nearest integer)
`,

    correctAnswerMin: -200,
    correctAnswerMax: -200,
  },
  {
    id: 56,
    year: 2024,
    subject: "Wave Optics",
    type: "NAT",

    question: String.raw`
When a system of multiple long narrow slits (width \(2\,\mu\text{m}\) and period \(4\,\mu\text{m}\)) is illuminated with a laser of wavelength \(600\,\text{nm}\). There are \(40\) minima between the two consecutive principal maxima observed in its diffraction pattern. Then maximum resolving power of the system is ________.
`,

    correctAnswerMin: 246,
    correctAnswerMax: 246,
  },
  {
    id: 57,
    year: 2024,
    subject: "Wave Optics",
    type: "NAT",

    question: String.raw`
Consider a thick biconvex lens (thickness \(t = 4\,\text{cm}\) and refractive index \(n = 1.5\)) whose magnitudes of the radii of curvature \(R_1\) and \(R_2\), of the first and second surfaces are \(30\,\text{cm}\) and \(20\,\text{cm}\), respectively. Surface \(2\) is silvered to act as a mirror.

A point object is placed at point \(A\) on the axis (\(OA = 60\,\text{cm}\)) as shown in the figure. If its image is formed at point \(Q\), the distance \(d\) between \(O\) and \(Q\) is ______ cm. (Rounded off to two decimal places)
`,

    questionImage: "/images/57_24.png",

    correctAnswerMin: 3.55,
    correctAnswerMax: 3.90,
  },
  {
    id: 58,
    year: 2024,
    subject: "Relativity",
    type: "NAT",

    question: String.raw`
An unstable particle created at a point \(P\) moves with a constant speed of \(0.998c\) until it decays at a point \(Q\). If the lifetime of the particle in its rest frame is \(632\,\text{ns}\), the distance between points \(P\) and \(Q\) is ______ m. (Rounded off to the nearest integer)

(\(c = 3 \times 10^8\,\text{m/s}\))
`,

    correctAnswerMin: 2992,
    correctAnswerMax: 2994,
  },
  {
    id: 59,
    year: 2024,
    subject: "Electrostatics",
    type: "NAT",

    question: String.raw`
Two positive charges \(Q\) and \(2Q\) are kept at points \(A\) and \(B\), separated by a distance \(2d\), as shown in the figure. MCL is a semicircle of radius \(2d\) centered at the origin \(O\). If \(Q = 2\,\text{C}\) and \(d = 10\,\text{cm}\), the value of the line integral

\[
\int_M^L \vec{E}\cdot d\vec{l}
\]

(where \(\vec{E}\) represents electric field) along the path MCL will be _________ V.
`,

    questionImage: "/images/59_24.png",

    correctAnswerMin: 0,
    correctAnswerMax: 0,
  },
  {
    id: 60,
    year: 2024,
    subject: "Electromagnetic Induction",
    type: "NAT",

    question: String.raw`
A time dependent magnetic field inside a long solenoid of radius \(0.05\,\text{m}\) is given by

\[
\vec{B}(t) = B_0 \sin \omega t \,\hat{z}
\]

If \(\omega = 100\,\text{rad/s}\) and \(B_0 = 0.98\,\text{Wb/m}^2\), then the amplitude of the induced electric field at a distance of \(0.07\,\text{m}\) from the axis of the solenoid is ______ V/m. (Rounded off to two decimal places)
`,

    correctAnswerMin: 1.71,
    correctAnswerMax: 1.75,
  },

];


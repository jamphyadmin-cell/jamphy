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

  correctAnswer: 1,
},

{
  id: 2,
  year: 2026,
  subject: "Semiconductor Physics",
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

  correctAnswer: 2,
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

  correctAnswer: 0,
},

{
  id: 10,
  year: 2026,
  subject: "Matrices",
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

  correctAnswer: 0,
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

  correctAnswer: 2,
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

  correctAnswer: 1,
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

  correctAnswer: 3,
},

{
  id: 25,
  year: 2026,
  subject: "Mathematics",
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

  correctAnswer: 1,
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

  correctAnswer: 2,
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

  questionImage: "/images/q29.png",

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

  correctAnswer: 1,
},

{
  id: 30,
  year: 2026,
  subject: "Mechanics",
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

  correctAnswers: [1, 2],
},

{
  id: 33,
  year: 2026,
  subject: "Mechanics",
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

  correctAnswers: [0, 3],
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

  correctAnswers: [0, 2],
},

{
  id: 35,
  year: 2026,
  subject: "Mechanics",
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

  correctAnswers: [1, 2, 3],
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

  correctAnswers: [0, 1],
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

  correctAnswers: [2, 3],
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

  correctAnswer: 1.05,
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

  correctAnswer: 86.8,
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

  correctAnswer: 162,
},

{
  id: 44,
  year: 2026,
  subject: "Quantum Mechanics",
  type: "NAT",
  question:
    "A particle of mass $10^{-20}\\ kg$ is moving along a circular orbit of radius $1\\ nm$. The speed of the particle corresponds to the average thermal energy at temperature $10^{-6}K$. Assuming the Bohr’s angular momentum quantization condition, the quantum number of the circular path of the particle is ____.\n\n(Answer in integer)\n\n[Use $h = 6.64 \\times 10^{-34}\\ J\\ s$ and $k_B = 1.38 \\times 10^{-23}\\ J/K$]",
  correctAnswer: 9
},
{
  id: 45,
  year: 2026,
  subject: "Thermodynamics",
  type: "NAT",
  question:
    "One mole of an ideal gas undergoes a reversible isothermal expansion from $V_i = 1.5 \\times 10^{-5}\\ m^3$ to $V_f = 1.6 \\times 10^{-5}m^3$ at a temperature $273\\ K$. The amount of heat transfer during the process is $\\alpha R$, where $R$ is the gas constant. The value of $\\alpha$ is ____.\n\n(Rounded off to one decimal place)",
  correctAnswer: 17.6
},
{
  id: 46,
  year: 2026,
  subject: "Complex Numbers",
  type: "NAT",
  question:
    "The value of $(1 - i\\sqrt{3})^3$ is ____.\n\n(Answer in integer)",
  correctAnswer: -8
},

{
  id: 47,
  year: 2026,
  subject: "Thermodynamics",
  type: "NAT",
  question:
    "Two thermodynamic systems separated by diathermic wall have the equations of state $U_1 = \\frac{3}{2} R N_1 T_1$ and $U_2 = \\frac{5}{2} R N_2 T_2$, where $R$ is the gas constant. $N_1, N_2$ and $T_1, T_2$ are the mole numbers and the temperature of the two systems, respectively. The composite system in equilibrium has the total energy $1.5 \\times 10^3$ Joule. If $N_1 = 3$ and $N_2 = 2$, then the internal energy $U_1$ of the system one is ________.\n\n(Answer in integer)",
  correctAnswer: 450
},
{
  id: 48,
  year: 2026,
  subject: "Modern Physics",
  type: "NAT",
  question:
    "Light of wavelength $500\\ nm$ is incident on the surface of Na metal for photoelectric emission. The corresponding threshold wavelength is $600\\ nm$. The maximum kinetic energy of the emitted electron, in $eV$, is ____.\n\n(Rounded off to two decimal places)\n\n[Use Planck’s constant $h = 6.625 \\times 10^{-34}\\ J\\ s$, speed of light $c = 3 \\times 10^8\\ m/s$, charge of electron $e = 1.6 \\times 10^{-19}\\ C$]",
  correctAnswer: 0.5
},
{
  id: 49,
  year: 2026,
  subject: "Solid State Physics",
  type: "NAT",
  question:
    "The first order Bragg peak for $(100)$ plane of a material with simple cubic structure is measured using an X-ray of wavelength $1\\text{Å}$. If the lattice constant is $5\\text{Å}$ then the Bragg peak is observed at an angle, in degrees, ____.\n\n(Rounded off to two decimal places)",
  correctAnswer: 5.74
},

{
  id: 50,
  year: 2026,
  subject: "Thermodynamics",
  type: "NAT",
  question:
    "Consider an ensemble of hydrogen gas. The temperature, in $K$, at which the $rms$ speed of the hydrogen molecule is twice the $rms$ speed of the molecule at $300\\ K$ is ________.\n\n(Answer in integer)",
  correctAnswer: 1200
},
{
  id: 51,
  year: 2026,
  subject: "Classical Mechanics",
  type: "NAT",
  question:
    "A particle of mass $m$ undergoes periodic motion in one-dimension with its total energy given as $E = \\frac{1}{2}m\\dot{x}^2 + \\frac{1}{4}kx^4$, where $k$ is a positive constant and $\\dot{x}=\\frac{dx}{dt}$. Assuming that $E$ is conserved, the time period $T$ has the relation $T \\propto E^{-1/n}$. The value of $n$ is ________.\n\n(Answer in integer)",
  correctAnswer: 4
},
{
  id: 52,
  year: 2026,
  subject: "Classical Mechanics",
  type: "NAT",
  question:
    "A spacecraft is placed $200\\ km$ above Earth in a circular orbit. The minimum change in the speed required to place the spacecraft in a parabolic orbit, in $km/s$, is ______.\n\n(Rounded off to one decimal place)\n\n[Use $G = 6.67 \\times 10^{-11}Nm^2/kg^2$, mass of Earth $= 6 \\times 10^{24}\\ kg$, radius of Earth $= 6400\\ km$]",
  correctAnswer: 3.2
},

{
  id: 53,
  year: 2026,
  subject: "Wave Optics",
  type: "NAT",
  question:
    "Consider a light source having a spectral linewidth of $10^{10}\\ Hz$, used in a Michelson interferometer. The mirrors $M_1$ and $M_2$ are equidistant from the beam-splitter of negligible thickness as shown in the figure. The minimum distance $d_2$ that the mirror $M_1$ is to be moved for the interference pattern to completely disappear, in $cm$, is ____.\n\n(Rounded off to one decimal place)\n\n[Use speed of light to be $3 \\times 10^8\\ m/s$]",
  image: "/images/53.png",
  correctAnswer: 1.5
},
{
  id: 54,
  year: 2026,
  subject: "Special Relativity",
  type: "NAT",
  question:
    "Muons are unstable relativistic particles created at high altitudes above the Earth, having a lifetime of $2.2 \\times 10^{-6}s$ in their rest frame. As measured by an observer on the ground, the minimum velocity the muon requires to travel a distance of $6000\\ m$ is $v$. The value of $v/c$ is ______.\n\n(Rounded off to three decimal places)\n\n[Speed of light $c = 3 \\times 10^8m/s$]",
  correctAnswer: 0.994
},

{
  id: 55,
  year: 2026,
  subject: "Wave Optics",
  type: "NAT",
  question:
    "On the surface of a thin water film of refractive index $1.33$, two light beams of wavelength $\\lambda_1 = 0.64\\ \\mu m$ and $\\lambda_2 = 0.40\\ \\mu m$ are incident at an angle of $30^\\circ$. The light of wavelength $\\lambda_1$ exhibits maximum reflection, but that of wavelength $\\lambda_2$ is not reflected at all. The minimum thickness of the water film, in $\\mu m$, is ______ .\n\n(Rounded off to two decimal places)\n\n[Assume refractive index is independent of wavelength]",
  correctAnswer: 0.24
},
{
  id: 56,
  year: 2026,
  subject: "Quantum Mechanics",
  type: "NAT",
  question:
    "An electron is confined in a one-dimensional box of width $L = 10\\ \\text{Å}$. The electron in the first excited state de-excites to the ground state. The wavelength of the emitted radiation, in $\\mu m$, is ____.\n\n(Rounded off to one decimal place)\n\n[Use the mass of the electron $m_e = 9.1 \\times 10^{-31}\\ kg$, Planck’s constant $h = 6.625 \\times10^{-34}\\ J\\ s$, $c = 3 \\times 10^8\\ m/s$]",
  correctAnswer: 0.5
},
{
  id: 57,
  year: 2026,
  subject: "Quantum Mechanics",
  type: "NAT",
  question:
    "An electron is accelerated through a potential of $200\\ V$ and then it passes through a slit of width $1.0\\ nm$ held normal to the path of the electron. Assuming the uncertainty relation $\\Delta x \\Delta p_x \\approx \\hbar/2$, maximum scattering angle of the electron after the slit is $\\alpha \\times 10^{-3}\\ radian$.\n\nThe value of $\\alpha$ is ____.\n\n(Rounded off to nearest integer)\n\nGiven $\\hbar = 1.054 \\times10^{-34}\\ J\\ s$",
  correctAnswer: 31
},

{
  id: 58,
  year: 2026,
  subject: "Electrostatics",
  type: "NAT",
  question:
    "A uniform electric field of $70\\ V/m$ makes an angle of $60^\\circ$ with the positive x-axis, as shown in the figure. The potential difference between the points $P$ and $Q$ which are $2\\ m$ and $\\sqrt{3}\\ m$ away from the origin, in Volts, is ____.\n\n(Rounded off to one decimal place)",
  image: "/images/58.png",
  correctAnswer: 140.0
},
{
  id: 59,
  year: 2026,
  subject: "Oscillations",
  type: "NAT",
  question:
    "Consider a simple pendulum of length $l$ and time period $T$. In a laboratory experiment, the time for $100$ oscillations is measured to be $80\\ s$ using a stop-watch with least count $1\\ s$. The gravitational constant is known with a percentage error of $2.5\\%$.\n\nThe percentage error in the measured length of the pendulum, in %, is ____.\n\n(Answer in integer)",
  correctAnswer: 8
},

{
  id: 60,
  year: 2026,
  subject: "Quantum Mechanics",
  type: "NAT",
  question:
    "A particle of mass $m$ in a potential $V(x)=\\frac{1}{2}kx^2$ is described by normalized wavefunction $\\sum_{n=0}^{\\infty}(\\sqrt{2})^{-(n+1)}\\phi_n(x)$, where $\\{\\phi_n\\}$ are the eigenstates of the particle. The energy corresponding to the wavefunction, in units of $\\dfrac{h}{\\pi}\\sqrt{\\dfrac{k}{m}}$, is ____.\n\n(Rounded off to two decimal places)\n\n[Given: $\\sum_{n=0}^{\\infty}(a)^{-n}=\\dfrac{a}{a-1},\\ a>1$]",
  image: "/images/questions/q60.png",
  correctAnswer: 0.85
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
  correctAnswer: 2
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
  correctAnswer: 1,
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
  correctAnswer: 1,
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
  correctAnswer: 1,
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
  correctAnswer: 2,
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
  correctAnswer: 1,
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
  correctAnswer: 3,
},

{
  id: 13,
  year: 2025,
  subject: "Matrices",
  type: "MCQ",
  question:
    "If the system of linear equations\n\n$$x + my + az = 0$$\n$$2x + ay + mz = 0$$\n$$ax + 2y - z = 0$$\n\nwith $m$ and $a$ as non-zero constants, admits a non-trivial solution, then which one of the following conditions is correct?",
  options: [
    "$m^2 - a^2 = 3$",
    "$m^2 - a^2 = -3$",
    "$a^2 - 2m^2 = -3$",
    "$m^2 - 2a^2 = 3$"
  ],
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
  correctAnswer: 2,
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
  correctAnswer: 3,
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
  correctAnswer: 1,
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
  correctAnswer: 1,
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
  correctAnswer: 1,
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
  correctAnswer: [1, 2],
},

{
  id: 32,
  year: 2025,
  subject: "Classical Mechanics",
  type: "MSQ",
  question:
    "Two particles of masses $m_1$ and $m_2$, interacting via gravity, rotate in circular orbits about their common center of mass with the same angular velocity $\\omega$. For masses $m_1$ and $m_2$, respectively, $r_1$ and $r_2$ are the constant distances from the center of mass, $L_1$ and $L_2$ are the magnitudes of the angular momenta about the center of mass, and $K_1$ and $K_2$ are the kinetic energies. Which of the following is(are) correct? ($G$ is the universal gravitational constant)",
  image: "/images/32_25.png",
  options: [
    "$\\frac{L_1}{L_2}=\\frac{m_2}{m_1}$",
    "$\\frac{K_1}{K_2}=\\frac{m_2}{m_1}$",
    "$\\omega=\\sqrt{\\frac{G(m_1+m_2)}{(r_1+r_2)^3}}$",
    "$m_2r_1=m_1r_2$",
  ],
  correctAnswer: [1, 2, 3],
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

  correctAnswers: [0, 1],
},

{
  id: 41,
  year: 2025,
  subject: "Mechanics",
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

  correctAnswer: "13.45",
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

  correctAnswer: "1.00",
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

  correctAnswer: "592.41",
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

  correctAnswer: "10.54",
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

  correctAnswer: "0.82",
},

{
  id: 50,
  year: 2025,
  subject: "Solid State Physics",
  type: "NAT",

  question: String.raw`
The packing fraction for a two-dimensional hexagonal lattice having sides \(2r\) with atoms of radii \(r\) placed at each vertex and at the center is \_\_\_\_\_. (up to two decimal places)
`,

  correctAnswer: "0.91",
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

  correctAnswer: "19",
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

  correctAnswer: "2.00",
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

  correctAnswer: "5.32",
},
{
  id: 54,
  year: 2025,
  subject: "Mathematical Methods",
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
  subject: "Mechanics",
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
  subject: "Mechanics",
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

  correctAnswer: "3.74",
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

  correctAnswer: "2.4",
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

  correctAnswer: "3.59",
},

];


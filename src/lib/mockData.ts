export type Role = 'parent' | 'staff';

export interface User {
  phone: string;
  name: string;
  role: Role;
  designation?: string;
  employeeId?: string;
  parentId?: string;
  email: string;
  childIds?: string[];
  subject?: string;
}

export interface Child {
  id: string;
  name: string;
  initials: string;
  class: string;
  section: string;
  rollNo: string;
  regNo: string;
  attendance: number;
  rank: string;
  homeworkDone: string;
  avatarBg: string;
  avatarColor: string;
}

export const SCHOOL = {
  name: 'Delhi Public School, Hyderabad',
  address: 'Jubilee Hills, Hyderabad, Telangana',
  year: '2024-25',
};

export const USERS: User[] = [
  { phone: '9800000001', name: 'Priya Kumar', role: 'parent', email: 'priya.kumar@email.com', parentId: 'PRT001', childIds: ['c1'] },
  { phone: '9800000002', name: 'Meena Sharma', role: 'parent', email: 'meena.sharma@email.com', parentId: 'PRT002', childIds: ['c2'] },
  { phone: '9900000001', name: 'Mrs. Lakshmi Subramaniam', role: 'staff', designation: 'Mathematics Teacher', subject: 'Mathematics', email: 'lakshmi.s@dpshyd.edu', employeeId: 'EMP001' },
  { phone: '9900000002', name: 'Mr. Rajesh Venkataraman', role: 'staff', designation: 'Science Teacher', subject: 'Science', email: 'rajesh.v@dpshyd.edu', employeeId: 'EMP002' },
];

export const CHILDREN: Record<string, Child> = {
  c1: { id: 'c1', name: 'Arjun Kumar', initials: 'AK', class: '8', section: 'A', rollNo: '24', regNo: 'DPS2024-A24', attendance: 87, rank: '5th', homeworkDone: '12/14', avatarBg: '#EAF3FB', avatarColor: '#4A90D9' },
  c2: { id: 'c2', name: 'Sneha Sharma', initials: 'SS', class: '5', section: 'B', rollNo: '11', regNo: 'DPS2024-B11', attendance: 92, rank: '3rd', homeworkDone: '9/10', avatarBg: '#FFF3E0', avatarColor: '#F5A623' },
  '1': { id: 'c1', name: 'Arjun Kumar', initials: 'AK', class: '8', section: 'A', rollNo: '24', regNo: 'DPS2024-A24', attendance: 87, rank: '5th', homeworkDone: '12/14', avatarBg: '#EAF3FB', avatarColor: '#4A90D9' },
  '2': { id: 'c2', name: 'Sneha Sharma', initials: 'SS', class: '5', section: 'B', rollNo: '11', regNo: 'DPS2024-B11', attendance: 92, rank: '3rd', homeworkDone: '9/10', avatarBg: '#FFF3E0', avatarColor: '#F5A623' },
};

/** Names used to synthesize class lists for sections B/C/D when no explicit list exists. */
export const MOCK_STUDENT_NAME_POOL: readonly string[] = [
  'Aarav Sharma',
  'Priya Patel',
  'Rohit Kumar',
  'Ananya Singh',
  'Karthik Reddy',
  'Sneha Nair',
  'Arjun Mehta',
  'Divya Iyer',
  'Meena Pillai',
  'Suresh Sharma',
  'Lakshmi Nair',
  'Arun Kumar',
  'Preethi Reddy',
  'Vishal Singh',
  'Kavitha Das',
  'Rajesh Verma',
  'Pranav Rao',
  'Swathi Reddy',
  'Harish Patel',
  'Nisha Kumar',
  'Ravi Teja',
  'Deepika Singh',
  'Ajay Nair',
  'Rekha Sharma',
  'Mohan Das',
  'Sunita Verma',
  'Vijay Mehta',
  'Geeta Iyer',
  'Ramesh Patel',
  'Sonia Gupta',
  'Kiran Rao',
  'Vikram Das',
];

const ATTENDANCE_EXPLICIT: Record<string, Array<{ roll: string; name: string }>> = {
  '6-A': [
    { roll: '01', name: 'Aarav Sharma' },
    { roll: '02', name: 'Priya Patel' },
    { roll: '03', name: 'Rohit Kumar' },
    { roll: '04', name: 'Ananya Singh' },
    { roll: '05', name: 'Karthik Reddy' },
    { roll: '06', name: 'Sneha Nair' },
    { roll: '07', name: 'Arjun Mehta' },
    { roll: '08', name: 'Divya Iyer' },
  ],
  '6-B': [
    { roll: '01', name: 'Vikram Das' },
    { roll: '02', name: 'Pooja Gupta' },
    { roll: '03', name: 'Rahul Verma' },
    { roll: '04', name: 'Meera Pillai' },
    { roll: '05', name: 'Aditya Joshi' },
    { roll: '06', name: 'Kavya Menon' },
    { roll: '07', name: 'Suresh Babu' },
    { roll: '08', name: 'Lakshmi Devi' },
  ],
  '7-A': [
    { roll: '01', name: 'Meena Pillai' },
    { roll: '02', name: 'Suresh Sharma' },
    { roll: '03', name: 'Lakshmi Nair' },
    { roll: '04', name: 'Arun Kumar' },
    { roll: '05', name: 'Preethi Reddy' },
    { roll: '06', name: 'Vishal Singh' },
    { roll: '07', name: 'Kavitha Das' },
    { roll: '08', name: 'Rajesh Verma' },
  ],
  '8-A': [
    { roll: '01', name: 'Pranav Rao' },
    { roll: '02', name: 'Swathi Reddy' },
    { roll: '03', name: 'Harish Patel' },
    { roll: '04', name: 'Nisha Kumar' },
    { roll: '05', name: 'Ravi Teja' },
    { roll: '06', name: 'Deepika Singh' },
    { roll: '07', name: 'Ajay Nair' },
    { roll: '08', name: 'Rekha Sharma' },
  ],
  '9-A': [
    { roll: '01', name: 'Rekha Sharma' },
    { roll: '02', name: 'Mohan Das' },
    { roll: '03', name: 'Sunita Verma' },
    { roll: '04', name: 'Vijay Mehta' },
    { roll: '05', name: 'Geeta Iyer' },
    { roll: '06', name: 'Ramesh Patel' },
    { roll: '07', name: 'Sonia Gupta' },
    { roll: '08', name: 'Kiran Rao' },
  ],
  '10-A': [
    { roll: '01', name: 'Lakshmi Devi' },
    { roll: '02', name: 'Pranav Rao' },
    { roll: '03', name: 'Swathi Reddy' },
    { roll: '04', name: 'Harish Patel' },
    { roll: '05', name: 'Nisha Kumar' },
    { roll: '06', name: 'Ravi Teja' },
    { roll: '07', name: 'Deepika Singh' },
    { roll: '08', name: 'Ajay Nair' },
  ],
};

export function getAttendanceStudentsForClassSection(cls: string, sec: string): Array<{ roll: string; name: string }> {
  const key = `${cls}-${sec}`;
  const explicit = ATTENDANCE_EXPLICIT[key];
  if (explicit) return explicit.map(r => ({ ...r }));

  const n = MOCK_STUDENT_NAME_POOL.length;
  const offset =
    (Math.max(0, parseInt(cls, 10) || 0) * 17 + sec.charCodeAt(0) * 11 + (sec.charCodeAt(0) % 7)) % n;
  return Array.from({ length: 8 }, (_, i) => ({
    roll: String(i + 1).padStart(2, '0'),
    name: MOCK_STUDENT_NAME_POOL[(offset + i) % n],
  }));
}

export const STUDENTS_8A = [
  { roll: '01', name: 'Aarav Sharma', status: 'P' },
  { roll: '02', name: 'Priya Patel', status: 'P' },
  { roll: '03', name: 'Rohit Kumar', status: 'A' },
  { roll: '04', name: 'Ananya Singh', status: 'P' },
  { roll: '05', name: 'Karthik Reddy', status: 'L' },
  { roll: '06', name: 'Sneha Nair', status: 'P' },
  { roll: '07', name: 'Arjun Mehta', status: 'P' },
  { roll: '08', name: 'Divya Iyer', status: 'A' },
];

export const SUBMISSIONS = [
  { roll: '01', name: 'Aarav Sharma', submitted: true, grade: 87 },
  { roll: '02', name: 'Priya Patel', submitted: true, grade: 91 },
  { roll: '03', name: 'Rohit Kumar', submitted: false, grade: null },
  { roll: '04', name: 'Ananya Singh', submitted: true, grade: 78 },
  { roll: '05', name: 'Karthik Reddy', submitted: false, grade: null },
];

export const MARKS_STUDENTS = [
  { name: 'Aarav Sharma', max: 100, marks: 87, grade: 'A', color: 'green' },
  { name: 'Priya Patel', max: 100, marks: 91, grade: 'A+', color: 'green' },
  { name: 'Rohit Kumar', max: 100, marks: 54, grade: 'C', color: 'amber' },
  { name: 'Ananya Singh', max: 100, marks: 78, grade: 'B', color: 'blue' },
  { name: 'Karthik Reddy', max: 100, marks: 43, grade: 'F', color: 'red' },
];

// AI Bot hardcoded content
export const AI_CONTENT: Record<string, { simplify: string; mcq: string; workflow: string }> = {
  photosynthesis: {
    simplify: `Photosynthesis - Made Simple

Photosynthesis is how plants make their own food using sunlight.

Key Points:
• Plants take in carbon dioxide from the air through tiny holes in leaves called stomata
• Roots absorb water from soil
• Chlorophyll (the green stuff in leaves) captures sunlight
• Sunlight + Water + CO2 → Glucose (food) + Oxygen

Equation:
6CO2 + 6H2O + Sunlight → C6H12O6 + 6O2

Why it matters:
Plants release oxygen we breathe and produce food for the entire food chain.`,
    mcq: `Photosynthesis - MCQ Quiz

Q1. What is the green pigment in leaves?
a) Carotene
b) Chlorophyll ✓
c) Xanthophyll
d) Anthocyanin

Q2. Photosynthesis takes place mainly in:
a) Roots
b) Stems
c) Leaves ✓
d) Flowers

Q3. The gas released during photosynthesis is:
a) Carbon dioxide
b) Nitrogen
c) Oxygen ✓
d) Hydrogen

Q4. Tiny pores on leaves are called:
a) Stomata ✓
b) Lenticels
c) Veins
d) Cuticle

Q5. End product of photosynthesis is:
a) Protein
b) Glucose ✓
c) Starch only
d) Fat`,
    workflow: `Photosynthesis - Step by Step Workflow

Step 1: Absorption
Roots absorb water (H2O) from soil and transport it through the stem to leaves.

Step 2: Gas Exchange
Leaves take in carbon dioxide (CO2) through stomata.

Step 3: Light Capture
Chlorophyll in chloroplasts captures sunlight energy.

Step 4: Light Reaction
Water molecules split into hydrogen and oxygen.
Oxygen is released into the atmosphere.

Step 5: Dark Reaction (Calvin Cycle)
Hydrogen combines with CO2 to form glucose.

Step 6: Storage
Glucose is converted into starch and stored.

Result: Plant has food + Atmosphere has oxygen!`,
  },
  newton: {
    simplify: `Newton's Laws of Motion - Made Simple

Three rules that explain how everything moves.

Law 1 - Inertia:
An object stays still or keeps moving unless something pushes or pulls it.
Example: Ball stays on ground until you kick it.

Law 2 - Force = Mass × Acceleration:
Bigger push = more speed. Heavier object = needs more push.
Example: Pushing an empty cart vs a loaded one.

Law 3 - Action-Reaction:
For every action, there's an equal and opposite reaction.
Example: Rocket pushes gas down, gas pushes rocket up.`,
    mcq: `Newton's Laws - MCQ Quiz

Q1. Newton's First Law is also called:
a) Law of Force
b) Law of Inertia ✓
c) Law of Action
d) Law of Gravity

Q2. F = ma is which law?
a) First
b) Second ✓
c) Third
d) Zeroth

Q3. Rocket propulsion demonstrates:
a) First Law
b) Second Law
c) Third Law ✓
d) None

Q4. Unit of force:
a) Joule
b) Watt
c) Newton ✓
d) Pascal

Q5. A heavier object requires:
a) Less force
b) More force ✓
c) No force
d) Same force`,
    workflow: `Newton's Laws - Workflow

Step 1: Identify the object
What is moving or at rest?

Step 2: Identify forces
List all pushes and pulls acting on it.

Step 3: Apply Law 1
If forces are balanced → object stays still or moves uniformly.

Step 4: Apply Law 2
If forces are unbalanced → calculate F = m × a
Find acceleration.

Step 5: Apply Law 3
For every force on object → there is equal opposite reaction.

Step 6: Predict motion
Combine results to predict how object will move.`,
  },
  water: {
    simplify: `Water Cycle - Made Simple

Water keeps moving in a never-ending circle around Earth.

Stages:
• Evaporation: Sun heats water in oceans, lakes → turns into vapor
• Condensation: Vapor cools high up → forms clouds
• Precipitation: Clouds get heavy → rain, snow, hail falls
• Collection: Water collects in rivers, lakes, oceans → cycle repeats

Why it matters:
Brings fresh water to land, supports all life, controls weather.`,
    mcq: `Water Cycle - MCQ Quiz

Q1. Conversion of water to vapor is:
a) Condensation
b) Evaporation ✓
c) Precipitation
d) Collection

Q2. Clouds are formed by:
a) Evaporation
b) Condensation ✓
c) Precipitation
d) Sublimation

Q3. Rain is an example of:
a) Evaporation
b) Condensation
c) Precipitation ✓
d) Transpiration

Q4. The sun's role in water cycle:
a) Cools water
b) Heats water ✓
c) Stores water
d) Filters water

Q5. Water from plants is released by:
a) Evaporation
b) Transpiration ✓
c) Precipitation
d) Sublimation`,
    workflow: `Water Cycle - Workflow

Step 1: Sun heats water bodies
Oceans, lakes, rivers warm up.

Step 2: Evaporation
Liquid water turns into water vapor and rises.

Step 3: Transpiration
Plants also release water vapor from leaves.

Step 4: Condensation
Vapor cools at high altitudes and forms tiny droplets → clouds.

Step 5: Precipitation
Droplets join, become heavy, fall as rain/snow/hail.

Step 6: Collection
Water flows into rivers, lakes, oceans, or seeps underground.

Step 7: Repeat
Cycle starts again - never stops!`,
  },
  digestive: {
    simplify: `Digestive System - Made Simple

How your body turns food into energy.

The Journey:
• Mouth: Teeth chew food, saliva starts breakdown
• Esophagus: Tube pushes food down to stomach
• Stomach: Acids break food into liquid (chyme)
• Small Intestine: Nutrients absorbed into blood
• Large Intestine: Water absorbed, waste forms
• Rectum & Anus: Waste leaves body

Helpers:
Liver makes bile, Pancreas makes enzymes.`,
    mcq: `Digestive System - MCQ

Q1. Digestion starts in:
a) Stomach
b) Mouth ✓
c) Small intestine
d) Liver

Q2. Bile is produced by:
a) Pancreas
b) Stomach
c) Liver ✓
d) Kidney

Q3. Most absorption happens in:
a) Mouth
b) Stomach
c) Small intestine ✓
d) Large intestine

Q4. Saliva contains:
a) Bile
b) Amylase ✓
c) Insulin
d) HCl

Q5. The longest part of digestive tract:
a) Esophagus
b) Stomach
c) Small intestine ✓
d) Large intestine`,
    workflow: `Digestive System - Workflow

Step 1: Ingestion
Food enters mouth, teeth chew, saliva mixes.

Step 2: Swallowing
Tongue pushes food into esophagus.

Step 3: Stomach Action
HCl and enzymes break food into chyme over 2-4 hours.

Step 4: Small Intestine
Bile and pancreatic juice complete digestion.
Nutrients absorbed through villi into blood.

Step 5: Large Intestine
Water and salts absorbed.
Bacteria help break remaining matter.

Step 6: Excretion
Waste stored in rectum, expelled through anus.`,
  },
  french: {
    simplify: `French Revolution - Made Simple

When the people of France overthrew their king (1789-1799).

Causes:
• Heavy taxes on common people
• King Louis XVI lived in luxury
• Food shortages and famine
• Inspiration from American Revolution
• Ideas of liberty and equality

Key Events:
• Storming of Bastille (July 14, 1789)
• Declaration of Rights of Man
• King and Queen executed
• Reign of Terror
• Napoleon rises to power

Result:
End of monarchy, birth of modern democracy.`,
    mcq: `French Revolution - MCQ

Q1. French Revolution started in:
a) 1776
b) 1789 ✓
c) 1799
d) 1815

Q2. King during the revolution:
a) Louis XIV
b) Louis XV
c) Louis XVI ✓
d) Napoleon

Q3. Bastille was a:
a) Palace
b) Prison ✓
c) Church
d) Market

Q4. Slogan of revolution:
a) Liberty, Equality, Fraternity ✓
b) Power, Wealth, Glory
c) Order, Law, Justice
d) Faith, Hope, Love

Q5. Who rose to power after?
a) Louis XVII
b) Robespierre
c) Napoleon ✓
d) Charles X`,
    workflow: `French Revolution - Workflow

Step 1: Pre-revolution unrest
Inequality, taxes, famine cause anger.

Step 2: Estates General (May 1789)
Three estates meet but third estate excluded.

Step 3: Tennis Court Oath
Third estate vows to write a constitution.

Step 4: Storming of Bastille (July 14)
People attack the prison - revolution begins.

Step 5: Declaration of Rights
"Liberty, Equality, Fraternity" proclaimed.

Step 6: Reign of Terror (1793-94)
Robespierre executes thousands.

Step 7: Rise of Napoleon (1799)
Coup ends revolution, new era begins.`,
  },
  solar: {
    simplify: `Solar System - Made Simple

The Sun and everything that orbits it.

The Sun:
A massive star at the center, made of hot gas.

8 Planets (in order):
1. Mercury - smallest, closest to sun
2. Venus - hottest planet
3. Earth - our home
4. Mars - the red planet
5. Jupiter - largest, has Great Red Spot
6. Saturn - famous rings
7. Uranus - tilted on side
8. Neptune - windiest

Also: Moons, asteroids, comets, dwarf planets like Pluto.`,
    mcq: `Solar System - MCQ

Q1. Closest planet to the Sun:
a) Venus
b) Mercury ✓
c) Earth
d) Mars

Q2. Largest planet:
a) Saturn
b) Earth
c) Jupiter ✓
d) Neptune

Q3. Planet known as Red Planet:
a) Venus
b) Mars ✓
c) Jupiter
d) Mercury

Q4. Number of planets:
a) 7
b) 8 ✓
c) 9
d) 10

Q5. Planet with prominent rings:
a) Jupiter
b) Saturn ✓
c) Uranus
d) Neptune`,
    workflow: `Solar System - Workflow / Order

Step 1: Center
The Sun - star that gives light and heat.

Step 2: Inner Planets (Rocky)
Mercury → Venus → Earth → Mars

Step 3: Asteroid Belt
Rocks between Mars and Jupiter.

Step 4: Outer Planets (Gas Giants)
Jupiter → Saturn → Uranus → Neptune

Step 5: Kuiper Belt
Region with dwarf planets like Pluto.

Step 6: Oort Cloud
Far edge of solar system, source of comets.

All planets orbit the Sun due to gravity!`,
  },
};

export function detectTopic(input: string): string {
  const t = input.toLowerCase();
  if (t.includes('photo')) return 'photosynthesis';
  if (t.includes('newton')) return 'newton';
  if (t.includes('water')) return 'water';
  if (t.includes('digest')) return 'digestive';
  if (t.includes('french')) return 'french';
  if (t.includes('solar')) return 'solar';
  return 'photosynthesis';
}

export const TOPIC_LABEL: Record<string, string> = {
  photosynthesis: 'Photosynthesis',
  newton: "Newton's Laws of Motion",
  water: 'Water Cycle',
  digestive: 'Digestive System',
  french: 'French Revolution',
  solar: 'Solar System',
};

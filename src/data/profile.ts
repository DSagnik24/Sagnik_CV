export const profile = {
  name: 'Sagnik Dutta',
  location: 'Kolkata, West Bengal, India',
  email: 'sagnikduttaofficial18@gmail.com',
  phone: '+91-8240251268',
  github: 'https://github.com/DSagnik24',
  linkedin: 'https://www.linkedin.com/in/sagnikdutta18',
  resumeUrl: '/Sagnik_Dutta_RESUME.pdf',
  metrics: [
    { label: 'LeetCode Problems', value: '300+' },
    { label: 'CGPA', value: '8.8' },
    { label: 'Capgemini Engagements', value: '2' },
  ],
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export const experience = [
  {
    company: 'Capgemini Technology Services India Limited',
    role: 'Software Engineering Trainee',
    program: 'Exceller Edge Fellowship Program',
    period: 'January 2026 – April 2026',
    location: 'Remote',
    details: [
      'Trained intensively in Java, Spring Boot, Hibernate and REST APIs, ranking among the top performers in the fellowship cohort.',
      'Built a team-based CRUD application under Agile sprints — designed backend APIs, wrote Postman test suites, and automated deployment via Jenkins CI/CD.',
      'Scored 100% in the M1, Sprint, and L1 assessments, the program’s top evaluation tier.',
    ],
  },
  {
    company: 'Capgemini Technology Services India Limited',
    role: 'Software Engineering Intern',
    program: 'Enterprise software delivery',
    period: 'May 2026 – July 2026',
    location: 'Hyderabad, India',
    details: [
      'Built and tested customer communication templates in OpenText Exstream for a live document-automation pipeline.',
      'Collaborated within an Agile team — sprint planning, stand-ups, and code reviews — strengthening enterprise-scale software delivery skills.',
    ],
  },
];

export const projects = [
  {
    title: 'AI Email Writer',
    date: 'March 2025',
    category: 'Full-stack',
    description: 'Built a full-stack platform consisting of a Java Spring Boot backend, React frontend and Chrome extension integrating the Gemini API for context-aware email drafting.',
    technologies: ['Java', 'Spring Boot', 'Gemini API', 'React.js', 'Postman', 'Maven'],
    flow: ['React Frontend', 'Spring Boot REST API', 'Gemini API', 'Generated Response', 'React UI'],
    github: 'https://github.com/DSagnik24',
    live: '',
  },
  {
    title: 'Resumind',
    date: 'May 2025',
    category: 'AI Product',
    description: 'Developed an AI-powered resume analyzer in React/TypeScript, containerized with Docker and deployed on Vercel for real-time scoring and feedback.',
    technologies: ['React.js', 'TypeScript', 'Puter.js', 'AI/ML', 'Docker', 'Vercel'],
    flow: ['Resume', 'Processing', 'AI Analysis', 'Scoring', 'Feedback'],
    github: '',
    live: 'https://resumind.vercel.app',
  },
];

export const skills = [
  { title: 'Languages', items: ['Java', 'C', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { title: 'Frameworks & Technologies', items: ['Spring Boot', 'Hibernate', 'React.js', 'Node.js', 'OpenText Exstream'] },
  { title: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { title: 'Tools', items: ['Git', 'Postman', 'VS Code', 'IntelliJ IDEA', 'Jenkins'] },
];

export const certifications = [
  'Capgemini Exceller Edge Fellowship Program',
  'Spring Boot Foundations',
  'Spring MVC With Spring Boot',
  'SQL Server Fundamentals',
  'Learning Java 11',
  'AI Foundations: ML',
];

export const education = [
  {
    institution: 'University of Engineering and Management',
    degree: 'B.Tech in Computer Science and Technology',
    period: '2022 – 2026',
    location: 'Newtown, West Bengal',
  },
  {
    institution: 'Techno India Group Public School',
    degree: 'Higher Secondary — CBSE',
    period: '2020 – 2021',
    location: 'Konnagar, West Bengal',
  },
];

export const publication = {
  title: 'Online Food Delivery App: MEALO',
  journal: 'IJERA',
  date: 'July 2024',
  url: 'https://ijera.com/papers/vol14no7/14077073.pdf',
};

export const algorithms = [
  {
    name: 'Two Sum',
    count: '—',
    time: 'O(n)',
    space: 'O(n)',
    sampleInput: '[2, 7, 11, 15], target = 9',
    sampleOutput: '[0, 1]',
    explanation: 'Use a hash map to track complements while traveling the array once.',
    code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
  },
  {
    name: 'Binary Search',
    count: '—',
    time: 'O(log n)',
    space: 'O(1)',
    sampleInput: 'nums = [1, 3, 5, 7], target = 5',
    sampleOutput: '2',
    explanation: 'Reduce the search space by half at each step until the target is found or the interval is empty.',
    code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
  },
  {
    name: 'Dynamic Programming',
    count: '31',
    time: 'O(n * target)',
    space: 'O(target)',
    sampleInput: 'coins = [1, 3, 4], amount = 6',
    sampleOutput: '2',
    explanation: 'Build a DP table to track the minimum number of coins needed for each reachable amount.',
    code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        return dp[amount] == amount + 1 ? -1 : dp[amount];
    }
}`,
  },
  {
    name: 'Union-Find',
    count: '10',
    time: 'O(alpha(n))',
    space: 'O(n)',
    sampleInput: 'connections = [[1,2],[2,3]]',
    sampleOutput: '2 components',
    explanation: 'Track connected components and merge sets whenever a relationship is observed.',
    code: `class UnionFind {
    int[] parent;
    UnionFind(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void union(int a, int b) {
        parent[find(a)] = find(b);
    }
}`,
  },
  {
    name: 'Monotonic Stack',
    count: '6',
    time: 'O(n)',
    space: 'O(n)',
    sampleInput: '[2, 1, 2, 4, 3]',
    sampleOutput: '3',
    explanation: 'Maintain a monotonic decreasing stack to efficiently find the next greater element.',
    code: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int max = 0;
        for (int i = 0; i <= heights.length; i++) {
            int cur = (i == heights.length) ? 0 : heights[i];
            while (!stack.isEmpty() && cur < heights[stack.peek()]) {
                int h = heights[stack.pop()];
                int w = stack.isEmpty() ? i : i - stack.peek() - 1;
                max = Math.max(max, h * w);
            }
            stack.push(i);
        }
        return max;
    }
}`,
  },
];

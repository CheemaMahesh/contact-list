<h1>Set UP</h1>
<ol>
  <li>Clone this repo, use "git clone https://github.com/CheemaMahesh/contact-list"</li>
  <li>Install the dependencies, use "npm install or npm i"</li>
  <li>Create .env file and and required environment variables as in sample.env file</li>
  <li>Run the Project, use "npm run dev"</li>
</ol>

![image](https://github.com/user-attachments/assets/eb7c3e56-097b-40ce-9a33-a3eba1ef7972)

![image](https://github.com/user-attachments/assets/0ab972b8-2f39-4edd-92e6-40dc7fbae1b3)

![image](https://github.com/user-attachments/assets/7047a91a-656e-4c41-aaf9-aa06d840ec58)

![image](https://github.com/user-attachments/assets/e9ad3c13-edca-4617-a3b8-42fea3930da4)

![image](https://github.com/user-attachments/assets/0f8686b0-9752-4ab5-bf67-26bd2e92908f)


<h1>Folder Structure</h1>
contack-list/<br />
│<br />
├── .env                       # Environment variables<br />
├── .gitignore                 # Git ignore file<br />
├── package.json               # Project metadata and dependencies<br />
├── tsconfig.json              # TypeScript configuration<br />
│<br />
├── src/                       # Source files<br />
│   ├── app/                   # Next.js application files<br />
│   │   ├── api/               # API routes<br />
│   │   │   ├── data/          # Data-related API routes<br />
│   │   │   │   ├── create/    # Create contact API<br />
│   │   │   │   ├── delete/    # Delete contact API<br />
│   │   │   │   ├── read/      # Read contacts API<br />
│   │   │   │   └── update/    # Update contact API<br />
│   │   │   └── ...<br />
│   │   ├── layout.tsx         # Application layout<br />
│   │   └── page.tsx           # Main page component<br />
│   │<br />
│   ├── components/             # Reusable components<br />
│   │   ├── EmptyState/        # Empty state component<br />
│   │   ├── HomePage/          # Home page component<br />
│   │   ├── Modal/             # Modal component<br />
│   │   ├── Table/             # Table component for displaying contacts<br />
│   │   ├── Loader/            # Loader component (if used)<br />
│   │   ├── signin/            # Sign-in component<br />
│   │   ├── signup/            # Sign-up component<br />
│   │   └── Hooks/             # Custom hooks<br />
│   │       └── useData.tsx    # Hook for data management<br />
│   │<br />
│   ├── Utils/                 # Utility functions and types<br />
│   │   ├── index.ts           # Utility functions<br />
│   │   └── types.ts           # TypeScript types<br />
│   │<br />
│   └── Assets/                # Static assets (images, etc.)<br />
│       └── empty.png          # Example image file<br />
│<br />
└── sample.env                 # Sample environment variables file<br />


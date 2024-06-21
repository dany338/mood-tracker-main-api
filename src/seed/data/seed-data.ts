import * as bcrypt from 'bcrypt';

interface SeedMoodTracker {
  user_id: string;
  type: string;
  created_at: string;
}

interface SeedUser {
  id:       string;
  email:    string;
  fullName: string;
  password: string;
  roles:    string[];
}

interface SeedData {
  users: SeedUser[];
  moodTrackers: SeedMoodTracker[];
}

export const initialData: SeedData = {
  users: [
    {
      id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      email: 'test1@google.com',
      fullName: 'Test One',
      password: bcrypt.hashSync( 'Abc123', 10 ),
      roles: ['admin']
    },
    {
      id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f9',
      email: 'test2@google.com',
      fullName: 'Test Two',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user','super']
    },
    {
      id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f0',
      email: 'test3@google.com',
      fullName: 'Test Three',
      password: bcrypt.hashSync('Abc123', 10),
      roles: ['user']
    }
  ],
  moodTrackers: [
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:13.806Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:15.602Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "sad",
      created_at: "2023-11-01T21:10:17.097Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:18.673Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "sad",
      created_at: "2023-11-01T21:10:20.001Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:21.721Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:23.848Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "sad",
      created_at: "2023-11-01T21:10:25.134Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:26.492Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:27.618Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "sad",
      created_at: "2023-11-01T21:10:28.652Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:29.832Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:31.175Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "sad",
      created_at: "2023-11-01T21:10:32.475Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:33.673Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:37.347Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:38.868Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "sad",
      created_at: "2023-11-01T21:10:40.804Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "excited",
      created_at: "2023-11-01T21:10:42.535Z",
    },
    {
      user_id: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      type: "pleasant",
      created_at: "2023-11-01T21:10:44.098Z",
    },
  ]
};
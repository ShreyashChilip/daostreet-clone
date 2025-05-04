export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Dao {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  creator_id: string
  created_at: string
  updated_at: string
  creator: User
  members: { count: number }
}

export interface DaoMember {
  id: string
  dao_id: string
  user_id: string
  role: string
  joined_at: string
  user: User
}

/**
 * Client-safe people mention data.
 *
 * This is a static snapshot of `lib/articles/config/people.yml` inlined as a
 * pure ESM object literal. The data is duplicated here to avoid pulling
 * server-only filesystem and YAML dependencies into the client bundle when
 * `components/markdown/people-mention.tsx` resolves person data.
 *
 * Server-side code should continue using `lib/markdown/people.ts` which loads
 * the YAML at runtime. This module exists only for the client component.
 *
 * Re-sync: print `people.yml` with tsx and replace the literal below whenever
 * people entries are added, removed, or modified.
 */

export type PeopleEntry = {
  name: string
  description?: string
  profile?: string
  email?: string
  social?: {
    github?: string
    bilibili?: string
    twitter?: string
    website?: string
    custom?: Array<{ label: string; url: string }>
  }
}

export type ResolvedPerson = {
  key: string
  name: string
  description: string | null
  profile: string | null
  email: string | null
  social: {
    github?: string
    bilibili?: string
    twitter?: string
    website?: string
    custom?: Array<{ label: string; url: string }>
  }
  isFallback: boolean
}

const peopleData: Readonly<Record<string, PeopleEntry>> = {
  "BFladderbean": {
    "name": "BFladderbean",
    "description": "不写在纸上也没有关系，书于手掌之上亦无妨，因为故事所需要的，仅仅只有悲剧和泪水而已。",
    "profile": "/avatars/bfladderbean.png",
    "social": {
      "github": "https://github.com/BFladderbean",
      "bilibili": "https://space.bilibili.com/499560971",
      "website": "https://www.bfladderbean.me"
    }
  },
  "4rcadia": {
    "name": "4rcadia",
    "description": "网站开发/运维\n\nA man who thinks he is a king is mad, a king who thinks he is a king is no less so.",
    "profile": "https://avatars.githubusercontent.com/u/97033226",
    "email": "4rcadia.0@gmail.com",
    "social": {
      "github": "https://github.com/4rcadia",
      "twitter": "https://x.com/_4rcadia",
      "bilibili": "https://space.bilibili.com/499244418"
    }
  },
  "tanh_Heng": {
    "name": "tanh_Heng",
    "description": "风雪拂枕，北星饮尘。喵。",
    "profile": "https://avatars.githubusercontent.com/u/100672377?v=4",
    "social": {
      "github": "https://github.com/tanhHeng",
      "twitter": "https://x.com/tanh_Heng",
      "bilibili": "https://space.bilibili.com/454721668"
    }
  },
  "Ryan100c": {
    "name": "Ryan100c",
    "description": "GTMC contributor",
    "social": {
      "github": "https://github.com/Ryan100c"
    }
  },
  "yuhan2680": {
    "name": "yuhan2680",
    "description": "GTMC contributor",
    "social": {
      "github": "https://github.com/yuhan2680"
    }
  },
  "Molforte": {
    "name": "Molforte",
    "description": "GTMC contributor",
    "social": {
      "github": "https://github.com/Molforte"
    }
  },
  "Twisuki": {
    "name": "Twisuki",
    "description": "GTMC contributor",
    "social": {
      "github": "https://github.com/Twisuki"
    }
  },
  "xhbsh": {
    "name": "xhbsh",
    "description": "GTMC contributor",
    "social": {
      "github": "https://github.com/xhbsh"
    }
  },
  "Fallen_Breath": {
    "name": "Fallen_Breath",
    "profile": "https://i0.hdslb.com/bfs/face/cd7e76930c1b0c7d60851c2344719fafd9d4c6a9.jpg",
    "social": {
      "bilibili": "https://space.bilibili.com/4690315"
    }
  },
  "void": {
    "name": "Void0",
    "description": "GTMC's founding father",
    "profile": "https://i0.hdslb.com/bfs/face/c253cbf9bd1538523faabe0d153479a9d0e88bc2.jpg",
    "social": {
      "bilibili": "https://space.bilibili.com/500260506"
    }
  },
  "XJH_Jorhai": {
    "name": "XJH_Jorhai",
    "description": "GTMC contributor",
    "profile": "https://i1.hdslb.com/bfs/face/c92b12b8e605b4af068947180ded6ba7bba5b8ad.jpg@128w_128h_1c_1s.webp",
    "social": {
      "bilibili": "https://space.bilibili.com/62062732"
    }
  },
  "Petris": {
    "name": "Petris5256",
    "profile": "/avatars/petris.png",
    "social": {
      "bilibili": "https://space.bilibili.com/397472062"
    }
  }
}

/**
 * Resolve a person key to a `ResolvedPerson` (client-safe).
 *
 * Returns the matching entry from the inlined snapshot when found,
 * or a fallback with `isFallback: true` when the key is unknown.
 */
export function resolvePersonClient(key: string): ResolvedPerson {
  const normalized = key.trim()
  const entry = peopleData[normalized]

  if (entry) {
    return {
      key: normalized,
      name: entry.name,
      description: entry.description ?? null,
      profile: entry.profile ?? null,
      email: entry.email ?? null,
      social: entry.social ?? {},
      isFallback: false,
    }
  }

  return {
    key: normalized,
    name: normalized,
    description: null,
    profile: null,
    email: null,
    social: {},
    isFallback: true,
  }
}

export interface project {
  id: any;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface activity {
  id: any;
  updatedAt: string;
  user: {
    name: string;
    avatar: string;
  },
  project: {
    name: string;
    link: string
  },
  comment: {
    name: string;
    link: string;
  },
  template: string;
}

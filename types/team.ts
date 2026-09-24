export type TeamMemberStatus = "draft" | "published";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  isFounder: boolean;
  displayOrder: number;
  canvasX: number;
  canvasY: number;
  status: TeamMemberStatus;
  createdAt: string;
  updatedAt: string;
}
